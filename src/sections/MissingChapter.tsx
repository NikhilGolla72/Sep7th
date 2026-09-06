import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { Hourglass } from "../components/Hourglass";

export function MissingChapter({ content }: { content: SiteContent["whenYouDisappeared"] }) {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen relative bg-cream text-ink flex items-center">
      <div className="relative z-10 max-w-5xl mx-auto w-full px-8 pr-20 md:px-16 md:pr-24 py-16 pb-32 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <motion.p
            className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {content.label}
          </motion.p>
          <motion.h2
            className="font-hand text-4xl text-coral mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.heading}
          </motion.h2>
          <motion.p
            className="font-body text-ink-2 leading-[2] text-[1.02rem] whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {content.body}
          </motion.p>

          <motion.div
            className="flex items-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            aria-label="Two years apart"
          >
            <motion.span
              className="w-3 h-3 rounded-full bg-lavender/60"
              initial={{ x: 0 }}
              animate={{ x: reduce ? -24 : -40 }}
              transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="font-body text-[9px] tracking-[0.35em] uppercase text-ink-3/50 px-6 whitespace-nowrap">
              two years
            </span>
            <motion.span
              className="w-3 h-3 rounded-full bg-sage/60"
              initial={{ x: 0 }}
              animate={{ x: reduce ? 24 : 40 }}
              transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Hourglass />
        </motion.div>
      </div>
    </div>
  );
}
