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
    <div ref={containerRef} className="mt-24">
      <h2 className="text-center text-slate-900 dark:text-slate-200">
        Have been working using
      </h2>
      <div className="flex gap-8 md:gap-20 items-center justify-center my-10 flex-wrap">
        {tools.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12" size={48} />
          </a>
        ))}
      </div>
    </div>
  )
}
