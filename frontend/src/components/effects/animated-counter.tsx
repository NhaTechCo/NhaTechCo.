"use client";

import { animate } from "motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let controls: { stop: () => void } | undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setDisplay(value);
        return;
      }
      controls = animate(0, value, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setDisplay(latest)
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    // An toàn: nếu observer bỏ lỡ (mobile, đã hiển thị sẵn...), kiểm tra lại
    // sau một nhịp — nếu phần tử đang trong khung nhìn thì vẫn chạy.
    const fallback = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        run();
        io.disconnect();
      }
    }, 700);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      controls?.stop();
    };
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
