import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { VideoBlock } from "../components/VideoBlock";

export function PersonalVideo({ content }: { content: SiteContent["forYou"] }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 pr-20 md:px-16 md:pr-24 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, rgba(251,248,243,0.7) 0%, rgba(253,242,244,0.62) 40%, rgba(245,242,250,0.7) 100%)" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(244,184,193,0.18) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-display-md text-ink text-balance leading-tight mb-10">
            {content.heading}
          </h2>

          <div
            className="relative p-[2px] rounded-3xl"
            style={{ background: "linear-gradient(135deg, #F4B8C1, #D4A54A, #B8A9D4, #A8C5A0)" }}
          >
            <div className="rounded-[22px] overflow-hidden bg-cream">
              <VideoBlock video={content.video} featured />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
