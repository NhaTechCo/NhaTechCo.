"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants
} from "framer-motion";
import type { ReactNode } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

const premiumEase = [0.22, 1, 0.36, 1] as const;

type SplitRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  amount?: number;
  left: ReactNode;
  leftClassName?: string;
  right: ReactNode;
  rightClassName?: string;
  viewportMargin?: string;
  once?: boolean;
};

export function SplitReveal({
  amount = 0.08,
  className,
  left,
  leftClassName,
  right,
  rightClassName,
  viewportMargin = "0px",
  once = true,
  ...props
}: SplitRevealProps) {
  const direction = useScrollDirection();
  const shouldReduceMotion = useReducedMotion();
  const y = direction === "down" ? 40 : -40;

  if (shouldReduceMotion) {
    return (
      <motion.div className={className} {...props}>
        <div className={leftClassName}>{left}</div>
        <div className={rightClassName}>{right}</div>
      </motion.div>
    );
  }

  const sideTransition = {
    duration: 0.7,
    ease: premiumEase
  };

  const leftVariants: Variants = {
    hidden: {
      filter: "blur(2px)",
      opacity: 0.78,
      scale: 0.96,
      x: -80,
      y
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: sideTransition,
      x: 0,
      y: 0
    }
  };

  const rightVariants: Variants = {
    hidden: {
      filter: "blur(2px)",
      opacity: 0.78,
      scale: 0.96,
      x: 80,
      y
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: sideTransition,
      x: 0,
      y: 0
    }
  };

  return (
    <motion.div
      className={cn("transform-gpu", className)}
      initial="hidden"
      viewport={{ amount, margin: viewportMargin, once }}
      whileInView="visible"
      {...props}
    >
      <motion.div
        className={cn("transform-gpu", leftClassName)}
        variants={leftVariants}
      >
        {left}
      </motion.div>
      <motion.div
        className={cn("transform-gpu", rightClassName)}
        variants={rightVariants}
      >
        {right}
      </motion.div>
    </motion.div>
  );
}
