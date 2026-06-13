import { Code2, Database, Figma, Github, Globe } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const tools = [
	{ Icon: Globe, label: "React", href: "https://react.dev/" },
	{ Icon: Code2, label: "TypeScript", href: "https://www.typescriptlang.org/" },
	{ Icon: Figma, label: "Figma", href: "https://www.figma.com/" },
	{ Icon: Database, label: "Redis", href: "https://redis.io/" },
	{ Icon: Github, label: "GitHub", href: "https://github.com/grarizki" },
];

export default function Logos() {
	const containerRef = useScrollReveal({
		selector: "&",
	});

	return (
		<div
			ref={containerRef}
			className="animate-on-scroll py-16 border-y border-white/5"
		>
			<p className="font-mono text-xs text-slate-400 tracking-widest uppercase text-center mb-10">
				Tools &amp; Technologies
			</p>
			<div className="flex gap-8 md:gap-16 items-center justify-center flex-wrap">
				{tools.map(({ Icon, label, href }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={label}
						title={label}
						className="group flex flex-col items-center gap-3"
					>
						<div className="bg-emerald-600/10 border border-emerald-600/30 rounded-xl p-4 text-emerald-500 group-hover:border-emerald-500/60 group-hover:bg-emerald-600/20 group-hover:shadow-[0_0_20px_rgba(5,150,105,0.3)] transition-all duration-300">
							<Icon className="w-7 h-7 md:w-8 md:h-8" />
						</div>
						<span className="font-mono text-sm text-slate-300 tracking-wide group-hover:text-emerald-400 transition-colors duration-200">
							{label}
						</span>
					</a>
				))}
			</div>
		</div>
	);
}
