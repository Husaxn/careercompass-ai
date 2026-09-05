# profile

The signed-in user's own account and personal settings.

## Screens

Located in `screens/`. Add one file per screen here:

- `index.tsx` — the user's profile overview
- `edit.tsx` — edit personal details / bio
- `settings.tsx` — app preferences
- `subscription.tsx` — plan / billing (if applicable)

## What belongs here

- The current user's profile, preferences, and account settings
- Editing personal information and avatar
- Notification, privacy, and subscription settings

## What does NOT belong here

- Sign-in / account creation → `auth`
- Public community member profiles → `community`