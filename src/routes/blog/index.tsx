import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublishedPosts } from "../../data/blog";
import Container from "../../components/portfolio/Container";

export const Route = createFileRoute("/blog/")({
	component: BlogIndexPage,
	loader: () => getPublishedPosts(),
});

function BlogIndexPage() {
	const posts = Route.useLoaderData();

	return (
		<Container>
			<div className="text-center max-w-3xl mx-auto mt-16 mb-16">
				<p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-3">
					Writing
				</p>
				<h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
					Blog
				</h1>
				<p className="font-body text-lg text-[#94A3B8] mt-4">
					Thoughts on web development, TypeScript, and building better software.
				</p>
			</div>

			<main>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
					{posts.map((post, index) => (
						<li key={post.slug}>
							<Link to="/blog/$slug" params={{ slug: post.slug }}>
								<div className="group relative flex flex-col h-full bg-[#0F1115] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300">
									<span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60 z-10" />
									<span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60 z-10" />

									<div className="relative aspect-video overflow-hidden">
										<img
											src={post.image.src}
											alt={post.image.alt}
											loading={index <= 2 ? "eager" : "lazy"}
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
									<div className="p-6 flex flex-col flex-grow">
										<span className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-2">
											{post.category}
										</span>

										<h2 className="font-heading font-semibold text-lg text-white leading-snug mb-3 line-clamp-2">
											{post.title}
										</h2>

										<p className="font-body text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
											{post.snippet}
										</p>

										<div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
											<span className="font-mono text-xs text-[#64748B]">
												{post.author}
											</span>
											<time
												className="font-mono text-xs text-[#64748B]"
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
	);
}
