import { createFileRoute } from '@tanstack/react-router'
import Container from '../components/portfolio/Container'
import Hero from '../components/portfolio/Hero'
import Logos from '../components/portfolio/Logos'
import WorkSection from '../components/portfolio/WorkSection'
import AboutSection from '../components/portfolio/AboutSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Container>
      <div
        id="home"
        className="scroll-mt-24"
      >
        <Hero />
      </div>
      <Logos />
      <WorkSection />
      <AboutSection />
    </Container>
  )
}
