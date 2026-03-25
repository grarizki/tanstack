import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Building Modern Web Experiences/i)).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Crafting digital masterpieces/i)).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { container } = render(<Hero />)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main?.className).toContain('grid')
    expect(main?.className).toContain('lg:grid-cols-1')
  })

  it('heading has animate-on-scroll class', () => {
    const { container } = render(<Hero />)
    
    const heading = container.querySelector('h1')
    expect(heading?.className).toContain('animate-on-scroll')
  })
})
