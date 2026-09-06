import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteContent } from "../data/types";
import { VideoBlock } from "../components/VideoBlock";
import { RibbonUnwrap } from "../components/RibbonUnwrap";

export function PersonalVideo({ content }: { content: SiteContent["forYou"] }) {
  const [unwrapped, setUnwrapped] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 40%, #F5F2FA 100%)" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(244,184,193,0.18) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        {!unwrapped ? (
          /* Gift unwrap experience before video */
          <div>
            <motion.p
              className="font-body text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c26b7a" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {content.label}
            </motion.p>
            <motion.h2
              className="font-display text-display-md text-ink text-balance leading-tight mb-10"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.heading}
            </motion.h2>
            <RibbonUnwrap onDone={() => setUnwrapped(true)} />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="inline-block mb-6 px-4 py-1.5 rounded-full font-body text-[10px] tracking-[0.4em] uppercase"
                style={{ background: "rgba(244,184,193,0.3)", color: "#c26b7a" }}
              >
                just for you
              </div>

              <h2 className="font-display text-display-md text-ink text-balance leading-tight mb-4">
                {content.heading}
              </h2>

              {content.intro && (
                <p className="font-body text-ink-3 text-sm mb-12">{content.intro}</p>
              )}

              {/* Rainbow gradient border ring around video */}
              <div
                className="relative p-[2px] rounded-3xl"
                style={{ background: "linear-gradient(135deg, #F4B8C1, #D4A54A, #B8A9D4, #A8C5A0)" }}
              >
                <div className="rounded-[22px] overflow-hidden bg-cream">
                  <VideoBlock video={content.video} featured />
                </div>
              </div>

              <motion.p
                className="mt-12 font-display italic text-xl text-ink-2/70"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
              >
                {content.closingLine}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
