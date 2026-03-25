import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../../../routeTree.gen'
import Navbar from '../Navbar'

// Mock the theme hook
const mockToggleTheme = vi.fn()
const mockUseTheme = vi.fn(() => ({
  theme: 'light',
  toggleTheme: mockToggleTheme,
}))

vi.mock('../../lib/theme.tsx', () => ({
  useTheme: () => mockUseTheme(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Navbar', () => {
  it('renders logo link', () => {
    render(
      <RouterProvider router={createRouter({ routeTree })}>
        <Navbar />
      </RouterProvider>
    )
    
    expect(screen.getByText('Grarizki')).toBeInTheDocument()
  })

  it('has theme toggle button', () => {
    render(
      <RouterProvider router={createRouter({ routeTree })}>
        <Navbar />
      </RouterProvider>
    )
    
    const toggleButton = screen.getByLabelText('Toggle Dark Mode')
    expect(toggleButton).toBeInTheDocument()
  })

  it('calls toggleTheme when button is clicked', () => {
    render(
      <RouterProvider router={createRouter({ routeTree })}>
        <Navbar />
      </RouterProvider>
    )
    
    const toggleButton = screen.getByLabelText('Toggle Dark Mode')
    fireEvent.click(toggleButton)
    
    expect(mockToggleTheme).toHaveBeenCalled()
  })
})
