import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Container from "./Container";

const navLinks = [
	{ to: "/" as const, label: "Home", exact: true },
	{ to: "/work" as const, label: "Work", exact: false },
	{ to: "/about" as const, label: "About", exact: false },
];

const linkBase =
	"font-mono text-xs tracking-widest uppercase transition-colors duration-200 text-[#94A3B8] hover:text-emerald-500 data-[status=active]:text-emerald-500";

export default function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-[#030304]/80 backdrop-blur-lg border-b border-white/5">
			<Container>
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						to="/"
						className="font-heading font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300"
					>
						GRARIZKI
					</Link>

					{/* Desktop nav */}
					<div className="hidden sm:flex items-center gap-6">
						{navLinks.map(({ to, label, exact }) => (
							<Link
								key={to}
								to={to}
								activeOptions={{ exact }}
								className={linkBase}
							>
								{label}
							</Link>
						))}
						<a
							href="mailto:raka.grarizki@gmail.com"
							className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-2 rounded-full shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-[0.98] transition-all duration-300"
						>
							Contact
						</a>
					</div>

					{/* Mobile: contact + hamburger */}
					<div className="flex sm:hidden items-center gap-3">
						<a
							href="mailto:raka.grarizki@gmail.com"
							className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-full active:scale-[0.98] transition-all duration-300"
						>
							Contact
						</a>
						<button
							type="button"
							onClick={() => setMobileOpen((v) => !v)}
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
							aria-expanded={mobileOpen}
							aria-controls="mobile-menu"
							className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
						>
							{mobileOpen ? (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M5 5L15 15M15 5L5 15"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
							) : (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M3 5H17M3 10H17M3 15H17"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileOpen && (
					<div
						id="mobile-menu"
						className="sm:hidden border-t border-white/5 py-3 flex flex-col"
					>
						{navLinks.map(({ to, label, exact }) => (
							<Link
								key={to}
								to={to}
								activeOptions={{ exact }}
								className={`${linkBase} py-3 px-1`}
								onClick={() => setMobileOpen(false)}
							>
								{label}
							</Link>
						))}
					</div>
				)}
			</Container>
		</nav>
	);
}
