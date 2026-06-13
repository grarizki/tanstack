import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseScrollRevealOptions {
	/** CSS selector for elements to animate. Default: ".animate-on-scroll" */
	selector?: string;
	/** Start trigger position. Default: "top 85%" */
	start?: string;
	/** ScrollTrigger toggle actions. Default: "play none none reverse" */
	toggleActions?: string;
	/** Animation duration in seconds. Default: 1 */
	duration?: number;
	/** GSAP ease. Default: "power3.out" */
	ease?: string;
}

/**
 * Shared GSAP scroll-reveal hook.
 * Eliminates duplicated animation logic across sections.
 *
 * Usage:
 * ```tsx
 * const sectionRef = useScrollReveal()
 * return <section ref={sectionRef}>...</section>
 * ```
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
	const {
		selector = ".animate-on-scroll",
		start = "top 85%",
		toggleActions = "play none none reverse",
		duration = 1,
		ease = "power3.out",
	} = options;

	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = sectionRef.current;
		if (!container) return;

		const elements = container.querySelectorAll(selector);

		const ctx = gsap.context(() => {
			elements.forEach((element) => {
				gsap.to(element, {
					opacity: 1,
					y: 0,
					duration,
					ease,
					scrollTrigger: {
						trigger: element,
						start,
						toggleActions,
					},
				});
			});
		}, container);

		return () => ctx.revert();
	}, [selector, start, toggleActions, duration, ease]);

	return sectionRef;
}
