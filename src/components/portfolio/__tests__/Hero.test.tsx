import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
	it("renders the main heading", () => {
		render(<Hero />);
		expect(screen.getByText(/Building Modern/i)).toBeInTheDocument();
		expect(screen.getByText(/Web Experiences/i)).toBeInTheDocument();
		expect(screen.getByText(/with Precision/i)).toBeInTheDocument();
	});
	it("renders the subheading", () => {
		render(<Hero />);

		expect(
			screen.getByText(/Software Engineer based in Jakarta/i),
		).toBeInTheDocument();
		expect(screen.getByText(/8\+ languages/i)).toBeInTheDocument();
	});

	it("renders CTA buttons", () => {
		render(<Hero />);
		expect(screen.getByText("Get In Touch")).toBeInTheDocument();
		expect(screen.getByText("View Work")).toBeInTheDocument();
	});

	it("renders the availability badge", () => {
		render(<Hero />);
		expect(screen.getByText("Available for work")).toBeInTheDocument();
	});
});
