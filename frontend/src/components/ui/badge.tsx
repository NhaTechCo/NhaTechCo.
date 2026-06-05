import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border/80 bg-background/75 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,.75)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-sm",
        accent:
          "border-primary/20 bg-primary/10 text-blue-700 shadow-sm backdrop-blur-xl dark:border-primary/25 dark:bg-primary/15 dark:text-cyan-200",
        dark:
          "border-slate-200/80 bg-white/80 text-slate-900 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 dark:text-white",
        light:
          "border-slate-200/80 bg-white/85 text-slate-900 shadow-sm backdrop-blur-xl dark:border-white/40 dark:bg-white/90 dark:text-slate-950"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
