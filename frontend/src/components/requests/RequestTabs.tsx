type Props = {
  active: "question" | "feature";
  onChange: (t: "question" | "feature") => void;
};

export default function RequestTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-4 mb-4">
      {(["question", "feature"] as const).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={active === t ? "font-bold" : ""}
        >
          {t === "question" ? "Questions" : "Features"}
        </button>
      ))}
    </div>
  );
}
