import { useMemo } from 'react'
import CloudSvg from './CloudSvg'

// Small seeded generator so the stars stay put between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const CLOUDS = [
  { top: '7%', w: 230, dur: 95, delay: -20, op: 0.9 },
  { top: '21%', w: 150, dur: 72, delay: -55, op: 0.75 },
  { top: '39%', w: 290, dur: 125, delay: -80, op: 0.85 },
  { top: '57%', w: 170, dur: 82, delay: -10, op: 0.7 },
  { top: '73%', w: 250, dur: 108, delay: -45, op: 0.8 },
  { top: '88%', w: 200, dur: 98, delay: -70, op: 0.6 },
]

export default function SkyBackground() {
  const stars = useMemo(() => {
    const rand = seeded(42)
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2.6,
      delay: rand() * 5,
      dur: 2.5 + rand() * 3.5,
    }))
  }, [])

  return (
    <div className="sky" aria-hidden="true">
      <div className="sun" />
      <div className="moon" />

      <div className="stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {CLOUDS.map((c, i) => (
        <CloudSvg
          key={i}
          className="sky-cloud"
          style={{
            top: c.top,
            width: c.w,
            opacity: c.op,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
