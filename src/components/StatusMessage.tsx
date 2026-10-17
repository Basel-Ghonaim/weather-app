import type { ReactNode } from 'react'

interface StatusMessageProps {
  title: string
  message?: string
  tone?: 'neutral' | 'error'
  icon?: ReactNode
  action?: ReactNode
}

export function StatusMessage({ title, message, tone = 'neutral', icon, action }: StatusMessageProps) {
  const toneClasses =
    tone === 'error' ? 'border-rose-300/40 bg-rose-500/15' : 'border-white/15 bg-white/10'

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex w-full flex-col items-center gap-3 rounded-3xl border p-8 text-center backdrop-blur-md ${toneClasses}`}
    >
      {icon}
      <p className="text-xl font-bold">{title}</p>
      {message && <p className="max-w-md text-sky-100">{message}</p>}
      {action}
    </div>
  )
}

export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-300"
    />
  )
}
