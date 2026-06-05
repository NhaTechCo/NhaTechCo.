"use client";

import { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type MouseSpotlightProps = HTMLAttributes<HTMLDivElement> & {
  tilt?: boolean;
};

export function MouseSpotlight({
  className,
  children,
  onPointerLeave,
  onPointerMove,
  style,
  tilt = false,
  ...props
}: MouseSpotlightProps) {
  return (
    <div
      className={cn("spotlight", tilt && "tilt-card", className)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        event.currentTarget.style.setProperty(
          "--spotlight-x",
          `${x}px`
        );
        event.currentTarget.style.setProperty(
          "--spotlight-y",
          `${y}px`
        );

        if (tilt) {
          const rotateY = ((x / rect.width - 0.5) * 10).toFixed(2);
          const rotateX = ((0.5 - y / rect.height) * 8).toFixed(2);
          event.currentTarget.style.setProperty("--tilt-x", `${rotateY}deg`);
          event.currentTarget.style.setProperty("--tilt-y", `${rotateX}deg`);
        }

        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        if (tilt) {
          event.currentTarget.style.setProperty("--tilt-x", "0deg");
          event.currentTarget.style.setProperty("--tilt-y", "0deg");
        }

        onPointerLeave?.(event);
      }}
      style={style as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
