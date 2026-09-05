# home

The landing/dashboard surface the user sees after signing in.

## Screens

Located in `screens/`. Add one file per screen here:

- `index.tsx` — main home/dashboard view
- `dashboard.tsx` — personalized overview (optional split if the home screen grows)

## What belongs here

- Home feed / dashboard screens
- Quick links into other features (analyzer, roadmap, community, etc.)
- Home-specific widgets and summary cards

## What does NOT belong here

- Tab bar / navigation scaffolding → `src/app/(tabs)`
- Individual feature flows → their own feature folders