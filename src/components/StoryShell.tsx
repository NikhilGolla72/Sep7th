import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { UseStoryReturn } from "../hooks/useStory";

interface Petal {
  id: number; x: number; size: number; color: string;
  duration: number; delay: number; rotate: number; drift: number;
}

const PETAL_COLORS = ["#F4B8C1","#F5C4A0","#E8715A","#D4A54A","#B8A9D4","#A8C5A0"];

function PetalBurst({ active }: { active: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    if (!active) return;
    setPetals(Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      size: 8 + Math.random() * 10,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      duration: 2.5 + Math.random() * 2,
      delay: Math.random() * 0.6,
      rotate: Math.random() * 360,
      drift: (Math.random() - 0.5) * 80,
    })));
    const t = setTimeout(() => setPetals([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 rounded-full"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.6, backgroundColor: p.color, borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%", rotate: p.rotate }}
          initial={{ y: -20, opacity: 1, x: 0 }}
          animate={{ y: "110vh", opacity: 0, x: p.drift, rotate: p.rotate + 540 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0, scale: 0.98 }),
};

interface StoryShellProps {
  story: UseStoryReturn;
  chapters: { id: string; label: string }[];
  children: React.ReactNode[];
}

export function StoryShell({ story, chapters, children }: StoryShellProps) {
  const { current, direction, goTo, next, prev, canNext, canPrev, total } = story;
  const panelRef = useRef<HTMLDivElement>(null);
  const [petalBurst, setPetalBurst] = useState(false);
  const [nextHeld, setNextHeld] = useState(false);

  // Reset scroll on chapter change
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [current]);

  // Swipe
  const touch = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touch.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 55) { dx < 0 ? next() : prev(); }
    touch.current = null;
  };

  const handleNext = () => {
    if (current === 0) { setPetalBurst(true); setTimeout(() => setPetalBurst(false), 100); }
    next();
  };

  return (
    <div
      className="story-viewport bg-cream"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PetalBurst active={petalBurst} />

      {/* Chapter panel */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className="chapter-panel"
          ref={panelRef}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          {children[current]}
        </motion.div>
      </AnimatePresence>

      {/* ── Progress line ────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-cream-3" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-rose to-coral origin-left"
          animate={{ scaleX: (current + 1) / total }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        />
      </div>

      {/* ── Chapter dots — top left ───────────────────────────── */}
      <nav className="fixed top-6 left-6 z-50 flex flex-col gap-1.5" aria-label="Chapters">
        {chapters.map((ch, i) => (
          <motion.button
            key={ch.id}
            onClick={() => goTo(i)}
            aria-label={ch.label}
            aria-current={i === current ? "true" : undefined}
            title={ch.label}
            animate={{
              width: i === current ? 20 : i < current ? 6 : 6,
              backgroundColor: i === current ? "#E8715A" : i < current ? "#F4B8C1" : "#E7DDD1",
              opacity: i === current ? 1 : i < current ? 0.8 : 0.5,
            }}
            transition={{ duration: 0.35 }}
            style={{ height: 5, borderRadius: 3 }}
          />
        ))}
      </nav>

      {/* ── Chapter number — top right ───────────────────────── */}
      <div className="fixed top-6 right-6 z-50 select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            className="font-body text-[11px] tracking-[0.25em] text-ink-3"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Next orb — right side center ─────────────────────── */}
      <AnimatePresence>
        {canNext && (
          <motion.button
            className="next-orb fixed right-6 top-1/2 -translate-y-1/2 z-50"
            onClick={handleNext}
            onMouseEnter={() => setNextHeld(true)}
            onMouseLeave={() => setNextHeld(false)}
            aria-label="Next chapter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rotating ring */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 56 56"
              animate={{ rotate: nextHeld ? 360 : 0 }}
              transition={{ duration: 3, repeat: nextHeld ? Infinity : 0, ease: "linear" }}
              aria-hidden="true"
            >
              <circle cx="28" cy="28" r="26" fill="none" stroke="#F4B8C1" strokeWidth="1" strokeDasharray="4 6" />
            </motion.svg>
            {/* Arrow */}
            <motion.span
              className="text-coral text-lg relative z-10"
              animate={{ x: nextHeld ? 3 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Back orb — left side center (only when not on first) ─ */}
      <AnimatePresence>
        {canPrev && (
          <motion.button
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center text-ink-3 hover:text-coral transition-colors"
            onClick={prev}
            aria-label="Previous chapter"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 0.5, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-sm" aria-hidden="true">←</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chapter name — bottom center ─────────────────────── */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            className="font-body text-[10px] tracking-[0.35em] uppercase text-ink-3/60"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {chapters[current]?.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
