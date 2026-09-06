import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../data/types";

function EnvelopeReveal({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (done) return;
    setOpening(true);
    setTimeout(() => { setDone(true); onOpen(); }, reduce ? 0 : 1800);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.5 }}
        >
          {/* Envelope SVG */}
          <motion.div
            className="relative cursor-pointer"
            onClick={handleOpen}
            whileHover={!opening ? { y: -6, scale: 1.04 } : {}}
            whileTap={!opening ? { scale: 0.97 } : {}}
            animate={opening ? { y: -10 } : {}}
            transition={{ duration: 0.4 }}
            aria-label="Open letter"
          >
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Envelope body */}
              <rect x="4" y="30" width="192" height="106" rx="6"
                fill="#FDF2F4" stroke="#F4B8C1" strokeWidth="1.5"
              />
              {/* Envelope bottom fold lines */}
              <line x1="4" y1="136" x2="100" y2="88" stroke="#F4B8C1" strokeWidth="1" />
              <line x1="196" y1="136" x2="100" y2="88" stroke="#F4B8C1" strokeWidth="1" />

              {/* Flap — animates open */}
              <motion.path
                d="M 4 30 L 100 88 L 196 30 Z"
                fill="#F4B8C1" stroke="#E8715A" strokeWidth="1.5" strokeLinejoin="round"
                style={{ transformOrigin: "100px 30px" }}
                animate={opening ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Letter peeking out when opening */}
              <motion.rect
                x="30" y="40" width="140" height="80" rx="3"
                fill="#FFFBF9" stroke="#E7DDD1" strokeWidth="1"
                initial={{ y: 80, opacity: 0 }}
                animate={opening ? { y: 20, opacity: 1 } : { y: 80, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Letter lines */}
              {[55, 65, 75, 85].map((y, i) => (
                <motion.line
                  key={i} x1="45" y1={y} x2={i === 3 ? 120 : 155} y2={y}
                  stroke="#E7DDD1" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={opening ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 1.1 + i * 0.08 }}
                />
              ))}

              {/* Wax seal */}
              <circle cx="100" cy="88" r="14" fill="#E8715A" />
              <text x="100" y="93" textAnchor="middle" fontSize="12" fill="white" fontFamily="serif">♥</text>
            </svg>

            {/* Glow */}
            {!opening && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(244,184,193,0.35) 0%, transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}
          </motion.div>

          <motion.p
            className="font-body text-xs text-ink-3/60 tracking-[0.2em] uppercase"
            animate={opening ? { opacity: 0 } : { opacity: [0.4, 0.9, 0.4] }}
            transition={opening ? { duration: 0.3 } : { duration: 2, repeat: Infinity }}
          >
            {opening ? "opening…" : "tap to open"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FinalLetter({ content }: { content: SiteContent["theLetter"] }) {
  const [opened, setOpened] = useState(false);
  const paragraphs = content.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <div
      className="min-h-screen flex items-center px-8 md:px-16 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FBF8F3 0%, #FDF2F4 50%, #FDF8EC 100%)" }}
    >
      {/* Soft ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(244,184,193,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-measure mx-auto w-full">
        {!opened ? (
          <EnvelopeReveal onOpen={() => setOpened(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.heading && (
              <h2 className="font-display text-display-sm text-ink mb-12">{content.heading}</h2>
            )}
            <div className="space-y-7">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="font-body text-[0.97rem] text-ink-2 leading-[2.1]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            <motion.p
              className="mt-14 font-hand text-3xl text-coral/80 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: paragraphs.length * 0.1 + 0.3 }}
            >
              {content.signature}
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
