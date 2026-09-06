import { useState, useCallback, useEffect } from "react";

export interface UseStoryReturn {
  current: number;
  total: number;
  direction: 1 | -1;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  canNext: boolean;
  canPrev: boolean;
}

export function useStory(total: number): UseStoryReturn {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((prev) => {
        if (index < 0 || index >= total || index === prev) return prev;
        setDirection(index > prev ? 1 : -1);
        return index;
      });
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return {
    current,
    total,
    direction,
    goTo,
    next,
    prev,
    canNext: current < total - 1,
    canPrev: current > 0,
  };
}
