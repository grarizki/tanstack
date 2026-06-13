import { useScrollReveal } from "../../hooks/useScrollReveal";

const projects = [
	{
		title: "BFI Finance Website",
		description:
			"Redesigned the company website with a modern, mobile-first approach. Improved user engagement by 20% and reduced page load time by 40%.",
		tags: ["React", "TypeScript", "Tailwind CSS"],
		href: "https://www.bfi.co.id",
		period: "2023",
	},
	{
		title: "Stoxlyz",
		description:
			"Built a data-intensive internal tool for monitoring business metrics, featuring real-time updates and complex data visualisations.",
		tags: ["React", "Zustand", "Recharts"],
		href: "https://stoxlyz.com",
		period: "2022",
	},
	{
		title: "Customer Portal",
		description:
			"Developed a self-service portal for customers to manage loan applications and documents, reducing support tickets by 30%.",
		tags: ["Next.js", "TypeScript", "REST API"],
		href: "https://github.com/grarizki/intermittenApp",
		period: "2022",
	},
];

export default function ProjectsSection() {
	const sectionRef = useScrollReveal();

	return (
		<section
			id="projects"
			className="scroll-mt-24 relative z-10 py-24"
			ref={sectionRef}
		>
			{/* Section header */}
			<div className="animate-on-scroll text-center mb-16">
				<p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-3">
					Projects
				</p>
				<h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
					Selected Work
				</h2>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
				{projects.map((project) => (
					<a
						key={project.title}
						href={project.href}
						className="animate-on-scroll group relative bg-[#0F1115] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transition-transform transition-shadow duration-300"
					>
						{/* Corner accents */}
						<span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
						<span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

						<div className="flex items-start justify-between gap-3">
							<h3 className="font-heading font-semibold text-lg text-white leading-snug">
								{project.title}
							</h3>
							<span className="font-mono text-xs text-emerald-500 border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0">
								{project.period}
							</span>
						</div>

						<p className="font-body text-[#94A3B8] text-sm leading-relaxed flex-1">
							{project.description}
						</p>

						<div className="flex flex-wrap gap-2 mt-auto">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="font-mono text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg"
								>
									{tag}
								</span>
							))}
						</div>

						{/* Arrow indicator */}
						<svg
							className="absolute top-6 right-6 w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/80 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M3 8H13M13 8L9 4M13 8L9 12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</a>
				))}
			</div>
		</section>
	);
}
