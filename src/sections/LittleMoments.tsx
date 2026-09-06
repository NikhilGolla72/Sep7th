import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { VideoCall } from "../components/VideoCall";

export function LittleMoments({ content }: { content: SiteContent["smallThings"] }) {
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
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          <VideoCall size={320} />
        </motion.div>
      </div>
    </div>
  );
}
