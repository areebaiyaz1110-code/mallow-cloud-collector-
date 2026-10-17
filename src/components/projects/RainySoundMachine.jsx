import { useMemo } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import useRainSound from '../../hooks/useRainSound'

export default function RainySoundMachine() {
  const { supported, playing, toggle, volume, setVolume, intensity, setIntensity } = useRainSound()

  const drops = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: (i * 0.37) % 2,
        dur: 0.7 + ((i * 13) % 10) / 12,
      })),
    []
  )
  const visible = Math.round(8 + intensity * 28)

  return (
    <div className="rain">
      <div className="rain-box" data-playing={playing} aria-hidden="true">
        <div className="rain-cloud" />
        {drops.slice(0, visible).map((d) => (
          <span
            key={d.id}
            className="drop"
            style={{
              left: `${d.left}%`,
              animationDelay: `-${d.delay}s`,
              animationDuration: `${d.dur}s`,
            }}
          />
        ))}
      </div>

      {!supported && <p className="factory-note">Sorry — this browser can&rsquo;t play generated sound.</p>}

      <button
        type="button"
        className="btn btn-primary"
        onClick={toggle}
        disabled={!supported}
        aria-pressed={playing}
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        {playing ? 'Pause the rain' : 'Start the rain'}
      </button>

      <div className="sliders">
        <label>
          <span className="slider-label">
            <Volume2 size={16} aria-hidden="true" /> Volume
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
        <label>
          <span className="slider-label">Drizzle ↔ Downpour</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
          />
        </label>
      </div>
      <p className="tiny">Sound is generated live in your browser and only starts when you press play.</p>
    </div>
  )
}
