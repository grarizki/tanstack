import { HeadContent, Scripts, Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '../components/portfolio/Navbar'
import Footer from '../components/portfolio/Footer'
import ThreeDitherBackground from '../components/portfolio/ThreeDitherBackground'
import { ThemeProvider } from '../lib/theme'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Grarizki - Portfolio',
      },
      {
        name: 'description',
        content: 'Grarizki\'s portfolio showcasing web development skills using React, TypeScript, and modern frontend technologies.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap',
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    // Only register scroll animations when the user has no motion preference (issue #1)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  return <RootDocument />
}

function RootDocument() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="text-white bg-[#030304]">
        {/* Skip link — keyboard users jump straight to content (issue #4) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:rounded-full"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ThreeDitherBackground />
          <Navbar />
          <main id="main-content" className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
