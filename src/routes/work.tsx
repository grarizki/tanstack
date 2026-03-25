import { createFileRoute } from '@tanstack/react-router'
import Container from '../components/portfolio/Container'
import Sectionhead from '../components/portfolio/Sectionhead'

export const Route = createFileRoute('/work')({
  component: WorkPage,
})

function WorkPage() {
  return (
    <Container>
      <Sectionhead>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-black dark:text-white">
          Work Experience
        </h1>
      </Sectionhead>

      <div className="grid lg:grid-cols-1 md:grid-rows-2 gap-10 mx-auto max-w-screen-lg my-12 relative z-10">
        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-8 m-4 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-400 group-hover:to-black dark:group-hover:to-white transition-all">
              Frontend Engineer, PT. BFI Finance Indonesia
            </h3>
            <span className="text-blue-700 dark:text-blue-400 text-sm font-mono border border-blue-400/30 px-2 py-1 rounded">
              Nov 2022 — Present
            </span>
          </div>
          <p className="text-gray-900 dark:text-gray-400 mb-4 text-sm uppercase tracking-wider">
            BSD, Indonesia
          </p>
          <ul className="list-disc ml-5 text-gray-900 dark:text-gray-300 space-y-2">
            <li>
              <strong className="text-black dark:text-white">UI Redesign:</strong>{' '}
              Redesigned company website&apos;s user interface to align with modern
              UX standards, improving navigation and interactivity. This
              initiative led to a 20% increase in user engagement and a 15%
              rise in conversion rates.
            </li>
            <li>
              <strong className="text-black dark:text-white">Mobile-First:</strong>{' '}
              Developed and implemented a fully responsive, mobile-first
              design, optimizing layouts and interactions for seamless mobile
              experience, increasing mobile traffic surged by 25%.
            </li>
            <li>
              <strong className="text-black dark:text-white">Performance:</strong>{' '}
              Collaborated with backend engineers to streamline website
              performance, optimizing assets, API calls, and caching
              strategies. These improvements led to a 40% reduction in page
              loading.
            </li>
          </ul>
        </div>

        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-8 m-4 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-400 group-hover:to-black dark:group-hover:to-white transition-all">
              Frontend Developer, PT. Nusa Data Hexamatika
            </h3>
            <span className="text-blue-700 dark:text-blue-400 text-sm font-mono border border-blue-400/30 px-2 py-1 rounded">
              Dec 2021 — Nov 2022
            </span>
          </div>
          <p className="text-gray-900 dark:text-gray-400 mb-4 text-sm uppercase tracking-wider">
            North Jakarta, Indonesia
          </p>
          <ul className="list-disc ml-5 text-gray-900 dark:text-gray-300 space-y-2">
            <li>
              <strong className="text-black dark:text-white">User-Centric Solutions:</strong>{' '}
              Engaged with users and customers to gather feedback and identify
              pain points, then translated insights into actionable solutions.
              This initiative led to improved user satisfaction and adoption
              rates.
            </li>
            <li>
              <strong className="text-black dark:text-white">Quality & Performance:</strong>{' '}
              Led efforts to maintain, optimize, and troubleshoot website
              functionality, collaborating with backend developers to resolve
              issues and enhance performance. Ensured high quality standards
              and brand consistency.
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
