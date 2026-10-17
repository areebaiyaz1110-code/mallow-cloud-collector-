import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import CloudSvg from './CloudSvg'

const GOAL = 7
const RAINBOW = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#7c83fd', '#c58af9']

export default function SecretCloud() {
  const [count, setCount] = useState(0)
  const [found, setFound] = useState(false)
  const [wobble, setWobble] = useState(0)

  const poke = () => {
    if (found) return
    const next = count + 1
    setCount(next)
    setWobble((w) => w + 1)
    if (next >= GOAL) {
      setFound(true)
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors: RAINBOW,
        disableForReducedMotion: true,
      })
    }
  }

  const close = () => {
    setFound(false)
    setCount(0)
  }

  useEffect(() => {
    if (!found) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [found])

  return (
    <>
      <button type="button" className="secret-cloud" onClick={poke} aria-label="A small, shy cloud">
        <span key={wobble} className={`secret-inner ${wobble ? 'wobble' : ''}`}>
          <CloudSvg />
        </span>
      </button>

      {found && (
        <div className="rainbow-overlay" role="dialog" aria-modal="true" aria-labelledby="rainbow-msg" onClick={close}>
          <div className="rainbow-card" onClick={(e) => e.stopPropagation()}>
            <div className="rainbow" aria-hidden="true">
              {RAINBOW.map((c, i) => (
                <span key={c} className="arc" style={{ '--c': c, '--i': i }} />
              ))}
            </div>
            <p id="rainbow-msg" className="rainbow-msg">You found a dream Mallow forgot!</p>
            <button type="button" className="btn btn-primary" onClick={close} autoFocus>
              Tuck it back in the sky
            </button>
          </div>
        </div>
      )}
    </>
  )
}
