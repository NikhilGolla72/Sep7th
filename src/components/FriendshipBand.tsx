import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Two full cottagecore figures — she ties a thread around his wrist. */
export function FriendshipBand({ size = 320 }: { size?: number }) {
  const reduce = useReducedMotion();
  const [tied, setTied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTied(true), reduce ? 0 : 500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <svg width={size} height={size * 0.78} viewBox="0 0 340 260" fill="none">
        <ellipse cx="170" cy="242" rx="120" ry="14" fill="#A8C5A0" opacity="0.32" />
        <path d="M 40 236 C 80 220, 140 228, 170 232 C 220 226, 280 218, 310 236 L 310 248 L 40 248 Z" fill="#C4D4B8" opacity="0.45" />

        {/* daisies */}
        {[
          [48, 228],
          [292, 230],
          [22, 218],
        ].map(([x, y], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx={x + Math.cos((a * Math.PI) / 180) * 5}
                cy={y + Math.sin((a * Math.PI) / 180) * 5}
                rx="3.2"
                ry="2"
                fill="#FFFBF9"
              />
            ))}
            <circle cx={x} cy={y} r="2.3" fill="#D4A54A" />
          </g>
        ))}

        {/* mushroom */}
        <rect x="300" y="214" width="7" height="16" rx="2" fill="#FDF2F4" />
        <ellipse cx="304" cy="214" rx="11" ry="7" fill="#E8715A" />
        <circle cx="300" cy="213" r="1.4" fill="#FFFBF9" />

        {/* BOY — sitting, offering his left wrist */}
        <g>
          <path d="M 198 128 C 188 168, 198 198, 214 218 C 232 226, 258 224, 268 212 C 276 188, 268 150, 248 128 Z" fill="#C4D4B8" />
          <rect x="226" y="86" width="28" height="48" rx="10" fill="#C4D4B8" />
          <ellipse cx="240" cy="68" rx="20" ry="21" fill="#F5CBA7" />
          <path d="M 220 62 C 222 42, 230 34, 240 34 C 254 34, 262 46, 260 62 C 254 48, 226 48, 220 62 Z" fill="#5C4033" />
          <circle cx="234" cy="66" r="2" fill="#4A2E1A" />
          <circle cx="246" cy="66" r="2" fill="#4A2E1A" />
          <path d="M 234 75 Q 240 80 246 75" stroke="#C0392B" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <ellipse cx="230" cy="72" rx="4" ry="2.2" fill="#F4B8C1" opacity="0.45" />
          {/* legs */}
          <path d="M 214 210 C 210 228, 218 236, 232 234" stroke="#8B7355" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 254 208 C 262 226, 270 234, 278 230" stroke="#8B7355" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* extended left arm toward her */}
          <path d="M 226 108 C 190 112, 158 118, 138 128" stroke="#F5CBA7" strokeWidth="11" strokeLinecap="round" fill="none" />
          <ellipse cx="136" cy="130" rx="11" ry="9" fill="#F5CBA7" />
        </g>

        {/* GIRL — kneeling, both hands on his wrist */}
        <g>
          <path d="M 58 124 C 42 150, 40 186, 52 214 C 68 224, 108 224, 118 210 C 124 182, 112 148, 94 124 Z" fill="#A8C5A0" />
          <path d="M 62 122 C 60 142, 108 144, 104 122 Z" fill="#FDF2F4" />
          <rect x="68" y="86" width="26" height="40" rx="9" fill="#F4B8C1" />
          <ellipse cx="80" cy="66" rx="19" ry="20" fill="#F5CBA7" />
          <path d="M 61 62 C 60 42, 70 32, 80 32 C 94 32, 102 44, 100 62 C 94 46, 64 46, 61 62 Z" fill="#8B5A2B" />
          <path d="M 61 64 C 54 90, 54 118, 60 140" stroke="#8B5A2B" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 99 64 C 106 90, 106 118, 100 138" stroke="#8B5A2B" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="74" cy="64" r="2" fill="#4A2E1A" />
          <circle cx="86" cy="64" r="2" fill="#4A2E1A" />
          <path d="M 74 73 Q 80 78 86 73" stroke="#C0392B" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <ellipse cx="70" cy="70" rx="4" ry="2.4" fill="#F4B8C1" opacity="0.55" />
          {/* flower crown */}
          <circle cx="68" cy="40" r="4" fill="#E8715A" />
          <circle cx="80" cy="34" r="4.4" fill="#F4B8C1" />
          <circle cx="92" cy="40" r="4" fill="#D4A54A" />
          <circle cx="74" cy="36" r="2.6" fill="#A8C5A0" />
          <circle cx="86" cy="36" r="2.6" fill="#B8A9D4" />
          {/* her arms reaching to the wrist */}
          <path d="M 92 108 C 108 118, 118 124, 128 128" stroke="#F5CBA7" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M 88 118 C 104 128, 116 132, 130 134" stroke="#F5CBA7" strokeWidth="8" strokeLinecap="round" fill="none" />
          <motion.ellipse
            cx="128"
            cy="128"
            rx="9"
            ry="7"
            fill="#F5CBA7"
            animate={tied ? { x: 4, y: 1 } : { x: [-6, 0] }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.ellipse
            cx="132"
            cy="136"
            rx="8"
            ry="6"
            fill="#E8B89A"
            animate={tied ? { x: -3, y: -2 } : { x: [5, 0] }}
            transition={{ duration: reduce ? 0 : 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </g>

        {/* friendship thread wrapping the wrist */}
        <motion.path
          d="M 122 124 C 128 116, 142 114, 150 124 C 156 132, 146 140, 136 136 C 128 132, 124 128, 128 124"
          stroke="#E8715A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: tied ? 1 : 0.2 }}
          transition={{ duration: reduce ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx="142"
          cy="122"
          r="3.2"
          fill="#D4A54A"
          initial={{ scale: 0 }}
          animate={{ scale: tied ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 0.9, type: "spring", stiffness: 260 }}
        />
        <motion.circle
          cx="132"
          cy="132"
          r="2.6"
          fill="#F4B8C1"
          initial={{ scale: 0 }}
          animate={{ scale: tied ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 1.05, type: "spring", stiffness: 260 }}
        />
        <motion.path
          d="M 148 120 C 156 108, 162 106, 168 112"
          stroke="#D4A54A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: tied ? 1 : 0, opacity: tied ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 1.15, duration: 0.4 }}
        />
        <motion.path
          d="M 148 120 C 158 128, 166 136, 170 142"
          stroke="#E8715A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: tied ? 1 : 0, opacity: tied ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 1.2, duration: 0.4 }}
        />
      </svg>
      <p className="font-hand text-xl text-coral/80 mt-1">tied, for keeps</p>
    </div>
  );
}
