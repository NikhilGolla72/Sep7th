import { motion } from "framer-motion";
import type { SiteContent, MemoryFragment } from "../data/types";
import { PhotoFrame } from "../components/PhotoFrame";
import { FairyLights } from "../components/FairyLights";

const NOTE_STYLES = [
  { bg: "#FDF2F4", border: "#F4B8C1", text: "#c26b7a" },
  { bg: "#FDF8EC", border: "#D4A54A", text: "#a07828" },
  { bg: "#F5F2FA", border: "#B8A9D4", text: "#7a6aaa" },
  { bg: "#EFF6ED", border: "#A8C5A0", text: "#5a8a52" },
];

function NoteCard({ fragment, index }: { fragment: MemoryFragment; index: number }) {
  const style = NOTE_STYLES[index % NOTE_STYLES.length];
  return (
    <motion.div
      className="rounded-2xl p-6 flex flex-col justify-center min-h-[140px]"
      style={{ background: style.bg, border: `1.5px solid ${style.border}` }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-display italic text-xl leading-relaxed" style={{ color: style.text }}>
        "{fragment.note}"
      </p>
      {fragment.caption && (
        <p className="mt-3 font-body text-xs text-ink-3">{fragment.caption}</p>
      )}
    </motion.div>
  );
}

export function LittleMoments({ content }: { content: SiteContent["smallThings"] }) {
  return (
    <div
      className="min-h-screen px-8 md:px-16 pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 40%, #FDF8EC 100%)" }}
    >
      {/* Fairy lights at top — the signature animation */}
      <div className="sticky top-0 z-10 pt-6">
        <FairyLights />
      </div>

      <div className="max-w-wide mx-auto mt-10">
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
        <motion.p
          className="font-body text-ink-3 text-sm mb-14 max-w-measure"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {content.intro}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.fragments.map((fragment, i) => (
            fragment.type === "photo" && fragment.photo ? (
              <motion.div
                key={i}
                className={i % 5 === 0 ? "sm:col-span-2" : ""}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <PhotoFrame photo={fragment.photo} showCaption hoverStyle="lift" />
              </motion.div>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <NoteCard fragment={fragment} index={i} />
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
