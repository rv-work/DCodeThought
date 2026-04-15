"use client";

export default function PostSkeleton() {
  return (
    <div className="bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-foreground/10" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-foreground/10 rounded w-32" />
          <div className="h-2.5 bg-foreground/5 rounded w-24" />
        </div>
      </div>
      <div className="h-16 bg-foreground/5 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-3 bg-foreground/5 rounded w-full" />
        <div className="h-3 bg-foreground/5 rounded w-4/5" />
        <div className="h-3 bg-foreground/5 rounded w-3/5" />
      </div>
    </div>
  );
}