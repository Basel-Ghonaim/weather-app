# TASKS.md — Weather App Implementation Map

Source of truth for scope: [MVP.md](MVP.md). Total budget: **120 minutes**.

## Mandatory constraints

- React + Vite + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Axios.
- OpenWeather Geocoding API (`/geo/1.0/direct`) → Current Weather API (`/data/2.5/weather`, `units=metric`, `lang=ar`).
- **Arabic-only UI with correct RTL layout** (`<html lang="ar" dir="rtl">`, logical Tailwind utilities).
- Celsius, humidity in %, wind in m/s.
- Practical SOLID: HTTP client → weather service (contract) → hook → presentational components.
- Code identifiers, filenames, and commit messages in English.
- Atomic commits: subject ≤ 50 chars, body ≤ 200 chars. Never commit `.env` or keys. No push without approval.

## Repository state at planning time (2026-10-17)

- Independent Git repo at `weather-app/` on `main`; `origin` = `github.com/Basel-Ghonaim/weather-app` (empty, private).
- Vite React-TS scaffold built successfully; `axios`, `tailwindcss`, `@tailwindcss/vite` installed.
- `.gitignore` ignores `.env` and `.env.*` (except `.env.example`).
- No test runner; verification = `tsc -b` + `eslint` + `vite build` + manual test matrix.

## Tasks

| # | Task | Min | Depends on | Batch |
|---|---|---:|---|---|
| T1 | Setup, Tailwind, RTL shell, env config | 15 | — | A |
| T2 | Types, Axios client, weather service | 30 | T1 | B |
| T3 | Arabic strings, search hook, view states | 15 | T1 | B |
| T4 | UI components and RTL styling | 30 | T2, T3 | B |
| T5 | Integration test matrix and fixes | 15 | T4 | C |
| T6 | Final review, build, README | 15 | T5 | C |
| | **Total** | **120** | | |

**Batching:** Batch A is sequential (shared config). In Batch B, T2 (`api/`, `services/`, `types/`) and T3 (`i18n/`, `hooks/`) touch disjoint files and may be implemented together; T4 follows once their contracts exist. Batch C is sequential.

### T1 — Setup, Tailwind, RTL shell, env config (15 min)
- **Goal:** Clean base ready for feature work.
- **Scope:** Register `tailwindcss()` in `vite.config.ts`; `@import "tailwindcss"` in `index.css`; `index.html` → `lang="ar" dir="rtl"`, Arabic title, Arabic-capable font; remove template boilerplate (`App.css`, demo assets); `.env.example` placeholder; typed `import.meta.env`.
- **Acceptance:** App renders an Arabic RTL placeholder styled by Tailwind; `.env` ignored.
- **Verify:** `npm run build`, `npm run lint`, `git check-ignore .env`.
- **Commit:** `chore: set up Tailwind, RTL shell and env config`

### T2 — Types, Axios client, weather service (30 min)
- **Goal:** Provider-independent weather contract.
- **Scope:** `types/weather.ts` (domain `Weather`, `WeatherService` interface, `WeatherErrorCode`); `api/openWeatherClient.ts` (Axios instance, `appid`); `services/weatherService.ts` (geocode `limit=5` → first match → current weather with `units=metric&lang=ar` → map to `Weather`; prefer `local_names.ar`; typed `WeatherError`).
- **Acceptance:** Empty geocode → `NOT_FOUND`; missing key → `MISSING_API_KEY`; 401 → `INVALID_API_KEY`; network → `NETWORK`; no Axios types leak.
- **Verify:** `tsc -b`; manual call with real key (valid / nonsense city).
- **Commit:** `feat: add OpenWeather client and weather service`

### T3 — Arabic strings, search hook, view states (15 min)
- **Goal:** All UI text centralized in Arabic; state orchestration via the service contract.
- **Scope:** `i18n/ar.ts` (labels, messages, error-code → Arabic map); `hooks/useWeatherSearch.ts` (`idle | loading | success | error`, ignores stale responses, blocks blank input).
- **Acceptance:** No English user-facing strings; hook depends only on `WeatherService`.
- **Verify:** `tsc -b`, `npm run lint`.
- **Commit:** may be combined with T4 if the hook has no consumer yet.

### T4 — UI components and RTL styling (30 min)
- **Goal:** Attractive, responsive Arabic RTL UI.
- **Scope:** `SearchBar`, `WeatherCard` (city/country, °C, Arabic description, OpenWeather icon), `WeatherDetails` (feels-like, humidity %, wind m/s), `StatusMessage` (empty/loading/error); gradient background.
- **Acceptance:** Logical utilities only (`ms/me/ps/pe/start/end/text-start`); looks correct at 375 px and desktop; no HTTP code in components; Arabic `alt`/`aria-label`.
- **Verify:** Browser at mobile + desktop widths; `npm run lint`; grep for `\b(ml|mr|pl|pr|left|right)-`.
- **Commit:** `feat: add Arabic RTL weather UI`

### T5 — Integration test matrix and fixes (15 min)
| Case | Expected |
|---|---|
| `London` | Arabic city name/description, °C, %, m/s |
| `القاهرة` (Arabic input) | Resolves and displays |
| `São Paulo` | Resolves (encoding) |
| `xyzxyzxyz` | Arabic "city not found" |
| Blank / whitespace | Search blocked |
| Missing / invalid key | Arabic config/key error, no raw text |
| Offline (DevTools) | Arabic network error |
| Rapid repeated searches | Latest result wins |
| 375 px + desktop | Correct RTL, no overflow |
- **Commit:** `fix: …` only if fixes were required.

### T6 — Final review, build, README (15 min, includes buffer)
- **Scope:** `tsc -b`, `lint`, `build` green; review full diff; check commit subject/body lengths; confirm no key in history; README setup (Arabic UI note, `.env`, key not secret); list deferred work.
- **Commit:** `docs: add setup instructions and deferred work`

## Cut order if time runs short
1. Visual polish in T4 (keep layout correct).
2. Arabic-Indic digits / extra fonts (already out of scope).
Never cut: T5 error states, RTL correctness, build verification.

## Deferred / out of scope
Forecasts, favourites, multi-match city picker, language switcher, maps, automated test suite (Vitest), backend key proxy.
