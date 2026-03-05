import { HelpCircle, Sparkles } from "lucide-react";

type Props = {
  active: "question" | "feature";
  onChange: (t: "question" | "feature") => void;
};

export default function RequestTabs({ active, onChange }: Props) {
  return (
    <div className="inline-flex rounded-2xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle p-1.5 shadow-sm">
      <button
        onClick={() => onChange("question")}
        className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${active === "question"
            ? "bg-foreground text-background shadow-md scale-100"
            : "text-muted hover:text-foreground scale-95 hover:scale-100"
          }`}
      >
        <HelpCircle className="w-4 h-4" />
        Questions
      </button>

      <button
        onClick={() => onChange("feature")}
        className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${active === "feature"
            ? "bg-foreground text-background shadow-md scale-100"
            : "text-muted hover:text-foreground scale-95 hover:scale-100"
          }`}
      >
        <Sparkles className="w-4 h-4" />
        Features
      </button>
    </div>
  );
}