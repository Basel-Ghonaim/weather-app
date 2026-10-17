import { ar, countryName } from '../i18n/ar'
import type { Weather } from '../types/weather'
import { WeatherDetails } from './WeatherDetails'

interface WeatherCardProps {
  weather: Weather
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const description = weather.description || ar.descriptionFallback

  return (
    <article className="w-full rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
      <header className="text-start">
        <h2 className="text-3xl font-extrabold sm:text-4xl">{weather.city}</h2>
        {weather.countryCode && (
          <p className="mt-1 text-sky-100">{countryName(weather.countryCode)}</p>
        )}
      </header>

      <div className="my-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-start">
          <p className="text-7xl font-extrabold tracking-tight sm:text-8xl">
            <bdi>{Math.round(weather.temperatureC)}</bdi>
            <span className="align-top text-3xl font-semibold text-sky-100">{ar.celsius}</span>
          </p>
          <p className="mt-2 text-xl font-semibold text-amber-200">{description}</p>
        </div>
        {weather.iconUrl && (
          <img
            src={weather.iconUrl}
            alt={ar.weatherIconAlt(description)}
            width={160}
            height={160}
            className="size-32 drop-shadow-xl sm:size-40"
          />
        )}
      </div>

      <WeatherDetails weather={weather} />
    </article>
  )
}
