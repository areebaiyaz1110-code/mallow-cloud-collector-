import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles } from 'lucide-react'

const DREAMS = [
  { text: 'A staircase made of lemon cake', color: '#ffe9a8' },
  { text: 'Flying over a sleepy blue sea', color: '#bfe2ff' },
  { text: 'A teapot that hums lullabies', color: '#e4d6fa' },
  { text: 'A hug from a very tall giraffe', color: '#ffd9e6' },
  { text: 'Dancing with fireflies at dusk', color: '#d5f0d9' },
  { text: 'A library where books float', color: '#fde2c8' },
  { text: 'Skipping across a moonlit puddle', color: '#cfe3ff' },
  { text: 'A picnic on a drifting island', color: '#f6dcf7' },
]

const CONFETTI_COLORS = ['#bfe2ff', '#d9ccf5', '#fff6e0', '#ffd86b', '#ffd9e6']

export default function CloudPillowFactory() {
  const [stage, setStage] = useState('idle') // idle | fluffing | done
  const [current, setCurrent] = useState(null)
  const [shelf, setShelf] = useState([])
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const makePillow = () => {
    if (stage === 'fluffing') return
    setStage('fluffing')
    setCurrent(null)
    timer.current = setTimeout(() => {
      const dream = DREAMS[Math.floor(Math.random() * DREAMS.length)]
      setCurrent(dream)
      setShelf((s) => [dream, ...s].slice(0, 6))
      setStage('done')
      confetti({
        particleCount: 55,
        spread: 70,
        startVelocity: 28,
        origin: { y: 0.65 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      })
    }, 1500)
  }

  const label =
    stage === 'fluffing' ? 'Fluffing…' : stage === 'done' ? 'Make another pillow' : 'Collect & fluff a cloud'

  return (
    <div className="factory">
      <div className="factory-stage" data-stage={stage}>
        {stage !== 'done' && (
          <div className="cloud-blob" aria-hidden="true">
            {stage === 'fluffing' && (
              <>
                <Sparkles className="spark spark-1" size={18} />
                <Sparkles className="spark spark-2" size={14} />
                <Sparkles className="spark spark-3" size={16} />
              </>
            )}
          </div>
        )}
        {stage === 'done' && current && (
          <div className="pillow" style={{ background: current.color }}>
            <span>{current.text}</span>
          </div>
        )}
      </div>

      <p className="factory-note" aria-live="polite">
        {stage === 'idle' && 'A fluffy cloud is waiting on the conveyor belt.'}
        {stage === 'fluffing' && 'Mallow is gently fluffing…'}
        {stage === 'done' && current && `Out comes a pillow stuffed with: ${current.text.toLowerCase()}.`}
      </p>

      <button type="button" className="btn btn-primary" onClick={makePillow} disabled={stage === 'fluffing'}>
        {label}
      </button>

      <div className="shelf" aria-label="Pillows made so far">
        {shelf.length === 0 && <span className="shelf-empty">Your pillow shelf is empty.</span>}
        {shelf.map((d, i) => (
          <span key={`${d.text}-${i}`} className="mini-pillow" style={{ background: d.color }} title={d.text} />
        ))}
      </div>
    </div>
  )
}
