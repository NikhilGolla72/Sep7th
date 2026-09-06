import { motion, useReducedMotion } from "framer-motion";
import type { Photo } from "../data/types";

/** Full still, no crop — the whole photo stays visible, like a projected frame. */
export function CinematicStill({
  photo,
  caption,
  tall = false,
}: {
  photo: Photo;
  caption?: string;
  tall?: boolean;
}) {
  const reduce = useReducedMotion();
  const label = caption ?? photo.caption;

  return (
    <figure className="relative w-full overflow-hidden bg-cream-2">
      <div
        className={`flex items-center justify-center px-4 py-6 ${tall ? "min-h-[78vh]" : "min-h-[56vh] md:min-h-[64vh]"}`}
      >
        <motion.img
          src={photo.src}
          alt={photo.alt}
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.4 : 6.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[72vh] max-w-full w-auto h-auto object-contain"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: "linear-gradient(180deg, rgba(251,248,243,0.85), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(0deg, rgba(251,248,243,0.92), transparent)" }}
        aria-hidden="true"
      />
      {label && (
        <figcaption className="absolute bottom-5 left-0 right-0 text-center font-body text-[11px] tracking-[0.22em] uppercase text-ink-3 px-6">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
