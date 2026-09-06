import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { PolaroidReveal } from "../components/PolaroidReveal";

export function Beginning({ content }: { content: SiteContent["whereItStarted"] }) {
  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF8EC 50%, #FDF6EF 100%)" }}
    >
      {/* Soft ambient dots floating */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${12 + i * 18}%`,
            top: `${15 + (i % 3) * 28}%`,
            width: 8 + i * 3,
            height: 8 + i * 3,
            background: `hsla(${35 + i * 20}, 60%, 78%, 0.18)`,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-wide mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text */}
          <div>
            <motion.p
              className="font-body text-[10px] tracking-[0.4em] uppercase mb-8"
              style={{ color: "#D4A54A" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {content.label}
            </motion.p>
            <motion.h2
              className="font-display text-display-md text-ink text-balance leading-tight mb-10"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.heading}
            </motion.h2>
            <motion.p
              className="font-body text-ink-2 leading-[1.9] text-[0.95rem] max-w-measure mb-10"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {content.body}
            </motion.p>
            <motion.div
              className="pl-5 border-l-2 border-gold/40"
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              <p className="font-display italic text-lg text-ink-2/80 leading-relaxed">
                {content.memory}
              </p>
            </motion.div>
          </div>

          {/* Polaroid that develops on shake */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <PolaroidReveal
              photo={content.photo}
              caption={content.photo.caption}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
