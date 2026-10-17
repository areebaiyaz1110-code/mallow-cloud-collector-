import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          Made with <Heart size={14} aria-label="love" className="heart" /> softness, curiosity and a
          little bit of cloud.
        </p>
        <p className="tiny">
          Mallow is an original character created for the Baby&rsquo;s First Website hackathon.
        </p>
      </div>
    </footer>
  )
}
