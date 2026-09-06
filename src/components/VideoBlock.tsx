import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Video } from "../data/types";

export function VideoBlock({ video, featured = false, className = "", muted = true }: { video: Video; featured?: boolean; className?: string; muted?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  return (
    <div className={`${featured ? "max-w-2xl mx-auto" : ""} ${className}`}>
      <div className="relative overflow-hidden bg-paper-2">
        {failed ? (
          <div className="aspect-video flex flex-col items-center justify-center gap-3 text-center px-6 bg-paper-2 border border-dashed border-rule">
            <p className="font-body text-xs text-ink-3">video placeholder</p>
            <code className="text-[10px] text-ink-3/60 break-all">{video.src}</code>
          </div>
        ) : (
          <>
            <video ref={ref} src={video.src} poster={video.poster} muted={muted} playsInline preload="metadata"
              onError={() => setFailed(true)} onEnded={() => setPlaying(false)}
              className="w-full max-h-[72vh] object-contain bg-ink"
            />
            <AnimatePresence>
              {!playing && (
                <motion.button
                  className="absolute inset-0 flex items-center justify-center group"
                  onClick={toggle} aria-label="Play video"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-ink/10" />
                  <motion.div
                    className="relative w-14 h-14 rounded-full border border-paper/60 bg-paper/10 flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.1, borderColor: "rgba(212,97,74,0.8)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-paper text-base ml-0.5" aria-hidden="true">▶</span>
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
            {playing && (
              <button onClick={toggle}
                className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-ink/40 flex items-center justify-center text-paper/80 hover:bg-ink/60 transition-colors text-[9px] backdrop-blur-sm"
                aria-label="Pause"
              >❚❚</button>
            )}
          </>
        )}
      </div>
      {(video.caption || video.description) && (
        <div className="mt-4 space-y-1">
          {video.caption && <p className="font-body text-sm text-ink-2">{video.caption}</p>}
          {video.description && <p className="font-body text-xs text-ink-3 leading-relaxed">{video.description}</p>}
        </div>
      )}
    </div>
  );
}
