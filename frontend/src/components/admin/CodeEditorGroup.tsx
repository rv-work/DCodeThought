"use client";

type Props = {
  code: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
};

// Fixed: You can use this to validate inputs or populate a dropdown
const LANGUAGES = ["java", "cpp", "python", "javascript"];

export default function CodeEditorGroup({ code, onChange }: Props) {
  const update = (lang: string, value: string) => {
    onChange({ ...code, [lang]: value });
  };

  const removeLanguage = (lang: string) => {
    // Fixed: Standard way to omit a key without triggering "unused variable" warnings
    const newCode = { ...code };
    delete newCode[lang];
    onChange(newCode);
  };

  const addLanguage = () => {
    const lang = prompt(
      `Enter language (${LANGUAGES.join(", ")})`
    )?.toLowerCase();

    if (lang && !code[lang]) {
      onChange({ ...code, [lang]: "" });
    }
  };

  return (
    <div className="space-y-4">
      {/* ... Header and Add Button ... */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold">Code Solutions</label>
        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Language
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(code).map(([lang, value]) => (
          <div key={lang} className="card p-0 overflow-hidden border border-border-subtle bg-background-secondary">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-background-tertiary border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="font-semibold capitalize text-foreground">{lang}</span>
              </div>
              <button
                type="button"
                onClick={() => removeLanguage(lang)}
                className="p-1 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-500 transition-all cursor-pointer"
                title="Remove language"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Code Editor */}
            <textarea
              value={value}
              onChange={(e) => update(lang, e.target.value)}
              className="w-full p-4 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-none"
              rows={10}
              placeholder={`Enter ${lang} solution...`}
            />
          </div>
        ))}
      </div>

      {/* ... Empty State ... */}
      {Object.keys(code).length === 0 && (
        <div className="card text-center py-8 bg-background-secondary/40 border-dashed border-2 border-border-subtle">
          <div className="w-16 h-16 rounded-xl bg-muted/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <p className="text-muted">No code solutions added yet</p>
          <button
            type="button"
            onClick={addLanguage}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer"
          >
            Add First Language
          </button>
        </div>
      )}
    </div>
  );
}