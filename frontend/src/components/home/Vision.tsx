export default function Vision() {
  return (
    <section className="py-32 text-center border-t border-border-subtle relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-float"></div>
        </div>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Our Vision
        </div>

        {/* Main title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          The Long-Term Vision
        </h2>

        {/* Main description */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted leading-relaxed mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          DCodeThought aims to become a{" "}
          <span className="text-foreground font-semibold">trusted learning companion</span>{" "}
          for thousands of developers — not through shortcuts,
          but through{" "}
          <span className="text-foreground font-semibold">clarity, discipline, and deep understanding</span>.
        </p>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "🎯",
              title: "Clarity",
              desc: "Every concept explained with precision and care",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: "📅",
              title: "Discipline",
              desc: "Consistent daily practice builds mastery",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: "🧠",
              title: "Understanding",
              desc: "Deep intuition over surface-level memorization",
              gradient: "from-orange-500 to-red-500"
            },
          ].map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative animate-scale-in opacity-0"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="relative h-full rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                {/* Gradient background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 relative">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted relative">
                  {pillar.desc}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote / Mantra */}
        <div className="relative max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
          <div className="relative rounded-2xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20 p-10">
            {/* Quote marks */}
            <div className="absolute top-6 left-6 text-6xl text-accent/20 font-serif">"</div>
            <div className="absolute bottom-6 right-6 text-6xl text-accent/20 font-serif">"</div>

            <p className="text-xl md:text-2xl font-medium text-center leading-relaxed px-8">
              We build a platform that developers return to every day — not because they have to,
              but because it <span className="gradient-text font-bold">genuinely helps them grow</span>.
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/50"
              style={{
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}