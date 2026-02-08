export default function ProblemWalkthrough() {
  const steps = [
    {
      num: "01",
      title: "Problem Statement",
      desc: "Clear problem description with tags, difficulty, and constraints",
      icon: "📋"
    },
    {
      num: "02",
      title: "Progressive Hints",
      desc: "Step-by-step guided clues to build your thinking process",
      icon: "💡"
    },
    {
      num: "03",
      title: "Thought Process",
      desc: "Hindi + English explanation of how to approach the solution",
      icon: "🧠"
    },
    {
      num: "04",
      title: "Clean Solutions",
      desc: "Multi-language code: Java, C++, Python, JavaScript",
      icon: "💻"
    },
    {
      num: "05",
      title: "Discussion",
      desc: "Comment, discuss, and report issues for continuous improvement",
      icon: "💬"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Problems Are Explained
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A structured 5-step approach to ensure deep understanding
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-purple-500/50 to-accent/50 transform -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`relative animate-fade-in-up opacity-0 ${isEven ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'
                    }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`lg:flex ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                    {/* Content card */}
                    <div className={`flex-1 group ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="relative inline-block">
                        <div className={`rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isEven ? 'lg:ml-auto' : ''
                          }`}>
                          {/* Icon */}
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-purple-500 text-white text-3xl mb-4 shadow-lg ${isEven ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'
                            }`}>
                            {step.icon}
                          </div>

                          {/* Number */}
                          <div className={`text-6xl font-bold opacity-10 mb-2 ${isEven ? '' : ''
                            }`}>
                            {step.num}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold mb-3">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted leading-relaxed">
                            {step.desc}
                          </p>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 text-white font-bold shadow-lg z-10">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="mt-20 text-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20">
            <div className="text-4xl">🎯</div>
            <p className="text-lg font-semibold max-w-md">
              After solving a problem here, you'll be able to solve similar ones on your own
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}