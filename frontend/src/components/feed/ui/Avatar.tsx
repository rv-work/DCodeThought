"use client";

export default function Avatar({
  name,
  size = "md",
  gradient = "from-violet-500 to-blue-500",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  gradient?: string;
}) {
  const sizes = {
    xs: "w-7 h-7 text-[11px]",
    sm: "w-9 h-9 text-sm",
    md: "w-12 h-12 text-xl",
    lg: "w-14 h-14 text-2xl",
  };
  return (
    <div
      className={`${sizes[size]} rounded-full bg-linear-to-br ${gradient} flex items-center justify-center font-black text-white shrink-0 ring-2 ring-background shadow-sm`}
    >
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}