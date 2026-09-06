import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { BloomingRose } from "../components/BloomingRose";
import { Butterfly } from "../components/Butterfly";
import { SpinningGirl } from "../components/SpinningGirl";

const BUTTERFLIES = [
  { x: "8%",  y: "15%", delay: 0,   scale: 0.9, color: "#F4B8C1" },
  { x: "78%", y: "22%", delay: 1.2, scale: 0.7, color: "#B8A9D4" },
  { x: "85%", y: "68%", delay: 0.6, scale: 1.0, color: "#A8C5A0" },
  { x: "5%",  y: "72%", delay: 1.8, scale: 0.8, color: "#D4A54A" },
  { x: "50%", y: "8%",  delay: 0.3, scale: 0.6, color: "#F4B8C1" },
];

export function WhoWeAreNow({ content }: { content: SiteContent["usNow"] }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #EFF6FD 60%, #FBF8F3 100%)" }}
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([e]) => { if (e.isIntersecting) setVisible(true); },
          { threshold: 0.3 }
        );
        obs.observe(el);
      }}
    >
      {/* Butterflies floating in background */}
      {BUTTERFLIES.map((b, i) => <Butterfly key={i} {...b} />)}

      {/* Ambient sky circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(160,196,232,0.1) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-wide mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <motion.p
            className="font-body text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "#A0C4E8" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {content.label}
          </motion.p>
          <motion.h2
            className="font-display text-display-md text-ink text-balance leading-tight mb-8"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.heading}
          </motion.h2>
          <motion.p
            className="font-body text-ink-2 leading-[1.9] text-[0.95rem] max-w-measure"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {content.body}
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            aria-hidden="true"
          >
            <span className="block w-10 h-px bg-sky/40" />
            <span className="block w-2 h-2 rounded-full bg-sky/50" />
            <span className="block w-10 h-px bg-sky/40" />
          </motion.div>
        </div>

        {/* Rose easter egg + spinning girl */}
        <motion.div
          className="flex flex-col items-center gap-6 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <BloomingRose autoTrigger={visible} />
          <p className="font-body text-xs text-ink-3/50 tracking-wide text-center">tap the rose 🌹</p>
          <div className="mt-2 opacity-80">
            <SpinningGirl size={110} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
