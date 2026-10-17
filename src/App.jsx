import { useEffect, useState } from 'react'
import SkyBackground from './components/SkyBackground'
import ThemeToggle from './components/ThemeToggle'
import Hero from './components/Hero'
import Projects from './components/Projects'
import OriginStory from './components/OriginStory'
import Footer from './components/Footer'
import { Cloud } from 'lucide-react'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('mallow-theme')
    if (saved === 'day' || saved === 'night') return saved
  } catch {
    /* storage unavailable — fall back to day */
  }
  return 'day'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'night' ? '#1b1946' : '#bfe2ff')
    try {
      localStorage.setItem('mallow-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'day' ? 'night' : 'day'))

  return (
    <>
      <SkyBackground />
      <a className="skip-link" href="#projects">Skip to projects</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Mallow — home">
            <Cloud size={22} aria-hidden="true" />
            <span>Mallow</span>
          </a>
          <nav className="nav" aria-label="Main">
            <a href="#projects">Creations</a>
            <a href="#story">Story</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main id="top">
        <Hero />
        <Projects />
        <OriginStory />
      </main>

      <Footer />
    </>
  )
}
