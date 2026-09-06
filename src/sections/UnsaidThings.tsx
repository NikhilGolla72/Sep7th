import { motion } from "framer-motion";
import type { SiteContent } from "../data/types";
import { InkDrop } from "../components/InkDrop";

function AnimatedParagraph({ text, baseDelay }: { text: string; baseDelay: number }) {
  const words = text.split(" ");
  return (
    <p className="font-body text-[1.05rem] text-ink-2 leading-[2]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.27em]"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: baseDelay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function UnsaidThings({ content }: { content: SiteContent["thingsDontSay"] }) {
  const paragraphs = content.message.split(/\n\s*\n/).filter(Boolean);

  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #F5F2FA 60%, #FBF8F3 100%)" }}
    >
      {/* Ink drop spreading in background */}
      <InkDrop />

      <div className="relative z-10 max-w-xl mx-auto w-full">
        <motion.h2
          className="font-display text-display-md text-ink text-balance leading-tight mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {content.heading}
        </motion.h2>

        <div className="space-y-8">
          {paragraphs.map((para, i) => (
            <AnimatedParagraph key={i} text={para} baseDelay={i * 0.3} />
          ))}
        </div>
      </div>
    </div>
  );
}
