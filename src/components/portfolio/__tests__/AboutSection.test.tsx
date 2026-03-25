import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../AboutSection'

describe('AboutSection', () => {
  it('renders section title', () => {
    render(<AboutSection />)
    
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders "Problem Solver" subtitle', () => {
    render(<AboutSection />)
    
    expect(screen.getByText('Problem Solver')).toBeInTheDocument()
  })

  it('renders "Who I Am" heading', () => {
    render(<AboutSection />)
    
    expect(screen.getByText('Who I Am')).toBeInTheDocument()
  })

  it('renders "Tech Stack" heading', () => {
    render(<AboutSection />)
    
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
  })

  it('renders tech stack items', () => {
    render(<AboutSection />)
    
    const techStack = ['React', 'Next.js', 'TypeScript', 'Astro', 'Tailwind CSS', 'Zustand']
    techStack.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('renders stats', () => {
    render(<AboutSection />)
    
    expect(screen.getByText('3+')).toBeInTheDocument()
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
    expect(screen.getByText('20%')).toBeInTheDocument()
    expect(screen.getByText('Engagement Increase')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByText('Performance Boost')).toBeInTheDocument()
  })

  it('has Contact Me button', () => {
    render(<AboutSection />)
    
    const contactButton = screen.getByText('Contact Me')
    expect(contactButton).toBeInTheDocument()
    expect(contactButton.closest('a')).toHaveAttribute('href', 'mailto:raka.grarizki@gmail.com')
  })

  it('has LinkedIn button', () => {
    render(<AboutSection />)
    
    const linkedinButton = screen.getByText('LinkedIn')
    expect(linkedinButton).toBeInTheDocument()
    expect(linkedinButton.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/grarizki')
  })

  it('has correct section id', () => {
    const { container } = render(<AboutSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'about')
  })
})
