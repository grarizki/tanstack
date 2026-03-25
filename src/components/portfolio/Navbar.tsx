import { Link } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../lib/theme'
import Container from './Container'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Container>
      <header className="grid grid-cols-3 items-center my-8">
        <div></div>

        <div className="text-center">
          <Link
            to="/"
            className="text-2xl font-bold text-black dark:text-white hover:text-emerald-500 transition"
          >
            Grarizki
          </Link>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-black dark:text-white hover:text-emerald-500 transition focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>
    </Container>
  )
}
