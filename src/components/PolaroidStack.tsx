import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const STACK_PHOTOS = [
  "/photos/cafe-night.jpg",
  "/photos/school-class.jpg",
  "/photos/jul-2025-a.jpg",
  "/photos/jun-2026-e.jpg",
  "/photos/bw-selfie.jpg",
];

const STACK_COLORS = [
  "#FDF2F4", "#FDF8EC", "#F5F2FA", "#EFF6ED", "#FBF8F3",
];

const ROTATIONS = [-12, -6, 0, 6, 12];
const TRANSLATIONS = [
  { x: -60, y: 20 },
  { x: -30, y: 10 },
  { x:   0, y: 0 },
  { x:  30, y: 10 },
  { x:  60, y: 20 },
];

export function PolaroidStack() {
  const [fanned, setFanned] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFanned(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ height: 160 }} aria-hidden="true">
      {STACK_COLORS.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm shadow-md cursor-pointer"
          style={{
            width: 80, height: 96,
            background: color,
            border: "1.5px solid rgba(0,0,0,0.06)",
            padding: "6px 6px 20px 6px",
          }}
          animate={fanned ? {
            rotate: ROTATIONS[i],
            x: TRANSLATIONS[i].x,
            y: TRANSLATIONS[i].y,
            zIndex: i,
          } : {
            rotate: (i - 2) * 1.5,
            x: (i - 2) * 3,
            y: Math.abs(i - 2) * 2,
            zIndex: i,
          }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setFanned(!fanned)}
          whileHover={{ y: fanned ? TRANSLATIONS[i].y - 6 : -4 }}
        >
          <div className="w-full h-full rounded-sm overflow-hidden bg-cream-2">
            <img
              src={STACK_PHOTOS[i]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ))}

      {/* Tap hint */}
      {!fanned && (
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-body text-[9px] tracking-widest uppercase text-ink-3/40 whitespace-nowrap"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          tap to fan
        </motion.p>
      )}
    </div>
  );
}
