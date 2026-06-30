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

type ScrollRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  amount?: number;
  blur?: boolean;
  children: ReactNode;
  delay?: number;
  once?: boolean;
  scale?: boolean;
  viewportMargin?: string;
  yOffset?: number;
};

type StaggerContainerProps = Omit<HTMLMotionProps<"div">, "children"> & {
  amount?: number;
  children: ReactNode;
  delay?: number;
  once?: boolean;
  viewportMargin?: string;
};

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  hover?: boolean;
};

export function ScrollReveal({
  amount = 0.24,
  blur = true,
  children,
  className,
  delay = 0,
  once = true,
  scale = true,
  viewportMargin = "-80px",
  yOffset = 40,
  ...props
}: ScrollRevealProps) {
  const direction = useScrollDirection();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div className={className} {...props}>
        {children}
      </motion.div>
    );
  }

  const variants: Variants = {
    hidden: {
      filter: blur ? "blur(10px)" : "blur(0px)",
      opacity: 0,
      scale: scale ? 0.98 : 1,
      y: direction === "down" ? yOffset : -yOffset
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.7,
        ease: premiumEase
      },
      y: 0
    }
  };

  return (
    <motion.div
      className={cn("transform-gpu", className)}
      initial="hidden"
      variants={variants}
      viewport={{ amount, margin: viewportMargin, once }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  amount = 0.18,
  children,
  className,
  delay = 0,
  once = true,
  viewportMargin = "-80px",
  ...props
}: StaggerContainerProps) {
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
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay + 0.1,
            staggerChildren: 0.08
          }
        }
      }}
      viewport={{ amount, margin: viewportMargin, once }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  hover = true,
  ...props
}: StaggerItemProps) {
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
      className={cn("transform-gpu", className)}
      transition={{ duration: 0.45, ease: "easeOut" }}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.96,
          y: 32
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.45,
            ease: "easeOut"
          },
          y: 0
        }
      }}
      whileHover={hover ? { scale: 1.02, y: -6 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
