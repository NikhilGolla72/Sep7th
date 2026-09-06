import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap.set(id, entry.intersectionRatio);
          // Find the most visible section
          let bestId = ids[0];
          let bestRatio = -1;
          for (const [sid, ratio] of visibleMap) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = sid;
            }
          }
          setActive(bestId);
        },
        { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0], rootMargin: "-20% 0px -20% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
