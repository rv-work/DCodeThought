"use client";

type AdminLoadingProps = {
  text?: string;
};

export default function AdminLoading({
  text = "Loading...",
}: AdminLoadingProps) {
  return (
    <div className="border rounded-md p-6 text-center animate-pulse text-muted-foreground">
      <div className="h-4 w-40 bg-muted mx-auto mb-2 rounded" />
      <div className="h-3 w-64 bg-muted mx-auto rounded" />
      <p className="text-xs mt-4">{text}</p>
    </div>
  );
}
