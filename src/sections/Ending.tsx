import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { PaperPlane } from "../components/PaperPlane";
import { ForeheadKiss } from "../components/ForeheadKiss";

interface Petal { id: number; x: number; color: string; size: number; dur: number; delay: number; drift: number; }
const PETAL_COLORS = ["#F4B8C1","#F5C4A0","#E8715A","#D4A54A","#B8A9D4","#A8C5A0","#F4B8C1","#F5C4A0"];

export function Ending({ content }: { content: SiteContent["theEnd"] }) {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  const celebrate = () => {
    if (reduce) return;
    setPetals(Array.from({ length: 35 }, (_, i) => ({
      id: i, x: 10 + Math.random() * 80,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      size: 8 + Math.random() * 10,
      dur: 3 + Math.random() * 2,
      delay: Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 100,
    })));
    setTimeout(() => setPetals([]), 6000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 50%, #FDF8EC 100%)" }}
    >
      {/* Paper plane flies off when celebrate is clicked */}
      <PaperPlane trigger={petals.length > 0} />      {/* Falling petals */}
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

      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(244,184,193,0.15) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-8">
        {/* Forehead kiss animation above the text */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        >
          <ForeheadKiss />
        </motion.div>
        <motion.p
          className="font-display text-display-md text-ink text-balance max-w-xl leading-tight"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.line}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 font-body text-xs text-ink-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {content.date && <span>{content.date}</span>}
          {content.date && content.initials && <span className="text-rose">·</span>}
          {content.initials && <span>{content.initials}</span>}
        </motion.div>

        {/* Celebrate button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16,1,0.3,1] }}
        >
          <motion.button
            onClick={celebrate}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-body text-sm tracking-wide text-white"
            style={{ background: "linear-gradient(135deg, #F4B8C1, #E8715A)", boxShadow: "0 8px 28px rgba(232,113,90,0.3)" }}
            whileHover={{ scale: 1.06, boxShadow: "0 12px 36px rgba(232,113,90,0.45)" }}
            whileTap={{ scale: 0.96 }}
          >
            <span aria-hidden="true">🌸</span>
            <span>celebrate us</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 pt-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-rose to-transparent" aria-hidden="true" />
          <p className="font-display italic text-ink-3 text-lg">{content.closing}</p>
        </motion.div>
      </div>
    </div>
  );
}
