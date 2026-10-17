import { useState, type FormEvent } from 'react'
import { ar } from '../i18n/ar'

interface SearchBarProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [city, setCity] = useState('')
  const canSubmit = city.trim().length > 0 && !isLoading

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (canSubmit) onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <label htmlFor="city" className="mb-2 block text-sm font-semibold text-sky-100">
        {ar.searchLabel}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute inset-s-4 top-1/2 z-10 size-5 -translate-y-1/2 text-sky-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="city"
            type="search"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder={ar.searchPlaceholder}
            autoComplete="off"
            className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 ps-12 pe-4 text-start text-lg text-white placeholder:text-sky-200/70 backdrop-blur focus:border-white/50 focus:ring-2 focus:ring-amber-300/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-2xl bg-amber-400 px-8 py-3.5 text-lg font-bold text-sky-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60 disabled:shadow-none"
        >
          {ar.searchButton}
        </button>
      </div>
    </form>
  )
}
