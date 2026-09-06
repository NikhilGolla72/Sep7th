import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { VideoBlock } from "../components/VideoBlock";
import { FilmReel } from "../components/FilmReel";

export function MovingMemories({ content }: { content: SiteContent["movingMemories"] }) {
  return (
    <div
      className="min-h-screen px-8 pr-20 md:px-16 md:pr-24 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, rgba(251,248,243,0.7) 0%, rgba(253,242,244,0.64) 50%, rgba(253,246,239,0.7) 100%)" }}
    >
      {/* Decorative film reels in corners */}
      <div className="absolute top-8 right-8 opacity-15 pointer-events-none" aria-hidden="true">
        <FilmReel size={100} />
      </div>
      <div className="absolute bottom-16 left-8 opacity-10 pointer-events-none" aria-hidden="true">
        <FilmReel size={60} />
      </div>

      {/* Soft ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(244,184,193,0.08) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="max-w-wide mx-auto relative z-10">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-rose-deep mb-6"
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
        {content.intro && (
          <motion.p
            className="font-body text-ink-3 text-sm mb-14 max-w-measure"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {content.intro}
          </motion.p>
        )}

        <div className="grid gap-10">
          {content.videos.map((video, i) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <VideoBlock video={video} featured={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
