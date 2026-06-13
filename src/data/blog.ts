export interface BlogPost {
	slug: string;
	draft: boolean;
	title: string;
	snippet: string;
	content: string;
	image: {
		src: string;
		alt: string;
	};
	publishDate: string;
	author: string;
	category: string;
	tags: string[];
}

export const blogPosts: BlogPost[] = [
	{
		slug: "andrej-karpathy-ai-vision",
		draft: false,
		title:
			"Andrej Karpathy's Vision for AI: Agents, Software 3.0, and Vibe Coding",
		snippet:
			"Explore Andrej Karpathy's latest insights on AI agents, the shift to Software 3.0, and why he believes 'vibe coding' is the future.",
		content: `Andrej Karpathy, a prominent figure in AI research and founder of Eureka Labs, has shared several key perspectives on artificial intelligence in late 2024 and 2025, emphasizing a grounded and often contrarian view amidst much of the industry's hype. His insights span the development of AI agents, the evolution of software, the limitations of current AI training methods, and the importance of data quality.

## AI Agents: A Decade Project

One of Karpathy's most frequently cited views is his skepticism regarding the immediate arrival of fully autonomous AI agents. He contends that AI agents are a "decade project" rather than a 2025 breakthrough. He argues that current AI models lack crucial infrastructure, such as reliable memory, robust multi-modal understanding, and the ability to act continuously in the real world, to become true "coworker-level" agents. He sees agent development as a long engineering marathon, not a sprint.

## Software 3.0: LLMs as the New OS

Karpathy has also articulated a vision of "Software 3.0," where large language models (LLMs) function as new operating systems. In this paradigm:

- **Prompts** are the "command line".
- **Context Window** acts as RAM.
- **Tokens** are akin to electricity, with users paying for what they use.

He suggests that the focus is shifting from writing traditional code (Software 1.0) and neural net weights (Software 2.0) to natural language interfaces. He likens LLMs to "brilliant but bizarre savants" that possess vast knowledge but can hallucinate, have short-term memory issues, and are gullible.

## Vibe Coding

In February 2025, Karpathy coined the term "vibe coding" to describe how AI tools enable hobbyists to create applications and websites primarily through prompts. This democratization of coding allows users to focus on the "vibe" or high-level intent of the application, while the AI handles the implementation details.

## The "Iron Man Suit"

Karpathy advocates for building "Iron Man suits"—AI tools that augment humans rather than fully replacing them, allowing humans to stay in the loop and adjust AI autonomy. He believes that the internet is full of "garbage" data, and training models on clean, curated data could lead to very intelligent cognitive cores even with fewer parameters.`,
		image: {
			src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "AI Vision",
		},
		publishDate: "2025-11-22",
		author: "Raka Grarizki",
		category: "Artificial Intelligence",
		tags: ["ai", "future", "software 3.0", "agents"],
	},
	{
		slug: "future-web-development-2025",
		draft: false,
		title: "The Future of Web Development: 2025 Trends",
		snippet:
			"Discover the top trends shaping the future of web development in 2025, from AI-driven coding to WebAssembly.",
		content: `Web development is evolving rapidly. In 2025, we are seeing a massive shift towards AI-assisted development, edge computing, and new frameworks that prioritize performance and developer experience.

## Key Trends

1. **AI-Assisted Coding**: Tools like GitHub Copilot and Cursor are becoming essential for developers, dramatically increasing productivity.

2. **Edge Computing**: Moving computation closer to users for better performance.

3. **WebAssembly**: Enabling high-performance applications in the browser.

4. **Server Components**: React Server Components and similar patterns are changing how we build applications.

5. **Type Safety**: Full-stack type safety is becoming the standard expectation.`,
		image: {
			src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "Web Development Trends",
		},
		publishDate: "2025-01-15",
		author: "Raka Grarizki",
		category: "Technology",
		tags: ["webdev", "trends", "2025"],
	},
	{
		slug: "mastering-typescript-2025",
		draft: false,
		title: "Mastering TypeScript in 2025",
		snippet:
			"A comprehensive guide to mastering TypeScript's latest features and best practices for scalable applications.",
		content: `TypeScript continues to dominate the frontend landscape. Here's how to stay ahead with the latest features and patterns.

## What's New in TypeScript 5.x

- **Improved type inference**: Better automatic type detection
- **Decorator metadata**: Enhanced metadata API for decorators
- **Performance improvements**: Faster compilation times
- **Better error messages**: More helpful diagnostics

## Best Practices

1. Use strict mode
2. Leverage type inference when possible
3. Avoid any types
4. Use discriminated unions for complex state
5. Implement proper error handling with types`,
		image: {
			src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "TypeScript Code",
		},
		publishDate: "2025-02-10",
		author: "Raka Grarizki",
		category: "Programming",
		tags: ["typescript", "coding", "guide"],
	},
	{
		slug: "why-astro-best-portfolio",
		draft: false,
		title: "Why Astro is the Best Choice for Your Portfolio",
		snippet:
			"Learn why Astro's island architecture makes it the perfect framework for building high-performance portfolios.",
		content: `Astro has revolutionized how we build static sites. Its performance benefits are undeniable, making it an excellent choice for portfolios.

## Why Astro?

1. **Zero JavaScript by Default**: Ships only the JS you need
2. **Island Architecture**: Hydrate only interactive components
3. **Framework Agnostic**: Use React, Vue, Svelte, or vanilla JS
4. **Content Collections**: Type-safe content management
5. **Excellent DX**: Great developer experience

## Performance Benefits

Astro sites consistently achieve perfect lighthouse scores due to minimal JavaScript and optimal resource loading.`,
		image: {
			src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "Astro Framework",
		},
		publishDate: "2025-03-05",
		author: "Raka Grarizki",
		category: "Frameworks",
		tags: ["astro", "portfolio", "performance"],
	},
	{
		slug: "designing-accessibility-guide",
		draft: true,
		title: "Designing for Accessibility: A Developer's Guide",
		snippet:
			"Essential tips and tools for ensuring your web applications are accessible to everyone.",
		content: `Accessibility is not just a feature; it's a necessity. Here is how you can improve your applications for all users.

## Key Principles

1. **Semantic HTML**: Use proper HTML elements
2. **Keyboard Navigation**: Ensure full keyboard accessibility
3. **ARIA Labels**: Provide context for screen readers
4. **Color Contrast**: Meet WCAG guidelines
5. **Focus Management**: Handle focus properly in interactive elements`,
		image: {
			src: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "Accessibility",
		},
		publishDate: "2025-04-20",
		author: "Raka Grarizki",
		category: "Design",
		tags: ["a11y", "design", "inclusive"],
	},
	{
		slug: "rise-serverless-computing",
		draft: false,
		title: "The Rise of Serverless Computing",
		snippet:
			"Understanding the benefits and challenges of adopting a serverless architecture for your next project.",
		content: `Serverless computing is changing the way we deploy applications. Is it right for you?

## Benefits

1. **Cost Efficiency**: Pay only for what you use
2. **Scalability**: Automatic scaling based on demand
3. **Reduced Ops**: No server management needed
4. **Faster Time to Market**: Focus on code, not infrastructure

## Challenges

1. **Cold Starts**: Initial latency for infrequently used functions
2. **Vendor Lock-in**: Tied to specific cloud providers
3. **Debugging**: More complex debugging process
4. **Timeouts**: Limited execution duration`,
		image: {
			src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			alt: "Serverless Architecture",
		},
		publishDate: "2025-05-12",
		author: "Raka Grarizki",
		category: "Cloud",
		tags: ["serverless", "cloud", "architecture"],
	},
];

export const getPublishedPosts = () =>
	blogPosts
		.filter((p) => !p.draft && new Date(p.publishDate) < new Date())
		.sort(
			(a, b) =>
				new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
		);

export const getPostBySlug = (slug: string) =>
	blogPosts.find((p) => p.slug === slug && !p.draft);
