import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Astro',
  'TanStack',
  'Tailwind CSS',
  'Zustand',
]

const stats = [
  { value: '3+', label: 'Years of Experience' },
  { value: '20%', label: 'Engagement Increase' },
  { value: '40%', label: 'Performance Boost' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="scroll-mt-24 relative z-10 py-24" ref={sectionRef}>
      {/* Section header */}
      <div className="animate-on-scroll text-center mb-16">
        <p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-3">
          Background
        </p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
          About Me
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        {/* Bio card */}
        <div className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer">
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

          <h3 className="font-heading font-semibold text-xl text-white mb-4">Who Am I</h3>
          <p className="font-body text-[#94A3B8] leading-relaxed mb-6">
            Hi! I&apos;m a <strong className="text-white">Frontend Engineer</strong> based in Jakarta, Indonesia,
            obsessed with building{' '}
            <span className="text-emerald-500 font-semibold">type-safe, high-performance applications</span>. I specialize in the{' '}
            <strong className="text-white">React ecosystem</strong>, leveraging powerful tools to create robust,
            scalable, and seamless user experiences.
          </p>

          <h4 className="font-heading font-semibold text-sm text-white mb-3 tracking-wider uppercase">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:raka.grarizki@gmail.com"
              className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2.5 rounded-full shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/grarizki"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Stats column */}
        <div className="animate-on-scroll flex flex-col gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-[#0F1115] border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 flex items-center gap-6 cursor-pointer"
            >
              <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-emerald-300/50" />
              <h4 className="font-heading font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300 leading-none flex-shrink-0">
                {stat.value}
              </h4>
              <p className="font-mono text-xs text-[#94A3B8] tracking-wider uppercase leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
