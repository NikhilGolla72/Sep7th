import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { SiteContent } from "../data/types";
import { PhotoFrame } from "../components/PhotoFrame";
import { RunningHug } from "../components/RunningHug";

interface Spark { id: number; angle: number; color: string; dist: number; size: number; }
const SPARK_COLORS = ["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0","#E8715A","#A0C4E8","#F5C4A0"];

function MeetingPoint() {
  const [bloomed, setBloomed] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const reduce = useReducedMotion();

  const trigger = () => {
    if (reduce) return;
    setBloomed(true);
    // Generate firework sparks
    const newSparks: Spark[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i / 24) * 360,
      color: SPARK_COLORS[i % SPARK_COLORS.length],
      dist: 28 + Math.random() * 22,
      size: 3 + Math.random() * 4,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 1200);
    setTimeout(() => setBloomed(false), 3000);
  };

  return (
    <div className="relative flex items-center justify-center my-10" aria-label="The moment we found each other">
      <svg viewBox="0 0 320 80" fill="none" className="w-72" aria-hidden="true">
        <motion.path d="M 0 20 C 70 20, 120 60, 160 60"
          stroke="#E8715A" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.6, ease: [0.16,1,0.3,1], delay: 0.3 }}
        />
        <motion.path d="M 320 60 C 250 60, 200 60, 160 60"
          stroke="#F4B8C1" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.6, ease: [0.16,1,0.3,1], delay: 0.6 }}
        />
      </svg>

      {/* Clickable dot with fireworks */}
      <div className="absolute" style={{ left: "calc(50% - 20px)", top: "calc(50% + 8px)" }}>
        <motion.button
          className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={trigger}
          aria-label="Tap to celebrate this moment"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulse rings */}
          {[1,2,3].map((i) => (
            <motion.span key={i}
              className="absolute inset-0 rounded-full border border-coral/25"
              animate={reduce ? {} : { scale: [1, 2.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, delay: i * 0.55, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
          ))}

          {/* Center dot */}
          <motion.span
            className="w-5 h-5 rounded-full relative z-10"
            style={{ background: "linear-gradient(135deg, #E8715A, #F4B8C1)" }}
            animate={bloomed ? {
              scale: [1, 1.8, 1.2, 1],
              boxShadow: ["0 0 0 0 rgba(232,113,90,0)", "0 0 20px 8px rgba(232,113,90,0.4)", "0 0 8px 2px rgba(232,113,90,0.2)", "0 0 0 0 rgba(232,113,90,0)"]
            } : {}}
            transition={{ duration: 0.7 }}
            aria-hidden="true"
          />

          {/* Firework sparks */}
          <AnimatePresence>
            {sparks.map((spark) => {
              const rad = (spark.angle * Math.PI) / 180;
              return (
                <motion.span
                  key={spark.id}
                  className="absolute rounded-full"
                  style={{
                    width: spark.size, height: spark.size,
                    background: spark.color,
                    top: "50%", left: "50%",
                    marginTop: -spark.size / 2,
                    marginLeft: -spark.size / 2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(rad) * spark.dist * 2,
                    y: Math.sin(rad) * spark.dist * 2,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  aria-hidden="true"
                />
              );
            })}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

export function Reconnection({ content }: { content: SiteContent["september7"] }) {
  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 60%, #FBF8F3 100%)" }}
    >
      {/* Watermark date */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display font-bold leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(244,184,193,0.1)", letterSpacing: "-0.05em" }}
        >
          {content.date}
        </span>
      </div>

      {/* Floating petals in background */}
      {["8%","85%","15%","75%","50%"].map((left, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left,
            top: `${15 + i * 15}%`,
            width: 10 + i * 2,
            height: (10 + i * 2) * 0.6,
            background: ["#F4B8C1","#F5C4A0","#B8A9D4","#A8C5A0","#F4B8C1"][i],
            borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%",
            rotate: i * 45,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.6, 0.3], rotate: [i * 45, i * 45 + 20, i * 45] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-wide mx-auto w-full">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-coral mb-5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {content.label}
        </motion.p>

        <motion.h2
          className="font-display text-display-lg text-ink text-balance leading-tight mb-2"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16,1,0.3,1] }}
        >
          {content.heading}
        </motion.h2>

        {/* The date large */}
        <motion.p
          className="font-display italic mb-4"
          style={{ fontSize: "clamp(2rem,5vw,4rem)", color: "rgba(232,113,90,0.2)", lineHeight: 1 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          aria-hidden="true"
        >
          {content.date}
        </motion.p>

        <MeetingPoint />

        {/* Running hug animation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <RunningHug />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <motion.p
              className="font-body text-ink-2 leading-[1.9] text-[0.95rem] mb-8 max-w-measure"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 }}
            >
              {content.story}
            </motion.p>
            {content.note && (
              <motion.div
                className="pl-5 border-l-2 border-rose"
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="font-display italic text-xl text-ink-2/80 leading-relaxed">{content.note}</p>
              </motion.div>
            )}
          </div>

          {content.photo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16,1,0.3,1] }}
            >
              <PhotoFrame photo={content.photo} showCaption hoverStyle="lift" />
            </motion.div>
          )}
        </div>

        <motion.p
          className="mt-8 text-center font-body text-xs text-ink-3/40"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          tap the glowing dot ✦
        </motion.p>
      </div>
    </div>
  );
}
