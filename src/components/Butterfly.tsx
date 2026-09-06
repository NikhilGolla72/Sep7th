import { motion } from "framer-motion";

interface ButterflyProps {
  x: string; y: string; delay: number; scale?: number; color?: string;
}

export function Butterfly({ x, y, delay, scale = 1, color = "#F4B8C1" }: ButterflyProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y }}
      animate={{
        x: ["0%", "15%", "-8%", "20%"],
        y: ["0%", "-12%", "6%", "-8%"],
      }}
      transition={{ duration: 8, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      aria-hidden="true"
    >
      <motion.svg
        width={40 * scale} height={32 * scale}
        viewBox="0 0 40 32"
        animate={{ scaleX: [1, -1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Left wings */}
        <motion.path
          d="M 20 16 C 14 8, 2 4, 4 16 C 6 24, 14 24, 20 20"
          fill={color} fillOpacity="0.7"
          animate={{ d: [
            "M 20 16 C 14 8, 2 4, 4 16 C 6 24, 14 24, 20 20",
            "M 20 16 C 16 12, 8 10, 10 16 C 12 22, 16 22, 20 20",
          ]}}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M 20 20 C 14 26, 4 28, 6 20 C 8 14, 16 16, 20 16"
          fill={color} fillOpacity="0.5"
          animate={{ d: [
            "M 20 20 C 14 26, 4 28, 6 20 C 8 14, 16 16, 20 16",
            "M 20 20 C 16 24, 8 24, 10 20 C 12 16, 16 18, 20 16",
          ]}}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Right wings */}
        <motion.path
          d="M 20 16 C 26 8, 38 4, 36 16 C 34 24, 26 24, 20 20"
          fill={color} fillOpacity="0.7"
          animate={{ d: [
            "M 20 16 C 26 8, 38 4, 36 16 C 34 24, 26 24, 20 20",
            "M 20 16 C 24 12, 32 10, 30 16 C 28 22, 24 22, 20 20",
          ]}}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M 20 20 C 26 26, 36 28, 34 20 C 32 14, 24 16, 20 16"
          fill={color} fillOpacity="0.5"
          animate={{ d: [
            "M 20 20 C 26 26, 36 28, 34 20 C 32 14, 24 16, 20 16",
            "M 20 20 C 24 24, 32 24, 30 20 C 28 16, 24 18, 20 16",
          ]}}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Body */}
        <line x1="20" y1="10" x2="20" y2="26" stroke="#8B7355" strokeWidth="1" />
        {/* Antennae */}
        <path d="M 20 10 C 17 6, 14 4, 13 2" stroke="#8B7355" strokeWidth="0.8" fill="none" />
        <path d="M 20 10 C 23 6, 26 4, 27 2" stroke="#8B7355" strokeWidth="0.8" fill="none" />
        <circle cx="13" cy="2" r="1.5" fill={color} />
        <circle cx="27" cy="2" r="1.5" fill={color} />
      </motion.svg>
    </motion.div>
  );
}
