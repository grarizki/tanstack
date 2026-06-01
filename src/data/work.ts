export interface WorkHighlight {
  label: string
  text: string
}

export interface WorkExperience {
  title: string
  company: string
  period: string
  location: string
  highlights: WorkHighlight[]
}

export const workExperience: WorkExperience[] = [
  {
    title: 'Frontend Engineer',
    company: 'PT. BFI Finance Indonesia',
    period: 'Nov 2022 — Present',
    location: 'BSD, Indonesia',
    highlights: [
      {
        label: 'UI Redesign',
        text: "Redesigned the company website's user interface to align with modern UX standards, improving navigation and interactivity. Led to a 20% increase in user engagement and 15% rise in conversion rates.",
      },
      {
        label: 'Mobile-First',
        text: 'Developed and implemented a fully responsive, mobile-first design, optimizing layouts and interactions for a seamless mobile experience, increasing mobile traffic by 25%.',
      },
      {
        label: 'Performance',
        text: 'Collaborated with backend engineers to streamline website performance, optimizing assets, API calls, and caching strategies, leading to a 40% reduction in page loading time.',
      },
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'PT. Nusa Data Hexamatika',
    period: 'Dec 2021 — Nov 2022',
    location: 'North Jakarta, Indonesia',
    highlights: [
      {
        label: 'User-Centric Solutions',
        text: 'Engaged with users and customers to gather feedback and identify pain points, then translated insights into actionable solutions. Improved user satisfaction and adoption rates.',
      },
      {
        label: 'Quality & Performance',
        text: 'Led efforts to maintain, optimize, and troubleshoot website functionality, collaborating with backend developers to resolve issues, enhance performance, and ensure brand consistency.',
      },
    ],
  },
]
