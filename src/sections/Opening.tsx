import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { SpinningGirl } from "../components/SpinningGirl";

// Floating rose petals in background
function FloatingPetal({ x, y, size, dur, delay, color }: { x: string; y: string; size: number; dur: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none rounded-full"
      style={{ left: x, top: y, width: size, height: size * 0.6, backgroundColor: color, borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%" }}
      animate={{ y: [-8, 8, -8], rotate: [-10, 10, -10], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

const BG_PETALS = [
  { x: "8%",  y: "15%", size: 14, dur: 4.5, delay: 0,   color: "#F4B8C1" },
  { x: "85%", y: "20%", size: 10, dur: 5.5, delay: 0.8, color: "#F5C4A0" },
  { x: "12%", y: "70%", size: 16, dur: 4,   delay: 1.5, color: "#F4B8C1" },
  { x: "80%", y: "65%", size: 12, dur: 6,   delay: 0.4, color: "#D4A54A" },
  { x: "50%", y: "5%",  size: 9,  dur: 5,   delay: 1,   color: "#B8A9D4" },
  { x: "92%", y: "45%", size: 11, dur: 4.8, delay: 0.2, color: "#F4B8C1" },
];

export function Opening({ content, onBegin }: { content: SiteContent["opening"]; onBegin: () => void }) {
  const [bloomed, setBloomed] = useState(false);

  const handleBegin = () => {
    setBloomed(true);
    onBegin();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 50%, #FBF8F3 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(244,184,193,0.25) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Floating bg petals */}
      {BG_PETALS.map((p, i) => <FloatingPetal key={i} {...p} />)}

      {/* Tiny star field */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0"][i % 4],
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + Math.random() * 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 text-center max-w-2xl">
        <motion.p
          className="font-body text-[10px] tracking-[0.45em] uppercase text-ink-3 mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {content.eyebrow}
        </motion.p>

        {/* Big display headline */}
        <motion.h1
          className="font-display text-display-lg text-ink leading-tight text-balance mb-6"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.line}
        </motion.h1>

        {content.subline && (
          <motion.p
            className="font-body text-ink-2 text-base mb-16 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            {content.subline}
          </motion.p>
        )}

        {/* CTA — a rose that opens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={handleBegin}
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full font-body text-sm tracking-[0.15em] uppercase"
            style={{
              background: "linear-gradient(135deg, #F4B8C1, #E8715A)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(232,113,90,0.3)",
            }}
            whileHover={{ scale: 1.06, boxShadow: "0 12px 40px rgba(232,113,90,0.45)" }}
            whileTap={{ scale: 0.97 }}
            animate={bloomed ? { scale: [1, 1.12, 1] } : {}}
          >
            {/* Rose icon */}
            <motion.span
              className="text-xl"
              animate={{ rotate: bloomed ? [0, -20, 20, 0] : 0 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              🌸
            </motion.span>
            <span>{content.cta}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.p
        className="absolute bottom-8 font-body text-[9px] tracking-[0.3em] uppercase text-ink-3/50 select-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        aria-hidden="true"
      >
        tap → to continue
      </motion.p>

      {/* Spinning girl — bottom right corner */}
      <motion.div
        className="absolute bottom-10 right-10 hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.16,1,0.3,1] }}
        aria-hidden="true"
      >
        <SpinningGirl size={130} />
      </motion.div>
    </div>
  );
}
