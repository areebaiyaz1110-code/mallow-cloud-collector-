import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isNight = theme === 'night'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={isNight}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <span className="theme-toggle-track" data-night={isNight}>
        <span className="theme-toggle-thumb">
          {isNight ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
        </span>
      </span>
      <span className="theme-toggle-label">{isNight ? 'Night' : 'Day'}</span>
    </button>
  )
}
