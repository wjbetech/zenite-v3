# Architecture

#### Framework 
- Next.js 16.1.1 (App router + server/client components)
- Typescript

#### Style and UI
- Tailwind v4 
- shadcn component library

#### Persistence
- [development] Local storage
- [production] --

## Directory Strategy

- `src/app`: entry routing and layout layer.
- `src/components`: tailored atomic components (cards, grids, toggles, etc.). Can be grouped by domain or larger sub-components if needed or if applicable.
- `src/lib`: persistence helpers for storage and serializers, design tokens, shared hooks.
- `src/data`: optional stub collections for mock data, seeds, future syncing, etc.
- `docs`: a dynamic collection/reference directory for meta information about the application and to help agents understand the app philosophy