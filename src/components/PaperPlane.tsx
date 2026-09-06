import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PaperPlane({ trigger = true }: { trigger?: boolean }) {
  const reduce = useReducedMotion();
  const [fly, setFly] = useState(false);

  useEffect(() => {
    if (trigger && !reduce) {
      const t = setTimeout(() => setFly(true), 600);
      return () => clearTimeout(t);
    }
  }, [trigger, reduce]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{ top: "30%", left: "-80px" }}
        animate={fly ? {
          x: ["0%", "120vw"],
          y: ["0px", "-60px", "20px", "-40px"],
          rotate: [-5, 5, -3, 8],
        } : {}}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
          {/* Paper plane body */}
          <motion.path
            d="M 0 25 L 55 5 L 40 25 L 55 45 Z"
            fill="#FDF2F4"
            stroke="#F4B8C1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Fold line */}
          <path d="M 0 25 L 40 25" stroke="#F4B8C1" strokeWidth="0.8" />
          {/* Wing bottom */}
          <path d="M 40 25 L 28 38 L 0 25" fill="#FDF8F9" stroke="#F4B8C1" strokeWidth="0.8" />
        </svg>

        {/* Trail */}
        {fly && (
          <motion.div
            className="absolute top-1/2 right-full -translate-y-1/2 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(244,184,193,0.5))" }}
            animate={{ width: ["0px", "80px"] }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  );
}
