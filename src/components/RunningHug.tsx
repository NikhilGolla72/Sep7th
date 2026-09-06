import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

/**
 * A boy and girl running toward each other and hugging tightly.
 * Tap to trigger the animation.
 */
export function RunningHug() {
  const [stage, setStage] = useState<"idle" | "running" | "hugging">("idle");
  const reduce = useReducedMotion();

  const trigger = () => {
    if (stage !== "idle") { setStage("idle"); return; }
    setStage("running");
    setTimeout(() => setStage("hugging"), reduce ? 0 : 2200);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStage("running");
      setTimeout(() => setStage("hugging"), reduce ? 0 : 2200);
    }, reduce ? 0 : 600);
    return () => clearTimeout(t);
  }, [reduce]);

  const isRunning = stage === "running";
  const isHugging = stage === "hugging";

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div style={{ width: 280, height: 140 }} className="relative cursor-pointer" onClick={trigger}>
        <svg width="280" height="140" viewBox="0 0 280 140" fill="none">

          {/* ── Ground line ─────────────────────────────────── */}
          <line x1="10" y1="118" x2="270" y2="118" stroke="#E7DDD1" strokeWidth="1.5" />

          {/* ── GIRL (left side, runs right) ─────────────────── */}
          <motion.g
            animate={
              isRunning ? { x: [0, 60, 80], transition: { duration: 2, ease: [0.16,1,0.3,1] } }
              : isHugging ? { x: 82 }
              : { x: 0 }
            }
          >
            {/* Frock */}
            <motion.path
              d="M 38 80 C 28 88, 24 102, 26 114 C 30 120, 46 122, 52 118 C 56 110, 54 96, 48 80 Z"
              fill="#E8715A"
              animate={isRunning ? {
                d: [
                  "M 38 80 C 28 88, 24 102, 26 114 C 30 120, 46 122, 52 118 C 56 110, 54 96, 48 80 Z",
                  "M 38 80 C 24 86, 20 98, 22 112 C 26 120, 44 122, 52 118 C 58 108, 58 94, 48 80 Z",
                  "M 38 80 C 28 88, 24 102, 26 114 C 30 120, 46 122, 52 118 C 56 110, 54 96, 48 80 Z",
                ]
              } : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Girl body */}
            <rect x="38" y="64" width="14" height="20" rx="4" fill="#E8715A" />
            {/* Girl head */}
            <ellipse cx="45" cy="52" rx="11" ry="12" fill="#F5CBA7" />
            {/* Girl hair */}
            <path d="M 34 46 C 34 36, 40 30, 45 30 C 50 30, 57 34, 57 46 C 54 38, 36 38, 34 46 Z" fill="#D4A54A" />
            {/* Hair flowing back when running */}
            <motion.path
              d="M 34 42 C 28 38, 26 44, 30 50"
              stroke="#C8963A" strokeWidth="3" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 34 42 C 28 38, 26 44, 30 50",
                "M 34 42 C 24 36, 20 44, 26 52",
                "M 34 42 C 28 38, 26 44, 30 50",
              ]} : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Girl face */}
            <circle cx="41" cy="52" r="1.5" fill="#4A2E1A" />
            <circle cx="49" cy="52" r="1.5" fill="#4A2E1A" />
            <path d="M 41 57 Q 45 61 49 57" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <ellipse cx="40" cy="55" rx="3" ry="2" fill="#F4B8C1" opacity="0.5" />
            <ellipse cx="50" cy="55" rx="3" ry="2" fill="#F4B8C1" opacity="0.5" />

            {/* Girl arms running */}
            <motion.path
              d="M 40 70 C 34 66, 30 62, 28 58"
              stroke="#F5CBA7" strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 40 70 C 34 66, 30 62, 28 58",
                "M 40 70 C 36 74, 34 78, 32 80",
                "M 40 70 C 34 66, 30 62, 28 58",
              ]} : isHugging ? { d: "M 40 70 C 52 68, 60 70, 66 72" } : {}}
              transition={{ duration: 0.4, repeat: isRunning ? Infinity : 0 }}
            />
            <motion.path
              d="M 50 70 C 56 74, 58 78, 58 82"
              stroke="#F5CBA7" strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 50 70 C 56 74, 58 78, 58 82",
                "M 50 70 C 54 66, 56 62, 56 58",
                "M 50 70 C 56 74, 58 78, 58 82",
              ]} : isHugging ? { d: "M 50 70 C 58 68, 64 68, 70 66" } : {}}
              transition={{ duration: 0.4, repeat: isRunning ? Infinity : 0, delay: 0.2 }}
            />

            {/* Girl legs running */}
            <motion.path
              d="M 42 100 C 40 108, 38 112, 36 118"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 42 100 C 40 108, 38 112, 36 118",
                "M 42 100 C 44 106, 46 110, 48 116",
                "M 42 100 C 40 108, 38 112, 36 118",
              ]} : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            <motion.path
              d="M 48 100 C 50 108, 52 112, 54 118"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 48 100 C 50 108, 52 112, 54 118",
                "M 48 100 C 46 106, 44 110, 42 116",
                "M 48 100 C 50 108, 52 112, 54 118",
              ]} : {}}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
            />
          </motion.g>

          {/* ── BOY (right side, runs left) ──────────────────── */}
          <motion.g
            animate={
              isRunning ? { x: [0, -60, -78], transition: { duration: 2, ease: [0.16,1,0.3,1] } }
              : isHugging ? { x: -80 }
              : { x: 0 }
            }
          >
            {/* Boy shirt */}
            <rect x="222" y="64" width="16" height="24" rx="4" fill="#4361EE" opacity="0.8" />
            {/* Boy pants */}
            <rect x="222" y="86" width="7" height="30" rx="3" fill="#2C1810" />
            <rect x="229" y="86" width="7" height="30" rx="3" fill="#2C1810" />
            {/* Boy shoes */}
            <ellipse cx="225" cy="117" rx="6" ry="3" fill="#1C1917" />
            <ellipse cx="233" cy="117" rx="6" ry="3" fill="#1C1917" />
            {/* Boy head */}
            <ellipse cx="230" cy="52" rx="11" ry="12" fill="#F5CBA7" />
            {/* Boy hair */}
            <path d="M 219 44 C 220 36, 226 32, 230 32 C 234 32, 240 36, 241 44 C 237 38, 223 38, 219 44 Z" fill="#8B4513" />
            {/* Boy face */}
            <circle cx="226" cy="52" r="1.5" fill="#4A2E1A" />
            <circle cx="234" cy="52" r="1.5" fill="#4A2E1A" />
            <path d="M 226 57 Q 230 61 234 57" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <ellipse cx="225" cy="55" rx="3" ry="2" fill="#F4B8C1" opacity="0.4" />
            <ellipse cx="235" cy="55" rx="3" ry="2" fill="#F4B8C1" opacity="0.4" />

            {/* Boy arms */}
            <motion.path
              d="M 222 72 C 216 68, 212 64, 210 60"
              stroke="#F5CBA7" strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 222 72 C 216 68, 212 64, 210 60",
                "M 222 72 C 218 76, 216 80, 214 84",
                "M 222 72 C 216 68, 212 64, 210 60",
              ]} : isHugging ? { d: "M 222 72 C 210 70, 202 68, 196 66" } : {}}
              transition={{ duration: 0.4, repeat: isRunning ? Infinity : 0 }}
            />
            <motion.path
              d="M 236 72 C 242 76, 246 80, 248 84"
              stroke="#F5CBA7" strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 236 72 C 242 76, 246 80, 248 84",
                "M 236 72 C 240 68, 244 64, 246 60",
                "M 236 72 C 242 76, 246 80, 248 84",
              ]} : isHugging ? { d: "M 236 72 C 224 68, 212 66, 204 64" } : {}}
              transition={{ duration: 0.4, repeat: isRunning ? Infinity : 0, delay: 0.2 }}
            />

            {/* Boy legs */}
            <motion.path
              d="M 226 100 C 224 108, 222 112, 220 118"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 226 100 C 224 108, 222 112, 220 118",
                "M 226 100 C 228 106, 230 110, 232 116",
                "M 226 100 C 224 108, 222 112, 220 118",
              ]} : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            <motion.path
              d="M 234 100 C 236 108, 238 112, 240 118"
              stroke="#F5CBA7" strokeWidth="4" strokeLinecap="round" fill="none"
              animate={isRunning ? { d: [
                "M 234 100 C 236 108, 238 112, 240 118",
                "M 234 100 C 232 106, 230 110, 228 116",
                "M 234 100 C 236 108, 238 112, 240 118",
              ]} : {}}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
            />
          </motion.g>

          {/* ── Hug heart ───────────────────────────────────── */}
          <AnimatePresence>
            {isHugging && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{ transformOrigin: "140px 40px" }}
                transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
              >
                <path d="M 140 48 C 140 44, 136 40, 132 40 C 128 40, 126 44, 126 48 C 126 56, 140 64, 140 64 C 140 64, 154 56, 154 48 C 154 44, 152 40, 148 40 C 144 40, 140 44, 140 48 Z" fill="#E8715A" />
                {/* Heart sparkles */}
                {[[-14,-8],[14,-8],[0,-16],[-10,4],[10,4]].map(([dx,dy],i) => (
                  <motion.circle key={i} cx={140+dx} cy={52+dy} r="2.5"
                    fill={["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0","#F5C4A0"][i]}
                    animate={{ opacity: [0,1,0], scale: [0,1.2,0] }}
                    transition={{ duration: 0.8, delay: 0.6 + i*0.1, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── Speed lines when running ──────────────────────── */}
          {isRunning && [55,62,70,78].map((y,i) => (
            <motion.g key={i}>
              <motion.line x1="95" y1={y} x2="130" y2={y}
                stroke={["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0"][i]}
                strokeWidth="1.2" strokeLinecap="round" opacity="0.5"
                animate={{ x1:[95,80,95], opacity:[0,0.5,0] }}
                transition={{ duration: 0.6, delay: i*0.1, repeat: Infinity }}
              />
            </motion.g>
          ))}

        </svg>

        {/* Tap hint */}
        {stage === "idle" && (
          <motion.p
            className="absolute bottom-0 left-0 right-0 text-center font-body text-[9px] tracking-widest uppercase text-ink-3/40"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            watch them find each other
          </motion.p>
        )}
        {stage === "hugging" && (
          <motion.p
            className="absolute bottom-0 left-0 right-0 text-center font-body text-[9px] tracking-widest uppercase text-ink-3/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            tap to reset
          </motion.p>
        )}
      </div>
    </div>
  );
}
