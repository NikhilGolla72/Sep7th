import { motion, useReducedMotion } from "framer-motion";

export function Hourglass() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
        {/* Frame */}
        <path d="M 10 5 L 70 5 L 70 10 L 45 55 L 70 100 L 70 115 L 10 115 L 10 100 L 35 55 L 10 10 Z"
          stroke="#C8B8A8" strokeWidth="1.5" fill="rgba(253,242,244,0.4)" strokeLinejoin="round"
        />
        {/* Top cap */}
        <rect x="8" y="3" width="64" height="8" rx="3" fill="#C8B8A8" opacity="0.6" />
        {/* Bottom cap */}
        <rect x="8" y="109" width="64" height="8" rx="3" fill="#C8B8A8" opacity="0.6" />

        {/* Top sand — depletes */}
        <motion.path
          d="M 15 13 L 65 13 L 43 53 L 37 53 Z"
          fill="rgba(212,165,74,0.5)"
          initial={{ scaleY: 1, originY: "13px" }}
          animate={reduce ? {} : { scaleY: [1, 0] }}
          transition={{ duration: 6, delay: 1, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: "40px 13px" }}
        />

        {/* Falling sand stream */}
        <motion.line
          x1="40" y1="52" x2="40" y2="66"
          stroke="rgba(212,165,74,0.6)" strokeWidth="2" strokeLinecap="round"
          animate={reduce ? {} : { opacity: [0.3, 0.8, 0.3], pathLength: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom sand — fills */}
        <motion.path
          d="M 37 57 L 43 57 L 65 105 L 15 105 Z"
          fill="rgba(212,165,74,0.4)"
          initial={{ scaleY: 0, originY: "105px" }}
          animate={reduce ? {} : { scaleY: [0, 1] }}
          transition={{ duration: 6, delay: 1, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: "40px 105px" }}
        />
      </svg>
    </div>
  );
}
