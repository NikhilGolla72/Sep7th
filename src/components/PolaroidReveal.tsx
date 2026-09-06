import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Photo } from "../data/types";

interface PolaroidRevealProps {
  photo: Photo;
  caption?: string;
}

export function PolaroidReveal({ photo, caption }: PolaroidRevealProps) {
  const [shaken, setShaken] = useState(false);
  const [developed, setDeveloped] = useState(false);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleShake = () => {
    if (developed) return;
    setShaken(true);
    setTimeout(() => setDeveloped(true), reduce ? 0 : 1200);
  };

  const aspect = photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <motion.div
      className="relative cursor-pointer select-none mx-auto"
      style={{ maxWidth: 280 }}
      onClick={handleShake}
      animate={shaken && !developed ? {
        rotate: [-3, 3, -3, 3, -2, 2, 0],
        y: [-4, 4, -4, 4, -2, 0],
      } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={!developed ? { scale: 1.03, rotate: 1 } : {}}
      aria-label="Shake to develop photo"
    >
      {/* Polaroid frame */}
      <div
        className="relative bg-white shadow-lg"
        style={{
          padding: "12px 12px 40px 12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
          transform: "rotate(-1.5deg)",
        }}
      >
        {/* Photo area */}
        <div className={`${aspect} relative overflow-hidden bg-cream-2`}>
          {/* Development overlay — fades away when developed */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(135deg, #F5EFE6, #EDE7DC)" }}
            animate={{ opacity: developed ? 0 : 1 }}
            transition={{ duration: reduce ? 0 : 1.5, ease: "easeOut" }}
          />

          {/* Developing color wash */}
          {shaken && !developed && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ background: "linear-gradient(135deg, rgba(244,184,193,0.5), rgba(212,165,74,0.3))" }}
            />
          )}

          {/* Actual photo */}
          {!failed ? (
            <>
              {!loaded && <div className={`absolute inset-0 bg-cream-2`} />}
              <img
                src={photo.src} alt={photo.alt} loading="lazy"
                onError={() => setFailed(true)} onLoad={() => setLoaded(true)}
                className={`block w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
              <p className="font-body text-xs text-ink-3">photo placeholder</p>
              <code className="text-[9px] text-ink-3/60 break-all">{photo.src}</code>
            </div>
          )}
        </div>

        {/* Polaroid caption area */}
        <div className="mt-2 text-center">
          {caption && developed ? (
            <motion.p
              className="font-hand text-sm text-ink-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {caption}
            </motion.p>
          ) : !developed ? (
            <p className="font-body text-[9px] text-ink-3/40 tracking-widest uppercase">
              shake to develop
            </p>
          ) : null}
        </div>
      </div>

      {/* Glow when undeveloped */}
      {!developed && (
        <motion.div
          className="absolute -inset-3 rounded-sm pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(244,184,193,0.2) 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
