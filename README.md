# حالة الطقس — Weather App

A small Arabic, right-to-left weather app. Search for a city (in Arabic or English) and see its current
conditions from OpenWeather: temperature (°C), description, feels-like, humidity (%) and wind speed (m/s).

Built with React, Vite, TypeScript, Tailwind CSS v4 and Axios.

## Setup

```bash
npm install
cp .env.example .env   # then set VITE_OPENWEATHER_API_KEY
npm run dev
```

Get a free API key at <https://home.openweathermap.org/api_keys>. New keys can take a short while to activate;
until then the app shows an "invalid key" message.

> **Security note:** `VITE_` variables are bundled into the client and are **not secret**. This is acceptable for a
> local MVP only. Proxy requests through a backend before any public deployment. Never commit `.env`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Structure

```text
src/
  api/openWeatherClient.ts      Axios instance and raw OpenWeather requests
  services/weatherService.ts    Geocode → current weather → domain model, typed errors
  types/weather.ts              Weather model, WeatherService contract, error codes
  hooks/useWeatherSearch.ts     Search state (idle/loading/success/error), stale-response guard
  i18n/ar.ts                    All Arabic UI text and error messages
  components/                   SearchBar, WeatherCard, WeatherDetails, StatusMessage
```

UI components depend only on the `WeatherService` contract, so the provider can be swapped without touching them.

## Docs

- [docs/MVP.md](docs/MVP.md) — scope and requirements
- [docs/TASKS.md](docs/TASKS.md) — implementation task map

## Deferred work

- Picker for ambiguous city names (the first geocoding match is used today)
- Forecasts, saved cities, language switcher
- Automated test suite (verified so far with a scripted headless-browser test matrix)
- Backend proxy to protect the API key
