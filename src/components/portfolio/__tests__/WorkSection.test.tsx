import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the useScrollReveal hook to avoid GSAP/React conflicts in jsdom
vi.mock("../../../hooks/useScrollReveal", () => ({
	useScrollReveal: () => ({ current: null }),
}));

import WorkSection from "../WorkSection";

describe("WorkSection", () => {
	it("renders section title", () => {
		render(<WorkSection />);
		expect(screen.getByText("Work History")).toBeInTheDocument();
	});

	it("renders BFI Finance job", () => {
		render(<WorkSection />);
		expect(screen.getByText(/PT. BFI Finance Indonesia/i)).toBeInTheDocument();
	});

	it("renders job highlights", () => {
		render(<WorkSection />);
		expect(
			screen.getByText((content) => content.includes("UI Redesign")),
		).toBeInTheDocument();
		expect(
			screen.getByText((content) => content.includes("Mobile-First")),
		).toBeInTheDocument();
		// "Performance" appears in two highlight labels; use getAllByText
		const perfMatches = screen.getAllByText((content) =>
			content.includes("Performance"),
		);
		expect(perfMatches.length).toBeGreaterThanOrEqual(2);
	});

	it("has correct section id", () => {
		const { container } = render(<WorkSection />);
		const section = container.querySelector("section");
		expect(section).toHaveAttribute("id", "work");
	});
});
