import { useState } from "react";
import { motion } from "framer-motion";

/**
 * The page itself folds — like a diary corner, not a control.
 * Peel the right dog-ear to go forward. Left dog-ear to go back.
 */
export function PageCurl({
  side,
  onTurn,
}: {
  side: "next" | "prev";
  onTurn: () => void;
}) {
  const [peeling, setPeeling] = useState(false);
  const isNext = side === "next";

  const peel = () => {
    if (peeling) return;
    setPeeling(true);
    window.setTimeout(() => {
      onTurn();
      setPeeling(false);
    }, 720);
  };

  return (
    <>
      {peeling && (
        <motion.div
          className="fixed inset-0 z-[70] pointer-events-none"
          style={{
            transformOrigin: isNext ? "100% 100%" : "0% 100%",
            background: "linear-gradient(135deg, #FBF8F3 0%, #F5EFE6 42%, #EDE4D7 100%)",
            boxShadow: isNext
              ? "-40px 0 80px rgba(28,25,23,0.12)"
              : "40px 0 80px rgba(28,25,23,0.12)",
          }}
          initial={{ clipPath: isNext ? "polygon(100% 72%, 72% 100%, 100% 100%)" : "polygon(0% 72%, 0% 100%, 28% 100%)" }}
          animate={{ clipPath: isNext ? "polygon(8% -10%, -10% 8%, 110% 110%)" : "polygon(-10% -10%, 92% -10%, -10% 110%)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        onClick={peel}
        aria-label={isNext ? "Turn the page" : "Turn back"}
        className="page-curl"
        data-side={side}
        disabled={peeling}
      >
        <span className="page-curl-face" aria-hidden="true" />
        <span className="page-curl-shadow" aria-hidden="true" />
      </button>
    </>
  );
}
