import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex min-h-12 w-full rounded-2xl border border-slate-200/90 bg-white/85 px-4 py-3 text-base text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] outline-none transition-[border-color,box-shadow,background] placeholder:text-slate-500 focus:border-primary/45 focus:bg-white focus:shadow-[0_0_0_4px_hsl(var(--primary)/.12)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,.08)] dark:placeholder:text-slate-400 dark:focus:border-cyan-300/50 dark:focus:bg-white/[0.08] dark:focus:shadow-[0_0_0_4px_rgba(34,211,238,.12)]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
