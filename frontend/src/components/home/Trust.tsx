export default function Trust() {
  const badges = [
    { icon: "🏆", text: "LeetCode Knight" },
    { icon: "☕", text: "Java-first" },
    { icon: "📅", text: "Daily consistency" },
    { icon: "🤝", text: "Community-driven" }
  ];

  return (
    <section className="border-y border-border-subtle py-8 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-purple-500/5 to-accent/5"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((badge, index) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-semibold text-muted">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
    </section>
  );
}