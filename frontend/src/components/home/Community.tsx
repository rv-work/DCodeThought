export default function Community() {
  const features = [
    {
      title: "Request Problems & Features",
      desc: "Users can request LeetCode problems or platform features. Popular requests get prioritized and solved.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      stats: "100% transparent priority"
    },
    {
      title: "Report & Improve",
      desc: "Found an issue in explanation or code? Report it. Transparency and quality come first.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      stats: "Quality-first approach"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Community-Driven Learning
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Your feedback shapes the platform. Request, report, and help us improve together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-full rounded-2xl bg-background-secondary border border-border-subtle p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                {/* Gradient background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 relative">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed mb-6 relative">
                  {feature.desc}
                </p>

                {/* Stats badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-tertiary border border-border text-sm font-medium relative">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature.stats}
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-6 right-6 w-16 h-16 border-2 border-border opacity-10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-16 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                  {i === 4 ? '+' : '👤'}
                </div>
              ))}
            </div>
            <span className="font-semibold">
              Join hundreds of learners building together
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}