import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock GSAP
vi.mock("gsap", () => ({
	gsap: {
		to: vi.fn(),
		fromTo: vi.fn(),
		timeline: vi.fn(() => ({
			fromTo: vi.fn(function (this: unknown) {
				return this;
			}),
			to: vi.fn(function (this: unknown) {
				return this;
			}),
		})),
		context: vi.fn((fn: () => void) => {
			fn();
			return { revert: vi.fn() };
		}),
		registerPlugin: vi.fn(),
	},
}));

vi.mock("gsap/ScrollTrigger", () => ({
	ScrollTrigger: {},
	default: {},
}));
