import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { CinematicStill } from "../components/CinematicStill";
import { FriendshipBand } from "../components/FriendshipBand";

export function Beginning({ content }: { content: SiteContent["whereItStarted"] }) {
  return (
    <div className="min-h-screen relative bg-cream text-ink">
      <CinematicStill photo={content.photo} caption={content.photo.caption} tall />

      <div className="relative z-10 max-w-xl mx-auto px-8 py-14 pb-32">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {content.label}
        </motion.p>
        <motion.h2
          className="font-hand text-4xl text-coral mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.heading}
        </motion.h2>
        <motion.p
          className="font-body text-ink-2 leading-[2] text-[1.02rem] whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          {content.body}
        </motion.p>
        <motion.p
          className="mt-10 font-display italic text-xl text-ink-2/80 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          {content.memory}
        </motion.p>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <FriendshipBand size={380} />
        </motion.div>
        {content.greeting && (
          <motion.p
            className="mt-6 text-center font-hand text-4xl md:text-5xl text-coral"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.greeting}
          </motion.p>
        )}
      </div>
    </div>
  );
}
