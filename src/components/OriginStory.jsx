import { useEffect, useRef, useState } from 'react'
import SecretCloud from './SecretCloud'

const CHAPTERS = [
  {
    icon: '☁️',
    title: 'A very small cloud',
    text: 'Mallow was born smaller than a sneeze, drifting a little behind all the big, confident clouds. Too shy to say hello, too curious to go home.',
  },
  {
    icon: '🎵',
    title: 'The sleepy cloud',
    text: 'One quiet evening Mallow brushed against an old, sleepy cloud and heard something faint inside: a lullaby nobody remembered how to sing.',
  },
  {
    icon: '💭',
    title: 'Dreams nobody remembered',
    text: 'Mallow learned that every morning, dreams slip out of sleepy heads and float upward, where they hide inside clouds. Forgotten, but never gone.',
  },
  {
    icon: '🧺',
    title: 'Collecting, gently',
    text: 'So Mallow began to collect clouds, one at a time, whispering hello to each. Not to keep them, but to carefully unwrap the dreams tucked inside.',
  },
  {
    icon: '🌈',
    title: 'Made for you',
    text: 'Pillows full of happy dreams. Rain to fall asleep to. Forecasts for the night ahead. Mallow still gets shy, but now there is always something to share.',
  },
]

function Chapter({ chapter, index }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <li ref={ref} className={`chapter ${seen ? 'is-visible' : ''}`}>
      <span className="chapter-marker" aria-hidden="true">{chapter.icon}</span>
      <div className="chapter-body">
        <p className="card-kicker">Chapter {index + 1}</p>
        <h3>{chapter.title}</h3>
        <p>{chapter.text}</p>
      </div>
    </li>
  )
}

export default function OriginStory() {
  const sectionRef = useRef(null)

  // Fill the glowing thread down the page as the visitor scrolls.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight * 0.65 - rect.top) / rect.height
      el.style.setProperty('--progress', String(Math.min(1, Math.max(0, progress))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="story" className="section container story-section" aria-labelledby="story-title">
      <div className="section-head">
        <p className="eyebrow">How it all began</p>
        <h2 id="story-title">Mallow&rsquo;s origin story</h2>
      </div>

      <div className="story" ref={sectionRef}>
        <div className="thread" aria-hidden="true">
          <div className="thread-fill" />
        </div>
        <ol className="chapters">
          {CHAPTERS.map((c, i) => (
            <Chapter key={c.title} chapter={c} index={i} />
          ))}
        </ol>
        <SecretCloud />
      </div>
    </section>
  )
}
