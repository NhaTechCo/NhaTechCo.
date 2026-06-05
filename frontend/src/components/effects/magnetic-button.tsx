"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  premium?: boolean;
};

export function MagneticButton({
  children,
  className,
  premium = true,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.5 });

  return (
    <motion.a
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        buttonVariants({ variant: premium ? "premium" : "glass", size: "lg" }),
        "touch-manipulation",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-2",
          premium ? "text-white" : "text-current"
        )}
      >
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}
