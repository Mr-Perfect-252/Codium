# AGENTS.md — Codium (web)

Guidance for AI agents working in this repository. Read this before making changes.

## What this is

Codium is a browser-based IDE built with **Vite + React + TypeScript**, styled
with **Tailwind + shadcn/ui**, deployed on **Vercel** (see `vercel.json` and the
serverless functions in `api/`). It authenticates the user with a GitHub
**Personal Access Token (PAT)** entered in the app and talks to the GitHub API
to browse/edit repositories.

## Layout

| Path | Role |
|------|------|
| `index.html` | HTML entry; mounts `#root`, loads `/src/main.tsx` |
| `src/main.tsx` | JS entry; `createRoot(...).render(<App/>)` |
| `src/pages/Index.tsx` | Home/landing route |
| `src/components/ide/LoginScreen.tsx` | **PAT-entry page** (token input, "repo scope" hint) |
| `api/` | Vercel serverless functions |
| `vite.config.ts` | Build config |

UI copy is internationalized via a `t("...")` helper — prefer adding keys over
hardcoding strings where the surrounding code already uses `t()`.

## Build & deploy — the source-leak gotcha (important)

- `package.json` has **two** builds: a dev-mode default (`vite build --mode
  development`, unminified, tied to the platform preview pipeline) and
  **`build:prod` (`vite build`)** for real production output.
- **Production must serve the static `dist/` output of `build:prod`** — never a
  Vite **dev/preview server**. The dev server serves raw `/src/*.tsx` by path,
  which is exactly how someone can enter a filename and read original source.
- `vite.config.ts` sets **`build.sourcemap: false`** on purpose. Do **not**
  turn it on for production — source maps let tools reconstruct the original
  labeled source tree (`App.tsx`, folder names, comments) from the bundle.

## Legal / proprietary layer (already in place — don't remove)

- `LICENSE.txt` — strict All-Rights-Reserved proprietary license.
- `CODE_OF_CONDUCT.md` — contributor rules (no reverse-engineering, no
  component/staging-link leakage, no unauthorized forks).
- Legal banner comment at the top of `index.html` (visible in View Source).
- `/*! ... */` legal banner at the top of `src/main.tsx` — the `/*!` form is a
  "legal comment" preserved by esbuild minification into the prod bundle. Keep
  the `/*!`, not `//` or plain `/*`.
- Copyright footer on `LoginScreen.tsx` only (the PAT-entry page), not global.
- Owner / copyright holder: **Sohan Ananthula ("mr.perfect")**, © 2026.

These are deterrents + a legal basis for DMCA/enforcement. They are **not**
legal advice — templates only; a lawyer should review before enforcement.

## Honest security reality

Client-side frontend code **cannot be made secret** — shipped JS is always
readable/beautifiable. The realistic protections here are: (1) ship only the
minified prod `dist/` build (no dev server, no source maps), (2) the legal
layer above, and (3) keep secrets server-side. Do not add "anti-inspection"
theater (F12 blocking, blur-on-blur anti-screenshot) — it doesn't work and
harms real users/accessibility.

## Conventions for agents

- When editing entry points/components, **append safely** — don't alter
  existing business logic, exports, or UI state.
- Match the existing dark theme and Tailwind class style.
- **Never commit secrets** (`.env`, tokens, keystores). Never hardcode a PAT.
- Verify JSON/TS parses before pushing. Prefer small, focused commits.
- Commit trailer used in this project:
  `Co-Authored-By: Enter Code <noreply@enter.pro>`
