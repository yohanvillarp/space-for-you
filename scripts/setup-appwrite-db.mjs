#!/usr/bin/env node
/**
 * Space For You - Appwrite Database Setup Script
 * Provisions database, collections, attributes, and indexes idempotently.
 *
 * Usage:
 *   APPWRITE_API_KEY="your-secret-key" node scripts/setup-appwrite-db.mjs
 */

import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')

// Try loading environment from apps/web/.env
function loadEnv() {
  const envPath = resolve(ROOT_DIR, 'apps/web/.env')
  const envVars = {}
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim()
        let val = trimmed.slice(eqIdx + 1).trim()
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1)
        }
        envVars[key] = val
      }
    }
  }
  return envVars
}

const localEnv = loadEnv()

const ENDPOINT =
  process.env.APPWRITE_ENDPOINT ||
  process.env.VITE_APPWRITE_ENDPOINT ||
  localEnv.APPWRITE_ENDPOINT ||
  localEnv.VITE_APPWRITE_ENDPOINT ||
  'https://nyc.cloud.appwrite.io/v1'

const PROJECT_ID =
  process.env.APPWRITE_PROJECT_ID ||
  process.env.VITE_APPWRITE_PROJECT_ID ||
  localEnv.APPWRITE_PROJECT_ID ||
  localEnv.VITE_APPWRITE_PROJECT_ID

const API_KEY = process.env.APPWRITE_API_KEY || localEnv.APPWRITE_API_KEY

const DATABASE_ID =
  process.env.VITE_APPWRITE_DATABASE_ID ||
  localEnv.VITE_APPWRITE_DATABASE_ID ||
  'sfy_primary_db'

const SPACES_COLL_ID =
  process.env.VITE_APPWRITE_SPACES_COLLECTION_ID ||
  localEnv.VITE_APPWRITE_SPACES_COLLECTION_ID ||
  'spaces'

const SCENES_COLL_ID =
  process.env.VITE_APPWRITE_SCENES_COLLECTION_ID ||
  localEnv.VITE_APPWRITE_SCENES_COLLECTION_ID ||
  'space_scenes'

console.log('\n🌟 [Space For You] Appwrite Database Provisioner')
console.log('--------------------------------------------------')
console.log(`Endpoint:     ${ENDPOINT}`)
console.log(`Project ID:   ${PROJECT_ID || '(none)'}`)
console.log(`Database ID:  ${DATABASE_ID}`)
console.log(`Collections:  ${SPACES_COLL_ID}, ${SCENES_COLL_ID}\n`)

if (!PROJECT_ID) {
  console.error(
    '❌ Error: APPWRITE_PROJECT_ID is not configured in apps/web/.env',
  )
  process.exit(1)
}

if (!API_KEY) {
  console.warn(
    '⚠️  Notice: APPWRITE_API_KEY not found in environment or apps/web/.env.',
  )
  console.log(
    'To run this automated script directly, create an API Key in Appwrite Console with permissions:',
  )
  console.log(
    '  • databases.read, databases.write, collections.read, collections.write, attributes.read, attributes.write, indexes.read, indexes.write',
  )
  console.log('\nRun command:')
  console.log(
    `  $env:APPWRITE_API_KEY="your_api_key"; node scripts/setup-appwrite-db.mjs\n`,
  )
  process.exit(0)
}

async function apiRequest(path, method = 'GET', body = null) {
  const url = `${ENDPOINT}${path}`
  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': PROJECT_ID,
    'X-Appwrite-Key': API_KEY,
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text }
  }

  return { ok: res.ok, status: res.status, data }
}

async function ensureDatabase() {
  console.log(`🔍 Checking database: ${DATABASE_ID}...`)
  const check = await apiRequest(`/databases/${DATABASE_ID}`)
  if (check.ok) {
    console.log(`   Database '${DATABASE_ID}' already exists.`)
    return
  }

  console.log(`   Creating database '${DATABASE_ID}'...`)
  const create = await apiRequest('/databases', 'POST', {
    databaseId: DATABASE_ID,
    name: 'Space For You Primary DB',
    enabled: true,
  })
  if (!create.ok) {
    throw new Error(`Failed to create database: ${JSON.stringify(create.data)}`)
  }
  console.log(`✅ Database created successfully.`)
}

async function ensureCollection(collId, name) {
  console.log(`🔍 Checking collection '${collId}'...`)
  const check = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}`,
  )
  if (check.ok) {
    console.log(`   Collection '${collId}' already exists.`)
    return
  }

  console.log(`   Creating collection '${collId}' (${name})...`)
  const create = await apiRequest(
    `/databases/${DATABASE_ID}/collections`,
    'POST',
    {
      collectionId: collId,
      name,
      permissions: [],
      documentSecurity: true, // Enables per-document permissions
      enabled: true,
    },
  )
  if (!create.ok) {
    throw new Error(
      `Failed to create collection '${collId}': ${JSON.stringify(create.data)}`,
    )
  }
  console.log(`✅ Collection '${collId}' created.`)
}

async function ensureStringAttr(
  collId,
  key,
  size,
  required = false,
  xDefault = undefined,
) {
  const check = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/${key}`,
  )
  if (check.ok) return

  console.log(
    `   Adding string attribute '${key}' (size: ${size}, req: ${required})...`,
  )
  const res = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/string`,
    'POST',
    {
      key,
      size,
      required,
      default: xDefault,
    },
  )
  if (!res.ok) {
    console.warn(
      `   Warning adding attribute ${key}: ${res.data.message || JSON.stringify(res.data)}`,
    )
  }
}

async function ensureIntegerAttr(collId, key, required = false, xDefault = 0) {
  const check = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/${key}`,
  )
  if (check.ok) return

  console.log(`   Adding integer attribute '${key}'...`)
  const res = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/integer`,
    'POST',
    {
      key,
      required,
      default: xDefault,
    },
  )
  if (!res.ok) {
    console.warn(
      `   Warning adding attribute ${key}: ${res.data.message || JSON.stringify(res.data)}`,
    )
  }
}

async function ensureBooleanAttr(
  collId,
  key,
  required = false,
  xDefault = false,
) {
  const check = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/${key}`,
  )
  if (check.ok) return

  console.log(`   Adding boolean attribute '${key}'...`)
  const res = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/attributes/boolean`,
    'POST',
    {
      key,
      required,
      default: xDefault,
    },
  )
  if (!res.ok) {
    console.warn(
      `   Warning adding attribute ${key}: ${res.data.message || JSON.stringify(res.data)}`,
    )
  }
}

async function ensureIndex(collId, key, type, attributes) {
  const check = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/indexes/${key}`,
  )
  if (check.ok) return

  console.log(
    `   Adding index '${key}' (${type} on [${attributes.join(', ')}])...`,
  )
  const res = await apiRequest(
    `/databases/${DATABASE_ID}/collections/${collId}/indexes`,
    'POST',
    {
      key,
      type,
      attributes,
    },
  )
  if (!res.ok) {
    console.warn(
      `   Warning adding index ${key}: ${res.data.message || JSON.stringify(res.data)}`,
    )
  }
}

async function main() {
  try {
    await ensureDatabase()

    // 1. Spaces Collection
    await ensureCollection(SPACES_COLL_ID, 'Spaces')
    await ensureStringAttr(SPACES_COLL_ID, 'title', 255, true)
    await ensureStringAttr(SPACES_COLL_ID, 'recipientName', 100, true)
    await ensureStringAttr(SPACES_COLL_ID, 'senderName', 100, false, '')
    await ensureStringAttr(SPACES_COLL_ID, 'templateId', 50, true, 'birthday')
    await ensureStringAttr(SPACES_COLL_ID, 'status', 20, true, 'draft')
    await ensureStringAttr(SPACES_COLL_ID, 'slug', 120, true)
    await ensureStringAttr(SPACES_COLL_ID, 'dedicationMessage', 2000, false, '')
    await ensureStringAttr(SPACES_COLL_ID, 'themeConfig', 5000, false, '')
    await ensureStringAttr(SPACES_COLL_ID, 'userId', 36, true)
    await ensureIntegerAttr(SPACES_COLL_ID, 'scenesCount', false, 1)
    await ensureIntegerAttr(SPACES_COLL_ID, 'artifactsCount', false, 0)
    await ensureBooleanAttr(SPACES_COLL_ID, 'isProtected', false, false)

    // Wait slightly for attributes to be ready before creating indexes
    await new Promise((r) => setTimeout(r, 2000))
    await ensureIndex(SPACES_COLL_ID, 'idx_spaces_userId', 'key', ['userId'])
    await ensureIndex(SPACES_COLL_ID, 'idx_spaces_slug', 'unique', ['slug'])
    await ensureIndex(SPACES_COLL_ID, 'idx_spaces_status', 'key', ['status'])

    // 2. Space Scenes Collection
    await ensureCollection(SCENES_COLL_ID, 'Space Scenes')
    await ensureStringAttr(SCENES_COLL_ID, 'spaceId', 36, true)
    await ensureIntegerAttr(SCENES_COLL_ID, 'order', true, 0)
    await ensureStringAttr(SCENES_COLL_ID, 'type', 30, true, 'free-canvas')
    await ensureStringAttr(SCENES_COLL_ID, 'title', 120, true)
    await ensureStringAttr(SCENES_COLL_ID, 'subtitle', 255, false, '')
    await ensureStringAttr(SCENES_COLL_ID, 'icon', 50, false, 'Sparkles')
    await ensureStringAttr(SCENES_COLL_ID, 'payload', 100000, false, '[]')

    await new Promise((r) => setTimeout(r, 2000))
    await ensureIndex(SCENES_COLL_ID, 'idx_scenes_spaceId', 'key', ['spaceId'])
    await ensureIndex(SCENES_COLL_ID, 'idx_scenes_space_order', 'key', [
      'spaceId',
      'order',
    ])

    console.log('\n🎉 Appwrite Database provisioning completed successfully!')
  } catch (err) {
    console.error('\n❌ Provisioning failed:', err.message)
    process.exit(1)
  }
}

main()
