import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteContent } from "../data/types";
import { PaperPlane } from "../components/PaperPlane";

export function UsSection({ content }: { content: SiteContent["onlyWeKnow"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #F5F2FA 60%, #FBF8F3 100%)" }}
    >
      {/* Paper plane flies across on mount */}
      <PaperPlane trigger={true} />

      {/* Soft background dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${10 + i * 16}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 6 + i * 2,
            height: 6 + i * 2,
            background: `hsla(${260 + i * 15}, 40%, 78%, 0.2)`,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase mb-6"
          style={{ color: "#B8A9D4" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {content.label}
        </motion.p>
        <motion.h2
          className="font-display text-display-md text-ink text-balance leading-tight mb-4"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.heading}
        </motion.h2>
        <motion.p
          className="font-body text-ink-3 text-sm mb-14"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {content.intro}
        </motion.p>

        <ul className="divide-y divide-rule">
          {content.jokes.map((joke, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                onClick={() => joke.context && setOpen(open === i ? null : i)}
                disabled={!joke.context}
              >
                <span className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-lavender">
                  {joke.line}
                </span>
                {joke.context && (
                  <motion.span className="text-lavender text-lg mt-0.5 flex-shrink-0 font-light"
                    animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >+</motion.span>
                )}
              </button>
              <AnimatePresence>
                {open === i && joke.context && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm text-ink-3 pb-5 leading-relaxed">{joke.context}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
        {content.jokes.some(j => j.context) && (
          <p className="mt-6 font-body text-xs text-ink-3/40 italic">tap a line to expand</p>
        )}
      </div>
    </div>
  );
}
