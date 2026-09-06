import { motion, useReducedMotion } from "framer-motion";

export function InkDrop() {
  const reduce = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Expanding ink rings */}
      {[0, 1.5, 3, 4.5].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `1px solid rgba(184,169,212,${0.15 - i * 0.03})` }}
          initial={{ width: 80, height: 80, opacity: 0 }}
          animate={reduce ? {} : {
            width:   [80,  400, 800],
            height:  [80,  400, 800],
            opacity: [0.4, 0.2,   0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Center ink blot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,169,212,0.12) 0%, transparent 70%)" }}
        animate={reduce ? {} : {
          width:  ["80px",  "300px",  "80px"],
          height: ["80px",  "300px",  "80px"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
