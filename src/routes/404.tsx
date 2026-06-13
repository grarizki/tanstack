import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "../components/portfolio/Container";

export const Route = createFileRoute("/404")({
	component: NotFoundPage,
});

function NotFoundPage() {
	const numRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			numRef.current,
			{ opacity: 0, scale: 0.6, y: -40 },
			{ opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
		).fromTo(
			contentRef.current,
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
			"-=0.3",
		);

		gsap.to(numRef.current, {
			y: -12,
			repeat: -1,
			yoyo: true,
			duration: 2.5,
			ease: "sine.inOut",
			delay: 0.8,
		});
	}, []);

	return (
		<Container>
			<div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
				<div ref={numRef}>
					<span className="text-[10rem] md:text-[14rem] font-black leading-none select-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500">
						404
					</span>
				</div>

				<div ref={contentRef} className="mt-4 space-y-4 max-w-lg">
					<h1 className="font-heading font-bold text-2xl md:text-3xl text-white">
						Lost in the void
					</h1>
					<p className="font-body text-[#94A3B8] text-base">
						This page doesn&apos;t exist — or maybe it never did.
					</p>
					<div className="flex gap-4 justify-center pt-4">
						<Link
							to="/"
							className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-full shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.6)] hover:scale-105 active:scale-[0.98] transition-all duration-300"
						>
							Go Home
						</Link>
						<button
							type="button"
							onClick={() => window.history.back()}
							className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-white/20 text-white px-6 py-3 rounded-full hover:border-white hover:bg-white/10 active:scale-[0.98] transition-all duration-300"
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
		</Container>
	);
}
