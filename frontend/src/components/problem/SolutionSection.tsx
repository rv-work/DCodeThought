import type { Solution } from "@/types/solution";
import HintsSection from "./HintsSection";
import ThoughtToggle from "./ThoughtToggle";
import CodeTabs from "./CodeTabs";

export default function SolutionSection({ solution }: { solution: Solution }) {
  const codeObj = Object.fromEntries(
    (solution.codeBlocks || []).map((b) => [b.language, b.code])
  );

  return (
    <div className="mt-8 space-y-6">
      <HintsSection hints={solution.hints} />

      <div>
        <h2 className="font-semibold mb-2">Thought Process</h2>
        <ThoughtToggle
          myThought={solution.myThought}
          engThought={solution.engThought}
        />
      </div>

      {Object.keys(codeObj).length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Solution</h2>
          <CodeTabs code={codeObj} />
        </div>
      )}

      {solution.youtubeLink && (
        <a
          href={solution.youtubeLink}
          target="_blank"
          className="text-sm underline"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
}
