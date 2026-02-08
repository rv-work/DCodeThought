export default function PotdPhilosophy() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-purple-500 text-white text-4xl mb-8 shadow-2xl animate-float">
          📅
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Problem of the Day Matters
        </h2>

        {/* Main content */}
        <div className="space-y-6 mb-12">
          <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
            One well-thought problem every day compounds into{" "}
            <span className="text-foreground font-semibold">strong intuition</span>.
          </p>

          <p className="text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            DCodeThought follows a strict daily POTD discipline so you don't break momentum.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "🚫",
              title: "No Overload",
              desc: "Just one focused problem",
              color: "from-red-500 to-orange-500"
            },
            {
              icon: "🎯",
              title: "No Randomness",
              desc: "Carefully selected daily",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "📈",
              title: "Steady Growth",
              desc: "Consistent daily progress",
              color: "from-green-500 to-emerald-500"
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="group relative rounded-xl bg-background-secondary border border-border-subtle p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className="text-4xl mb-3">{item.icon}</div>

              {/* Title */}
              <h3 className="font-bold mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats visualization */}
        <div className="relative max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">1</span>
              <span className="text-muted">problem</span>
            </div>
            <span className="text-3xl text-muted">×</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">365</span>
              <span className="text-muted">days</span>
            </div>
            <span className="text-3xl text-muted">=</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">∞</span>
              <span className="text-muted">mastery</span>
            </div>
          </div>

          <p className="text-sm text-muted italic">
            Small daily actions create extraordinary results over time
          </p>
        </div>
      </div>
    </section>
  );
}