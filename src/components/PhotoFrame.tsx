import { useState } from "react";
import { motion } from "framer-motion";
import type { Photo } from "../data/types";

interface PhotoFrameProps {
  photo: Photo;
  className?: string;
  showCaption?: boolean;
  tiltDeg?: number;
  onClick?: () => void;
  hoverStyle?: "tilt" | "lift" | "none";
}

export function PhotoFrame({ photo, className = "", showCaption = false, tiltDeg = 0, onClick, hoverStyle = "lift" }: PhotoFrameProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspect = photo.orientation === "portrait" ? "aspect-[3/4]" : photo.orientation === "square" ? "aspect-square" : "aspect-[4/3]";
  const hover = hoverStyle === "lift" ? { y: -6, scale: 1.015 } : hoverStyle === "tilt" ? { rotate: 1.5, scale: 1.02 } : {};

  return (
    <figure className={`select-none ${className}`} style={tiltDeg ? { transform: `rotate(${tiltDeg}deg)` } : undefined}>
      <motion.div
        className={`relative overflow-hidden bg-paper-2 ${onClick ? "cursor-zoom-in" : ""}`}
        whileHover={hover}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      >
        {!failed ? (
          <>
            {!loaded && <div className="min-h-[220px] bg-paper-2 animate-pulse" />}
            <img
              src={photo.src} alt={photo.alt} loading="lazy"
              onError={() => setFailed(true)} onLoad={() => setLoaded(true)}
              className={`block w-full max-h-[70vh] object-contain bg-cream-2 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
            />
          </>
        ) : (
          <div className={`${aspect} flex flex-col items-center justify-center gap-3 px-6 text-center bg-paper-2 border border-dashed border-rule`}>
            <div className="w-8 h-px bg-rule mb-1" aria-hidden="true" />
            <p className="font-body text-xs text-ink-3">photo placeholder</p>
            <code className="text-[10px] text-ink-3/60 break-all">{photo.src}</code>
          </div>
        )}
      </motion.div>
      {showCaption && photo.caption && (
        <figcaption className="mt-3 text-xs text-ink-3 font-body text-center tracking-wide">{photo.caption}</figcaption>
      )}
    </figure>
  );
}
