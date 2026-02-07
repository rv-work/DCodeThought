"use client";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 mt-6">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-3 py-1 border ${page === i + 1 ? "font-bold" : ""
            }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
