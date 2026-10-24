# @space-for-you/web

> Web frontend for **Space for You** (_"A platform to create personalized digital spaces for someone special"_).

---

## Architecture & Technologies

- **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/)
  - `src/app`: Application-wide providers, routing configuration, global styles and tokens.
  - `src/pages`: Application views (`HomePage`, `DashboardPage`, `AttributionsPage`, `PrivacyPage`, etc.).
  - `src/widgets`: Compositional layout blocks (`Header`, `Navbar`, `Footer`, `RootLayout`).
  - `src/features`: Interactive user features (`create-space`, `theme-toggle`, `auth`).
  - `src/entities`: Business domain models and session entities.
  - `src/shared`: Reusable atomic UI elements (`Button`, `Card`, `Badge`, `Container`), API clients, assets, and utilities.
- **Framework & Runtime**: React 19 + TypeScript 6 (`verbatimModuleSyntax: true`)
- **Styling**: Tailwind CSS v4 with custom warm editorial design tokens and light/dark theme support.
- **Routing**: React Router 8.
- **Backend & Storage**: Appwrite Cloud Web SDK.
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/) for ultra-fast static analysis.

---

## Environment Variables

Configure in `apps/web/.env` (see `.env.example`):

- `VITE_APPWRITE_ENDPOINT`: Appwrite server endpoint.
- `VITE_APPWRITE_PROJECT_ID`: Appwrite project ID.
- `VITE_APPWRITE_DATABASE_ID`: Database identifier.
- `VITE_APPWRITE_SPACES_COLLECTION_ID`: Spaces collection identifier.
- `VITE_APPWRITE_PHOTOS_BUCKET_ID`: Storage bucket for user keepsake photos.
- `VITE_PEXELS_API_KEY`: Pexels photography API key (optional, falls back to curated offline catalog).

---

## Attributions & Open Resources

We gratefully recognize:

- **Pexels & Unsplash**: Intimate royalty-free keepsake photography.
- **Apple iTunes Search API**: 30s melodic previews and celebration tracks.
- **Iconify & Lucide Icons**: Open vector illustrations and iconography.
- **Appwrite Cloud**: Open-source backend authentication and asset storage.
- **Google Fonts**: Lora and DM Sans typography.

Visit `/attributions` in the app for complete licenses and links.

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
