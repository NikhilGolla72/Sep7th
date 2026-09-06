import { useState } from "react";
import { motion } from "framer-motion";

/**
 * A stack of polaroid frames that fans out on click, then
 * collapses back. Pure decoration — no real photos, just shape.
 */
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
          {/* Photo area — colored gradient placeholder */}
          <div
            className="w-full h-full rounded-sm"
            style={{
              background: `linear-gradient(135deg, ${
                ["#F4B8C1","#F5C4A0","#B8A9D4","#A8C5A0","#A0C4E8"][i]
              }40, ${
                ["#F4B8C1","#F5C4A0","#B8A9D4","#A8C5A0","#A0C4E8"][i]
              }20)`,
            }}
          />
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
