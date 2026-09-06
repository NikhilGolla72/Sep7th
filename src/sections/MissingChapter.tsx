import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { Hourglass } from "../components/Hourglass";

export function MissingChapter({ content }: { content: SiteContent["whenYouDisappeared"] }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 md:px-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F5F0ED 0%, #EDE8E4 50%, #F0EDE8 100%)" }}
    >
      {/* Subtle horizontal rules */}
      {[18, 38, 62, 82].map((pct) => (
        <motion.div key={pct}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${pct}%`, background: "rgba(160,152,144,0.12)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut", delay: pct * 0.005 }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-wide mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <motion.p
            className="font-body text-[10px] tracking-[0.4em] uppercase text-ink-3 mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {content.label}
          </motion.p>
          <motion.h2
            className="font-display text-display-md text-ink text-balance leading-tight mb-10"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.heading}
          </motion.h2>
          <motion.p
            className="font-body text-ink-2/70 leading-[1.9] text-sm mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.55 }}
          >
            {content.body}
          </motion.p>

          {/* Two dots drifting apart */}
          <motion.div
            className="flex items-center gap-0"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            aria-label="Two years apart"
          >
            <motion.span className="w-3 h-3 rounded-full" style={{ background: "rgba(184,169,212,0.5)" }}
              initial={{ x: 0 }} whileInView={{ x: -40 }} viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1.5, delay: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            <span className="font-body text-[9px] tracking-[0.35em] uppercase text-ink-3/40 px-6 whitespace-nowrap">two years</span>
            <motion.span className="w-3 h-3 rounded-full" style={{ background: "rgba(168,197,160,0.5)" }}
              initial={{ x: 0 }} whileInView={{ x: 40 }} viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1.5, delay: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Hourglass — the signature animation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Hourglass />
        </motion.div>
      </div>
    </div>
  );
}
