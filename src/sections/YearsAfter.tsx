import { motion } from "framer-motion";
import type { SiteContent, TimelineEntry } from "../data/types";
import { PhotoFrame } from "../components/PhotoFrame";
import { FilmStrip } from "../components/FilmStrip";

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isEven = index % 2 === 0;
  const accentColors = ["#F4B8C1", "#F5C4A0", "#B8A9D4", "#A8C5A0"];
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-12 border-t border-rule ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={isEven ? "md:text-right" : ""}>
        <div className={`inline-flex items-center gap-2 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-ink-3">{entry.period}</p>
        </div>
        <h3 className="font-display text-display-sm text-ink mb-4 leading-tight">{entry.title}</h3>
        <p className="font-body text-sm text-ink-2 leading-[1.9]">{entry.description}</p>
      </div>
      {entry.photo ? (
        <motion.div whileHover={{ scale: 1.02, rotate: 0.5 }} transition={{ duration: 0.3 }}>
          <PhotoFrame photo={entry.photo} hoverStyle="lift" />
        </motion.div>
      ) : (
        <div
          className="hidden md:flex items-center justify-center rounded-3xl h-48 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)`, border: `1px solid ${accent}40` }}
          aria-hidden="true"
        >
          <span className="font-display italic text-5xl" style={{ color: `${accent}60` }}>{entry.period}</span>
        </div>
      )}
    </motion.div>
  );
}

export function YearsAfter({ content }: { content: SiteContent["everythingAfter"] }) {
  return (
    <div
      className="min-h-screen pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #EFF6ED 60%, #FBF8F3 100%)" }}
    >
      {/* Film strip scrolling at top */}
      <div className="sticky top-0 z-10 pt-4 pb-2 opacity-60">
        <FilmStrip />
      </div>

      <div className="max-w-wide mx-auto px-8 md:px-16">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase mb-6"
          style={{ color: "#A8C5A0" }}
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
          className="font-body text-ink-3 text-sm mb-8 max-w-measure"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {content.intro}
        </motion.p>
        <div>
          {content.entries.map((entry, i) => <Entry key={i} entry={entry} index={i} />)}
        </div>
      </div>
    </div>
  );
}
