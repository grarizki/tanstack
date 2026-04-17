import { createFileRoute, Link } from '@tanstack/react-router'
import { getPublishedPosts } from '../../data/blog'
import Container from '../../components/portfolio/Container'
import Sectionhead from '../../components/portfolio/Sectionhead'

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
  loader: () => getPublishedPosts(),
})

function BlogIndexPage() {
  const posts = Route.useLoaderData()

  return (
    <Container>
      <Sectionhead>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-stone-800 dark:text-amber-50">
          Our Blog
        </h1>
        <p className="text-lg mt-4 text-stone-500 dark:text-amber-300">
          We write about building startups and thoughts going on our mind.
        </p>
      </Sectionhead>

      <main className="mt-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link to="/blog/$slug" params={{ slug: post.slug }}>
                <div className="flex flex-col h-full bg-amber-50/80 dark:bg-white/5 rounded-2xl overflow-hidden shadow-lg border border-stone-300 dark:border-white/10 hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image.src}
                      alt={post.image.alt}
                      loading={index <= 2 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-blue-400 uppercase tracking-wider text-sm font-medium mb-2">
                      {post.category}
                    </span>

                    <h2 className="text-2xl font-bold leading-snug tracking-tight mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-stone-500 dark:text-amber-300 mb-4 line-clamp-3 flex-grow">
                      {post.snippet}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                      <span className="text-stone-400 text-sm">
                        {post.author}
                      </span>
                      <time
                        className="text-stone-400 text-sm"
                        dateTime={post.publishDate}
                      >
                        {new Date(post.publishDate).toDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  )
}
