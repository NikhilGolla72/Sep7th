import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { PhotoFrame } from "../components/PhotoFrame";

export function YearsAfter({ content }: { content: SiteContent["everythingAfter"] }) {
  return (
    <div className="min-h-screen relative bg-cream text-ink">
      <div className="relative z-10 max-w-3xl mx-auto w-full px-8 pr-20 md:px-16 md:pr-24 py-16 pb-32">
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
          className="font-body text-ink-2 leading-[2] text-[1.02rem] whitespace-pre-line mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {content.body}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhotoFrame photo={photo} showCaption={false} hoverStyle="lift" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
