import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

/**
 * A red rose that grows from a stem and blooms petal by petal.
 * Click it to trigger the animation. Pass autoTrigger=true to bloom on mount.
 */
export function BloomingRose({ autoTrigger = false }: { autoTrigger?: boolean }) {
  const [stage, setStage] = useState<"idle" | "growing" | "bloomed">("idle");
  const reduce = useReducedMotion();

  // Auto-bloom when the section becomes visible
  useEffect(() => {
    if (!autoTrigger || reduce) return;
    const t = setTimeout(() => {
      setStage("growing");
      setTimeout(() => setStage("bloomed"), 2200);
    }, 800);
    return () => clearTimeout(t);
  }, [autoTrigger, reduce]);

  const trigger = () => {
    if (stage !== "idle") { setStage("idle"); return; }
    setStage("growing");
    setTimeout(() => setStage("bloomed"), reduce ? 0 : 2200);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <motion.button
        onClick={trigger}
        className="relative focus:outline-none"
        aria-label="Grow a rose"
        whileTap={{ scale: 0.97 }}
      >
        <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <motion.path
            d="M 60 195 C 60 170, 58 140, 60 100"
            stroke="#5a8a52" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: stage !== "idle" ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Left leaf */}
          <motion.path
            d="M 60 155 C 40 145, 25 128, 35 118 C 45 108, 60 125, 60 140"
            fill="#7ab570" fillOpacity="0.85"
            initial={{ scale: 0, originX: "60px", originY: "140px" }}
            animate={{ scale: stage !== "idle" ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Right leaf */}
          <motion.path
            d="M 60 140 C 80 130, 95 113, 85 103 C 75 93, 60 110, 60 125"
            fill="#7ab570" fillOpacity="0.85"
            initial={{ scale: 0, originX: "60px", originY: "125px" }}
            animate={{ scale: stage !== "idle" ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Sepals (green base of flower) */}
          {[[-15, 0], [0, -8], [15, 0], [8, 8], [-8, 8]].map(([dx, dy], i) => (
            <motion.ellipse
              key={i}
              cx={60 + dx} cy={100 + dy} rx="7" ry="12"
              fill="#5a8a52" fillOpacity="0.7"
              style={{ transformOrigin: `${60}px ${108}px`, transform: `rotate(${i * 72}deg)` }}
              initial={{ scale: 0 }} animate={{ scale: stage !== "idle" ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.9 + i * 0.04 }}
            />
          ))}

          {/* Petals — outer ring */}
          {[0, 51, 102, 153, 204, 255, 306].map((angle, i) => {
            const rad = (angle - 90) * Math.PI / 180;
            const cx = 60 + Math.cos(rad) * 22;
            const cy = 88 + Math.sin(rad) * 18;
            return (
              <motion.ellipse
                key={`outer-${i}`} cx={cx} cy={cy} rx="13" ry="17"
                fill={i % 2 === 0 ? "#C0392B" : "#E74C3C"}
                style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${angle}deg)` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: stage !== "idle" ? 1 : 0, opacity: stage !== "idle" ? 0.9 : 0 }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 1.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}

          {/* Petals — inner ring */}
          {[25, 97, 169, 241, 313].map((angle, i) => {
            const rad = (angle - 90) * Math.PI / 180;
            const cx = 60 + Math.cos(rad) * 13;
            const cy = 88 + Math.sin(rad) * 11;
            return (
              <motion.ellipse
                key={`inner-${i}`} cx={cx} cy={cy} rx="10" ry="13"
                fill="#C0392B"
                style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${angle}deg)` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: stage !== "idle" ? 1 : 0, opacity: stage !== "idle" ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1.7 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}

          {/* Center */}
          <motion.circle
            cx="60" cy="88" r="9" fill="#8B0000"
            initial={{ scale: 0 }} animate={{ scale: stage !== "idle" ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 2.1 }}
          />

          {/* Sparkles when bloomed */}
          {stage === "bloomed" && !reduce && [
            [42, 62], [78, 62], [52, 74], [68, 74], [60, 58],
          ].map(([x, y], i) => (
            <motion.circle
              key={`spark-${i}`} cx={x} cy={y} r="2" fill="#FFD93D"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 1, delay: i * 0.12, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
        </svg>
      </motion.button>

      <AnimatePresence>
        {stage !== "idle" && (
          <motion.p
            className="mt-3 font-body text-xs text-ink-3/60 tracking-wide text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {stage === "bloomed" ? "tap again to reset" : "growing…"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
