export default function WhoIsThisFor() {
  const audiences = [
    {
      title: "College Students",
      desc: "Strong DSA fundamentals for placements, not just copied solutions.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      stats: "Perfect for placement prep"
    },
    {
      title: "Java Developers",
      desc: "Tired of C++-centric explanations? Get clean, idiomatic Java thinking.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      stats: "Java-first, always"
    },
    {
      title: "Serious Learners",
      desc: "Consistency, clarity, and problem-solving mindset over shortcuts.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      stats: "Built for growth"
    },
  ];

  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Is DCodeThought For?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Built for developers who want to truly master problem-solving
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <div
              key={item.title}
              className="group relative animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 relative">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted mb-6 leading-relaxed relative">
                  {item.desc}
                </p>

                {/* Stats badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} bg-opacity-10 border border-current text-sm font-medium relative`} style={{
                  borderColor: 'transparent',
                  backgroundImage: `linear-gradient(white, white), linear-gradient(to right, var(--tw-gradient-stops))`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item.stats}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border border-border opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg text-muted mb-6">
            If you want to <span className="text-foreground font-semibold">understand problems</span> instead of copying them,
            <br />
            this platform is built for you.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/5 border border-accent/20 text-accent font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Join the community of serious learners
          </div>
        </div>
      </div>
    </section>
  );
}