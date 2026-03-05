export default function CTA() {
  return (
    <section className="py-24 text-center relative overflow-hidden">
      {/* Deep Space Gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-purple-900/10 to-background"></div>

      {/* Animated Glowing Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Main heading */}
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          Ready to Master <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-500">
            Problem-Solving?
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Start solving problems the right way — one day at a time.
          No shortcuts, just genuine intuition and multi-language mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-14 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <a
            href="/signup"
            className="group relative px-10 py-5 rounded-2xl bg-linear-to-r from-purple-600 to-blue-600 text-white text-lg font-bold shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Inner hover glow */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>

          <a
            href="/potd"
            className="group px-10 py-5 rounded-2xl border-2 border-purple-500/30 bg-background/50 backdrop-blur-md text-lg font-bold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center justify-center gap-2">
              View Today&apos;s POTD
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </span>
          </a>
        </div>

        {/* Features list */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-muted animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: "✓", text: "Free to start" },
            { icon: "✓", text: "Thought-first logic" },
            { icon: "✓", text: "C++, Java & Python" },
            { icon: "✓", text: "Daily learning" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-background-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border-subtle hover:border-purple-500/30 transition-colors cursor-default">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 pt-12 border-t border-border-subtle/50 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col items-center gap-5">
            <div className="flex -space-x-4 hover:space-x-1 transition-all duration-300">
              {[
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-emerald-500 to-teal-500",
                "from-rose-500 to-purple-500"
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${gradient} border-4 border-background flex items-center justify-center text-white font-bold shadow-lg hover:-translate-y-2 transition-transform duration-300`}
                >
                  <span className="text-sm opacity-80">👤</span>
                </div>
              ))}
            </div>
            <p className="text-muted text-lg">
              Join <span className="text-foreground font-bold">hundreds of developers</span> coding the right way
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


