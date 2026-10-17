import { BedDouble, CloudRain, Sparkles } from 'lucide-react'
import CloudPillowFactory from './projects/CloudPillowFactory'
import RainySoundMachine from './projects/RainySoundMachine'
import DreamForecastStation from './projects/DreamForecastStation'

function ProjectCard({ icon: Icon, number, title, tagline, children }) {
  return (
    <article className="card project-card">
      <header className="card-head">
        <span className="card-icon" aria-hidden="true">
          <Icon size={22} />
        </span>
        <div>
          <p className="card-kicker">Creation {number}</p>
          <h3>{title}</h3>
        </div>
      </header>
      <p className="card-tagline">{tagline}</p>
      {children}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <div className="section-head">
        <p className="eyebrow">What Mallow makes</p>
        <h2 id="projects-title">Three little creations</h2>
        <p className="lead">Every one of these started as a forgotten dream inside a cloud. Go on — poke them.</p>
      </div>

      <div className="project-grid">
        <ProjectCard
          icon={BedDouble}
          number="1"
          title="Cloud Pillow Factory"
          tagline="Turns fluffy clouds into pillows filled with happy dreams."
        >
          <CloudPillowFactory />
        </ProjectCard>

        <ProjectCard
          icon={CloudRain}
          number="2"
          title="Rainy-Day Sound Machine"
          tagline="Gentle rainy-day sounds, made fresh in your browser."
        >
          <RainySoundMachine />
        </ProjectCard>

        <ProjectCard
          icon={Sparkles}
          number="3"
          title="Dream Forecast Station"
          tagline="Playful, completely made-up forecasts for your dreams."
        >
          <DreamForecastStation />
        </ProjectCard>
      </div>
    </section>
  )
}
