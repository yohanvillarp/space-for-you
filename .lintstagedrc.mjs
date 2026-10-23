export default {
  'apps/web/**/*.{ts,tsx,js,jsx}': [
    'npx --prefix apps/web oxlint',
    'prettier --write',
  ],
  '*.{js,mjs,cjs}': ['prettier --write'],
  '**/*.{json,css,html,md,yml,yaml}': ['prettier --write'],
}
