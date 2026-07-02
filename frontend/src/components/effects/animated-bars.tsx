"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Biểu đồ cột chạy animation khi cuộn tới (dùng brand color). */
export function AnimatedBars({
  values,
  highlight,
  className
}: {
  values: number[];
  highlight?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setOn(true);
        io.disconnect();
      }
    }, 700);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref} className={cn("flex items-end gap-1.5", className)}>
      {values.map((v, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-t brand-bg transition-[height,opacity] duration-700 ease-out",
            i === highlight ? "opacity-100" : "opacity-30"
          )}
          style={{
            height: on ? `${v}%` : "6%",
            transitionDelay: `${i * 90}ms`
          }}
        />
      ))}
    </div>
  );
}

/** Thanh tiến trình chạy animation khi cuộn tới. */
export function AnimatedMeter({
  value,
  className,
  barClassName
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setOn(true);
        io.disconnect();
      }
    }, 700);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref} className={cn("h-1.5 overflow-hidden rounded-full", className)}>
      <span
        className={cn("block h-full rounded-full transition-[width] duration-1000 ease-out", barClassName)}
        style={{ width: on ? `${value}%` : "0%" }}
      />
    </div>
  );
}
