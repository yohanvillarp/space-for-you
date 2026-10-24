# Antigravity Context & Repository Instructions

Please refer to the comprehensive rules and architectural constraints documented in:

- [.agents/GEMINI.md](.agents/GEMINI.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

### Key Rules at a Glance

1. **PowerShell Quirk:** Always execute commands with:
   `cd "c:\Users\yohan\myspace\lab\active\space-for-you" ; <command>`
2. **No Hardcoded Credentials:** Keep all Appwrite IDs and secrets in `apps/web/.env`.
3. **Branching Model:** `main` is production; `develop` is development. Integrate via Pull Requests.
4. **Commits:** Strictly use Conventional Commits (max 72 chars header).
5. **Code Style:** TypeScript 6 (`verbatimModuleSyntax: true`), React 19, Tailwind CSS v4, Feature-Sliced Design (FSD).
6. **Versioning:** Automated via Google Release Please on `develop` + local Changesets (`@changesets/cli`).
7. **Modularity & File Limits:** Strictly max 250 lines of code per file. Decompose into focused sub-components and modular hooks.
8. **Deferred Cloud Upload:** Keep user media in client memory during drafting; upload to Appwrite Storage (`space-photos`) only on final space save.
