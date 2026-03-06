import type { Solution } from "@/types/solution";
import HintsSection from "./HintsSection";
import ThoughtToggle from "./ThoughtToggle";
import CodeTabs from "./CodeTabs";
import { Code2, Lightbulb, BrainCircuit } from "lucide-react";

export default function SolutionSection({ solution }: { solution: Solution }) {
  const codeObj = Object.fromEntries(
    (solution.codeBlocks || []).map((b) => [b.language, b.code])
  );

  return (
    <div className="space-y-8 w-full">

      {/* Hints Section */}
      {solution.hints && solution.hints.length > 0 && (
        <div className="rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-2xl border border-orange-500/20 p-8 shadow-[0_20px_50px_-20px_rgba(249,115,22,0.15)] transition-all hover:border-orange-500/40">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Guided Hints</h2>
          </div>
          <HintsSection hints={solution.hints} />
        </div>
      )}

      {/* Thought Process Section */}
      <div className="rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-2xl border border-purple-500/20 p-8 shadow-[0_20px_50px_-20px_rgba(168,85,247,0.15)] transition-all hover:border-purple-500/40">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Intuition & Logic</h2>
        </div>
        <ThoughtToggle
          myThought={solution.myThought}
          engThought={solution.engThought}
        />
      </div>

      {/* Solution Code Section */}
      {Object.keys(codeObj).length > 0 && (
        <div className="rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-2xl border border-blue-500/20 p-8 shadow-[0_20px_50px_-20px_rgba(59,130,246,0.15)] transition-all hover:border-blue-500/40 overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Optimal Code</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border-subtle shadow-2xl bg-[#0d1117]">
            <CodeTabs code={codeObj} />
          </div>
        </div>
      )}

    </div>
  );
}