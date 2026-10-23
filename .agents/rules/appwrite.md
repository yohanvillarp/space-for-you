# Appwrite Integration Guidelines

## Credentials & Environment

- Never commit `APPWRITE_PROJECT_ID` or API keys.
- Variables are stored in `apps/web/.env` and loaded via `apps/web/src/shared/config/env.ts`.
- Vite exposes `VITE_` and `APPWRITE_` variables through `envPrefix` in `vite.config.ts`.

## Authentication Flow (OAuth2 Token)

- Uses `account.createOAuth2Token({ provider, success, failure })`.
- Redirection leads to first-party routes:
  - Success callback: `/auth/success` (reads `userId` and `secret`, awaits `account.createSession`).
  - Failure callback: `/auth/failure` (displays error message and retry CTA).
- Route guards:
  - `ProtectedRoute`: Guards `/dashboard` by awaiting `account.get()`.
  - `PublicOnlyRoute`: Guards `/auth` by redirecting to `/dashboard` if session exists.
