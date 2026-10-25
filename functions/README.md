# Appwrite Cloud Functions for Space for You

Server-side security hardening functions designed for Appwrite Cloud (Node.js 18/20/22 runtime).

---

## 1. Functions Overview

### `unlock-sanctuary`

- **Purpose:** Server-authoritative lock gate verification and time-locked scene filtering.
- **Security Protections:**
  - **Zero Hash Exposure:** Passcode hashes (`passcodeHash`) and cryptographic salts (`passcodeSalt`) are never sent to the browser.
  - **Rate Limiting:** Protects against brute-force attacks by restricting clients to 5 failed attempts per 15-minute sliding window (returns HTTP 429 on exhaustion).
  - **Zero Pre-Unlock Data Leaks:** For protected sanctuaries, initial requests receive public metadata only with `scenes: []`. Full scenes are only dispatched upon successful cryptographic validation.
  - **Server UTC Time-Lock Enforcement:** Scenes scheduled for future dates have their contents (`letters`, `items`, and sensitive payloads) stripped authoritatively on the server, preventing client-side clock tampering.
- **Entrypoint:** `src/main.js`

### `validate-voice-quota`

- **Purpose:** Authoritative enforcement of audio limits for personal voice keepsakes.
- **Rules:**
  - **Duration Limit:** Maximum 60 seconds per voice note.
  - **Space Quota:** Maximum 3 audio keepsakes per sanctuary.
- **Entrypoint:** `src/main.js`

---

## 2. Environment Variables Required in Appwrite Console

For each function, configure the following environment variables in the Appwrite Console under **Settings > Environment Variables**:

| Variable                        | Description                                      | Example / Default       |
| ------------------------------- | ------------------------------------------------ | ----------------------- |
| `APPWRITE_DATABASE_ID`          | Database ID containing sanctuary collections     | `sfy_primary_db`        |
| `APPWRITE_SPACES_COLLECTION_ID` | Spaces collection identifier                     | `spaces`                |
| `APPWRITE_SCENES_COLLECTION_ID` | Scenes collection identifier                     | `space_scenes`          |
| `APPWRITE_API_KEY`              | Server API Key with `databases.read` permissions | `[Appwrite Secret Key]` |

---

## 3. Deployment via Appwrite CLI

```bash
# 1. Login to Appwrite CLI
npx appwrite login

# 2. Deploy unlock-sanctuary
npx appwrite functions createDeployment \
  --functionId=unlock-sanctuary \
  --entrypoint=src/main.js \
  --code=./functions/unlock-sanctuary \
  --activate=true

# 3. Deploy validate-voice-quota
npx appwrite functions createDeployment \
  --functionId=validate-voice-quota \
  --entrypoint=src/main.js \
  --code=./functions/validate-voice-quota \
  --activate=true
```

Both functions work automatically with the local-first offline fallback in `apps/web` during local development when running without cloud access.
