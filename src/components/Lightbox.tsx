import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "../data/types";

export function Lightbox({ photos, index, onClose, onNavigate }: {
  photos: Photo[]; index: number | null; onClose: () => void; onNavigate: (i: number) => void;
}) {
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;
  const prev = useCallback(() => { if (index !== null) onNavigate((index - 1 + photos.length) % photos.length); }, [index, photos.length, onNavigate]);
  const next = useCallback(() => { if (index !== null) onNavigate((index + 1) % photos.length); }, [index, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [isOpen, onClose, prev, next]);

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label={photo.alt}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 font-body text-xs tracking-[0.2em] uppercase text-paper/50 hover:text-paper transition-colors"
            aria-label="Close"
          >
            close ✕
          </button>

          <div className="absolute top-6 left-6 font-body text-[10px] tracking-widest text-paper/40 z-10">
            {index! + 1} / {photos.length}
          </div>

          <motion.div
            key={index}
            className="relative z-10 max-w-[88vw] max-h-[85vh] flex flex-col items-center gap-5"
            initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={photo.src} alt={photo.alt} className="max-w-full max-h-[80vh] object-contain" />
            {photo.caption && (
              <p className="text-xs text-paper/60 font-body text-center max-w-sm tracking-wide">{photo.caption}</p>
            )}
          </motion.div>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 font-body text-xs tracking-[0.2em] uppercase text-paper/40 hover:text-coral transition-colors"
                aria-label="Previous"
              >← prev</button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 font-body text-xs tracking-[0.2em] uppercase text-paper/40 hover:text-coral transition-colors"
                aria-label="Next"
              >next →</button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
