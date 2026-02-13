import type { Solution } from "@/types/solution";
import HintsSection from "./HintsSection";
import ThoughtToggle from "./ThoughtToggle";
import CodeTabs from "./CodeTabs";
import { Youtube, Code2, Lightbulb, Brain } from "lucide-react";

export default function SolutionSection({ solution }: { solution: Solution }) {
  const codeObj = Object.fromEntries(
    (solution.codeBlocks || []).map((b) => [b.language, b.code])
  );

  return (
    <div className="space-y-8">
      {/* Hints Section */}
      {solution.hints && solution.hints.length > 0 && (
        <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Hints</h2>
          </div>
          <HintsSection hints={solution.hints} />
        </div>
      )}

      {/* Thought Process Section */}
      <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold">Thought Process</h2>
        </div>
        <ThoughtToggle
          myThought={solution.myThought}
          engThought={solution.engThought}
        />
      </div>

      {/* Solution Code Section */}
      {Object.keys(codeObj).length > 0 && (
        <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Solution Code</h2>
          </div>
          <CodeTabs code={codeObj} />
        </div>
      )}

      {/* YouTube Link */}
      {solution.youtubeLink && (
        <a
          href={solution.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Youtube className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-1">Watch Video Explanation</div>
            <div className="text-sm text-muted">Detailed walkthrough on YouTube</div>
          </div>
          <div className="text-red-500 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </a>
      )}
    </div>
  );
}