import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { UseStoryReturn } from "../hooks/useStory";
import { CuteBackdrop } from "./CuteBackdrop";
import { PageCurl } from "./PageCurl";

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

const dissolve = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

interface StoryShellProps {
  story: UseStoryReturn;
  chapters: { id: string; label: string }[];
  children: React.ReactNode[];
}

export function StoryShell({ story, children }: StoryShellProps) {
  const { current, next, prev, canNext, canPrev, total } = story;
  const panelRef = useRef<HTMLDivElement>(null);
  const [petalBurst, setPetalBurst] = useState(false);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [current]);

  const touch = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, video, input, textarea, [role='dialog']")) {
      touch.current = null;
      return;
    }
    touch.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 70) { dx < 0 ? handleNext() : handlePrev(); }
    touch.current = null;
  };

  const handleNext = () => {
    if (!canNext) return;
    if (current === 0) {
      setPetalBurst(true);
      setTimeout(() => setPetalBurst(false), 100);
    }
    next();
  };

  const handlePrev = () => {
    if (!canPrev) return;
    prev();
  };

  return (
    <div
      className="story-viewport bg-cream"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PetalBurst active={petalBurst} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="chapter-panel"
          ref={panelRef}
          variants={dissolve}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CuteBackdrop chapterIndex={current} />
          {children[current]}
        </motion.div>
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-cream-3" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-rose to-coral"
          animate={{ scaleX: (current + 1) / total }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {canPrev && <PageCurl side="prev" onTurn={handlePrev} />}
      {canNext && <PageCurl side="next" onTurn={handleNext} />}
    </div>
  );
}
