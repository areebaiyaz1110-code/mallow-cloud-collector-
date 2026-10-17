import { useState } from 'react'
import { Cloud, CloudRain, Moon, Sparkles, Sun } from 'lucide-react'

const WHEN = ['Tonight', 'Nap time', 'Tomorrow']

const HEADLINES = [
  { text: 'Mostly sunny with a chance of flying', icon: Sun },
  { text: 'Scattered giggles clearing by morning', icon: Sparkles },
  { text: 'Gentle drizzle of lullabies', icon: CloudRain },
  { text: 'Fog of half-remembered songs lifting at dawn', icon: Cloud },
  { text: 'Pillow-fort pressure rising slowly', icon: Moon },
]

const READINGS = [
  'Flying dreams',
  'Giggle showers',
  'Cozy-blanket index',
  'Lost-sock mysteries',
  'Talking animals',
  'Cake clouds',
  'Starlight sprinkles',
]

const TIPS = [
  'Keep a pillow nearby for soft landings.',
  'Pack an extra smile; you’ll need it by midnight.',
  'Whisper your dream to someone before breakfast so it can’t float away.',
  'Leave a window open for passing lullabies.',
  'Wear your comfiest socks. The lost ones might return.',
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function makeForecast(when) {
  const labels = [...READINGS].sort(() => Math.random() - 0.5).slice(0, 4)
  return {
    when,
    headline: pick(HEADLINES),
    readings: labels.map((label) => ({ label, pct: 5 + Math.floor(Math.random() * 94) })),
    tip: pick(TIPS),
  }
}

export default function DreamForecastStation() {
  const [when, setWhen] = useState(WHEN[0])
  const [forecast, setForecast] = useState(null)
  const [count, setCount] = useState(0)

  const read = () => {
    setForecast(makeForecast(when))
    setCount((c) => c + 1)
  }

  const Icon = forecast?.headline.icon

  return (
    <div className="forecast">
      <div className="tabs" role="tablist" aria-label="Forecast for">
        {WHEN.map((w) => (
          <button
            key={w}
            type="button"
            role="tab"
            aria-selected={when === w}
            className={`tab ${when === w ? 'is-active' : ''}`}
            onClick={() => setWhen(w)}
          >
            {w}
          </button>
        ))}
      </div>

      <button type="button" className="btn btn-primary" onClick={read}>
        <Sparkles size={18} aria-hidden="true" /> Read the sky
      </button>

      <div className="forecast-card" aria-live="polite">
        {!forecast && <p className="factory-note">Press the button and Mallow will squint at the clouds.</p>}
        {forecast && (
          <div key={count} className="forecast-result">
            <p className="forecast-when">Dream forecast · {forecast.when}</p>
            <h4 className="forecast-headline">
              <Icon size={20} aria-hidden="true" /> {forecast.headline.text}
            </h4>
            <ul className="readings">
              {forecast.readings.map((r) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <span className="meter" aria-hidden="true">
                    <span style={{ width: `${r.pct}%` }} />
                  </span>
                  <span className="pct">{r.pct}%</span>
                </li>
              ))}
            </ul>
            <p className="forecast-tip">💡 {forecast.tip}</p>
          </div>
        )}
      </div>
      <p className="tiny">100% imaginary — no real weather or science involved.</p>
    </div>
  )
}
