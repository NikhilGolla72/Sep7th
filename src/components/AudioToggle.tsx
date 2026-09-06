import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioToggle({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.addEventListener("canplay", () => setReady(true));
    el.volume = 0.2;
    return () => el.pause();
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || !ready) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <motion.button
        onClick={toggle}
        className="fixed bottom-16 md:bottom-6 right-6 z-50 flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-ink-3 hover:text-coral transition-colors"
        aria-label={playing ? "Pause music" : "Play music"}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span
              key="on"
              className="flex items-end gap-[2px] h-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="w-[2px] bg-coral rounded-full"
                  animate={{ height: ["3px", "10px", "3px", "8px", "3px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </motion.span>
          ) : (
            <motion.span key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              ♪
            </motion.span>
          )}
        </AnimatePresence>
        <span>{label}</span>
      </motion.button>
    </>
  );
}
