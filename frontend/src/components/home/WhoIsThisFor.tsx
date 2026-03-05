"use client";

import { GraduationCap, Code2, Rocket } from "lucide-react";

export default function WhoIsThisFor() {
  const audiences = [
    {
      title: "College Students",
      desc: "Build strong DSA fundamentals for placements by learning the actual intuition, not just copying solutions.",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-blue-500 to-indigo-500",
      stats: "Perfect for placements"
    },
    {
      title: "Polyglot Coders",
      desc: "Get clean, optimized code in C++, Java, and Python side-by-side. Learn the logic, code in your favorite stack.",
      icon: <Code2 className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      stats: "C++ • Java • Python"
    },
    {
      title: "Serious Learners",
      desc: "Consistency, clarity, and a problem-solving mindset over shortcuts. Built for those who want to grow daily.",
      icon: <Rocket className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      stats: "Built for growth"
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who Is DCodeThought For?</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Built for developers who want to truly master problem-solving logic.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <div key={item.title} className="group relative animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-full rounded-3xl bg-background-secondary/40 backdrop-blur-sm border border-border-subtle p-8 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}></div>

                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${item.gradient} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 relative`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 relative">{item.title}</h3>
                <p className="text-muted mb-8 leading-relaxed relative text-lg">{item.desc}</p>

                <div className="absolute bottom-8 left-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r ${item.gradient} bg-opacity-10 text-sm font-bold tracking-wide`}>
                    <span className={`w-2 h-2 rounded-full bg-linear-to-r ${item.gradient} animate-pulse`}></span>
                    <span className="bg-clip-text text-transparent bg-linear-to-r">{item.stats}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}