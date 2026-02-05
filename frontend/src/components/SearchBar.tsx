"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      className="
        w-full px-4 py-2 rounded-lg border bg-background
        border-border focus:border-primary outline-none
      "
    />
  );
}
