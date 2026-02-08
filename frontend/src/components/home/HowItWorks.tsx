const STEPS = [
  {
    text: "Open a problem or today's POTD",
    icon: "📖"
  },
  {
    text: "Read hints and think before coding",
    icon: "💭"
  },
  {
    text: "Understand Hindi + English explanation",
    icon: "🌏"
  },
  {
    text: "Compare multi-language solutions",
    icon: "💻"
  },
  {
    text: "Discuss, comment, or report issues",
    icon: "💬"
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Learning Works Here
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A simple 5-step process designed for maximum retention and understanding
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connection line */}
          <div className="hidden md:block absolute left-12 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-accent"></div>

          {/* Steps */}
          <ol className="space-y-6">
            {STEPS.map((step, index) => (
              <li
                key={index}
                className="relative animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-6 group">
                  {/* Number circle */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-purple-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-3xl mb-1">{step.icon}</div>
                        <div className="text-xs font-bold opacity-80">Step {index + 1}</div>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent to-purple-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left rounded-xl bg-background-secondary border border-border-subtle p-6 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-accent/30">0{index + 1}</span>
                      <p className="text-lg font-medium">{step.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom highlight */}
        <div className="mt-16 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-semibold">
              Learn by thinking, not by copying
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}