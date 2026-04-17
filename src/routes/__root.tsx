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
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // Initialize animations
      const initAnimations = () => {
        const elements = document.querySelectorAll('.animate-on-scroll')
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
      }

      initAnimations()
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
        <ThemeProvider>
          <ThreeDitherBackground />
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
