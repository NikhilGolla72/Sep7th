import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CuteBackdrop } from "./CuteBackdrop";

interface IntroCardProps {
  onEnter?: () => void;
}

// Floating petal
function Petal({ x, y, size, color, delay, dur }: { x: string; y: string; size: number; color: string; delay: number; dur: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size * 0.6,
        backgroundColor: color,
        borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%",
      }}
      animate={{ y: [-10, 10, -10], rotate: [-15, 15, -15], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

const PETALS = [
  { x: "5%",  y: "10%", size: 14, color: "#F4B8C1", delay: 0,   dur: 4   },
  { x: "88%", y: "8%",  size: 10, color: "#F5C4A0", delay: 0.5, dur: 5   },
  { x: "10%", y: "78%", size: 16, color: "#B8A9D4", delay: 1,   dur: 4.5 },
  { x: "82%", y: "72%", size: 12, color: "#A8C5A0", delay: 0.3, dur: 5.5 },
  { x: "48%", y: "4%",  size: 9,  color: "#D4A54A", delay: 0.8, dur: 4.8 },
  { x: "92%", y: "40%", size: 11, color: "#F4B8C1", delay: 1.3, dur: 3.8 },
  { x: "3%",  y: "42%", size: 8,  color: "#A0C4E8", delay: 0.6, dur: 5.2 },
  { x: "55%", y: "88%", size: 13, color: "#F5C4A0", delay: 1.1, dur: 4.2 },
];

// Animated SVG date "September 7"
function AnimatedDate() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* "September" */}
      <motion.p
        className="font-body text-xs tracking-[0.5em] uppercase text-ink-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 0.8 }}
      >
        September
      </motion.p>

      {/* Big "7" */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-display font-bold leading-none select-none"
          style={{
            fontSize: "clamp(8rem, 25vw, 14rem)",
            background: "linear-gradient(135deg, #E8715A 0%, #F4B8C1 50%, #D4A54A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.05em",
          }}
        >
          7
        </span>

        {/* Stars orbiting the 7 */}
        {!reduce && [0, 90, 180, 270].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const r = 85;
          return (
            <motion.span
              key={i}
              className="absolute text-sm pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: Math.cos(rad) * r,
                y: Math.sin(rad) * r,
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                x: { duration: 0, delay: 0 },
                y: { duration: 0, delay: 0 },
                opacity: { duration: 2, delay: 1.5 + i * 0.3, repeat: Infinity },
                scale: { duration: 2, delay: 1.5 + i * 0.3, repeat: Infinity },
              }}
              aria-hidden="true"
            >
              {["✦", "✧", "✦", "✧"][i]}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

// Animated ribbon/banner
function Ribbon() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay: reduce ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ribbon left tail */}
      <svg width="60" height="30" viewBox="0 0 60 30" fill="none" aria-hidden="true">
        <path d="M 60 5 L 8 15 L 60 25 Z" fill="#E8715A" opacity="0.7" />
      </svg>

      {/* Ribbon center */}
      <div
        className="px-6 py-2 font-body text-sm font-semibold tracking-[0.12em] uppercase text-white"
        style={{ background: "linear-gradient(135deg, #E8715A, #F4B8C1)", minWidth: 220, textAlign: "center" }}
      >
        Happy September 7th
      </div>

      {/* Ribbon right tail */}
      <svg width="60" height="30" viewBox="0 0 60 30" fill="none" aria-hidden="true">
        <path d="M 0 5 L 52 15 L 0 25 Z" fill="#E8715A" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

// Confetti burst on load
function ConfettiBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    color: ["#F4B8C1","#F5C4A0","#D4A54A","#B8A9D4","#A8C5A0","#E8715A"][i % 6],
    size: 6 + Math.random() * 8,
    dur: 2 + Math.random() * 1.5,
    delay: Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 120,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
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

export function IntroCard({ onEnter }: IntroCardProps) {
  const [visible, setVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Burst confetti on mount
    if (!reduce) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [reduce]);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(() => onEnter?.(), 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, rgba(251,248,243,0.82) 0%, rgba(253,242,244,0.78) 50%, rgba(253,248,236,0.82) 100%)" }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <CuteBackdrop chapterIndex={13} />
          {/* Floating petals */}
          {PETALS.map((p, i) => <Petal key={i} {...p} />)}

          {showConfetti && <ConfettiBurst />}

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg gap-6">

            {/* Animated date */}
            <AnimatedDate />

            {/* Ribbon */}
            <Ribbon />

            {/* Subtitle */}
            <motion.p
              className="font-display italic text-xl text-ink-2/70 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: reduce ? 0 : 2.2 }}
            >
              Some days you don't forget.
            </motion.p>

            {/* Animated hearts */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduce ? 0 : 2.5 }}
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={reduce ? {} : {
                    scale: [1, 1.3, 1],
                    color: ["#E8715A", "#F4B8C1", "#E8715A"],
                  }}
                  transition={{ duration: 1.2, delay: i * 0.25, repeat: Infinity }}
                >
                  ♥
                </motion.span>
              ))}
            </motion.div>

            {/* Enter button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: reduce ? 0 : 2.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm font-semibold tracking-[0.15em] uppercase text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #E8715A, #F4B8C1, #D4A54A)",
                  boxShadow: "0 8px 32px rgba(232,113,90,0.35)",
                }}
                whileHover={{ scale: 1.06, boxShadow: "0 12px 40px rgba(232,113,90,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  aria-hidden="true"
                />
                <span>Open your gift</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
