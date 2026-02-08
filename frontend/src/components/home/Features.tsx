const FEATURES = [
  {
    title: "Java-First Explanations",
    desc: "No more hunting for good Java solutions. Every problem is explained clearly with intent.",
    icon: "☕",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Hints-Driven Learning",
    desc: "Think step-by-step with guided hints before jumping to the solution.",
    icon: "💡",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Daily POTD Discipline",
    desc: "Consistency beats talent. One well-explained problem every day.",
    icon: "📅",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Multi-Language Code",
    desc: "Compare Java, C++, Python, and JavaScript side-by-side.",
    icon: "🔤",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Contests & Practice",
    desc: "Organized contest sets for effective pattern recognition and revision.",
    icon: "🏆",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Community Requests",
    desc: "Request problems and features. Popular requests get prioritized and solved.",
    icon: "🤝",
    gradient: "from-pink-500 to-rose-500"
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A complete learning ecosystem designed to build deep problem-solving intuition
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className="relative mb-4">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 relative">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed relative">
                {feature.desc}
              </p>

              {/* Arrow icon on hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                <svg className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Decorative corner lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border opacity-20 group-hover:opacity-40 rounded-tl-2xl transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-border opacity-20 group-hover:opacity-40 rounded-br-2xl transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}