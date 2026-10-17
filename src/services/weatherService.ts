import axios from 'axios'
import { fetchCurrentWeather, geocodeCity, hasApiKey } from '../api/openWeatherClient'
import {
  WeatherError,
  type CurrentWeatherResponse,
  type GeoLocationResponse,
  type Weather,
  type WeatherService,
} from '../types/weather'

function toWeather(location: GeoLocationResponse, current: CurrentWeatherResponse): Weather {
  const condition = current.weather[0]
  return {
    city: location.local_names?.ar ?? location.name,
    countryCode: location.country,
    temperatureC: current.main.temp,
    feelsLikeC: current.main.feels_like,
    humidityPercent: current.main.humidity,
    windSpeedMs: current.wind.speed,
    description: condition?.description ?? '',
    iconUrl: condition ? `https://openweathermap.org/img/wn/${condition.icon}@4x.png` : '',
  }
}

function toWeatherError(error: unknown): WeatherError {
  if (error instanceof WeatherError) return error
  if (axios.isAxiosError(error)) {
    if (!error.response) return new WeatherError('NETWORK', error.message)
    if (error.response.status === 401) return new WeatherError('INVALID_API_KEY')
    if (error.response.status === 404) return new WeatherError('NOT_FOUND')
  }
  return new WeatherError('UNKNOWN', error instanceof Error ? error.message : undefined)
}

export const openWeatherService: WeatherService = {
  async getWeatherByCity(city) {
    if (!hasApiKey()) throw new WeatherError('MISSING_API_KEY')
    try {
      const [location] = await geocodeCity(city)
      if (!location) throw new WeatherError('NOT_FOUND')
      const current = await fetchCurrentWeather(location.lat, location.lon)
      return toWeather(location, current)
    } catch (error) {
      throw toWeatherError(error)
    }
  },
}
