"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LightboxState } from "../constants";
import Image from "next/image";

export default function Lightbox({
  state,
  onClose,
  onNav,
}: {
  state: LightboxState;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const { imgs, index } = state;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {imgs.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-white text-xs font-bold backdrop-blur-sm">
          {index + 1} / {imgs.length}
        </div>
      )}

      {imgs.length > 1 && (
        <button
          className="absolute left-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 disabled:opacity-30"
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          disabled={index === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Replaced <img> with Next <Image /> */}
      {/* Defined strict parent dimensions so 'fill' works without stretching */}
      <div
        className="relative w-[90vw] h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imgs[index]}
          alt={`Image ${index + 1}`}
          fill
          className="object-contain rounded-2xl shadow-2xl select-none"
          draggable={false}
          unoptimized // Prevents errors with blob: URLs or unregistered external domains
        />
      </div>

      {imgs.length > 1 && (
        <button
          className="absolute right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 disabled:opacity-30"
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          disabled={index === imgs.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {imgs.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNav(i - index as 1 | -1); }}
              className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === index ? "border-violet-400 opacity-100 scale-110" : "border-white/20 opacity-50 hover:opacity-75"}`}
            >
              {/* Added 'fill' and 'unoptimized' to the thumbnail as well */}
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}