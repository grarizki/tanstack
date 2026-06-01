import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { workExperience as works } from '../../data/work'

export default function WorkSection() {
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
    <section id="work" className="scroll-mt-24 relative z-10 py-24" ref={sectionRef}>
      {/* Section header */}
      <div className="animate-on-scroll text-center mb-16">
        <p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-3">
          Experience
        </p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
          Work History
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-screen-lg mx-auto">
        {/* Vertical gradient line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-600/50 to-transparent hidden md:block" />

        <div className="flex flex-col gap-12">
          {works.map((work, idx) => (
            <div
              key={work.company}
              className={`animate-on-scroll relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Node on timeline */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#030304] shadow-[0_0_12px_rgba(16,185,129,0.8)] hidden md:block" />

              {/* Spacer for other side */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="md:w-1/2 group">
                <div className="relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer">
                  {/* Corner accents */}
                  <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">
                        {work.title}
                      </h3>
                      <p className="font-body text-white/80 text-sm mt-1">{work.company}</p>
                    </div>
                    <span className="font-mono text-xs text-emerald-500 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 rounded-lg whitespace-nowrap">
                      {work.period}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[#94A3B8] tracking-wider uppercase mb-5">
                    {work.location}
                  </p>

                  <ul className="space-y-3">
                    {work.highlights.map((item) => (
                      <li key={item.label} className="flex gap-3 text-sm">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">▸</span>
                        <span className="text-[#94A3B8] leading-relaxed">
                          <strong className="text-white font-semibold">{item.label}: </strong>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
