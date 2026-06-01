import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../components/portfolio/Container'
import { workExperience } from '../data/work'

export const Route = createFileRoute('/work')({
  component: WorkPage,
})

const links = [
  { label: 'Email', href: 'mailto:raka.grarizki@gmail.com', primary: true, external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/grarizki', primary: false, external: true },
  { label: 'GitHub', href: 'https://github.com/grarizki', primary: false, external: true },
]

function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const elements = rootRef.current.querySelectorAll('.animate-on-scroll')

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
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-16" ref={rootRef}>
      <Container className="py-20 md:py-28">
        {/* ── Intro: asymmetric split ─────────────────────────── */}
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="animate-on-scroll">
            <p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-5">
              / work
            </p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white">
              Shipping production frontends since{' '}
              <span className="text-emerald-500">2021</span>.
            </h1>
            <p className="font-body text-lg text-[#94A3B8] leading-relaxed mt-6 max-w-[60ch]">
              Across fintech and software consulting, I focus on redesigning
              interfaces, going mobile-first, and squeezing out performance. Work
              that moved real engagement, conversion, and load-time numbers.
            </p>
          </div>

          {/* Currently card */}
          <div className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300">
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

            <p className="font-mono text-[11px] text-[#64748B] tracking-widest uppercase mb-4">
              Currently
            </p>
            <h2 className="font-heading font-semibold text-xl text-white">
              Frontend Engineer
            </h2>
            <p className="font-body text-sm text-[#94A3B8] mt-1">
              PT. BFI Finance Indonesia
            </p>
            <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-body text-sm text-emerald-400">
                Open to remote
              </span>
            </div>
          </div>
        </section>

        {/* ── Experience: left-rail timeline ──────────────────── */}
        <section className="mt-28 md:mt-32">
          <h2 className="animate-on-scroll font-mono text-xs text-emerald-500 tracking-widest uppercase mb-10">
            Experience
          </h2>

          <div className="relative">
            {/* Vertical gradient line */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500 via-emerald-600/40 to-transparent" />

            <div className="flex flex-col gap-10 md:gap-12">
              {workExperience.map((work) => (
                <div
                  key={work.company}
                  className="animate-on-scroll relative pl-10 md:pl-14"
                >
                  {/* Timeline node */}
                  <span className="absolute left-0 top-7 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#030304] shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

                  <div className="group relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300">
                    <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
                    <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">
                          {work.title}
                        </h3>
                        <p className="font-body text-white/80 text-sm mt-1">
                          {work.company}
                        </p>
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
                          <span
                            className="text-emerald-500 mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            &#9656;
                          </span>
                          <span className="text-[#94A3B8] leading-relaxed">
                            <strong className="text-white font-semibold">
                              {item.label}:{' '}
                            </strong>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Connect ─────────────────────────────────────────── */}
        <section className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 md:p-12 mt-28 md:mt-32 overflow-hidden">
          <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-emerald-500/60" />
          <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-emerald-500/60" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
                Looking for a frontend engineer?
              </h2>
              <p className="font-body text-[#94A3B8] mt-2 max-w-[45ch]">
                I&apos;m open to remote roles and collaborations. Let&apos;s talk
                about what you&apos;re building.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              {links.map(({ label, href, primary, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={
                    primary
                      ? 'font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-full shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-[0.98] transition-all duration-300'
                      : 'font-mono text-xs font-bold uppercase tracking-widest border-2 border-white/20 text-white px-6 py-3 rounded-full hover:border-white hover:bg-white/10 active:scale-[0.98] transition-all duration-300'
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
