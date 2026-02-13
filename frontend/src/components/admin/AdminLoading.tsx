"use client";

type AdminLoadingProps = {
  text?: string;
};

export default function AdminLoading({
  text = "Loading...",
}: AdminLoadingProps) {
  return (
    <div className="card text-center animate-fade-in">
      {/* Animated loader */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-border"></div>
          <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent absolute top-0 left-0 animate-spin"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="space-y-3">
        <div className="text-lg font-semibold">{text}</div>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}