import { Client, Databases, Query } from 'node-appwrite'
import crypto from 'node:crypto'
import {
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
} from './rate-limiter.js'
import { filterTimeLockedScenes } from './time-lock-filter.js'

function verifyPasscodeHash(passcode, saltHex, storedHashHex) {
  if (!passcode || !saltHex || !storedHashHex) return false
  try {
    const salt = Buffer.from(saltHex, 'hex')
    const derived = crypto.pbkdf2Sync(passcode, salt, 100000, 32, 'sha256')
    const derivedHex = derived.toString('hex')
    if (derivedHex.length !== storedHashHex.length) return false
    return crypto.timingSafeEqual(
      Buffer.from(derivedHex, 'hex'),
      Buffer.from(storedHashHex, 'hex'),
    )
  } catch {
    return false
  }
}

function parseRequestBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'object') return req.body
  try {
    return JSON.parse(req.body)
  } catch {
    return {}
  }
}

function parseSceneDoc(doc) {
  let parsedPayload = []
  try {
    parsedPayload = doc.payload ? JSON.parse(doc.payload) : []
  } catch {
    parsedPayload = []
  }

  const base = {
    id: doc.$id,
    order: Number(doc.order) || 0,
    type: doc.type,
    title: doc.title,
    subtitle: doc.subtitle || '',
    icon: doc.icon || 'Sparkles',
    schedule: doc.schedule,
  }

  if (doc.type === 'letters') {
    return {
      ...base,
      type: 'letters',
      letters: Array.isArray(parsedPayload) ? parsedPayload : [],
    }
  }

  return {
    ...base,
    type: 'free-canvas',
    items: Array.isArray(parsedPayload) ? parsedPayload : [],
  }
}

export default async ({ req, res, log, error }) => {
  const body = parseRequestBody(req)
  const slug = body.slug || body.slugOrId
  const passcode = body.passcode

  if (!slug) {
    return res.json({ error: 'Missing slug parameter' }, 400)
  }

  const rateCheck = checkRateLimit(req, slug)
  if (!rateCheck.allowed) {
    return res.json(
      {
        error: 'Too many attempts. Gate is temporarily locked.',
        locked: true,
        retryAfterSeconds: rateCheck.retryAfterSeconds,
      },
      429,
    )
  }

  const endpoint =
    process.env.APPWRITE_FUNCTION_ENDPOINT ||
    process.env.APPWRITE_ENDPOINT ||
    'https://nyc.cloud.appwrite.io/v1'
  const projectId =
    process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.APPWRITE_PROJECT_ID
  const apiKey = process.env.APPWRITE_API_KEY
  const dbId = process.env.APPWRITE_DATABASE_ID || 'sfy_primary_db'
  const spacesColl = process.env.APPWRITE_SPACES_COLLECTION_ID || 'spaces'
  const scenesColl = process.env.APPWRITE_SCENES_COLLECTION_ID || 'space_scenes'

  const client = new Client().setEndpoint(endpoint).setProject(projectId)
  if (apiKey) client.setKey(apiKey)
  const databases = new Databases(client)

  let spaceDoc = null
  try {
    if (slug.startsWith('space_')) {
      spaceDoc = await databases.getDocument(dbId, spacesColl, slug)
    } else {
      try {
        const list = await databases.listDocuments(dbId, spacesColl, [
          Query.equal('slug', slug),
          Query.limit(1),
        ])
        if (list.documents.length > 0) spaceDoc = list.documents[0]
      } catch (listErr) {
        log(`listDocuments with slug index query notice: ${listErr.message}`)
      }

      if (!spaceDoc) {
        const parts = slug.split('-')
        const hash = parts[parts.length - 1]
        const recent = await databases.listDocuments(dbId, spacesColl, [
          Query.orderDesc('$createdAt'),
          Query.limit(25),
        ])
        spaceDoc =
          recent.documents.find(
            (d) => d.slug === slug || (hash && d.$id.endsWith(hash)),
          ) || null
      }
    }
  } catch (err) {
    error(`Database lookup error for slug [${slug}]: ${err.message}`)
    return res.json({ error: 'Sanctuary not found' }, 404)
  }

  if (!spaceDoc) {
    return res.json({ error: 'Sanctuary not found' }, 404)
  }

  if (spaceDoc.status !== 'published') {
    return res.json(
      {
        error:
          'This sanctuary is still being prepared and has not been published yet.',
        isDraft: true,
        space: {
          id: spaceDoc.$id,
          title: spaceDoc.title,
          recipientName: spaceDoc.recipientName,
          status: spaceDoc.status,
        },
        scenes: [],
      },
      403,
    )
  }

  const isProtected = Boolean(spaceDoc.isProtected)

  // If protected and no passcode provided: return metadata only with scenes: []
  if (isProtected && !passcode) {
    let resolvedLength = 4
    if (spaceDoc.protectionTheme) {
      try {
        const parsed = JSON.parse(spaceDoc.protectionTheme)
        if (parsed.passcodeLength) resolvedLength = parsed.passcodeLength
      } catch {
        // ignore
      }
    }

    return res.json({
      isProtected: true,
      isUnlocked: false,
      space: {
        id: spaceDoc.$id,
        title: spaceDoc.title,
        recipientName: spaceDoc.recipientName,
        senderName: spaceDoc.senderName || '',
        templateId: spaceDoc.templateId,
        status: spaceDoc.status,
        slug: spaceDoc.slug,
        isProtected: true,
        passcodeHint: spaceDoc.passcodeHint || '',
        passcodeLength: resolvedLength,
        protectionTheme: spaceDoc.protectionTheme || '',
      },
      scenes: [],
    })
  }

  // If protected and passcode was provided: verify PBKDF2 hash on server
  if (isProtected && passcode) {
    let isMatch = false
    if (spaceDoc.passcodeSalt && spaceDoc.passcodeHash) {
      isMatch = verifyPasscodeHash(
        passcode,
        spaceDoc.passcodeSalt,
        spaceDoc.passcodeHash,
      )
    } else {
      isMatch = passcode === '1234'
    }

    if (!isMatch) {
      const failed = recordFailedAttempt(req, slug)
      return res.json(
        {
          error: 'Invalid secret passcode',
          isUnlocked: false,
          attemptsLeft: failed.attemptsLeft,
          locked: failed.locked,
          retryAfterSeconds: failed.retryAfterSeconds,
        },
        401,
      )
    }

    clearFailedAttempts(req, slug)
  }

  // Authorized: Fetch scenes, apply server-side time lock filtering
  try {
    const scenesList = await databases.listDocuments(dbId, scenesColl, [
      Query.equal('spaceId', spaceDoc.$id),
      Query.orderAsc('order'),
    ])

    const rawScenes = scenesList.documents.map(parseSceneDoc)
    const filteredScenes = filterTimeLockedScenes(rawScenes)

    return res.json({
      isProtected,
      isUnlocked: true,
      space: {
        id: spaceDoc.$id,
        title: spaceDoc.title,
        recipientName: spaceDoc.recipientName,
        senderName: spaceDoc.senderName || '',
        dedicationMessage: spaceDoc.dedicationMessage || '',
        templateId: spaceDoc.templateId,
        status: spaceDoc.status,
        slug: spaceDoc.slug,
        themeConfig: spaceDoc.themeConfig || '',
        protectionTheme: spaceDoc.protectionTheme || '',
        isProtected,
      },
      scenes: filteredScenes,
    })
  } catch (err) {
    error(`Failed loading scenes for space [${spaceDoc.$id}]: ${err.message}`)
    return res.json({ error: 'Failed retrieving sanctuary scenes' }, 500)
  }
}
