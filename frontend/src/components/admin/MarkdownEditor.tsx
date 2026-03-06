"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">

      {/* Editor */}
      <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-background">
        <div className="px-4 py-3 bg-background-secondary border-b border-border text-sm font-bold text-foreground">
          Editor
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-125 p-5 font-mono text-sm bg-background text-foreground focus:outline-none resize-none"
          placeholder="# Intuition..."
        />
      </div>

      {/* Preview */}
      <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-background">
        <div className="px-4 py-3 bg-background-secondary border-b border-border text-sm font-bold text-foreground">
          Preview
        </div>

        {/* FIX: Added explicit `prose-*:text-foreground` overrides. 
          This forces Tailwind Typography to abandon its hardcoded colors 
          and strictly use your app's dynamic foreground colors.
        */}
        <div className="prose dark:prose-invert max-w-none p-6 overflow-y-auto h-125 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-accent">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {value || "Nothing to preview"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}