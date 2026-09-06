import { motion, useReducedMotion } from "framer-motion";

/** Cottagecore pair in a little meadow — sway, daisies, no twirl. */
export function CottageFriends({ size = 180 }: { size?: number }) {
  const reduce = useReducedMotion();
  const w = size;
  const h = size * 1.15;

  return (
    <div style={{ width: w, height: h }} className="relative select-none" aria-hidden="true">
      <motion.svg
        width={w}
        height={h}
        viewBox="0 0 200 230"
        fill="none"
        animate={reduce ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="100" cy="214" rx="62" ry="10" fill="#A8C5A0" opacity="0.35" />

        {/* mushrooms */}
        <ellipse cx="28" cy="200" rx="10" ry="5" fill="#F5C4A0" />
        <rect x="25" y="186" width="6" height="16" rx="2" fill="#FDF2F4" />
        <ellipse cx="28" cy="186" rx="12" ry="7" fill="#E8715A" />
        <circle cx="24" cy="185" r="1.4" fill="#FDF2F4" />
        <circle cx="31" cy="187" r="1.1" fill="#FDF2F4" />

        <ellipse cx="172" cy="202" rx="8" ry="4" fill="#F5C4A0" />
        <rect x="169" y="192" width="5" height="12" rx="2" fill="#FDF2F4" />
        <ellipse cx="172" cy="192" rx="9" ry="5" fill="#D4A54A" />

        {/* daisies */}
        {[
          [42, 198],
          [158, 196],
          [18, 188],
        ].map(([x, y], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => {
              const r = (a * Math.PI) / 180;
              return (
                <ellipse
                  key={a}
                  cx={x + Math.cos(r) * 5}
                  cy={y + Math.sin(r) * 5}
                  rx="3.2"
                  ry="2"
                  fill="#FFFBF9"
                  transform={`rotate(${a} ${x} ${y})`}
                />
              );
            })}
            <circle cx={x} cy={y} r="2.4" fill="#D4A54A" />
          </g>
        ))}

        {/* GIRL — pinafore, flower crown */}
        <motion.g
          animate={reduce ? {} : { rotate: [-2, 2, -2] }}
          style={{ transformOrigin: "78px 180px" }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 62 118 C 50 138, 44 162, 48 178 C 58 186, 92 186, 102 176 C 104 160, 96 136, 88 118 Z"
            fill="#A8C5A0"
          />
          <path d="M 64 118 C 62 132, 96 134, 94 118 Z" fill="#FDF2F4" />
          <rect x="70" y="88" width="18" height="32" rx="6" fill="#F4B8C1" />
          <ellipse cx="79" cy="72" rx="16" ry="17" fill="#F5CBA7" />
          {/* hair */}
          <path d="M 63 68 C 62 50, 70 42, 79 42 C 90 42, 98 52, 96 68 C 92 54, 66 54, 63 68 Z" fill="#8B5A2B" />
          <path d="M 63 70 C 58 88, 58 108, 62 122" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 95 70 C 100 88, 100 108, 96 122" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* flower crown */}
          <circle cx="68" cy="50" r="3.2" fill="#E8715A" />
          <circle cx="79" cy="44" r="3.5" fill="#F4B8C1" />
          <circle cx="90" cy="50" r="3.2" fill="#D4A54A" />
          <circle cx="74" cy="46" r="2.2" fill="#A8C5A0" />
          <circle cx="85" cy="46" r="2.2" fill="#B8A9D4" />
          <circle cx="75" cy="70" r="1.5" fill="#4A2E1A" />
          <circle cx="84" cy="70" r="1.5" fill="#4A2E1A" />
          <path d="M 75 77 Q 79 81 84 77" stroke="#C0392B" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <ellipse cx="72" cy="74" rx="3.5" ry="2" fill="#F4B8C1" opacity="0.55" />
          <ellipse cx="87" cy="74" rx="3.5" ry="2" fill="#F4B8C1" opacity="0.55" />
          {/* basket */}
          <path d="M 48 128 C 44 142, 52 150, 64 148 C 68 138, 62 128, 56 126 Z" fill="#D4A54A" opacity="0.85" />
          <path d="M 52 128 C 54 118, 62 118, 62 128" stroke="#C8963A" strokeWidth="2" fill="none" />
          <circle cx="54" cy="136" r="2.5" fill="#E8715A" />
          <circle cx="60" cy="138" r="2.2" fill="#F4B8C1" />
        </motion.g>

        {/* BOY — linen shirt, sitting */}
        <motion.g
          animate={reduce ? {} : { rotate: [1.5, -1.5, 1.5] }}
          style={{ transformOrigin: "128px 180px" }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <rect x="118" y="118" width="22" height="36" rx="7" fill="#C4D4B8" />
          <rect x="118" y="150" width="10" height="28" rx="4" fill="#8B7355" />
          <rect x="130" y="150" width="10" height="28" rx="4" fill="#8B7355" />
          <ellipse cx="129" cy="78" rx="15" ry="16" fill="#F5CBA7" />
          <path d="M 114 72 C 116 56, 122 50, 129 50 C 138 50, 145 58, 144 72 C 140 62, 118 62, 114 72 Z" fill="#5C4033" />
          <circle cx="124" cy="76" r="1.5" fill="#4A2E1A" />
          <circle cx="134" cy="76" r="1.5" fill="#4A2E1A" />
          <path d="M 124 83 Q 129 87 134 83" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <rect x="124" y="94" width="10" height="26" rx="4" fill="#F5CBA7" />
          {/* daisy in hand */}
          <motion.g
            animate={reduce ? {} : { rotate: [-12, 8, -12] }}
            style={{ transformOrigin: "148px 128px" }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="140" y1="122" x2="152" y2="108" stroke="#7ab570" strokeWidth="2" />
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx={152 + Math.cos((a * Math.PI) / 180) * 5}
                cy={106 + Math.sin((a * Math.PI) / 180) * 5}
                rx="3"
                ry="1.8"
                fill="#FFFBF9"
              />
            ))}
            <circle cx="152" cy="106" r="2.2" fill="#D4A54A" />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
