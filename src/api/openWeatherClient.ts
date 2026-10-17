import axios from 'axios'
import type { CurrentWeatherResponse, GeoLocationResponse } from '../types/weather'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() ?? ''

const http = axios.create({
  baseURL: 'https://api.openweathermap.org',
  timeout: 10_000,
  params: { appid: apiKey },
})

export const hasApiKey = (): boolean => apiKey.length > 0

export async function geocodeCity(city: string): Promise<GeoLocationResponse[]> {
  const { data } = await http.get<GeoLocationResponse[]>('/geo/1.0/direct', {
    params: { q: city, limit: 5 },
  })
  return data
}

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
): Promise<CurrentWeatherResponse> {
  const { data } = await http.get<CurrentWeatherResponse>('/data/2.5/weather', {
    params: { lat, lon, units: 'metric', lang: 'ar' },
  })
  return data
}
