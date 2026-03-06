import type { Solution } from "@/types/solution";
import HintsSection from "./HintsSection";
import ThoughtToggle from "./ThoughtToggle";
import CodeTabs from "./CodeTabs";
import { Youtube, Code2, Lightbulb, BrainCircuit } from "lucide-react";

export default function SolutionSection({ solution }: { solution: Solution }) {

  const codeObj = Object.fromEntries(
    (solution.codeBlocks || []).map((b) => [b.language, b.code])
  );


  return (
    <div className="space-y-8">

      {/* Hints Section */}
      {solution.hints && solution.hints.length > 0 && (
        <div className="rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Guided Hints</h2>
          </div>
          <HintsSection hints={solution.hints} />
        </div>
      )}

      {/* Thought Process Section */}
      <div className="rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Intuition & Logic</h2>
        </div>
        <ThoughtToggle
          myThought={solution.myThought}
          engThought={solution.engThought}
        />
      </div>

      {/* Solution Code Section */}
      {Object.keys(codeObj).length > 0 && (
        <div className="rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle p-8 md:p-10 shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Optimal Code</h2>
          </div>
          <div className="rounded-xl overflow-hidden border border-border-subtle shadow-2xl">
            <CodeTabs code={codeObj} />
          </div>
        </div>
      )}

      {/* YouTube Link - Neon glowing card */}
      {solution.youtubeLink && (
        <a
          href={solution.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-5 p-6 md:p-8 rounded-4xl bg-background border border-rose-500/30 hover:border-rose-500/60 transition-all cursor-pointer group overflow-hidden shadow-[0_0_30px_rgba(244,63,94,0.1)] hover:shadow-[0_0_50px_rgba(244,63,94,0.2)]"
        >
          <div className="absolute inset-0 bg-linear-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 shrink-0 relative z-10">
            <Youtube className="w-8 h-8" />
          </div>

          <div className="flex-1 relative z-10">
            <div className="font-extrabold text-xl text-foreground mb-1 group-hover:text-rose-500 transition-colors">Video Walkthrough</div>
            <div className="text-muted text-base">Watch the step-by-step visual explanation</div>
          </div>

          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:translate-x-2 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 relative z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </a>
      )}
    </div>
  );
}