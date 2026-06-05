"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useEffect, useRef, useState } from "react";

const data = [
  { month: "T1", lienHe: 24, hoanThanh: 18 },
  { month: "T2", lienHe: 38, hoanThanh: 27 },
  { month: "T3", lienHe: 52, hoanThanh: 35 },
  { month: "T4", lienHe: 71, hoanThanh: 48 },
  { month: "T5", lienHe: 92, hoanThanh: 66 },
  { month: "T6", lienHe: 128, hoanThanh: 84 }
];

function ChartSkeleton() {
  return (
    <div className="flex h-full min-h-64 w-full items-end gap-3 overflow-hidden rounded-[var(--radius-sm)] border border-slate-200/80 bg-slate-100/70 p-4 dark:border-white/10 dark:bg-white/5">
      {[42, 58, 48, 72, 84, 100].map((height) => (
        <div
          className="flex-1 rounded-t-[var(--radius-sm)] bg-white/80 dark:bg-background/20"
          key={height}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export function GrowthChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [chartSize, setChartSize] = useState({ height: 0, width: 0 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const element = chartRef.current;

    if (!element) {
      return;
    }

    const syncSize = () => {
      const rect = element.getBoundingClientRect();
      setChartSize({
        height: Math.max(0, Math.floor(rect.height)),
        width: Math.max(0, Math.floor(rect.width))
      });
    };

    syncSize();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(syncSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <ChartSkeleton />;
  }

  return (
    <div className="h-64 min-h-64 w-full min-w-0" ref={chartRef}>
      {chartSize.width > 1 && chartSize.height > 1 ? (
        <AreaChart
          data={data}
          height={chartSize.height}
          margin={{ left: -18, right: 10, top: 10 }}
          width={chartSize.width}
        >
          <defs>
            <linearGradient id="leadsGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.42} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="conversionGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--coral))" stopOpacity={0.38} />
              <stop offset="95%" stopColor="hsl(var(--coral))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="hsl(var(--border))"
            strokeDasharray="3 8"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="month"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              background: "hsl(var(--popover))",
              boxShadow: "0 24px 70px -36px hsl(var(--foreground) / .65)",
              color: "hsl(var(--popover-foreground))"
            }}
          />
          <Area
            dataKey="lienHe"
            fill="url(#leadsGradient)"
            name="Khách dễ liên hệ"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            type="monotone"
          />
          <Area
            dataKey="hoanThanh"
            fill="url(#conversionGradient)"
            name="Công việc hoàn thành"
            stroke="hsl(var(--coral))"
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      ) : (
        <ChartSkeleton />
      )}
    </div>
  );
}
