# Antigravity & AI Agent Context: Space for You

Welcome to **Space for You** (_"A platform to create personalized digital spaces for someone special"_).
This file provides immediate context for AI coding agents (Antigravity, Cursor, Copilot, Windsurf, etc.) to understand the project domain, architecture, data flow, and development constraints upon cloning the repository.

---

## 1. Project Purpose & Domain Overview

Space for You allows users to craft intimate, interactive, and beautifully designed digital spaces ("sanctuaries") for loved ones—for birthdays, anniversaries, apologies, love letters, or gratitude.

### Core Domain Concepts:

- **Sanctuary (`UserSpace`):** The primary container. Holds metadata (title, recipient, sender, dedication message, theme, privacy settings, status).
- **Multi-Scene System (`SpaceScene`):**
  - **Memory Canvas (`free-canvas`):** A diorama-like 3D stage where spatial items (polaroid photos, interactive candles, keepsake cards, sticky notes, audio players) are placed and arranged.
  - **Heartfelt Letters (`letters`):** An intimate collection of handwritten-style letters with customizable envelopes, seals, and reading modal.
  - **Share Hub (`share`):** Generation of physical keepsake dedication cards with QR codes and links.
- **Public Sanctuary Viewer (`/s/:slug`):** An account-free, immersive, read-only experience for the recipient. Features candle lighting, soundscapes, photo lightbox modals, and letter reading without any editing scaffolding.
- **Privacy Lock Gate:** Optional passcode protection with salt/hash and hint (`LockGateScene`) guarding the public space.

---

## 2. Monorepo Architecture & Tech Stack

- **Monorepo Root:** All build, lint, and git commands must run from the root directory.
- **Application Path:** `apps/web/`
  - **Framework:** React 19 + Vite 8
  - **Language:** TypeScript 6 with `verbatimModuleSyntax: true` (`import type` / `export type` required)
  - **Architecture:** Feature-Sliced Design (FSD):
    - `src/app/`: App entry, providers, global styles (`tokens.css`), router (`app-router.tsx`).
    - `src/pages/`: Route-level views (`home`, `auth`, `dashboard`, `spaces`, `attributions`).
    - `src/widgets/`: Structural components (`Header`, `Footer`, `RootLayout`).
    - `src/features/`: Interactive domain features (`create-space`, `space-lock`, `space-themes`, `auth`, `theme-toggle`).
    - `src/entities/`: Core data models (`space`, `session`).
    - `src/shared/`: Atomic UI primitives (`Button`, `Card`, `Badge`, `Container`), API clients (`appwrite.ts`), audio/sfx synthesis, and config.
  - **Styling:** Tailwind CSS v4 using editorial design tokens.
  - **Backend & Auth:** Appwrite Web SDK v29 (`databases`, `account`, `storage`).
  - **Routing:** React Router 8 (`/`, `/auth`, `/dashboard`, `/studio`, `/s/:slug`, `/attributions`).

---

## 3. Persistence Strategy (Dual-Layer Model)

1. **Local-First (`localStorage`):**
   - Keys are prefixed with `sfy_` (e.g., `sfy_user_spaces_v1`, `sfy_space_<id>_scenes`, `sfy_meta_<id>`).
   - Ensures $0 cloud cost during drafting, zero latency, and offline support.
   - Provides local development fallback via `getLocalSpaceWithScenes(idOrSlug)` if Appwrite Cloud is unreachable or the document is only saved locally.
2. **Cloud Synchronization (Appwrite Cloud):**
   - Databases: `spaces` and `space_scenes` collections.
   - Storage: `space-photos` bucket.
   - **Deferred Upload Rule:** User images remain compressed WebP Blobs in memory during canvas drafting and are only uploaded to cloud storage upon explicit save or publishing.
   - **Public Permissions:** Spaces with `status: 'published'` or `'ready'` grant `Permission.read(Role.any())` so recipients can view them without logging in.

---

## 4. External Integrations & Free APIs

- **TinyURL API:** Fast, open URL shortener used in `apps/web/src/features/create-space/lib/url-shortener.ts` to compress URLs for clean, low-density QR codes. Includes an in-memory cache, 2500ms timeout, and silent fallback to canonical `/s/:slug`.
- **Lucide Icons & Iconify:** Vector illustrations and iconography.
- **Google Fonts:** Typography (`Lora` for literary headings and `DM Sans` for body/UI text).

---

## 5. Strict Development Constraints & Rules

1. **Root Execution:** Execute all development, linting, and build commands from workspace root (`npm run dev`, `npm run typecheck`, etc.).
2. **No Hardcoded Credentials:** Appwrite IDs and secrets belong strictly in `apps/web/.env` (and documented in `apps/web/.env.example`).
3. **Strict Path Aliases (`@/`):** Always use `@/` path alias for all internal imports (e.g. `@/features/...`, `@/entities/...`, `@/shared/...`). Deep relative paths (e.g. `../../model/...`) are strictly forbidden.
4. **File Length Limit (Max 250 LOC):** No source file may exceed 250 lines of code. Decompose into modular hooks, sub-views, and shared primitives.
5. **Conventional Commits:** Maximum 72 characters header length, lowercase, no trailing period (e.g., `feat(viewer): implement responsive public stage`).
6. **Branching Model:** `main` is production; `develop` is integration. Create `feature/<name>` or `fix/<name>` branches and merge via Pull Requests towards `develop`.
7. **Editorial Copy Standards:** All user-facing UI text must be in fluent, intimate English without technical jargon (never mention Vite, Appwrite, FSD, or tokens in UI) and without meta/process badges (e.g., `"Step 1 of 3"`, `"Creator Workshop"`).
