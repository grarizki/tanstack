export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500 opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-600 opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="animate-fade-up relative z-10 text-center max-w-5xl mx-auto px-4 py-32">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] tracking-widest uppercase border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for work
        </div>

        <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl leading-tight mb-8">
          <span className="text-white">Building Modern</span>
          <br />
          <span className="text-white">Web Experiences</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">
            with Precision.
          </span>
        </h1>

        <p className="font-body text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          Frontend Engineer based in Jakarta, Indonesia. Crafting high-performance
          interfaces with React, TypeScript, and modern tooling.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:raka.grarizki@gmail.com"
            className="font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-3 rounded-full shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.6)] hover:scale-105 transition-all duration-300 min-h-[44px] flex items-center"
          >
            Get In Touch
          </a>
          <a
            href="#work"
            className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-white/20 text-white px-8 py-3 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 min-h-[44px] flex items-center"
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  )
}
