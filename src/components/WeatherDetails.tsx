import { ar } from '../i18n/ar'
import type { Weather } from '../types/weather'

interface WeatherDetailsProps {
  weather: Pick<Weather, 'feelsLikeC' | 'humidityPercent' | 'windSpeedMs'>
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const items = [
    { label: ar.feelsLike, value: `${Math.round(weather.feelsLikeC)}`, unit: ar.celsius },
    { label: ar.humidity, value: `${weather.humidityPercent}`, unit: '%' },
    { label: ar.wind, value: weather.windSpeedMs.toFixed(1), unit: ar.windUnit },
  ]

  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-sky-950/40 px-4 py-3 text-start">
          <dt className="text-sm text-sky-200">{item.label}</dt>
          <dd className="mt-1 text-2xl font-bold">
            <bdi>{item.value}</bdi> <span className="text-base font-semibold text-sky-100">{item.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
