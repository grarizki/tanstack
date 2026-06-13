import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the useScrollReveal hook to avoid GSAP/React conflicts in jsdom
vi.mock("../../../hooks/useScrollReveal", () => ({
	useScrollReveal: () => ({ current: null }),
}));

import AboutSection from "../AboutSection";

describe("AboutSection", () => {
	it("renders section title", () => {
		render(<AboutSection />);
		expect(screen.getByText("About Me")).toBeInTheDocument();
	});

	it("renders section eyebrow", () => {
		render(<AboutSection />);
		expect(screen.getByText("Background")).toBeInTheDocument();
	});

	it('renders "Who Am I" heading', () => {
		render(<AboutSection />);
		expect(screen.getByText("Who Am I")).toBeInTheDocument();
	});

	it('renders "Tech Stack" heading', () => {
		render(<AboutSection />);
		expect(screen.getByText("Tech Stack")).toBeInTheDocument();
	});

	it("renders tech stack items", () => {
		render(<AboutSection />);
		const techStack = [
			"React",
			"Next.js",
			"TypeScript",
			"Astro",
			"TanStack",
			"Tailwind CSS",
			"Zustand",
		];
		techStack.forEach((tech) => {
			expect(screen.getByText(tech)).toBeInTheDocument();
		});
	});

	it("renders updated stats", () => {
		render(<AboutSection />);
		expect(screen.getByText("5+")).toBeInTheDocument();
		expect(screen.getByText("Years Building Web")).toBeInTheDocument();
		expect(screen.getByText("2021")).toBeInTheDocument();
		expect(screen.getByText("Since")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("Organizations Shipped")).toBeInTheDocument();
	});

	it("has Contact Me button", () => {
		render(<AboutSection />);
		const contactButton = screen.getByText("Contact Me");
		expect(contactButton).toBeInTheDocument();
		expect(contactButton.closest("a")).toHaveAttribute(
			"href",
			"mailto:raka.grarizki@gmail.com",
		);
	});

	it("has LinkedIn button", () => {
		render(<AboutSection />);
		const linkedinButton = screen.getByText("LinkedIn");
		expect(linkedinButton).toBeInTheDocument();
		expect(linkedinButton.closest("a")).toHaveAttribute(
			"href",
			"https://www.linkedin.com/in/grarizki",
		);
	});

	it("has correct section id", () => {
		const { container } = render(<AboutSection />);
		const section = container.querySelector("section");
		expect(section).toHaveAttribute("id", "about");
	});
});
