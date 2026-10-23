# Coding Standards & Architecture (FSD)

## Architecture Rules (Feature-Sliced Design)

1. Layer hierarchy (from top to bottom):
   `app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`
2. A slice or segment may only import from lower layers, never from higher or peer slices.
3. Every public export from a slice must be routed through its top-level `index.ts`.

## TypeScript & React 19 Guidelines

1. `verbatimModuleSyntax: true` is enforced.
   - Always write `import type { ... } from '...'` for type-only imports.
   - Always write `export type { ... }` for type-only exports.
2. Styling must use Tailwind CSS v4 design tokens defined in `apps/web/src/app/styles/tokens.css`.
3. Avoid ad-hoc arbitrary magic values; use semantic color tokens (`primary`, `secondary`, `text-primary`, `bg-surface`, etc.).
4. Linter: Code must pass `oxlint` with 0 errors and 0 warnings.
