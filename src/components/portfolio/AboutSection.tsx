import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Astro',
  'Tanstack',
  'Tailwind CSS',
  'Zustand',
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
    
    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="scroll-mt-24 relative z-10" ref={sectionRef}>
      <div className="mt-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-black dark:text-white">
          About Me
        </h1>
        <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
          Problem Solver
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mx-auto max-w-screen-lg mt-12">
        <div className="animate-on-scroll bg-white/5 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
            Who I Am
          </h3>
          <p className="text-black dark:text-gray-300 leading-relaxed mb-6">
            Hi! I&apos;m a <strong>Frontend Engineer</strong> based in Jakarta, Indonesia,
            obsessed with building
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> type-safe, high-performance applications</span>. I specialize in the <strong>React ecosystem</strong>, leveraging
            powerful tools to create robust, scalable, and seamless user
            experiences.
          </p>

          <h4 className="text-lg font-semibold text-black dark:text-white mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-xs font-mono text-emerald-800 dark:text-emerald-200 bg-emerald-400/20 dark:bg-emerald-500/10 backdrop-blur-md border border-emerald-400/20 dark:border-emerald-500/20 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a 
              href="mailto:raka.grarizki@gmail.com" 
              className="bg-black text-white hover:bg-emerald-600 dark:bg-white dark:text-black dark:hover:bg-emerald-500 dark:hover:text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              Contact Me
            </a>
            <a 
              href="https://www.linkedin.com/in/grarizki" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-black text-black hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50 dark:border-white dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/10 font-bold py-2 px-6 rounded-full transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="animate-on-scroll h-full flex flex-col justify-between gap-6">
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
            <h4 className="text-4xl font-bold text-black dark:text-white mb-1">3+</h4>
            <p className="text-gray-900 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold">
              Years of Experience
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:to-teal-600/20 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20">
            <h4 className="text-4xl font-bold text-black dark:text-white mb-1">20%</h4>
            <p className="text-gray-900 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold">
              Engagement Increase
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 dark:from-orange-600/20 dark:to-red-600/20 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20">
            <h4 className="text-4xl font-bold text-black dark:text-white mb-1">40%</h4>
            <p className="text-gray-900 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold">
              Performance Boost
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
