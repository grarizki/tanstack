import { createFileRoute } from '@tanstack/react-router'
import Container from '../components/portfolio/Container'
import Sectionhead from '../components/portfolio/Sectionhead'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <Container>
      <Sectionhead>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-stone-800 dark:text-amber-50">
          About
        </h1>
        <p className="text-lg mt-4 text-stone-500 dark:text-amber-300 max-w-3xl mx-auto">
          👋 Hi there! I&apos;m a passionate frontend engineer and React developer
          based in Jakarta, Indonesia. With a strong background in software
          development, I&apos;m skilled in building seamless and dynamic web
          applications using React, TypeScript, and modern frontend technologies.
          <br />
          <br />
          Currently, I&apos;m working with Pimcore and React to deliver robust
          solutions, collaborating closely with business analysts and end users to
          ensure their needs are met. Beyond coding, I&apos;m an avid gamer and a huge
          fan of music and movies—I can talk for hours about my favorite titles!
          <br />
          <br />
          My dream is to work remotely while living abroad, embracing new cultures
          and experiences along the way. When I&apos;m not coding or leveling up my
          skills, you&apos;ll probably find me managing Brighton to glory in Football
          Manager or working on personal web projects, like my Astro portfolio and
          a wedding invitation website. Let&apos;s connect and build something awesome
          together! 🚀
        </p>
      </Sectionhead>

      <div className="grid md:grid-cols-3 gap-10 mx-auto pl-6 mt-8">
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/grarizki"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              LinkedIn
            </button>
          </a>
          <a
            href="mailto:raka.grarizki@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Mail
            </button>
          </a>
          <a
            href="https://github.com/grarizki"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition">
              GitHub
            </button>
          </a>
        </div>
      </div>
    </Container>
  )
}
