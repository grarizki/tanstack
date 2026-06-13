import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getPostBySlug } from "../../data/blog";
import Container from "../../components/portfolio/Container";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
	component: BlogPostPage,
	loader: ({ params }) => {
		const post = getPostBySlug(params.slug);
		if (!post) {
			throw notFound();
		}
		return post;
	},
});

function BlogPostPage() {
	const post = Route.useLoaderData();

	return (
		<Container>
			<article className="max-w-3xl mx-auto mt-8">
				<Link
					to="/blog"
					className="inline-flex items-center text-stone-500 dark:text-amber-300 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Blog
				</Link>

				<img
					src={post.image.src}
					alt={post.image.alt}
					className="w-full aspect-video object-cover rounded-2xl mb-8"
				/>

				<span className="text-blue-400 uppercase tracking-wider text-sm font-medium">
					{post.category}
				</span>

				<h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-stone-800 dark:text-amber-50 mt-2 mb-4">
					{post.title}
				</h1>

				<div className="flex items-center gap-4 text-stone-400 text-sm mb-8">
					<span>{post.author}</span>
					<span>•</span>
					<time dateTime={post.publishDate}>
						{new Date(post.publishDate).toDateString()}
					</time>
				</div>

				<div className="prose dark:prose-invert max-w-none">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeHighlight]}
					>
						{post.content}
					</ReactMarkdown>
				</div>

				<div className="mt-8 pt-8 border-t border-stone-300 dark:border-white/10">
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 text-xs font-mono text-stone-500 dark:text-amber-300 bg-stone-200 dark:bg-white/5 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</article>
		</Container>
	);
}
