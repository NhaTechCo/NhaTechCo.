"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FloatingElementProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  rotate?: number;
  y?: number;
};

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 7,
  rotate = 1,
  y = 10,
  ...props
}: FloatingElementProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div className={className} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ rotate: [0, rotate, 0], y: [0, -y, 0] }}
      className={cn("transform-gpu", className)}
      transition={{
        delay,
        duration,
        ease: "easeInOut",
        repeat: Infinity
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
