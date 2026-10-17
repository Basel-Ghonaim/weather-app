import { useCallback, useRef, useState } from 'react'
import { openWeatherService } from '../services/weatherService'
import {
  WeatherError,
  type Weather,
  type WeatherErrorCode,
  type WeatherService,
} from '../types/weather'

export type SearchState =
  | { status: 'idle' }
  | { status: 'loading'; query: string }
  | { status: 'success'; weather: Weather }
  | { status: 'error'; code: WeatherErrorCode; query: string }

export function useWeatherSearch(service: WeatherService = openWeatherService) {
  const [state, setState] = useState<SearchState>({ status: 'idle' })
  const latestRequest = useRef(0)

  const search = useCallback(
    async (rawQuery: string) => {
      const query = rawQuery.trim()
      if (!query) return

      const requestId = ++latestRequest.current
      setState({ status: 'loading', query })
      try {
        const weather = await service.getWeatherByCity(query)
        if (requestId === latestRequest.current) setState({ status: 'success', weather })
      } catch (error) {
        if (requestId !== latestRequest.current) return
        const code = error instanceof WeatherError ? error.code : 'UNKNOWN'
        setState({ status: 'error', code, query })
      }
    },
    [service],
  )

  return { state, search }
}
