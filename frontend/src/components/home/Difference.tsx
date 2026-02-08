export default function Difference() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why DCodeThought Is Different
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Most platforms focus on speed. We focus on understanding.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Typical Platforms - Muted */}
          <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8 relative group hover:shadow-lg transition-all duration-300 animate-slide-in-left ">
            {/* X icon overlay */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center opacity-50">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-6 text-muted flex items-center gap-2">
              <span className="w-8 h-1 bg-red-500/30 rounded"></span>
              Typical Platforms
            </h3>

            <ul className="space-y-4">
              {[
                "Mostly C++ solutions",
                "Jump straight to final code",
                "No structured thinking process",
                "Hard to revise later",
                "Overwhelming and scattered"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted">
                  <svg className="w-5 h-5 text-red-500/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DCodeThought - Highlighted */}
          <div className="rounded-2xl bg-linear-to-br from-accent/5 to-purple-500/5 border-2 border-accent/20 p-8 relative group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 animate-slide-in-right " style={{ animationDelay: '0.2s' }}>
            {/* Checkmark icon overlay */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-accent/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <h3 className="text-xl font-bold mb-6 text-accent flex items-center gap-2 relative">
              <span className="w-8 h-1 bg-linear-to-r from-accent to-purple-500 rounded"></span>
              DCodeThought Approach
            </h3>

            <ul className="space-y-4 relative">
              {[
                { text: "Java-first explanations", icon: "☕" },
                { text: "Hints → Thought → Code flow", icon: "💡" },
                { text: "Hindi + English clarity", icon: "🌏" },
                { text: "Built for revision & growth", icon: "📈" },
                { text: "Structured daily learning", icon: "📅" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent/20 transition-colors">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <span className="font-medium pt-1">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Corner decoration */}
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-accent/20 rounded-bl-lg"></div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Understanding over memorization, always
          </div>
        </div>
      </div>
    </section>
  );
}