import type { ReactNode } from 'react'

interface SectionheadProps {
  children: ReactNode
}

export default function Sectionhead({ children }: SectionheadProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mt-16">
      {children}
    </div>
  )
}
