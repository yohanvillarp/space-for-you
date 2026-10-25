# Contributing Guide

Thank you for contributing to **Space for You**. To maintain a professional workflow, transparent git history, and maximum stability in continuous deployment, this repository enforces strict branching guidelines, commit standards, and automated quality gates.

---

## 1. Branching Strategy

The repository operates on a two-primary-branch model:

```text
 ┌──────────────┐          Pull Request / Merge          ┌──────────┐
 │   develop    │  ───────────────────────────────────>  │   main   │
 │(development) │                                        │(production)
 └──────────────┘                                        └──────────┘
        ▲
        │ Feature / Fix / Chore
        │
 ┌──────────────────────┐
 │ feature/<name>       │
 │ fix/<name>           │
 └──────────────────────┘
```

### main (Production)

- Represents the production state deployed on Vercel.
- **Strict Rule:** Direct commits to `main` are prohibited.
- Updates to `main` occur exclusively via a **Pull Request or Merge from the `develop` branch** once all changes have been tested and verified.

### develop (Development)

- The central integration branch for active development.
- All new features, components, configurations, and bug fixes converge into `develop`.
- Serves as the continuous staging environment prior to production releases.

### Auxiliary Branches (Feature Branches)

For specific features or modular improvements, create auxiliary branches branching off `develop`:

- `feature/<name>`: New features, pages, or components.
- `fix/<name>`: Bug fixes or regressions.
- `chore/<name>`: Tooling updates, dependencies, or configuration tasks.
- Once completed and validated, auxiliary branches are integrated into `develop` via Pull Request.

---

## 2. Commit Conventions (Conventional Commits)

This repository enforces the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Every commit must be atomic, focused, and self-documenting.

### Required Format

```text
<type>(<scope>): <short imperative description>

[optional body explaining motivation and changes]

[optional footer: issue references or BREAKING CHANGE]
```

### Allowed Types (`<type>`)

| Type       | Purpose                                                           |
| :--------- | :---------------------------------------------------------------- |
| `feat`     | Introduces a new feature for the user.                            |
| `fix`      | Patches a bug or unexpected behavior.                             |
| `docs`     | Documentation changes only (`README`, `CONTRIBUTING`, etc.).      |
| `style`    | Formatting, whitespace, or aesthetics without code logic changes. |
| `refactor` | Code refactoring that neither fixes a bug nor adds a feature.     |
| `perf`     | Code changes that improve performance or loading times.           |
| `test`     | Adding missing tests or correcting existing tests.                |
| `build`    | Changes affecting build tooling, Vite, npm, or packaging.         |
| `ci`       | Modifications to CI/CD pipelines, workflows, or scripts.          |
| `chore`    | Routine maintenance, configs, or developer tooling.               |
| `revert`   | Reverts a previous commit.                                        |

### Common Scopes (`<scope>`)

- `web`: Core web application in `apps/web`.
- `ui`: Atomic UI components (buttons, cards, badges, modals).
- `layout`: Shell structure, navbar, header, or footer.
- `theme`: Design tokens, dark/light mode, or typography.
- `seo`: Metadata, Open Graph tags, or favicons.
- `assets`: Iconography, SVG illustrations, or graphics.
- `config`: Tool configuration files (Vite, Vercel, TypeScript).
- `deps`: Dependency updates or additions.
- `root`: Root-level monorepo configuration.

### Formatting Rules

1. **Length Limit:** The first line (header) must not exceed **72 characters**.
2. **Lowercase:** The type and scope must always be lowercase (`feat(ui): ...`, not `Feat(UI): ...`).
3. **Imperative Mood:** Use present imperative mood in concise English (`add navigation bar`, `fix route reload`).
4. **No Trailing Period:** Do not end the header subject with a period (`.`).
5. **Blank Line Separation:** If a body or footer is included, separate it from the header with a blank line.

### Commit Template

An interactive template is configured in `.gitmessage`. You can set it in your local environment with:

```bash
git config commit.template .gitmessage
```

When running `git commit` without `-m`, your default editor will open with this template and reference instructions.

---

## 3. Automated Quality Gates (Husky Git Hooks)

The repository uses **Husky** hooks to automatically validate changes locally before code is committed:

### pre-commit Hook

Runs automatically before any commit is finalized:

1. `npm run lint`: Fast static analysis via **Oxlint**.
2. `npm run typecheck`: Strict TypeScript type checking across the project (`tsc -b`).

> **Note:** If the linter reports any issues or TypeScript detects type errors, the commit will be automatically halted.

### commit-msg Hook

Validates with **Commitlint** that the commit message conforms to the Conventional Commits specification and rules defined in `commitlint.config.mjs`.

---

## 4. Local Development Workflow

1. **Ensure you are on the `develop` branch:**

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Make your changes and verify in development:**

   ```bash
   npm run dev
   ```

3. **Verify quality checks before committing:**

   ```bash
   npm run lint
   npm run typecheck
   ```

4. **Create modular, atomic commits:**

   ```bash
   git add <staged-files>
   git commit -m "feat(ui): add space preview cards"
   ```

5. **Deploying to Production (`main`):**
   - Once changes in `develop` are verified and ready for release:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
   _(Or open a Pull Request from `develop` into `main` on GitHub)._

---

Following these standards ensures clean code, a transparent git history, and uninterrupted deployments for **Space for You**.
