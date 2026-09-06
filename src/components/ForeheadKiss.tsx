import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Two friends — one giving a gentle forehead kiss to the other.
 * Soft, warm, intimate but clearly friendship.
 * Tap to trigger the leaning animation and heart burst.
 */
export function ForeheadKiss() {
  const [kissed, setKissed] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        style={{ width: 220, height: 160 }}
        className="relative cursor-pointer"
        onClick={() => !reduce && setKissed(!kissed)}
      >
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none">

          {/* ── Figure A — taller, leaning to kiss (left) ─────── */}
          <motion.g
            animate={kissed ? { x: 8, rotate: -4 } : { x: 0, rotate: 0 }}
            style={{ transformOrigin: "75px 130px" }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.16,1,0.3,1] }}
          >
            {/* Body */}
            <rect x="62" y="80" width="20" height="50" rx="6" fill="#4361EE" opacity="0.75" />
            {/* Neck */}
            <rect x="68" y="66" width="8" height="16" rx="4" fill="#F5CBA7" />
            {/* Head */}
            <ellipse cx="72" cy="54" rx="14" ry="15" fill="#F5CBA7" />
            {/* Hair */}
            <path d="M 58 46 C 58 34, 64 28, 72 28 C 80 28, 86 34, 86 46 C 82 36, 62 36, 58 46 Z" fill="#8B4513" />
            {/* Face — eyes closed leaning */}
            <motion.path
              d="M 65 52 Q 67 50 69 52" stroke="#4A2E1A" strokeWidth="1.5" fill="none" strokeLinecap="round"
              animate={kissed ? { d: "M 65 53 Q 67 51 69 53" } : {}}
            />
            <motion.path
              d="M 74 52 Q 76 50 78 52" stroke="#4A2E1A" strokeWidth="1.5" fill="none" strokeLinecap="round"
              animate={kissed ? { d: "M 74 53 Q 76 51 78 53" } : {}}
            />
            {/* Gentle smile */}
            <path d="M 66 59 Q 72 63 78 59" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="64" cy="57" rx="4" ry="2.5" fill="#F4B8C1" opacity="0.5" />
            <ellipse cx="80" cy="57" rx="4" ry="2.5" fill="#F4B8C1" opacity="0.5" />
            {/* Arms */}
            <path d="M 62 88 C 54 84, 50 90, 52 98" stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none" />
            <motion.path
              d="M 82 88 C 92 84, 100 86, 104 88"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={kissed ? { d: "M 82 88 C 95 82, 108 80, 114 80" } : {}}
              transition={{ duration: reduce ? 0 : 0.7 }}
            />
          </motion.g>

          {/* ── Figure B — seated/shorter (right) ────────────── */}
          <g>
            {/* Body */}
            <rect x="130" y="90" width="20" height="40" rx="6" fill="#E8715A" opacity="0.8" />
            {/* Skirt */}
            <path d="M 128 108 C 118 112, 116 126, 120 136 C 124 142, 148 142, 150 136 C 152 126, 152 112, 142 108 Z" fill="#E8715A" />
            {/* Neck */}
            <rect x="136" y="76" width="8" height="16" rx="4" fill="#F5CBA7" />
            {/* Head */}
            <ellipse cx="140" cy="64" rx="14" ry="15" fill="#F5CBA7" />
            {/* Hair — long */}
            <path d="M 126 56 C 126 42, 132 34, 140 34 C 148 34, 154 42, 154 56 C 150 44, 130 44, 126 56 Z" fill="#D4A54A" />
            <path d="M 126 56 C 124 70, 126 90, 128 104" stroke="#C8963A" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 154 56 C 156 70, 154 90, 152 104" stroke="#C8963A" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Face — happy/blushing */}
            <circle cx="134" cy="62" r="1.5" fill="#4A2E1A" />
            <circle cx="146" cy="62" r="1.5" fill="#4A2E1A" />
            <path d="M 134 69 Q 140 74 146 69" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <ellipse cx="132" cy="66" rx="4" ry="2.5" fill="#F4B8C1" opacity="0.6" />
            <ellipse cx="148" cy="66" rx="4" ry="2.5" fill="#F4B8C1" opacity="0.6" />
            {/* Arms hugging back */}
            <motion.path
              d="M 130 96 C 120 92, 114 88, 112 84"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={kissed ? { d: "M 130 96 C 116 90, 108 86, 100 84" } : {}}
              transition={{ duration: reduce ? 0 : 0.7 }}
            />
            <path d="M 150 96 C 158 92, 162 90, 164 96" stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>

          {/* ── Kiss sparkles / hearts ─────────────────────────── */}
          <AnimatePresence>
            {kissed && (
              <>
                {/* Forehead kiss star */}
                <motion.circle cx="110" cy="36" r="4" fill="#E8715A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
                {/* Small hearts floating up */}
                {[[-12,-4],[0,-14],[12,-4]].map(([dx,dy],i) => (
                  <motion.path key={i}
                    d={`M ${108+dx} ${30+dy} C ${108+dx} ${28+dy}, ${104+dx} ${24+dy}, ${100+dx} ${24+dy} C ${96+dx} ${24+dy}, ${96+dx} ${28+dy}, ${96+dx} ${30+dy} C ${96+dx} ${34+dy}, ${108+dx} ${40+dy}, ${108+dx} ${40+dy} C ${108+dx} ${40+dy}, ${120+dx} ${34+dy}, ${120+dx} ${30+dy} C ${120+dx} ${28+dy}, ${120+dx} ${24+dy}, ${116+dx} ${24+dy} C ${112+dx} ${24+dy}, ${108+dx} ${28+dy}, ${108+dx} ${30+dy} Z`}
                    fill="#E8715A"
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{ scale: [0,0.4,0.3], opacity: [0,1,0], y: -30 }}
                    transition={{ duration: 1.2, delay: 0.7 + i * 0.2 }}
                  />
                ))}
                {/* Star sparkles */}
                {[100,112,124].map((x,i) => (
                  <motion.text key={i} x={x} y={20} fontSize="10" textAnchor="middle"
                    initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0,1,0], y: -20 }}
                    transition={{ duration: 1, delay: 0.8 + i*0.15 }}
                  >✦</motion.text>
                ))}
              </>
            )}
          </AnimatePresence>

        </svg>

        {/* Tap hint */}
        <motion.p
          className="absolute bottom-0 left-0 right-0 text-center font-body text-[9px] tracking-widest uppercase text-ink-3/40"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {kissed ? "tap again" : "tap"}
        </motion.p>
      </div>
    </div>
  );
}
