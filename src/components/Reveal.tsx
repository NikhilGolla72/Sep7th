import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p";
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  distance = 24,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
