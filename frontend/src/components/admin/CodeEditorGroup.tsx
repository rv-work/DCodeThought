"use client";

type Props = {
  code: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
};

export default function CodeEditorGroup({ code, onChange }: Props) {
  const update = (lang: string, value: string) => {
    onChange({ ...code, [lang]: value });
  };

  const addLanguage = () => {
    const lang = prompt("Language key (e.g. java, cpp, python)");
    if (lang) onChange({ ...code, [lang]: "" });
  };

  return (
    <div className="space-y-2">
      {Object.entries(code).map(([lang, value]) => (
        <div key={lang}>
          <div className="font-semibold">{lang}</div>
          <textarea
            className="w-full border p-2"
            rows={5}
            value={value}
            onChange={(e) => update(lang, e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addLanguage} className="underline">
        + Add Language
      </button>
    </div>
  );
}
