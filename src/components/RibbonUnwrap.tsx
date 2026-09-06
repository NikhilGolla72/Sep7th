import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function RibbonUnwrap({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"idle" | "unwrapping" | "done">("idle");
  const reduce = useReducedMotion();

  const start = () => {
    if (stage !== "idle") return;
    setStage("unwrapping");
    setTimeout(() => { setStage("done"); onDone(); }, reduce ? 0 : 2000);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="flex flex-col items-center justify-center gap-8 min-h-[50vh]"
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gift box with ribbon */}
          <motion.button
            className="relative focus:outline-none"
            onClick={start}
            aria-label="Unwrap the gift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              {/* Box body */}
              <rect x="20" y="70" width="120" height="80" rx="6"
                fill="#FDF2F4" stroke="#F4B8C1" strokeWidth="1.5"
              />
              {/* Box lid */}
              <motion.rect
                x="16" y="55" width="128" height="22" rx="4"
                fill="#F4B8C1" stroke="#E8715A" strokeWidth="1.5"
                animate={stage === "unwrapping" ? { y: -30, opacity: 0, rotate: -8 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "80px 66px" }}
              />

              {/* Vertical ribbon */}
              <motion.rect
                x="74" y="55" width="12" height="95" fill="#E8715A" opacity="0.7"
                animate={stage === "unwrapping" ? { scaleY: 0, opacity: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ transformOrigin: "80px 102px" }}
              />
              {/* Horizontal ribbon */}
              <motion.rect
                x="16" y="92" width="128" height="12" fill="#E8715A" opacity="0.7"
                animate={stage === "unwrapping" ? { scaleX: 0, opacity: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ transformOrigin: "80px 98px" }}
              />

              {/* Bow top left */}
              <motion.path
                d="M 80 66 C 65 52, 48 50, 52 62 C 56 72, 72 68, 80 66"
                fill="#E8715A" opacity="0.9"
                animate={stage === "unwrapping" ? { scale: 0, opacity: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "80px 66px" }}
              />
              {/* Bow top right */}
              <motion.path
                d="M 80 66 C 95 52, 112 50, 108 62 C 104 72, 88 68, 80 66"
                fill="#E8715A" opacity="0.9"
                animate={stage === "unwrapping" ? { scale: 0, opacity: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "80px 66px" }}
              />
              {/* Bow center knot */}
              <motion.circle cx="80" cy="66" r="7" fill="#C25038"
                animate={stage === "unwrapping" ? { scale: 0 } : {}}
                transition={{ duration: 0.4 }}
              />

              {/* Sparkles when idle */}
              {stage === "idle" && [
                [30, 40], [130, 40], [25, 120], [135, 120],
              ].map(([x, y], i) => (
                <motion.circle key={i} cx={x} cy={y} r="3" fill="#D4A54A"
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                />
              ))}

              {/* Stars burst on unwrap */}
              {stage === "unwrapping" && [0,60,120,180,240,300].map((angle, i) => {
                const r = 50;
                const rad = angle * Math.PI / 180;
                return (
                  <motion.circle key={i}
                    cx={80 + Math.cos(rad) * r}
                    cy={110 + Math.sin(rad) * r}
                    r="4"
                    fill={["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0","#E8715A","#F5C4A0"][i]}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.07 }}
                  />
                );
              })}
            </svg>
          </motion.button>

          <motion.p
            className="font-body text-xs text-ink-3/60 tracking-[0.2em] uppercase"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stage === "idle" ? "tap to unwrap" : "opening…"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
