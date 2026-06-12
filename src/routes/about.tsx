import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../components/portfolio/Container'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const profile = [
  { label: 'Role', value: 'Frontend Engineer' },
  { label: 'Base', value: 'Jakarta, Indonesia' },
  { label: 'Focus', value: 'React Ecosystem' },
]

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Astro',
  'TanStack',
  'Tailwind CSS',
  'Zustand',
]

const interests = [
  {
    index: '01',
    title: 'Football Manager',
    detail: 'Dragging Brighton to European glory, one painstaking save at a time.',
  },
  {
    index: '02',
    title: 'Music & Film',
    detail: 'Happy to talk for hours about a favorite album or an underrated movie.',
  },
  {
    index: '03',
    title: 'Side Projects',
    detail: 'Personal builds where I test new tools without a deadline. Lately: an Astro portfolio and a wedding invitation site.',
  },
]

const links = [
  {
    label: 'Email',
    href: 'mailto:raka.grarizki@gmail.com',
    primary: true,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/grarizki',
    primary: false,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/grarizki',
    primary: false,
    external: true,
  },
]

function AboutPage() {
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
              / about
            </p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white">
              I build{' '}
              <span className="text-emerald-500">type-safe</span>, fast web
              applications.
            </h1>
            <p className="font-body text-lg text-[#94A3B8] leading-relaxed mt-6 max-w-[60ch]">
              I&apos;m a software engineer based in Jakarta, Indonesia. I turn
              complex requirements into interfaces that feel quick and
              effortless, working in{' '}
              <span className="text-white font-medium">React</span> and{' '}
              <span className="text-white font-medium">TypeScript</span> with the
              modern frontend stack.
            </p>
          </div>

          {/* Profile spec card */}
          <div className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300">
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

            <p className="font-mono text-[11px] text-[#64748B] tracking-widest uppercase mb-5">
              Profile
            </p>
            <dl className="divide-y divide-white/5">
              {profile.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between py-3 gap-4"
                >
                  <dt className="font-mono text-[11px] text-[#64748B] tracking-widest uppercase">
                    {label}
                  </dt>
                  <dd className="font-body text-sm text-white text-right">
                    {value}
                  </dd>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="font-mono text-[11px] text-[#64748B] tracking-widest uppercase">
                  Status
                </dt>
                <dd className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-body text-sm text-emerald-400">
                    Open to remote
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Story ───────────────────────────────────────────── */}
        <section className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 mt-28 md:mt-32">
          <h2 className="animate-on-scroll font-mono text-xs text-emerald-500 tracking-widest uppercase md:pt-2">
            The story
          </h2>
          <div className="animate-on-scroll space-y-6 max-w-[65ch]">
            <p className="font-body text-lg text-[#94A3B8] leading-relaxed">
              Right now I work with{' '}
              <span className="text-white font-medium">Pimcore and React</span> to
              ship robust solutions, partnering closely with business analysts and
              end users so the product fits how people actually work. I care about
              type safety, performance, and the small interaction details that
              make software feel considered.
            </p>
            <p className="font-body text-lg text-[#94A3B8] leading-relaxed">
              My goal is to work remotely while living abroad, picking up new
              cultures and perspectives along the way. I learn fastest by
              building, so there is usually a personal project open in another
              tab.
            </p>
          </div>
        </section>

        {/* ── Tech stack ──────────────────────────────────────── */}
        <section className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 mt-28 md:mt-32">
          <h2 className="animate-on-scroll font-mono text-xs text-emerald-500 tracking-widest uppercase md:pt-2">
            Toolkit
          </h2>
          <div className="animate-on-scroll flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── Beyond the code ─────────────────────────────────── */}
        <section className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 mt-28 md:mt-32">
          <h2 className="animate-on-scroll font-mono text-xs text-emerald-500 tracking-widest uppercase md:pt-2">
            Off the clock
          </h2>
          <div className="animate-on-scroll divide-y divide-white/5 border-t border-white/5">
            {interests.map(({ index, title, detail }) => (
              <div
                key={index}
                className="group grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-6 transition-colors duration-200"
              >
                <span className="font-mono text-sm text-[#475569] group-hover:text-emerald-500 transition-colors duration-200 pt-0.5">
                  {index}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-white mb-1">
                    {title}
                  </h3>
                  <p className="font-body text-[#94A3B8] leading-relaxed max-w-[55ch]">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Connect ─────────────────────────────────────────── */}
        <section className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8 md:p-12 mt-28 md:mt-32 overflow-hidden">
          <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-emerald-500/60" />
          <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-emerald-500/60" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
                Let&apos;s build something.
              </h2>
              <p className="font-body text-[#94A3B8] mt-2 max-w-[45ch]">
                Open to remote roles and collaborations. The fastest way to reach
                me is email.
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
