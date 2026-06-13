import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Container from "../Container";

describe("Container", () => {
	it("renders children correctly", () => {
		render(
			<Container>
				<div data-testid="child">Test Content</div>
			</Container>,
		);

		expect(screen.getByTestId("child")).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("applies default classes", () => {
		const { container } = render(
			<Container>
				<div>Content</div>
			</Container>,
		);

		const div = container.firstChild as HTMLElement;
		expect(div.className).toContain("max-w-screen-xl");
		expect(div.className).toContain("mx-auto");
		expect(div.className).toContain("px-4");
		expect(div.className).toContain("md:px-8");
	});

	it("applies additional custom classes", () => {
		const { container } = render(
			<Container className="custom-class">
				<div>Content</div>
			</Container>,
		);

		const div = container.firstChild as HTMLElement;
		expect(div.className).toContain("custom-class");
	});
});
