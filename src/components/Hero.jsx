import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import MallowCharacter from './MallowCharacter'

const LINES = [
  'Oh! H-hi… I didn’t see you there.',
  'I collect clouds. Is that… okay?',
  'Every cloud hides a dream somebody forgot.',
  '*hides behind tiny hands*',
  'Would you like to see what I made?',
]

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">☁️ A baby cloud with a big imagination</p>
        <h1 id="hero-title">
          Hi, I&rsquo;m <span className="gradient-text">Mallow</span>.
        </h1>
        <p className="lead">
          I&rsquo;m a very small, very shy cloud. I drift around the sky collecting other clouds,
          because tucked inside each one is a dream somebody forgot. I turn those dreams into
          gentle little things for you to play with.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">Meet my creations</a>
          <a className="btn btn-ghost" href="#story">Hear my story</a>
        </div>
        <a className="scroll-hint" href="#projects" aria-label="Scroll to projects">
          <ChevronDown size={20} aria-hidden="true" />
          <span>float down</span>
        </a>
      </div>

      <div className="hero-stage">
        <p className="bubble" aria-live="polite" key={lineIndex}>
          {LINES[lineIndex]}
        </p>
        <button
          type="button"
          className="mallow-btn"
          onClick={() => setLineIndex((i) => (i + 1) % LINES.length)}
          aria-label="Say hello to Mallow"
        >
          <MallowCharacter size={300} />
        </button>
        <p className="hint">psst — Mallow likes to be tapped</p>
      </div>
    </section>
  )
}
