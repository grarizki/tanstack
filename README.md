# grarizki.dev

Personal portfolio and blog of **Raka Grarizki** — Frontend Engineer based in Jakarta, Indonesia.

## Stack

| | |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) — full-stack React with SSR |
| Routing | [TanStack Router](https://tanstack.com/router) — file-based, type-safe |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [GSAP](https://gsap.com/) + ScrollTrigger |
| 3D | [Three.js](https://threejs.org/) — dithered TorusKnot background |
| Language | TypeScript |
| Linting | [Biome](https://biomejs.dev/) |
| Testing | [Vitest](https://vitest.dev/) + Testing Library |

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

```bash
pnpm build      # production build
pnpm serve      # preview production build
pnpm test       # run tests
pnpm check      # lint + format (Biome)
```

## Project Structure

```
src/
├── routes/                 # File-based routes (TanStack Router)
│   ├── __root.tsx          # Root layout with theme provider
│   ├── index.tsx           # Homepage
│   ├── about.tsx
│   ├── work.tsx
│   ├── contact.tsx
│   └── blog/
│       ├── index.tsx       # Blog listing
│       └── $slug.tsx       # Blog post detail
├── components/
│   └── portfolio/          # All portfolio UI components
│       ├── Hero.tsx
│       ├── Logos.tsx        # Tech stack logos
│       ├── WorkSection.tsx
│       ├── AboutSection.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── ThreeDitherBackground.tsx
├── data/
│   └── blog.ts             # Blog posts (Markdown content + metadata)
└── lib/
    └── theme.ts            # Dark/light theme context
```

## Blog Posts

Add posts to `src/data/blog.ts`:

```typescript
{
  slug: 'my-post',
  draft: false,
  title: 'My Post',
  snippet: 'Brief description',
  content: `# Markdown content...`,
  image: { src: '...', alt: '...' },
  publishDate: '2026-01-01',
  author: 'Raka Grarizki',
  category: 'Engineering',
  tags: ['react', 'typescript'],
}
```

## Contact

- Email: raka.grarizki@gmail.com
- LinkedIn: [linkedin.com/in/grarizki](https://www.linkedin.com/in/grarizki)
- GitHub: [github.com/grarizki](https://github.com/grarizki)
