"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";

const cls =
  "relative w-full rounded-2xl overflow-hidden border border-border-subtle group cursor-zoom-in transition-all duration-200 hover:border-violet-500/60 hover:shadow-lg";

// Defined outside to prevent re-creation on every render
const Img = ({
  src,
  idx,
  className,
  onClick,
}: {
  src: string;
  idx: number;
  className?: string;
  onClick: (index: number) => void;
}) => (
  <div className={`${cls} ${className}`} onClick={() => onClick(idx)}>
    <Image
      src={src}
      alt={`Post image ${idx + 1}`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      unoptimized
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-all duration-200 drop-shadow-lg scale-75 group-hover:scale-100" />
    </div>
  </div>
);

export default function ImageGrid({
  imgs,
  onImageClick,
}: {
  imgs: string[];
  onImageClick: (index: number) => void;
}) {
  if (!imgs.length) return null;

  if (imgs.length === 1)
    return <Img src={imgs[0]} idx={0} className="h-64 md:h-96" onClick={onImageClick} />;

  if (imgs.length === 2)
    return (
      <div className="grid grid-cols-2 gap-1.5">
        {imgs.map((img, i) => (
          <Img key={i} src={img} idx={i} className="h-44 md:h-56" onClick={onImageClick} />
        ))}
      </div>
    );

  if (imgs.length === 3)
    return (
      <div className="grid grid-cols-2 gap-1.5">
        <Img src={imgs[0]} idx={0} className="col-span-2 h-44" onClick={onImageClick} />
        {imgs.slice(1).map((img, i) => (
          <Img key={i} src={img} idx={i + 1} className="h-32" onClick={onImageClick} />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {imgs.map((img, i) => (
        <div key={i} className="relative">
          <Img src={img} idx={i} className="h-32 md:h-44" onClick={onImageClick} />
          {i === 3 && imgs.length > 4 && (
            <div
              className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center cursor-pointer"
              onClick={() => onImageClick(3)}
            >
              <span className="text-white font-black text-xl">+{imgs.length - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}