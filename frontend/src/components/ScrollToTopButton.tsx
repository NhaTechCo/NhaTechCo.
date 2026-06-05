"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      setEnabled(window.scrollY > 400);
    };

    syncVisibility();
    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("resize", syncVisibility);
    const intervalId = window.setInterval(syncVisibility, 350);

    return () => {
      window.removeEventListener("scroll", syncVisibility);
      window.removeEventListener("resize", syncVisibility);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <motion.button
      aria-hidden={!enabled}
      aria-label="Quay lại đầu trang"
      className={cn(
        "scroll-top-button grid size-12 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-900 shadow-[0_20px_70px_-36px_rgba(15,23,42,.45)] backdrop-blur-xl transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-[0_20px_70px_-34px_hsl(var(--primary)/.7)] dark:hover:bg-slate-900",
        "touch-manipulation",
        enabled ? "pointer-events-auto" : "pointer-events-none"
      )}
      animate={
        enabled
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      onClick={() => {
        window.scrollTo({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          top: 0
        });
      }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      type="button"
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.94 }}
    >
      <ArrowUp className="size-5" />
    </motion.button>
  );
}
