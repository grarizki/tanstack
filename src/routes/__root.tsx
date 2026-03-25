import { HeadContent, Scripts, Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from '../lib/theme.tsx'
import Navbar from '../components/portfolio/Navbar'
import Footer from '../components/portfolio/Footer'
import ThreeDitherBackground from '../components/portfolio/ThreeDitherBackground'

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
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@100..900&display=swap',
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

  return (
    <ThemeProvider>
      <RootDocument />
    </ThemeProvider>
  )
}

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="text-black dark:text-white bg-white dark:bg-black transition-colors duration-300">
        <ThreeDitherBackground />
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
