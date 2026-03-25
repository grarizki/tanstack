import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../components/portfolio/Container'
import Navbar from '../components/portfolio/Navbar'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
})

function NotFoundPage() {
  const numRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      numRef.current,
      { opacity: 0, scale: 0.6, y: -40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    gsap.to(numRef.current, {
      y: -12,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: 'sine.inOut',
      delay: 0.8,
    })
  }, [])

  return (
    <>
      <Navbar />
      <Container>
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <div ref={numRef}>
            <span className="text-[10rem] md:text-[14rem] font-black leading-none select-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500">
              404
            </span>
          </div>

          <div ref={contentRef} className="mt-4 space-y-4 max-w-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
              Lost in the void
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              This page doesn&apos;t exist — or maybe it never did.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors"
              >
                Go Home
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-black dark:text-white font-semibold hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
