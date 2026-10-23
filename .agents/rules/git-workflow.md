# Git Workflow & Commit Rules

## Branch Strategy

- `main`: Production release. Only accepts merges from `develop`.
- `develop`: Development integration. All feature branches merge here via Pull Request.
- Feature branches: `feature/<name>`, `fix/<name>`, `chore/<name>`.

## Commit Standard (Conventional Commits)

- Format: `<type>(<scope>): <subject>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Rules:
  - Header line <= 72 characters.
  - Lowercase type and scope.
  - Imperative mood.
  - No trailing period.
- Pre-commit hook runs `npx lint-staged` and `npm run typecheck` (`tsc -b`).
