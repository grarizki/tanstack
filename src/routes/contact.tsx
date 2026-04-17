import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'
import Container from '../components/portfolio/Container'
import Sectionhead from '../components/portfolio/Sectionhead'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Netlify will handle the form submission
    setSubmitted(true)
  }

  return (
    <Container>
      <Sectionhead>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-stone-800 dark:text-amber-50">
          Contact
        </h1>
        <p className="text-lg mt-4 text-stone-500 dark:text-amber-300">
          We are here to help.
        </p>
      </Sectionhead>

      <div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
        <div>
          <h2 className="font-medium text-2xl text-stone-700 dark:text-amber-100">
            Contact Me!
          </h2>
          <p className="text-lg leading-relaxed text-stone-500 mt-3">
            Have something to say? We are here to help. Fill up the form or send
            email or call phone.
          </p>
          <div className="mt-5 space-y-3">
            <div className="flex items-center space-x-2 text-stone-500 dark:text-amber-300">
              <MapPin className="text-stone-400 w-4 h-4" />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-500 dark:text-amber-300">
              <Mail className="text-stone-400 w-4 h-4" />
              <a href="mailto:raka.grarizki@gmail.com" className="hover:underline">
                raka.grarizki@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2 text-stone-500 dark:text-amber-300">
              <Phone className="text-stone-400 w-4 h-4" />
              <a href="tel:+6281224183361" className="hover:underline">
                +62 812 2418 3361
              </a>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 px-4 py-3 rounded">
              Thank you for your message! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human:{' '}
                  <input name="bot-field" />
                </label>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-stone-600 dark:text-amber-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-stone-300 dark:border-gray-600 bg-amber-50/80 dark:bg-stone-800 text-stone-800 dark:text-amber-50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-600 dark:text-amber-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-stone-300 dark:border-gray-600 bg-amber-50/80 dark:bg-stone-800 text-stone-800 dark:text-amber-50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-600 dark:text-amber-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-stone-300 dark:border-gray-600 bg-amber-50/80 dark:bg-stone-800 text-stone-800 dark:text-amber-50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  )
}
