import { Client, Databases, Query } from 'node-appwrite'

const MAX_DURATION_SECONDS = 60.5
const MAX_NOTES_PER_SPACE = 3

function parseRequestBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'object') return req.body
  try {
    return JSON.parse(req.body)
  } catch {
    return {}
  }
}

export default async ({ req, res, log, error }) => {
  const body = parseRequestBody(req)
  const { spaceId, durationSeconds, existingCount } = body

  if (!spaceId) {
    return res.json({ error: 'Missing required spaceId parameter' }, 400)
  }

  // 1. Enforce strict duration limit (60 seconds)
  if (
    typeof durationSeconds === 'number' &&
    durationSeconds > MAX_DURATION_SECONDS
  ) {
    return res.json(
      {
        allowed: false,
        error: `Audio duration (${Math.round(durationSeconds)}s) exceeds the 60-second limit.`,
      },
      400,
    )
  }

  // 2. Enforce space-level audio quota (maximum 3 voice notes)
  let voiceNotesCount = typeof existingCount === 'number' ? existingCount : null

  if (voiceNotesCount === null) {
    const endpoint =
      process.env.APPWRITE_FUNCTION_ENDPOINT ||
      process.env.APPWRITE_ENDPOINT ||
      'https://nyc.cloud.appwrite.io/v1'
    const projectId =
      process.env.APPWRITE_FUNCTION_PROJECT_ID ||
      process.env.APPWRITE_PROJECT_ID
    const apiKey = process.env.APPWRITE_API_KEY
    const dbId = process.env.APPWRITE_DATABASE_ID || 'sfy_primary_db'
    const scenesColl =
      process.env.APPWRITE_SCENES_COLLECTION_ID || 'space_scenes'

    const client = new Client().setEndpoint(endpoint).setProject(projectId)
    if (apiKey) client.setKey(apiKey)
    const databases = new Databases(client)

    try {
      const scenes = await databases.listDocuments(dbId, scenesColl, [
        Query.equal('spaceId', spaceId),
      ])

      let totalAudioItems = 0
      for (const sceneDoc of scenes.documents) {
        if (sceneDoc.type === 'free-canvas' && sceneDoc.payload) {
          try {
            const items = JSON.parse(sceneDoc.payload)
            if (Array.isArray(items)) {
              totalAudioItems += items.filter(
                (item) => item.type === 'audio' || item.type === 'voice-note',
              ).length
            }
          } catch {
            // ignore JSON parse error in individual scenes
          }
        }
      }
      voiceNotesCount = totalAudioItems
    } catch (err) {
      log(`Could not verify live scene counts: ${err.message}`)
      voiceNotesCount = 0
    }
  }

  if (voiceNotesCount >= MAX_NOTES_PER_SPACE) {
    return res.json(
      {
        allowed: false,
        error: `Sanctuary voice note limit reached (maximum ${MAX_NOTES_PER_SPACE} notes).`,
      },
      400,
    )
  }

  return res.json({
    allowed: true,
    voiceNotesCount,
    maxAllowed: MAX_NOTES_PER_SPACE,
    maxDurationSeconds: 60,
  })
}
