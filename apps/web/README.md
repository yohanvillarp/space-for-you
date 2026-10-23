# @space-for-you/web

> Web frontend for **Space for You** (*"A platform to create personalized digital spaces for someone special"*).

---

## Architecture & Technologies

- **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/)
  - `src/app`: Application-wide providers, routing configuration, global styles and tokens.
  - `src/pages`: Application views (`HomePage`, `NotFoundPage`).
  - `src/widgets`: Compositional layout blocks (`Header`, `Navbar`, `Footer`, `RootLayout`).
  - `src/features`: Interactive user features (`theme-toggle`).
  - `src/entities`: Business domain models and session entities.
  - `src/shared`: Reusable atomic UI elements (`Button`, `Card`, `Badge`, `Container`), API clients, assets, and utilities.
- **Framework & Runtime**: React 19 + TypeScript 6 (`verbatimModuleSyntax: true`)
- **Styling**: Tailwind CSS v4 with custom warm editorial design tokens and light/dark theme support.
- **Routing**: React Router 8.
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/) for ultra-fast static analysis.

---

## Available Scripts

From the repository root:
```bash
# Run web development server
npm run dev

# Run static analysis (Oxlint)
npm run lint

# Run TypeScript type check
npm run typecheck

# Build web package for production
npm run build

# Preview production build locally
npm run preview
```

Or from `apps/web`:
```bash
cd apps/web
npm run dev
npm run build
npm run lint
npm run typecheck
```
