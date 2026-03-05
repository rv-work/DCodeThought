"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="text-center space-y-8 max-w-5xl mx-auto">

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Master LeetCode with
            <span className="block mt-2 bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              Thought-First Logic
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            A platform built for developers who want to
            <span className="text-foreground font-semibold"> understand the intuition</span>, not just memorize code.
            Deep explanations followed by optimized solutions in <span className="text-foreground font-semibold">C++, Java, and Python</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/problems"
              className="group relative px-8 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Problems
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/potd"
              className="group px-8 py-4 rounded-2xl border-2 border-border/50 backdrop-blur-md bg-background/30 font-semibold text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 hover:scale-[1.02] shadow-sm"
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
          <div className="pt-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-3 backdrop-blur-sm bg-background/50 px-4 py-2 rounded-full border border-border/50">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-xs">{"</>"}</span>
                </div>
                <span className="font-medium">C++, Java & Python</span>
              </div>
              <div className="flex items-center gap-3 backdrop-blur-sm bg-background/50 px-4 py-2 rounded-full border border-border/50">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="font-medium">Intuition First</span>
              </div>
              <div className="flex items-center gap-3 backdrop-blur-sm bg-background/50 px-4 py-2 rounded-full border border-border/50">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <span className="font-medium">Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}