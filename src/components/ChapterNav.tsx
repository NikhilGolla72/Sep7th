import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

export interface ChapterNavItem { id: string; label: string; }

const NAV_COLORS = ["#FFD93D","#FF6B35","#4361EE","#06D6A0","#FF4D6D","#7209B7","#FFD93D","#FF6B35","#4361EE","#06D6A0","#FF4D6D","#7209B7"];

export function ChapterNav({ items }: { items: ChapterNavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(items.map((i) => i.id));
  const activeIndex = items.findIndex((i) => i.id === activeId);
  const activeLabel = items[activeIndex]?.label ?? "";

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <>
      {/* Desktop: left dots */}
      <nav aria-label="Chapters" className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            aria-current={item.id === activeId ? "true" : undefined}
            aria-label={`Go to ${item.label}`}
            className="flex items-center gap-2.5 group"
          >
            <motion.span
              className="block rounded-full flex-shrink-0 transition-all duration-300"
              animate={{
                width:           item.id === activeId ? 10 : 6,
                height:          item.id === activeId ? 10 : 6,
                backgroundColor: item.id === activeId ? NAV_COLORS[idx] : "#E8E8F0",
                boxShadow:       item.id === activeId ? `0 0 0 3px ${NAV_COLORS[idx]}30` : "none",
              }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <motion.span
              className="font-body text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap text-ink-dim"
              animate={{ opacity: item.id === activeId ? 1 : 0, x: item.id === activeId ? 0 : -6 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
            >
              {item.label}
            </motion.span>
          </button>
        ))}
      </nav>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-frame px-5 py-3 flex items-center justify-between shadow-sm">
        <span className="font-body text-[10px] font-bold tracking-widest uppercase text-ink-faint">
          {String(activeIndex + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
        </span>
        <span className="font-body text-xs font-semibold text-ink-soft truncate mx-4 flex-1 text-center">
          {activeLabel}
        </span>
        <button
          onClick={() => setMenuOpen(true)}
          className="text-ink-soft hover:text-orange transition-colors flex-shrink-0"
          aria-label="Open chapter menu"
        >
          <span className="flex flex-col gap-[5px]" aria-hidden="true">
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-3 h-0.5 bg-current rounded" />
          </span>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[9998] bg-white flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-frame">
              <span className="font-body text-xs font-bold tracking-widest uppercase text-ink-dim">chapters</span>
              <button onClick={() => setMenuOpen(false)} className="text-ink-dim hover:text-orange transition-colors text-xl" aria-label="Close menu">✕</button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="All chapters">
              <ol className="space-y-4">
                {items.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-4 text-left w-full group"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.id === activeId ? NAV_COLORS[idx] : "#E8E8F0" }}
                        aria-hidden="true"
                      />
                      <span className={`font-display font-bold text-2xl transition-colors ${item.id === activeId ? "text-orange" : "text-ink-soft hover:text-ink"}`}>
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ol>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
