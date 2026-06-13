import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock TanStack Router Link to avoid SSR context requirements
vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		children,
		className,
	}: {
		to: string;
		children: React.ReactNode;
		className?: string;
	}) => (
		<a href={to} className={className}>
			{children}
		</a>
	),
}));

import Navbar from "../Navbar";

describe("Navbar", () => {
	it("renders logo link", () => {
		render(<Navbar />);
		expect(screen.getByText("GRARIZKI")).toBeInTheDocument();
	});

	it("renders navigation links", () => {
		render(<Navbar />);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Work")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
	});

	it("renders contact button", () => {
		render(<Navbar />);
		const buttons = screen.getAllByText("Contact");
		expect(buttons.length).toBeGreaterThanOrEqual(1);
	});
});
