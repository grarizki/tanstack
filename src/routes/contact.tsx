import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Container from "../components/portfolio/Container";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Netlify will handle the form submission
		setSubmitted(true);
	};

	return (
		<div className="pt-16">
			<Container className="py-20 md:py-28">
				<div className="text-center mb-16">
					<p className="font-mono text-xs text-emerald-500 tracking-widest uppercase mb-3">
						/ contact
					</p>
					<h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
						Get In Touch
					</h1>
					<p className="font-body text-lg text-[#94A3B8] mt-4">
						Have a project in mind? Let&apos;s talk about it.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl">
					{/* Contact info */}
					<div className="animate-on-scroll relative bg-[#0F1115] border border-white/10 rounded-2xl p-8">
						<span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
						<span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />

						<h2 className="font-heading font-semibold text-xl text-white mb-6">
							Contact Info
						</h2>
						<div className="space-y-5">
							<div className="flex items-center gap-3 text-[#94A3B8]">
								<MapPin className="text-emerald-500 w-5 h-5 flex-shrink-0" />
								<span className="font-body text-sm">Jakarta, Indonesia</span>
							</div>
							<div className="flex items-center gap-3 text-[#94A3B8]">
								<Mail className="text-emerald-500 w-5 h-5 flex-shrink-0" />
								<a
									href="mailto:raka.grarizki@gmail.com"
									className="font-body text-sm hover:text-emerald-400 transition-colors"
								>
									raka.grarizki@gmail.com
								</a>
							</div>
							<div className="flex items-center gap-3 text-[#94A3B8]">
								<Phone className="text-emerald-500 w-5 h-5 flex-shrink-0" />
								<a
									href="tel:+6281224183361"
									className="font-body text-sm hover:text-emerald-400 transition-colors"
								>
									+62 812 2418 3361
								</a>
							</div>
						</div>
					</div>

					{/* Form */}
					<div className="animate-on-scroll">
						{submitted ? (
							<div className="relative bg-[#0F1115] border border-emerald-500/40 rounded-2xl p-8">
								<span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/60" />
								<span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/60" />
								<p className="font-body text-emerald-400 text-lg">
									Thank you for your message! I&apos;ll get back to you soon.
								</p>
							</div>
						) : (
							<form
								name="contact"
								method="POST"
								data-netlify="true"
								data-netlify-honeypot="bot-field"
								onSubmit={handleSubmit}
								className="space-y-5"
							>
								<input type="hidden" name="form-name" value="contact" />
								<div className="hidden">
									<label>
										Don&apos;t fill this out if you&apos;re human:{" "}
										<input name="bot-field" />
									</label>
								</div>

								<div>
									<label
										htmlFor="name"
										className="block font-mono text-xs text-[#94A3B8] tracking-widest uppercase mb-2"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										value={formState.name}
										onChange={(e) =>
											setFormState({ ...formState, name: e.target.value })
										}
										className="w-full rounded-xl bg-[#0F1115] border border-white/10 text-white px-4 py-3 font-body text-sm placeholder:text-[#64748B] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block font-mono text-xs text-[#94A3B8] tracking-widest uppercase mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={formState.email}
										onChange={(e) =>
											setFormState({ ...formState, email: e.target.value })
										}
										className="w-full rounded-xl bg-[#0F1115] border border-white/10 text-white px-4 py-3 font-body text-sm placeholder:text-[#64748B] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
										placeholder="you@example.com"
									/>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block font-mono text-xs text-[#94A3B8] tracking-widest uppercase mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={4}
										required
										value={formState.message}
										onChange={(e) =>
											setFormState({ ...formState, message: e.target.value })
										}
										className="w-full rounded-xl bg-[#0F1115] border border-white/10 text-white px-4 py-3 font-body text-sm placeholder:text-[#64748B] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors resize-none"
										placeholder="Tell me about your project..."
									/>
								</div>

								<button
									type="submit"
									className="w-full font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-full shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-[0.98] transition-all duration-300"
								>
									Send Message
								</button>
							</form>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
