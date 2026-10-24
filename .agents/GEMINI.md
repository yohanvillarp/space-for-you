# Antigravity Context & Workspace Rules: Space for You

Welcome to **Space for You** (_"A platform to create personalized digital spaces for someone special"_).

This file defines the core architecture, development constraints, and standard operating procedures for AI agents operating within this repository.

---

## 1. Environment & Terminal Quirks

- **Operating System:** Windows (PowerShell / pwsh).
- **CRITICAL PowerShell Directory Quirk:** The user's PowerShell profile automatically changes the working directory to `C:\Users\yohan\myspace` upon terminal initialization.
  - **Always force directory explicitly** in all commands:
    ```powershell
    cd "c:\Users\yohan\myspace\lab\active\space-for-you" ; <command>
    ```

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
- **Conventional Commits**:
  - Enforced by `@commitlint/cli` and `commitlint.config.mjs`.
  - Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
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
