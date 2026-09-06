import { motion, useReducedMotion } from "framer-motion";

/** Two cottagecore kids on a video call, swapping little bits of the day. */
export function VideoCall({ size = 300 }: { size?: number }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <svg width={size} height={size * 0.72} viewBox="0 0 320 230" fill="none">
        {/* his window */}
        <rect x="18" y="38" width="132" height="148" rx="16" fill="#FFFBF9" stroke="#E7DDD1" strokeWidth="2" />
        <rect x="18" y="38" width="132" height="22" rx="16" fill="#F5EFE6" />
        <circle cx="32" cy="49" r="3.5" fill="#E8715A" />
        <circle cx="44" cy="49" r="3.5" fill="#D4A54A" />
        <circle cx="56" cy="49" r="3.5" fill="#A8C5A0" />

        <ellipse cx="84" cy="118" rx="28" ry="36" fill="#C4D4B8" />
        <ellipse cx="84" cy="92" rx="18" ry="19" fill="#F5CBA7" />
        <path d="M 66 86 C 68 70, 76 64, 84 64 C 94 64, 102 72, 102 86 C 98 74, 70 74, 66 86 Z" fill="#5C4033" />
        <circle cx="78" cy="90" r="1.6" fill="#4A2E1A" />
        <circle cx="90" cy="90" r="1.6" fill="#4A2E1A" />
        <path d="M 78 98 Q 84 102 90 98" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        <motion.g
          animate={reduce ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="40" y="148" width="78" height="22" rx="11" fill="#FDF2F4" stroke="#F4B8C1" />
          <text x="79" y="163" textAnchor="middle" fill="#c26b7a" fontSize="9" fontFamily="Caveat, cursive">
            long day lol
          </text>
        </motion.g>

        {/* her window */}
        <rect x="170" y="22" width="132" height="148" rx="16" fill="#FFFBF9" stroke="#E7DDD1" strokeWidth="2" />
        <rect x="170" y="22" width="132" height="22" rx="16" fill="#FDF2F4" />
        <circle cx="184" cy="33" r="3.5" fill="#E8715A" />
        <circle cx="196" cy="33" r="3.5" fill="#D4A54A" />
        <circle cx="208" cy="33" r="3.5" fill="#A8C5A0" />

        <path d="M 212 88 C 198 108, 194 130, 200 148 C 214 156, 250 156, 260 146 C 264 124, 254 100, 244 88 Z" fill="#A8C5A0" />
        <ellipse cx="232" cy="78" rx="18" ry="19" fill="#F5CBA7" />
        <path d="M 214 74 C 214 56, 222 50, 232 50 C 244 50, 252 58, 250 74 C 246 60, 218 60, 214 74 Z" fill="#8B5A2B" />
        <path d="M 214 76 C 208 96, 208 118, 214 132" stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="226" cy="76" r="1.6" fill="#4A2E1A" />
        <circle cx="238" cy="76" r="1.6" fill="#4A2E1A" />
        <path d="M 226 84 Q 232 88 238 84" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <circle cx="224" cy="56" r="2.8" fill="#E8715A" />
        <circle cx="232" cy="52" r="3" fill="#F4B8C1" />
        <circle cx="240" cy="56" r="2.8" fill="#D4A54A" />

        <motion.g
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <rect x="196" y="150" width="86" height="22" rx="11" fill="#EFF6ED" stroke="#A8C5A0" />
          <text x="239" y="165" textAnchor="middle" fill="#5a8a52" fontSize="9" fontFamily="Caveat, cursive">
            tell me everything
          </text>
        </motion.g>

        {/* wifi hearts between windows */}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={160}
              cy={90}
              r="3"
              fill={["#E8715A", "#F4B8C1", "#D4A54A"][i]}
              animate={{
                y: [8, -28],
                opacity: [0, 1, 0],
                x: [0, (i - 1) * 10],
              }}
              transition={{ duration: 2, delay: i * 0.45, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
      </svg>
      <p className="font-hand text-lg text-ink-3/70">same time, different rooms</p>
    </div>
  );
}
