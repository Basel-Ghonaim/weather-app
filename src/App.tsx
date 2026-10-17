import { SearchBar } from './components/SearchBar'
import { Spinner, StatusMessage } from './components/StatusMessage'
import { WeatherCard } from './components/WeatherCard'
import { useWeatherSearch } from './hooks/useWeatherSearch'
import { ar } from './i18n/ar'

function App() {
  const { state, search } = useWeatherSearch()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:py-16">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold drop-shadow sm:text-5xl">{ar.appTitle}</h1>
        <p className="mt-3 text-lg text-sky-100">{ar.appSubtitle}</p>
      </header>

      <SearchBar onSearch={search} isLoading={state.status === 'loading'} />

      <section aria-live="polite" className="flex justify-center">
        {state.status === 'idle' && (
          <StatusMessage
            title={ar.emptyTitle}
            message={ar.emptyHint}
            icon={<span aria-hidden="true" className="text-5xl">🌤️</span>}
          />
        )}
        {state.status === 'loading' && <StatusMessage title={ar.loading} icon={<Spinner />} />}
        {state.status === 'success' && <WeatherCard weather={state.weather} />}
        {state.status === 'error' && (
          <StatusMessage
            tone="error"
            title={ar.errorTitle}
            message={ar.errors[state.code]}
            icon={<span aria-hidden="true" className="text-5xl">⚠️</span>}
            action={
              state.code !== 'NOT_FOUND' && state.code !== 'MISSING_API_KEY' ? (
                <button
                  type="button"
                  onClick={() => search(state.query)}
                  className="mt-2 rounded-xl bg-white/15 px-5 py-2 font-semibold transition hover:bg-white/25"
                >
                  {ar.retry}
                </button>
              ) : undefined
            }
          />
        )}
      </section>
    </main>
  )
}

export default App
