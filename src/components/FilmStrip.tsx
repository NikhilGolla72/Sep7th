import { motion } from "framer-motion";

export function FilmStrip() {
  const frames = 8;
  const frameW = 80;
  const frameH = 60;
  const gap = 12;
  const sprocketR = 5;
  const totalW = frames * (frameW + gap);

  return (
    <div className="pointer-events-none select-none overflow-hidden" style={{ height: frameH + 32 }} aria-hidden="true">
      <motion.div
        className="flex"
        animate={{ x: [0, -(frameW + gap) * 4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ width: totalW * 2 }}
      >
        {Array.from({ length: frames * 2 }, (_, i) => (
          <div key={i} className="flex-shrink-0 mx-1.5 relative" style={{ width: frameW }}>
            {/* Film frame */}
            <div
              className="rounded-sm"
              style={{
                width: frameW, height: frameH + 32,
                background: "#1C1917",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Sprocket holes top */}
              <div className="flex justify-around pt-2 pb-1">
                {[0,1,2].map(j => (
                  <div key={j} className="w-3 h-2 rounded-sm bg-cream-3/20" />
                ))}
              </div>
              {/* Frame content — soft color or blank */}
              <div
                className="mx-2 rounded-sm"
                style={{
                  height: frameH - 8,
                  background: `hsla(${(i * 47) % 360}, 40%, 75%, 0.15)`,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              />
              {/* Sprocket holes bottom */}
              <div className="flex justify-around pt-1">
                {[0,1,2].map(j => (
                  <div key={j} className="w-3 h-2 rounded-sm bg-cream-3/20" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
