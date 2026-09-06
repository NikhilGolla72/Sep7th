import { motion, useReducedMotion } from "framer-motion";

type Mood =
  | "sparkle"
  | "school"
  | "cozy"
  | "secret"
  | "quiet"
  | "bloom"
  | "film"
  | "sky"
  | "ink"
  | "archive"
  | "cinema"
  | "letter"
  | "gift"
  | "finale";

const MOODS: Mood[] = [
  "sparkle", "school", "quiet", "bloom", "film",
  "cozy", "archive", "cinema", "secret", "sky",
  "gift", "finale",
];

const PALETTES: Record<Mood, string[]> = {
  sparkle: ["#F4B8C1", "#D4A54A", "#B8A9D4", "#E8715A"],
  school:  ["#D4A54A", "#F5C4A0", "#A8C5A0", "#F4B8C1"],
  cozy:    ["#F4B8C1", "#F5C4A0", "#E8715A", "#D4A54A"],
  secret:  ["#B8A9D4", "#A0C4E8", "#F4B8C1", "#D4A54A"],
  quiet:   ["#C4B8AE", "#B8A9D4", "#A8A29E", "#E7DDD1"],
  bloom:   ["#E8715A", "#F4B8C1", "#D4A54A", "#A8C5A0"],
  film:    ["#A8C5A0", "#F5C4A0", "#D4A54A", "#F4B8C1"],
  sky:     ["#A0C4E8", "#B8A9D4", "#F4B8C1", "#A8C5A0"],
  ink:     ["#B8A9D4", "#F4B8C1", "#8B7355", "#D4A54A"],
  archive: ["#D4A54A", "#F5C4A0", "#F4B8C1", "#A0C4E8"],
  cinema:  ["#E8715A", "#F4B8C1", "#1C1917", "#D4A54A"],
  letter:  ["#F4B8C1", "#E8715A", "#D4A54A", "#B8A9D4"],
  gift:    ["#E8715A", "#F4B8C1", "#B8A9D4", "#D4A54A"],
  finale:  ["#F4B8C1", "#D4A54A", "#A8C5A0", "#E8715A"],
};

function Cloud({ x, y, delay, scale = 1 }: { x: string; y: string; delay: number; scale?: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width={110 * scale}
      height={48 * scale}
      viewBox="0 0 110 48"
      fill="none"
      animate={{ x: [0, 18, 0], y: [0, -6, 0] }}
      transition={{ duration: 14 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <ellipse cx="38" cy="28" rx="28" ry="16" fill="#FFFBF9" fillOpacity="0.7" />
      <ellipse cx="62" cy="24" rx="24" ry="18" fill="#FFFBF9" fillOpacity="0.8" />
      <ellipse cx="82" cy="30" rx="18" ry="12" fill="#FFFBF9" fillOpacity="0.65" />
    </motion.svg>
  );
}

function Heart({ x, y, delay, color, size }: { x: string; y: string; delay: number; color: string; size: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      animate={{ y: [0, -16, 0], rotate: [-8, 8, -8], opacity: [0.25, 0.7, 0.25] }}
      transition={{ duration: 5.5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <path
        d="M12 20s-7.2-4.4-9.2-8.4C1 8.6 2.4 5 6 5c2 0 3.2 1.2 4 2.2C10.8 6.2 12 5 14 5c3.6 0 5 3.6 3.2 6.6C19.2 15.6 12 20 12 20z"
        fill={color}
      />
    </motion.svg>
  );
}

function Sparkle({ x, y, delay, color }: { x: string; y: string; delay: number; color: string }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      animate={{ rotate: [0, 90, 180], scale: [0.4, 1.15, 0.4], opacity: [0.15, 0.9, 0.15] }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <path d="M9 1 L10.2 7.2 L16.5 9 L10.2 10.8 L9 17 L7.8 10.8 L1.5 9 L7.8 7.2 Z" fill={color} />
    </motion.svg>
  );
}

function Flower({ x, y, delay, color }: { x: string; y: string; delay: number; color: string }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y, transformOrigin: "center bottom" }}
      width="36"
      height="48"
      viewBox="0 0 36 48"
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <line x1="18" y1="22" x2="18" y2="46" stroke="#A8C5A0" strokeWidth="1.6" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="18"
          cy="14"
          rx="5"
          ry="9"
          fill={color}
          fillOpacity="0.7"
          transform={`rotate(${deg} 18 14)`}
        />
      ))}
      <circle cx="18" cy="14" r="3.4" fill="#D4A54A" />
    </motion.svg>
  );
}

function Firefly({ x, y, delay, color }: { x: string; y: string; delay: number; color: string }) {
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: 5, height: 5, background: color, boxShadow: `0 0 10px 4px ${color}` }}
      animate={{ x: [0, 28, -12, 18, 0], y: [0, -22, 10, -8, 0], opacity: [0.15, 0.85, 0.25, 0.7, 0.15] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function Moon() {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ right: "8%", top: "10%" }}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="16" fill="#FDF8EC" />
      <circle cx="34" cy="24" r="14" fill="#FBF8F3" fillOpacity="0.92" />
      <circle cx="22" cy="30" r="2" fill="#E7DDD1" />
      <circle cx="26" cy="36" r="1.4" fill="#E7DDD1" />
    </motion.svg>
  );
}

function Pencil({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width="28"
      height="80"
      viewBox="0 0 28 80"
      animate={{ rotate: [-8, 6, -8], y: [0, -8, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <rect x="10" y="8" width="8" height="52" rx="1" fill="#F5C4A0" />
      <rect x="10" y="8" width="8" height="10" fill="#E8715A" />
      <polygon points="10,60 18,60 14,74" fill="#F4B8C1" />
      <polygon points="12.5,70 15.5,70 14,74" fill="#1C1917" />
    </motion.svg>
  );
}

function EnvelopeDoodle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width="52"
      height="36"
      viewBox="0 0 52 36"
      animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <rect x="2" y="8" width="48" height="26" rx="3" fill="#FDF2F4" stroke="#F4B8C1" />
      <path d="M2 8 L26 22 L50 8" stroke="#E8715A" strokeWidth="1.2" fill="none" />
    </motion.svg>
  );
}

function GiftBox({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width="40"
      height="44"
      viewBox="0 0 40 44"
      animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 6.5, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <rect x="6" y="16" width="28" height="22" rx="3" fill="#F4B8C1" />
      <rect x="4" y="12" width="32" height="8" rx="2" fill="#E8715A" />
      <rect x="18" y="12" width="4" height="26" fill="#D4A54A" />
      <path d="M20 12 C14 4, 8 8, 14 14" stroke="#D4A54A" fill="none" strokeWidth="1.6" />
      <path d="M20 12 C26 4, 32 8, 26 14" stroke="#D4A54A" fill="none" strokeWidth="1.6" />
    </motion.svg>
  );
}

function Kite({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width="48"
      height="72"
      viewBox="0 0 48 72"
      animate={{ y: [0, -14, 0], x: [0, 10, 0], rotate: [-6, 8, -6] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <polygon points="24,4 40,24 24,32 8,24" fill="#A0C4E8" fillOpacity="0.75" />
      <polygon points="24,4 40,24 24,32" fill="#F4B8C1" fillOpacity="0.55" />
      <path d="M24 32 C20 44, 30 52, 18 68" stroke="#E7DDD1" strokeWidth="1.2" fill="none" />
    </motion.svg>
  );
}

export function CuteBackdrop({ chapterIndex }: { chapterIndex: number }) {
  const reduce = useReducedMotion();
  const mood = MOODS[chapterIndex] ?? "sparkle";
  const colors = PALETTES[mood];

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      <Cloud x="4%" y="8%" delay={0} scale={1.1} />
      <Cloud x="72%" y="14%" delay={2.2} scale={0.85} />
      <Cloud x="40%" y="78%" delay={1.1} scale={0.7} />

      {(mood === "sparkle" || mood === "quiet" || mood === "finale" || mood === "bloom") && <Moon />}

      {mood === "school" && (
        <>
          <Pencil x="88%" y="62%" delay={0.4} />
          <Pencil x="6%" y="55%" delay={1.6} />
        </>
      )}

      {(mood === "letter" || mood === "secret") && (
        <>
          <EnvelopeDoodle x="8%" y="72%" delay={0.2} />
          <EnvelopeDoodle x="82%" y="18%" delay={1.4} />
        </>
      )}

      {(mood === "gift" || mood === "finale") && (
        <>
          <GiftBox x="10%" y="20%" delay={0.3} />
          <GiftBox x="84%" y="68%" delay={1.1} />
        </>
      )}

      {(mood === "sky" || mood === "film") && <Kite x="78%" y="8%" delay={0.6} />}

      <Heart x="12%" y="28%" delay={0} color={colors[0]} size={18} />
      <Heart x="86%" y="36%" delay={1.1} color={colors[1]} size={14} />
      <Heart x="22%" y="74%" delay={0.6} color={colors[2]} size={16} />
      <Heart x="68%" y="82%" delay={1.8} color={colors[3]} size={12} />
      <Heart x="48%" y="12%" delay={2.2} color={colors[0]} size={11} />

      <Sparkle x="18%" y="16%" delay={0.2} color={colors[1]} />
      <Sparkle x="90%" y="22%" delay={0.9} color={colors[0]} />
      <Sparkle x="8%" y="58%" delay={1.4} color={colors[2]} />
      <Sparkle x="76%" y="58%" delay={0.5} color={colors[3]} />
      <Sparkle x="54%" y="88%" delay={1.7} color={colors[0]} />
      <Sparkle x="38%" y="42%" delay={0.8} color={colors[1]} />

      <Flower x="2%" y="78%" delay={0.3} color={colors[0]} />
      <Flower x="92%" y="74%" delay={1.2} color={colors[2]} />

      <Firefly x="30%" y="30%" delay={0} color={colors[0]} />
      <Firefly x="70%" y="48%" delay={1.5} color={colors[1]} />
      <Firefly x="16%" y="62%" delay={2.4} color={colors[3]} />
      <Firefly x="58%" y="18%" delay={0.7} color={colors[2]} />
    </div>
  );
}
