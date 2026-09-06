import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { CottageFriends } from "../components/CottageFriends";

function ConfettiBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: 12 + Math.random() * 76,
    color: ["#F4B8C1", "#F5C4A0", "#D4A54A", "#B8A9D4", "#A8C5A0", "#E8715A"][i % 6],
    size: 6 + Math.random() * 8,
    dur: 2 + Math.random() * 1.5,
    delay: Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 120,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%",
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, x: p.drift, rotate: 540 }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export function Opening({ content }: { content: SiteContent["opening"] }) {
  const reduce = useReducedMotion();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24 pt-8 relative overflow-hidden bg-cream">
      {showConfetti && <ConfettiBurst />}

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-5">
        <motion.p
          className="font-body text-[10px] tracking-[0.5em] uppercase text-ink-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.3 }}
        >
          {content.eyebrow}
        </motion.p>

        <motion.p
          className="font-hand text-3xl md:text-4xl text-coral"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.5 }}
        >
          For Nidhila
        </motion.p>

        <motion.div
          className="relative leading-none"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-display font-bold select-none block"
            style={{
              fontSize: "clamp(6.5rem, 22vw, 11rem)",
              background: "linear-gradient(135deg, #E8715A 0%, #F4B8C1 50%, #D4A54A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
            }}
          >
            7
          </span>
          {!reduce &&
            [0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const r = 72;
              return (
                <motion.span
                  key={i}
                  className="absolute text-sm pointer-events-none"
                  style={{ top: "50%", left: "50%" }}
                  animate={{
                    x: Math.cos(rad) * r,
                    y: Math.sin(rad) * r,
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    opacity: { duration: 2, delay: 1.2 + i * 0.3, repeat: Infinity },
                    scale: { duration: 2, delay: 1.2 + i * 0.3, repeat: Infinity },
                  }}
                  aria-hidden="true"
                >
                  {["✦", "✧", "✦", "✧"][i]}
                </motion.span>
              );
            })}
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="48" height="28" viewBox="0 0 60 30" fill="none" aria-hidden="true">
            <path d="M 60 5 L 8 15 L 60 25 Z" fill="#E8715A" opacity="0.7" />
          </svg>
          <div
            className="px-5 py-2 font-body text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-white whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #E8715A, #F4B8C1)" }}
          >
            Happy September 7th
          </div>
          <svg width="48" height="28" viewBox="0 0 60 30" fill="none" aria-hidden="true">
            <path d="M 0 5 L 52 15 L 0 25 Z" fill="#E8715A" opacity="0.7" />
          </svg>
        </motion.div>

        <motion.h1
          className="font-hand text-3xl md:text-[2.6rem] text-coral leading-snug text-balance px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduce ? 0 : 1.4 }}
        >
          {content.line}
        </motion.h1>
      </div>

      <motion.div
        className="absolute bottom-20 right-3 md:bottom-12 md:right-20 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <CottageFriends size={160} />
      </motion.div>
    </div>
  );
}
