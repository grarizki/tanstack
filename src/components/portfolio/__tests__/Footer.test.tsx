import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
	it("renders copyright text with current year", () => {
		render(<Footer />);

		const currentYear = new Date().getFullYear();
		expect(
			screen.getByText(new RegExp(currentYear.toString())),
		).toBeInTheDocument();
	});

	it("renders GRARIZKI name", () => {
		render(<Footer />);

		expect(screen.getByText("GRARIZKI")).toBeInTheDocument();
	});

	it("has link to grarizki.com", () => {
		render(<Footer />);

		const link = screen.getByText("grarizki.com");
		expect(link).toHaveAttribute("href", "https://grarizki.com");
		expect(link).toHaveAttribute("target", "_blank");
	});

	it('renders "All rights reserved" text', () => {
		render(<Footer />);

		expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
	});
});
