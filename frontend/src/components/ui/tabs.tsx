"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex min-h-11 items-center rounded-full border border-slate-200/80 bg-white/75 p-1 text-slate-500 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-400 dark:shadow-black/30",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full border border-transparent px-4 py-1 text-sm font-semibold text-slate-600 outline-none transition-all hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-slate-200 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-lg data-[state=active]:shadow-slate-200/70 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-slate-100 dark:data-[state=active]:border-white/20 dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-violet-500/20",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
