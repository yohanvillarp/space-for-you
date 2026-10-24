# Space for You

> A platform to create personalized digital spaces for someone special.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v8-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-orange)](https://oxc.rs/)

---

## Overview

**Space for You** is an intimate digital platform featuring contemporary editorial design, built to facilitate the creation of personalized digital spaces for someone special. The project follows Feature-Sliced Design (FSD) principles and is engineered for scalability, accessibility, and high performance.

---

## Tech Stack

| Category                 | Technology                                    | Version | Purpose                                                               |
| :----------------------- | :-------------------------------------------- | :------ | :-------------------------------------------------------------------- |
| **Runtime & UI**         | [React](https://react.dev/)                   | 19.3.1  | Core UI library with modern compiler support                          |
| **Language**             | [TypeScript](https://www.typescriptlang.org/) | 6.0.3   | Strict static typing with `verbatimModuleSyntax`                      |
| **Bundler & Tooling**    | [Vite](https://vite.dev/)                     | 8.3.4   | Development server with instant HMR and optimized production bundling |
| **Styling**              | [Tailwind CSS](https://tailwindcss.com/)      | 4.3.3   | CSS engine using customized editorial `@theme` design tokens          |
| **Routing**              | [React Router](https://reactrouter.com/)      | 8.5.0   | Declarative client-side routing and layout hierarchies                |
| **Iconography**          | [Lucide React](https://lucide.dev/)           | 1.61.0  | Consistent, lightweight vector icon set                               |
| **Static Analysis**      | [Oxlint](https://oxc.rs/)                     | 1.88.0  | Rust-based high-performance linter                                    |
| **Git Automation**       | [Husky](https://typicode.github.io/husky/)    | 9.1.7   | Automated local pre-commit and commit-msg quality gates               |
| **Commit Specification** | [Commitlint](https://commitlint.js.org/)      | 21.2.4  | Conventional Commits standard enforcement                             |
| **Hosting & Deployment** | [Vercel](https://vercel.com/)                 | Cloud   | Production hosting configured with SPA fallback rewrite rules         |

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Quality & Build Commands

All quality tasks can be executed from the repository root:

```bash
# Run static code analysis with Oxlint
npm run lint

# Run full TypeScript compiler verification
npm run typecheck

# Generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Architecture

The web application (`apps/web`) is structured following the **Feature-Sliced Design (FSD)** architectural methodology:

- `src/app`: Global application providers, routing configuration, base stylesheets, and design tokens.
- `src/pages`: Top-level route views (`HomePage`, `DashboardPage`, `AttributionsPage`, `PrivacyPage`, `NewSpacePage`, `EditSpacePage`, etc.).
- `src/widgets`: Composite user interface blocks (`Header`, `Navbar`, `Footer`, `RootLayout`).
- `src/features`: Interactive user features and behaviors (`create-space`, `theme-toggle`, `auth`).
- `src/entities`: Business domain models and session entities.
- `src/shared`: Reusable atomic UI components (`Button`, `Card`, `Badge`, `Container`), API clients, assets, and utility functions.

---

## Acknowledgements & Open Resources

Space for You is shaped with gratitude to the open web and generous developer platforms:

- **[Pexels](https://www.pexels.com/) & [Unsplash](https://unsplash.com/):** Intimate, royalty-free photography under open commercial and editorial licenses.
- **[Apple iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/):** Ambient preview soundtracks and melodies.
- **[Lucide Icons](https://lucide.dev/) & [Iconify](https://iconify.design/):** Beautiful open-source vector stickers and interface iconography.
- **[Appwrite](https://appwrite.io/):** Secure open-source backend, authentication, and cloud storage engine.
- **[Google Fonts](https://fonts.google.com/):** Contemporary editorial typography (`Lora` & `DM Sans`).

For full details, visit the dedicated [/attributions](https://spaceforyou.app/attributions) page within the application.

---

## Branching & Contribution

This repository follows a strict two-primary-branch workflow:

- `main`: Production release branch. Direct commits are restricted.
- `develop`: Primary integration and active development branch.

All code contributions must adhere to the Conventional Commits specification and pass automated pre-commit quality gates. For full details on commit formats, testing guidelines, and submission workflows, see [CONTRIBUTING.md](CONTRIBUTING.md).
