"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001,
    stiffness: 120
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
