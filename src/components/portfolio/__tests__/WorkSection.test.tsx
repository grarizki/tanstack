import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkSection from '../WorkSection'

describe('WorkSection', () => {
  it('renders section title', () => {
    render(<WorkSection />)
    
    expect(screen.getByText('Work Experience')).toBeInTheDocument()
  })

  it('renders BFI Finance job', () => {
    render(<WorkSection />)
    
    expect(screen.getByText(/PT. BFI Finance Indonesia/i)).toBeInTheDocument()
    expect(screen.getByText('Nov 2022 — Present')).toBeInTheDocument()
  })

  it('renders Nusa Data Hexamatika job', () => {
    render(<WorkSection />)
    
    expect(screen.getByText(/PT. Nusa Data Hexamatika/i)).toBeInTheDocument()
    expect(screen.getByText('Dec 2021 — Nov 2022')).toBeInTheDocument()
  })

  it('renders job responsibilities', () => {
    render(<WorkSection />)
    
    expect(screen.getByText(/UI Redesign/i)).toBeInTheDocument()
    expect(screen.getByText(/Mobile-First/i)).toBeInTheDocument()
    expect(screen.getByText(/Performance/i)).toBeInTheDocument()
    expect(screen.getByText(/User-Centric Solutions/i)).toBeInTheDocument()
  })

  it('has correct section id', () => {
    const { container } = render(<WorkSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'work')
  })
})
