import { motion } from "framer-motion";

export function FilmReel({ size = 80 }: { size?: number }) {
  const r = size / 2;
  const spokes = 6;

  return (
    <div className="pointer-events-none select-none" style={{ width: size, height: size }} aria-hidden="true">
      <motion.svg
        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <circle cx={r} cy={r} r={r - 2} fill="none" stroke="#2C1810" strokeWidth="3" />

        {/* Sprocket holes around edge */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const hx = r + (r - 10) * Math.cos(rad);
          const hy = r + (r - 10) * Math.sin(rad);
          return (
            <rect
              key={i}
              x={hx - 3} y={hy - 4}
              width={6} height={8} rx={1}
              fill="#1C1917"
              transform={`rotate(${angle}, ${hx}, ${hy})`}
            />
          );
        })}

        {/* Inner hub */}
        <circle cx={r} cy={r} r={r * 0.35} fill="#2C1810" />
        <circle cx={r} cy={r} r={r * 0.15} fill="#1C1917" />

        {/* Spokes */}
        {Array.from({ length: spokes }, (_, i) => {
          const angle = (i * 360) / spokes;
          const rad = (angle * Math.PI) / 180;
          const x2 = r + (r * 0.33) * Math.cos(rad);
          const y2 = r + (r * 0.33) * Math.sin(rad);
          return (
            <line key={i} x1={r} y1={r} x2={x2} y2={y2}
              stroke="#3D2814" strokeWidth="2"
            />
          );
        })}

        {/* Center dot */}
        <circle cx={r} cy={r} r={4} fill="#C8963A" />
      </motion.svg>
    </div>
  );
}
