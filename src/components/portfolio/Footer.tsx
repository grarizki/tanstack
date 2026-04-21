import Container from './Container'

// Static year avoids SSR/client hydration mismatch (issue #8)
const YEAR = 2025

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300 tracking-wider">
            GRARIZKI
          </span>
          <p className="font-mono text-xs text-[#94A3B8] tracking-wider">
            © {YEAR}{' '}
            <a
              href="https://grarizki.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors duration-200"
            >
              grarizki.com
            </a>
            {' '}— All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
