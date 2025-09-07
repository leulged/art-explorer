# Environment configuration

Create a `.env.local` file in the project root with:

```
MET_BASE_URL=https://collectionapi.metmuseum.org/public/collection/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `MET_BASE_URL`: Base URL for The Met Collection API.
- `NEXT_PUBLIC_SITE_URL`: Public origin for canonical and Open Graph URLs (set to your Vercel domain in production).
