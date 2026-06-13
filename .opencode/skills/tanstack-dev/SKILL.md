---
name: tanstack-dev
description: TanStack Start full-stack development conventions. Use when writing routes, server functions, React Query hooks, Prisma queries, or any TanStack-specific code in this project. Covers file-router patterns, SSR data loading, type-safe routing, and testing with Vitest.
---

# TanStack Start Development

## File-Based Routing (TanStack Router)

Routes live in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts` — never edit it manually.

```
src/routes/
  __root.tsx       # Root layout (theme provider, navbar, footer, GSAP init)
  index.tsx        # Homepage (/)
  about.tsx        # About page (/about)
  work.tsx         # Work page (/work)
  contact.tsx      # Contact page (/contact)
  404.tsx          # Not found page
  blog/
    index.tsx      # Blog index (/blog)
    $slug.tsx      # Blog post (/blog/:slug) — dynamic segment
```

### Route conventions

```tsx
// Static route: src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About</div>
}
```

```tsx
// Dynamic route: src/routes/blog/$slug.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  loader: async ({ params }) => {
    // Server-side data loading
    return { slug: params.slug }
  },
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  })
  // ...
}
```

### Root layout (`__root.tsx`)
- Wraps all routes with theme provider, GSAP ScrollTrigger init, navbar, footer
- Use `createRootRoute` with `component` and optional `notFoundComponent`

## React Query (TanStack Query v5)

Query client is configured in `src/lib/queryClient.ts`. Import when needed for invalidation or prefetching.

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Data fetching — always extract queryFn to a service
const { data, isLoading, error } = useQuery({
  queryKey: ['items', id],
  queryFn: () => fetchItem(id),
})

// Mutations
const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
})
```

### Patterns
- Extract `queryFn` to `src/services/` — never inline API calls
- Use `queryKey` factories for consistency when the same key is used in multiple places
- Handle loading, error, and empty states explicitly in components

## React Store (TanStack Store v0.7)

For client-side state that isn't server data (theme, UI state, form drafts).

```tsx
import { Store } from '@tanstack/react-store'

const counterStore = new Store({ count: 0 })

function useCounter() {
  return counterStore.useStore((s) => s.count)
}
```

## Prisma ORM

Schema in `prisma/schema.prisma`. Regenerate client after schema changes: `npx prisma generate`.

```ts
import { prisma } from '@/lib/prisma' // create this if not exists

// Always in services/, never in components:
export async function fetchPosts() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
    return { data: posts, error: null, isError: false }
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Unknown error', isError: true }
  }
}
```

## Tailwind CSS v4

- Configured via `@tailwindcss/vite` plugin in `vite.config.ts`
- v4 uses CSS-based config in `src/styles.css` (no `tailwind.config.js`)
- Use `@apply` for component classes, `@theme` for design tokens

## Vitest + Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName prop={value} />)
    expect(screen.getByText('expected text')).toBeDefined()
  })

  it('handles user interaction', async () => {
    render(<ComponentName />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('result')).toBeDefined()
  })
})
```

### Testing hooks

```tsx
import { renderHook, act } from '@testing-library/react'
import { useFeatureX } from '../hooks/useFeatureX'

describe('useFeatureX', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useFeatureX('id'))
    expect(result.current.loading).toBe(true)
  })
})
```

### Mocking patterns
- Mock services with `vi.mock('@/services/...')` 
- Mock `@tanstack/react-router` with `vi.mock('@tanstack/react-router')` when testing components that use router hooks
- Mock `matchMedia` and `localStorage` for theme tests (see `src/lib/__tests__/theme.test.tsx`)

## Biome

- Formatter: tab indentation, double quotes
- Linter: recommended rules
- Config in `biome.json` at project root
- routeTree.gen.ts is excluded from formatting
- VS Code: Biome as default formatter with organize imports on save

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm test          # Run all tests (vitest run)
pnpm lint          # Biome lint
pnpm format        # Biome format
pnpm check         # Biome check (format + lint)
```

## File Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Services: `camelCaseService.ts`
- Utilities: `camelCase.ts`
- Tests: `SameName.test.tsx` or `SameName.test.ts`
- Types: `types.ts` in the same feature folder
