export default function CTA() {
  return (
    <section className="py-24 text-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10"></div>

      {/* Animated circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          Ready to Master Problem-Solving?
        </h2>

        {/* Subheading */}
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Start solving problems the right way — one day at a time.
          No shortcuts, just genuine learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <a
            href="/signup"
            className="group relative px-10 py-5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white text-lg font-semibold shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>

          <a
            href="/potd"
            className="group px-10 py-5 rounded-xl border-2 border-border-subtle bg-background-secondary text-lg font-semibold hover:border-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              View Today's POTD
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </span>
          </a>
        </div>

        {/* Features list */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: "✓", text: "Free to start" },
            { icon: "✓", text: "No credit card required" },
            { icon: "✓", text: "Java-first explanations" },
            { icon: "✓", text: "Daily learning" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 pt-12 border-t border-border-subtle animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 border-4 border-background flex items-center justify-center text-white font-bold shadow-lg"
                >
                  👤
                </div>
              ))}
            </div>
            <p className="text-muted">
              Join <span className="text-foreground font-semibold">hundreds of developers</span> learning the right way
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}