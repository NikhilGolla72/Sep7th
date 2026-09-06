import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";

interface Petal { id: number; x: number; color: string; size: number; dur: number; delay: number; drift: number; }
const PETAL_COLORS = ["#F4B8C1","#F5C4A0","#E8715A","#D4A54A","#B8A9D4","#A8C5A0","#F4B8C1","#F5C4A0"];

function runawaySpot() {
  return {
    left: `${6 + Math.random() * 62}%`,
    top: `${Math.random() * 72}%`,
  };
}

export function Ending({ content }: { content: SiteContent["theEnd"] }) {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);
  const [signed, setSigned] = useState(false);
  const [noPos, setNoPos] = useState({ left: "58%", top: "28%" });

  const celebrate = () => {
    if (reduce) return;
    setPetals(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      size: 8 + Math.random() * 10,
      dur: 3 + Math.random() * 2,
      delay: Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 100,
    })));
    setTimeout(() => setPetals([]), 6000);
  };

  useEffect(() => {
    if (!signed) return;
    celebrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed]);

  const dodge = () => {
    setNoPos(runawaySpot());
  };

  const accept = () => {
    setSigned(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 pr-20 md:pr-24 py-20 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, rgba(251,248,243,0.78) 0%, rgba(253,242,244,0.72) 50%, rgba(253,248,236,0.78) 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden" aria-hidden="true">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-0 rounded-full"
            style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.6, backgroundColor: p.color, borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%" }}
            initial={{ y: -20, opacity: 1, x: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: 0, x: p.drift, rotate: 540 }}
            transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(244,184,193,0.18) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl space-y-8">
        <motion.p
          className="font-hand text-4xl md:text-6xl text-coral leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.wish}
        </motion.p>

        {content.date && (
          <motion.p
            className="font-body text-xs tracking-[0.28em] uppercase text-ink-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            {content.date}
          </motion.p>
        )}

        {!signed ? (
          <>
            <motion.p
              className="font-display italic text-2xl md:text-3xl text-ink leading-snug text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.9 }}
            >
              {content.question}
            </motion.p>

            <div className="relative mx-auto h-44 w-full max-w-md">
              <motion.button
                type="button"
                onClick={accept}
                className="absolute left-[18%] top-[28%] z-10 px-8 py-3 rounded-full font-body text-sm tracking-wide text-white"
                style={{ background: "linear-gradient(135deg, #F4B8C1, #E8715A)", boxShadow: "0 8px 28px rgba(232,113,90,0.3)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {content.yesLabel}
              </motion.button>

              <button
                type="button"
                onPointerEnter={dodge}
                onPointerDown={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                className="absolute z-20 px-7 py-3 rounded-full font-body text-sm tracking-wide text-ink-2 bg-paper border border-rule shadow-sm"
                style={{ left: noPos.left, top: noPos.top, transition: reduce ? "none" : "left 0.18s ease, top 0.18s ease" }}
                aria-label="This one keeps running. You know which answer we want."
              >
                {content.noLabel}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="font-display italic text-2xl text-ink leading-relaxed">{content.vow}</p>
            <p className="font-hand text-2xl text-coral/80">signed, in the only way that matters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
