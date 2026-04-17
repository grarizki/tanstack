import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaReact, FaGithub, FaFigma, FaDatabase } from 'react-icons/fa'
import { FaJs } from 'react-icons/fa6'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const tools = [
  { Icon: FaReact, label: 'React', href: 'https://react.dev/' },
  { Icon: FaJs, label: 'TypeScript', href: 'https://www.typescriptlang.org/' },
  { Icon: FaFigma, label: 'Figma', href: 'https://www.figma.com/' },
  { Icon: FaDatabase, label: 'Redis', href: 'https://redis.io/' },
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/grarizki' },
]

export default function Logos() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="py-16 border-y border-white/5">
      <p className="font-mono text-xs text-[#94A3B8] tracking-widest uppercase text-center mb-10">
        Tools &amp; Technologies
      </p>
      <div className="flex gap-8 md:gap-16 items-center justify-center flex-wrap">
        {tools.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="group flex flex-col items-center gap-3"
          >
            <div className="bg-[#EA580C]/10 border border-[#EA580C]/30 rounded-xl p-4 text-[#F7931A] group-hover:border-[#F7931A]/60 group-hover:bg-[#EA580C]/20 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-300">
              <Icon className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <span className="font-mono text-xs text-[#94A3B8] tracking-wider group-hover:text-[#F7931A] transition-colors duration-200">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
