import { motion } from "framer-motion";

const BULB_COLORS = ["#F4B8C1","#F5C4A0","#D4A54A","#B8A9D4","#A8C5A0","#A0C4E8"];

interface BulbProps { x: number; color: string; delay: number; }

function Bulb({ x, color, delay }: BulbProps) {
  return (
    <g>
      {/* Wire drop */}
      <line x1={x} y1={0} x2={x} y2={22} stroke="#8B7355" strokeWidth="0.8" />
      {/* Glow */}
      <motion.circle
        cx={x} cy={26} r={7}
        fill={color}
        opacity={0.15}
        animate={{ r: [7, 12, 7], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bulb */}
      <motion.ellipse
        cx={x} cy={26} rx={5} ry={6}
        fill={color}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Cap */}
      <rect x={x - 3} y={20} width={6} height={3} rx={1} fill="#8B7355" />
    </g>
  );
}

export function FairyLights({ className = "" }: { className?: string }) {
  const count = 16;
  const width = 900;
  const spacing = width / (count + 1);

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} 50`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ height: 50 }}
      >
        {/* Main wire */}
        <motion.path
          d={`M 0 8 ${Array.from({ length: count }, (_, i) => {
            const x = spacing * (i + 1);
            return `Q ${x - spacing / 2} 18 ${x} 8 Q ${x + spacing / 2} -2 ${x + spacing} 8`;
          }).join(" ")}`}
          fill="none"
          stroke="#8B7355"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {Array.from({ length: count }, (_, i) => (
          <Bulb
            key={i}
            x={spacing * (i + 1)}
            color={BULB_COLORS[i % BULB_COLORS.length]}
            delay={i * 0.18}
          />
        ))}
      </svg>
    </div>
  );
}
