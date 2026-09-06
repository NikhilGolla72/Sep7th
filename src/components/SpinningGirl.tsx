import { motion, useReducedMotion } from "framer-motion";

/**
 * Girl doing a twirl — seen from the front.
 * The skirt fans out wide and rotates around her.
 * Body stays upright. Only skirt fabric sweeps around.
 */
export function SpinningGirl({ size = 200 }: { size?: number }) {
  const reduce = useReducedMotion();

  // Skirt is made of 8 "petal" shapes that sweep around her waist
  // Each one slightly offset in rotation — gives a fabric-in-motion feel
  const petalCount = 10;
  const skirtColors = [
    "#E8715A","#F4B8C1","#E8715A","#F09080",
    "#F4B8C1","#E8715A","#F09080","#F4B8C1",
    "#E8715A","#F09080",
  ];

  return (
    <div style={{ width: size, height: size * 1.1 }} aria-hidden="true">
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 200 220"
        fill="none"
        overflow="visible"
      >
        {/* ── Spinning skirt petals ─────────────────────────── */}
        {/* Each petal = one fold of the dress, rotating */}
        <motion.g
          style={{ transformOrigin: "100px 148px" }}
          animate={reduce ? {} : { rotate: [0, 360] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: petalCount }, (_, i) => {
            const angle = (i / petalCount) * 360;
            const rad = (angle * Math.PI) / 180;
            // Each petal goes from waist center outward
            const cx = 100 + Math.cos(rad) * 52;
            const cy = 148 + Math.sin(rad) * 22; // flatten vertically for perspective
            return (
              <motion.ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={18}
                ry={28}
                fill={skirtColors[i]}
                opacity={0.82}
                transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
              />
            );
          })}

          {/* Center skirt cover — hides the overlap at waist */}
          <ellipse cx="100" cy="148" rx="22" ry="10" fill="#E8715A" />
        </motion.g>

        {/* ── Skirt sparkle trail (also rotates) ──────────────── */}
        <motion.g
          style={{ transformOrigin: "100px 148px" }}
          animate={reduce ? {} : { rotate: [0, 360] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        >
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const sx = 100 + 72 * Math.cos(rad);
            const sy = 148 + 30 * Math.sin(rad);
            return (
              <motion.circle
                key={i}
                cx={sx} cy={sy} r={2.5}
                fill={["#F4B8C1","#D4A54A","#B8A9D4","#A8C5A0","#A0C4E8"][i]}
                animate={reduce ? {} : { opacity: [0.2, 1, 0.2], r: [2, 3.5, 2] }}
                transition={{ duration: 1.2, delay: i * 0.24, repeat: Infinity }}
              />
            );
          })}
        </motion.g>

        {/* ── Static upper body ────────────────────────────────── */}

        {/* Bodice */}
        <path
          d="M 86 118 C 84 128, 84 140, 86 150 Q 100 154 114 150 C 116 140, 116 128, 114 118 Q 100 114 86 118 Z"
          fill="#E8715A"
        />
        {/* Bodice highlight */}
        <path
          d="M 93 120 C 91 128, 91 138, 93 147"
          stroke="#F4B8C1" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"
        />

        {/* Belt */}
        <path
          d="M 86 136 Q 100 139 114 136"
          stroke="#C0392B" strokeWidth="2" fill="none" opacity="0.4"
        />

        {/* Left arm — up and out, twirl pose */}
        <motion.path
          d="M 88 124 C 78 114, 66 106, 58 98"
          stroke="#F5CBA7" strokeWidth="6" strokeLinecap="round" fill="none"
          animate={reduce ? {} : {
            d: [
              "M 88 124 C 78 114, 66 106, 58 98",
              "M 88 124 C 80 112, 70 102, 64 94",
              "M 88 124 C 78 114, 66 106, 58 98",
            ]
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="56" cy="96" r="5" fill="#F5CBA7"
          animate={reduce ? {} : { cx: [56,62,56], cy: [96,92,96] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right arm — raised high */}
        <motion.path
          d="M 112 124 C 122 112, 136 102, 144 94"
          stroke="#F5CBA7" strokeWidth="6" strokeLinecap="round" fill="none"
          animate={reduce ? {} : {
            d: [
              "M 112 124 C 122 112, 136 102, 144 94",
              "M 112 124 C 120 110, 132 100, 138 90",
              "M 112 124 C 122 112, 136 102, 144 94",
            ]
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        />
        <motion.circle cx="146" cy="92" r="5" fill="#F5CBA7"
          animate={reduce ? {} : { cx: [146,140,146], cy: [92,88,92] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        />

        {/* Neck */}
        <rect x="94" y="85" width="12" height="18" rx="6" fill="#F5CBA7" />

        {/* Head */}
        <ellipse cx="100" cy="68" rx="22" ry="24" fill="#F5CBA7" />

        {/* Cheeks */}
        <ellipse cx="84" cy="74" rx="7" ry="4.5" fill="#F4B8C1" opacity="0.45" />
        <ellipse cx="116" cy="74" rx="7" ry="4.5" fill="#F4B8C1" opacity="0.45" />

        {/* Eyes — happy closed */}
        <path d="M 89 66 Q 92 63 95 66" stroke="#4A2E1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 105 66 Q 108 63 111 66" stroke="#4A2E1A" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Smile */}
        <path d="M 90 76 Q 100 84 110 76" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Hair back */}
        <ellipse cx="100" cy="56" rx="24" ry="20" fill="#D4A54A" />

        {/* Hair flying out from spin */}
        <motion.path
          d="M 78 54 C 60 42, 50 52, 56 68"
          stroke="#C8963A" strokeWidth="8" strokeLinecap="round" fill="none"
          animate={reduce ? {} : {
            d: [
              "M 78 54 C 60 42, 50 52, 56 68",
              "M 78 54 C 56 38, 44 50, 52 70",
              "M 78 54 C 60 42, 50 52, 56 68",
            ]
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front hair */}
        <path
          d="M 78 52 C 76 40, 82 30, 100 28 C 118 30, 124 40, 122 52 C 116 38, 84 38, 78 52 Z"
          fill="#C8963A"
        />
        {/* Hair highlight */}
        <path
          d="M 86 32 C 92 29, 100 28, 108 30"
          stroke="#E8B84B" strokeWidth="2" fill="none" opacity="0.65"
        />

        {/* Hair accessories — little flower clip */}
        <circle cx="122" cy="50" r="5" fill="#E8715A" opacity="0.8" />
        <circle cx="122" cy="50" r="2.5" fill="#F4B8C1" />

      </svg>
    </div>
  );
}
