import { HelpCircle, Sparkles } from "lucide-react";

type Props = {
  active: "question" | "feature";
  onChange: (t: "question" | "feature") => void;
};

export default function RequestTabs({ active, onChange }: Props) {
  return (
    <div className="inline-flex rounded-xl bg-background-secondary border border-border-subtle p-1">
      <button
        onClick={() => onChange("question")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${active === "question"
            ? "bg-gradient-to-r from-accent to-purple-500 text-white shadow-lg"
            : "text-muted hover:text-foreground"
          }`}
      >
        <HelpCircle className="w-4 h-4" />
        Questions
      </button>

      <button
        onClick={() => onChange("feature")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${active === "feature"
            ? "bg-gradient-to-r from-accent to-purple-500 text-white shadow-lg"
            : "text-muted hover:text-foreground"
          }`}
      >
        <Sparkles className="w-4 h-4" />
        Features
      </button>
    </div>
  );
}