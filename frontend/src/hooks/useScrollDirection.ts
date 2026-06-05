"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection>("down");
  const previousY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    previousY.current = window.scrollY;

    const updateDirection = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - previousY.current;

      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? "down" : "up");
        previousY.current = currentY;
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return direction;
}
