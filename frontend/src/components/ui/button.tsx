import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button relative isolate inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold outline-none transition-[border-color,box-shadow,color,background,transform,filter] duration-300 will-change-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&>*]:relative [&>*]:z-10",
  {
    variants: {
      variant: {
        default:
          "border border-slate-900 bg-slate-950 text-white shadow-[0_18px_60px_-32px_rgba(15,23,42,.48)] hover:-translate-y-1 hover:bg-slate-800 hover:shadow-[0_28px_90px_-42px_rgba(15,23,42,.46)] dark:border-white/10 dark:bg-foreground dark:text-background dark:shadow-[0_18px_60px_-28px_hsl(var(--foreground))] dark:hover:shadow-[0_28px_90px_-34px_hsl(var(--primary))]",
        premium:
          "premium-button border border-slate-950 bg-slate-950 shadow-[0_24px_80px_-40px_rgba(15,23,42,.55)] before:absolute before:inset-0 before:translate-x-[-130%] before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.28),transparent)] before:transition-transform before:duration-700 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-[0_34px_100px_-48px_rgba(15,23,42,.6)] hover:before:translate-x-[130%] dark:border-white/20 dark:bg-[linear-gradient(135deg,#155e75,#1d4ed8_46%,#7e22ce_76%,#9f1239)] dark:shadow-[0_24px_90px_-32px_hsl(var(--primary)),0_0_0_1px_rgba(255,255,255,.08)_inset] dark:after:absolute dark:after:inset-[-2px] dark:after:-z-10 dark:after:rounded-full dark:after:bg-[linear-gradient(115deg,#155e75,#1d4ed8,#7e22ce,#9f1239)] dark:after:opacity-70 dark:after:blur-md dark:hover:shadow-[0_34px_110px_-38px_hsl(var(--primary)),0_0_34px_hsl(var(--primary)/.2)]",
        glass:
          "border border-slate-200/80 bg-white/75 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,.85),0_20px_70px_-48px_rgba(15,23,42,.28)] backdrop-blur-2xl hover:-translate-y-1 hover:border-primary/35 hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_28px_90px_-48px_hsl(var(--primary)/.3)] dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_20px_70px_-44px_hsl(var(--primary))] dark:hover:bg-white/15 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,.22),0_28px_90px_-42px_hsl(var(--primary))]",
        ghost:
          "border border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-7 text-base",
        icon: "size-11 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
