# Antigravity Context & Workspace Rules: Space for You

Welcome to **Space for You** (_"A platform to create personalized digital spaces for someone special"_).

This file defines the core architecture, development constraints, and standard operating procedures for AI agents operating within this repository.

---

## 1. Environment & Workspace Root

- **Operating System:** Cross-platform (Windows, macOS, Linux).
- **Execution Context:** All scripts, tooling, and development commands (`npm run ...`, `git ...`) must be executed from the repository root.

---

## 2. Project Architecture & Tech Stack

The repository is organized as a monorepo containing:

- **`apps/web/`**: Main web application built with:
  - **Framework:** React 19 + Vite 8
  - **Language:** TypeScript 6 with strict mode and `verbatimModuleSyntax: true`
    - All types/interfaces must use `import type` and `export type`.
  - **Architecture:** Feature-Sliced Design (FSD):
    - `src/app/`: Providers, global styles, router.
    - `src/pages/`: Route views (`home`, `auth`, `dashboard`, `not-found`).
    - `src/widgets/`: Structural blocks (`Header`, `Navbar`, `Footer`, `RootLayout`).
    - `src/features/`: Interactive user features (`theme-toggle`, `auth`).
    - `src/entities/`: Domain models (`session`).
    - `src/shared/`: Atomic UI primitives (`Button`, `Card`, `Badge`, `Container`), API clients, config, and assets.
  - **Styling:** Tailwind CSS v4 using customized editorial `@theme` design tokens.
  - **Routing:** React Router 8.
  - **Backend & Auth:** Appwrite Web SDK v29 (`appwrite`).
  - **Path Aliases & Imports (Strict):** Always use the `@/` path alias for all internal imports across slices and modules (e.g. `@/features/...`, `@/shared/...`, `@/entities/...`, `@/widgets/...`, `@/pages/...`). Never use or promote deep relative paths (`../../model/...`, `../ui/...`).
  - **Linter & Quality:** Oxlint (Rust linter) + TypeScript compiler (`tsc -b`).

---

## 3. Security & Credentials

- **Strict Rule:** Never hardcode credentials, project IDs, or secrets into source code under version control.
- Appwrite configuration variables (`APPWRITE_PROJECT_ID`, `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_NAME`) must reside exclusively in:
  - `apps/web/.env` (untracked, ignored by `.gitignore`).
  - Template keys in `apps/web/.env.example`.
- Vite exposes variables with `envPrefix: ['VITE_', 'APPWRITE_']` via `import.meta.env`.
- **Deferred Cloud Upload Rule:** During space editing and drafting, user-uploaded media (photos) remain strictly in client memory (compressed WebP Blob/DataURL). Assets are uploaded to Appwrite Storage (`space-photos` bucket) only upon final save/publishing to prevent orphan cloud files.

---

## 4. Branching Strategy & Git Workflow

- **`main`**: Production deployment on Vercel. Direct commits are strictly prohibited.
- **`develop`**: Active development and integration branch.
- **Auxiliary branches**:
  - `feature/<name>`: New features or UI components.
  - `fix/<name>`: Bug fixes and regressions.
  - `chore/<name>`: Tooling, dependency, or configuration updates.
- **Conventional Commits & SemVer Discipline**:
  - Enforced by `@commitlint/cli` and `commitlint.config.mjs`.
  - Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  - Use `fix(...)`, `perf(...)`, or `refactor(...)` for bug fixes, UI/UX adjustments, and incremental improvements so Release Please increments **PATCH (`x.y.Z`)**. Reserve `feat(...)` strictly for major new feature modules that warrant a **MINOR (`x.Y.0`)** bump.
  - Header max length: 72 characters, lowercase, no trailing period.
  - Pre-commit hook runs `npx lint-staged` and `npm run typecheck`.

---

## 5. Automated Versioning

- **GitHub CI**: **Google Release Please** (`.github/workflows/release.yml`, `release-please-config.json`, `.release-please-manifest.json`) automatically detects Conventional Commits on `develop`, creates Release PRs, and tags releases.
- **Local Tooling**: `@changesets/cli` (`.changeset/config.json`) with `npm run changeset` and `npm run version-packages`.

---

## 6. Design & Editorial Guidelines

- Aesthetic direction: Intimate, warm digital workshop with contemporary editorial design.
- Warm ivory (`#FAF6F0`), dark terracotta (`#A34835`), soft clay (`#EACABC`), espresso (`#302621`).
- Typography: `Lora` for headings and `DM Sans` for UI and body text.
- **Language Standard:** All UI copy, buttons, labels, and text must be in fluent, professional English.
- **No Implementation Jargon in UI:** Never expose internal tech stack names (e.g., Appwrite, Vite, Oxlint) or design token terminology in end-user facing text. Focus on emotional intimacy, human value, and genuine privacy.
- **No Procedural or Meta-Labels:** Strictly avoid artificial process badges, workflow labels, and self-describing scaffolding (such as `"Creator Workshop • Step-by-Step"`, `"Personal Sanctuary"`, or `"Preview Snapshot"`). Rely on clean hierarchy, modern whitespace, and intuitive context rather than instructional label tags.

---

## 7. Code Modularity & File Size Limits

- **Strict File Length Limit:** No source file must exceed **250 lines of code**.
- **Component Decomposition:** Promote high component modularity. Break down large components into focused, single-responsibility sub-components:
  - Sub-views and UI sections (e.g., dedicated drawer headers, search bars, category switchers, specimen previewers).
  - Dedicated custom hooks for stateful workflows or external API logic.
  - Dedicated configurations, defaults, and audio synthesis modules.
  - Reusable atomic primitives in `src/shared/`.
- **Barrel Exports:** Use clean `index.ts` files in feature directories to export clean public APIs without monolithic file structures.

---

## 8. Domain Model & Multi-Scene System

- **Sanctuary Container (`UserSpace`):** Holds top-level metadata (title, recipient, sender, dedication message, theme ID, privacy settings, status).
- **Multi-Scene Structure (`SpaceScene`):**
  - **Memory Canvas (`free-canvas`):** Diorama-like 3D stage holding spatial items (`SpatialItemData`): polaroid photos, interactive candles, keepsake cards, sticky notes, soundscape/music players.
  - **Heartfelt Letters (`letters`):** Intimate collection of handwritten-style letters with customizable envelopes, wax seals, and reading modal.
  - **Share Hub (`share`):** Dedicated keepsake dedication card customizer generating downloadable/printable visual cards and low-density QR codes.
- **Public Sanctuary Viewer (`/s/:slug` and `/spaces/:slug`):** Dedicated read-only presentation mode for recipients. Completely free of editing toolbars and scaffolding, featuring interactive lighting, audio playback, letter reading, and photo lightbox modals.
- **Passcode Protection (`LockGateScene`):** Optional client-verified privacy gate with salt, hash, and hint.

---

## 9. Persistence Model & Public Permissions

- **Local-First (`localStorage`):** Keys prefixed with `sfy_` (`sfy_user_spaces_v1`, `sfy_space_<id>_scenes`, `sfy_meta_<id>`). Instant responsiveness with zero API cost during drafting.
- **Resilient Fallback (`getLocalSpaceWithScenes`):** When testing on localhost or offline, `PublicSpacePage` seamlessly falls back to local storage if Appwrite Cloud is unreachable or the document was only saved locally.
- **Cloud Database (Appwrite Cloud):** Persists `spaces` and `space_scenes` collections.
- **Public Read Access:** Spaces with `status: 'published'` or `status: 'ready'` automatically grant `Permission.read(Role.any())` to allow account-free access to recipients.
- **Deferred Media Uploads:** Photos stay in client memory (compressed WebP Blob/DataURL) while drafting, and upload to the `space-photos` bucket only upon final save.

---

## 10. External Integrations & APIs

- **TinyURL API:** Fast, open URL shortener used in `apps/web/src/features/create-space/lib/url-shortener.ts` to compress sanctuary URLs for easily scannable, low-density QR codes. Includes in-memory caching, 2500ms timeout, and silent fallback to canonical `/s/:slug`.
- **Lucide Icons & Iconify:** Open vector iconography and illustration stickers.
- **Google Fonts:** `Lora` (headings) and `DM Sans` (body and UI).
