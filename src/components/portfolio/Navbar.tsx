import { Link } from '@tanstack/react-router'
import Container from './Container'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030304]/80 backdrop-blur-lg border-b border-white/5">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="font-heading font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#FFD600]"
          >
            GRARIZKI
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-mono text-xs text-[#94A3B8] hover:text-[#F7931A] tracking-widest uppercase transition-colors duration-200 hidden sm:block"
            >
              Home
            </Link>
            <Link
              to="/work"
              className="font-mono text-xs text-[#94A3B8] hover:text-[#F7931A] tracking-widest uppercase transition-colors duration-200 hidden sm:block"
            >
              Work
            </Link>
            <Link
              to="/about"
              className="font-mono text-xs text-[#94A3B8] hover:text-[#F7931A] tracking-widest uppercase transition-colors duration-200 hidden sm:block"
            >
              About
            </Link>
            <a
              href="mailto:raka.grarizki@gmail.com"
              className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white px-5 py-2 rounded-full shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] hover:scale-105 transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
    </nav>
  )
}
