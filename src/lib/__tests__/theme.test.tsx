import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../theme'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
const matchMediaMock = vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))
Object.defineProperty(window, 'matchMedia', { value: matchMediaMock })

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
  })

  it('provides default light theme', () => {
    localStorageMock.getItem.mockReturnValue(null)
    matchMediaMock.mockReturnValue({ matches: false })
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('toggles theme when button is clicked', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    const button = screen.getByText('Toggle')
    fireEvent.click(button)
    
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('adds dark class to html element in dark mode', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from html element in light mode', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
