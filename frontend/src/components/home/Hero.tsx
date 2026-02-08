import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-border-subtle text-sm font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Built by a LeetCode Knight
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Master LeetCode with
            <span className="block mt-2 gradient-text">
              Clear Java-First Thinking
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            A learning-first platform built for developers who want to
            <span className="text-foreground font-semibold"> understand deeply</span>, not memorize solutions.
            Daily POTDs, hints-driven flow, and clean multi-language code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/problems"
              className="group relative px-8 py-4 rounded-xl bg-accent text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Problems
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="/potd"
              className="group px-8 py-4 rounded-xl border-2 border-border-subtle font-semibold text-lg hover:border-accent hover:bg-background-secondary transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md"
            >
              <span className="flex items-center justify-center gap-2">
                Today&apos;s POTD
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Social proof / features */}
          <div className="pt-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">Java-first explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">Daily consistency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-medium">Community-driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}