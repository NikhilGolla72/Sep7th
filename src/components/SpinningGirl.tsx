import { motion, useReducedMotion } from "framer-motion";

/**
 * A girl mid-twirl. The whole figure turns in 3D (not a skirt disc
 * spinning under a frozen torso), with a small bounce and sparkles.
 */
export function SpinningGirl({ size = 200 }: { size?: number }) {
  const reduce = useReducedMotion();
  const spin = 2.6;

  return (
    <div
      className="relative"
      style={{ width: size, height: size * 1.28, perspective: size * 4 }}
      aria-hidden="true"
    >
      {!reduce &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 4 + (i % 2),
              height: 4 + (i % 2),
              background: ["#F4B8C1", "#D4A54A", "#B8A9D4", "#A8C5A0", "#E8715A"][i],
              left: `${18 + i * 16}%`,
              top: `${22 + (i % 3) * 18}%`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [0, -10, -18],
              scale: [0.6, 1.15, 0.4],
            }}
            transition={{
              duration: 1.6,
              delay: i * 0.28,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 88%" }}
        animate={
          reduce
            ? {}
            : {
                rotateY: [0, 360],
                y: [0, -8, 0],
              }
        }
        transition={{
          rotateY: {
            duration: spin,
            repeat: Infinity,
            ease: [0.37, 0, 0.63, 1],
          },
          y: {
            duration: spin / 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 160 210"
          fill="none"
          overflow="visible"
        >
          {/* Shadow */}
          <ellipse cx="80" cy="198" rx="28" ry="6" fill="#1C1917" opacity="0.08" />

          {/* Skirt — flared dress, part of the turning body */}
          <path
            d="M 58 108 C 42 128, 30 158, 28 176 Q 80 188 132 176 C 130 158, 118 128, 102 108 Q 80 118 58 108 Z"
            fill="#E8715A"
          />
          <path
            d="M 64 112 C 52 132, 44 156, 42 172 Q 80 180 118 172 C 116 156, 108 132, 96 112"
            fill="#F09080"
            opacity="0.55"
          />
          <path
            d="M 78 114 C 74 136, 72 156, 74 174"
            stroke="#F4B8C1"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* Hem ruffle */}
          <path
            d="M 28 176 Q 40 184 54 176 Q 68 184 80 176 Q 92 184 106 176 Q 120 184 132 176"
            stroke="#C0392B"
            strokeWidth="1.6"
            fill="none"
            opacity="0.35"
          />

          {/* Legs */}
          <path d="M 70 174 L 66 192" stroke="#F5CBA7" strokeWidth="5" strokeLinecap="round" />
          <path d="M 90 174 L 94 192" stroke="#F5CBA7" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="64" cy="194" rx="8" ry="3.2" fill="#C0392B" />
          <ellipse cx="96" cy="194" rx="8" ry="3.2" fill="#C0392B" />

          {/* Left arm — out for the twirl */}
          <path
            d="M 62 96 C 44 90, 30 78, 24 64"
            stroke="#F5CBA7"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="23" cy="61" r="5.5" fill="#F5CBA7" />

          {/* Right arm — raised */}
          <path
            d="M 98 96 C 116 86, 128 70, 132 52"
            stroke="#F5CBA7"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="133" cy="49" r="5.5" fill="#F5CBA7" />

          {/* Bodice */}
          <path
            d="M 62 90 C 60 100, 60 110, 62 116 Q 80 124 98 116 C 100 110, 100 100, 98 90 Q 80 84 62 90 Z"
            fill="#E8715A"
          />
          <path
            d="M 70 92 C 68 100, 68 108, 70 114"
            stroke="#F4B8C1"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Neck */}
          <rect x="74" y="74" width="12" height="16" rx="6" fill="#F5CBA7" />

          {/* Hair back */}
          <ellipse cx="80" cy="48" rx="26" ry="22" fill="#C8963A" />

          {/* Head */}
          <ellipse cx="80" cy="56" rx="20" ry="22" fill="#F5CBA7" />

          {/* Cheeks */}
          <ellipse cx="66" cy="62" rx="6" ry="3.8" fill="#F4B8C1" opacity="0.5" />
          <ellipse cx="94" cy="62" rx="6" ry="3.8" fill="#F4B8C1" opacity="0.5" />

          {/* Closed happy eyes */}
          <path d="M 70 54 Q 73 51 76 54" stroke="#4A2E1A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 84 54 Q 87 51 90 54" stroke="#4A2E1A" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Smile */}
          <path d="M 72 64 Q 80 71 88 64" stroke="#C0392B" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Bangs */}
          <path
            d="M 60 46 C 58 32, 66 24, 80 22 C 94 24, 102 32, 100 46 C 94 34, 66 34, 60 46 Z"
            fill="#C8963A"
          />
          <path
            d="M 68 28 C 74 24, 80 23, 88 26"
            stroke="#E8B84B"
            strokeWidth="1.8"
            fill="none"
            opacity="0.7"
          />

          {/* Side locks */}
          <path
            d="M 58 48 C 44 56, 40 72, 48 82"
            stroke="#C8963A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 102 48 C 116 56, 120 72, 112 82"
            stroke="#C8963A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Flower clip */}
          <circle cx="100" cy="40" r="5" fill="#E8715A" />
          <circle cx="100" cy="40" r="2.2" fill="#FDF2F4" />
        </svg>
      </motion.div>
    </div>
  );
}
