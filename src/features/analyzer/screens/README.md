# analyzer/screens

All screens for the analyzer feature live here (not scattered per screen elsewhere).
Each file is one screen in the source → analysis flow:

- `source-upload.tsx` — pick / capture the source (document, resume, screenshot, session data)
- `analyzing.tsx` — loading / progress while AI processes
- `result.tsx` — the AI-generated insights / analysis output
- `history.tsx` — past analysis runs and saved results

These screens are wired to routes under `src/app/analyzer`.