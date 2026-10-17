/** Application-level weather model; UI depends on this, not on provider responses. */
export interface Weather {
  city: string
  countryCode: string
  temperatureC: number
  feelsLikeC: number
  humidityPercent: number
  windSpeedMs: number
  description: string
  iconUrl: string
}

export type WeatherErrorCode =
  | 'NOT_FOUND'
  | 'MISSING_API_KEY'
  | 'INVALID_API_KEY'
  | 'NETWORK'
  | 'UNKNOWN'

export class WeatherError extends Error {
  readonly code: WeatherErrorCode

  constructor(code: WeatherErrorCode, message?: string) {
    super(message ?? code)
    this.name = 'WeatherError'
    this.code = code
  }
}

/** Contract consumed by the UI; any provider implementation must honor it. */
export interface WeatherService {
  getWeatherByCity(city: string): Promise<Weather>
}

/** Subset of the OpenWeather Geocoding API response that we use. */
export interface GeoLocationResponse {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
}

/** Subset of the OpenWeather Current Weather API response that we use. */
export interface CurrentWeatherResponse {
  weather: { description: string; icon: string }[]
  main: { temp: number; feels_like: number; humidity: number }
  wind: { speed: number }
}
