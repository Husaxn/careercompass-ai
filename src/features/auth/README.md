# auth

Everything related to identity and access for the user.

## Screens

Located in `screens/`. Add one file per screen here:

- `login.tsx` — email/password sign in
- `signup.tsx` — create a new account
- `forgot-password.tsx` — password reset flow

## What belongs here

- Auth UI screens (login, signup, password reset)
- Social / OAuth sign-in entry points
- Auth-related hooks and helpers (keep shared HTTP client in `src/services`)

## What does NOT belong here

- Profile editing of the signed-in user → `profile`
- Onboarding questionnaires → `onboarding`