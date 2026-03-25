import Container from './Container'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="my-20">
      <Container>
        <p className="text-center text-sm text-slate-500">
          . Copyright © {currentYear} .
          <a
            href="https://grarizki.com"
            target="_blank"
            rel="noopener"
            className="hover:underline mx-1"
          >
            Grarizki
          </a>
          . All rights reserved .
        </p>
      </Container>
    </footer>
  )
}
