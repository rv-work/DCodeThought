"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-subtle bg-background-secondary hover:border-accent hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((pageNum, idx) => {
        if (pageNum === "...") {
          return (
            <div
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center w-10 h-10 text-muted"
            >
              ...
            </div>
          );
        }

        const isActive = pageNum === page;

        return (
          <button
            key={pageNum}
            onClick={() => onChange(pageNum as number)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border font-semibold transition-all cursor-pointer ${isActive
                ? "border-accent bg-accent text-white shadow-lg"
                : "border-border-subtle bg-background-secondary hover:border-accent hover:bg-accent/5"
              }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-subtle bg-background-secondary hover:border-accent hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}