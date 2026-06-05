"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import {
  Activity,
  AppWindow,
  BarChart3,
  CheckCircle2,
  Layers3,
  Smartphone
} from "lucide-react";

const rows = [
  ["Tìm hiểu", "98%"],
  ["Thiết kế", "86%"],
  ["Hoàn thiện", "74%"],
  ["Bàn giao", "42%"]
];

export function Hero3DMockup() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 140,
    damping: 18
  });
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(-1deg)`;

  return (
    <div
      aria-label="Mô phỏng giao diện website, ứng dụng và phần mềm dễ sử dụng"
      className="hero-perspective relative min-h-[420px] w-full md:min-h-[580px]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="orbit-ring" />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        className="browser-3d absolute left-0 right-0 top-8 mx-auto w-[92%] max-w-[680px] rounded-[32px] border border-slate-200/80 bg-white/65 p-3 shadow-[0_38px_140px_-64px_rgba(15,23,42,.35)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/10 dark:shadow-[0_38px_140px_-58px_hsl(var(--primary))]"
        style={{ transform }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] dark:border-white/10 dark:bg-[#070b18]/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-coral" />
              <span className="size-3 rounded-full bg-primary" />
              <span className="size-3 rounded-full bg-accent" />
            </div>
            <div className="h-7 w-44 rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5" />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_.76fr]">
            <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-100/80 p-5 dark:border-white/10 dark:from-white/10 dark:to-white/5">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-white/50">
                    Mức độ quan tâm
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">
                    48% liên hệ
                  </h3>
                </div>
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/20 text-primary">
                  <BarChart3 className="size-6" />
                </div>
              </div>
              <div className="grid gap-3">
                {rows.map(([label, value]) => (
                  <div
                    className="grid gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-3 dark:border-white/10 dark:bg-white/[0.06]"
                    key={label}
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-white/70">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-accent/20 text-accent">
                    <AppWindow className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Trang giới thiệu</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-white/50">
                      Dễ tìm thông tin
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="h-16 rounded-2xl bg-slate-200/80 dark:bg-white/10" />
                  <span className="h-16 rounded-2xl bg-primary/20" />
                  <span className="h-16 rounded-2xl bg-slate-200/80 dark:bg-white/10" />
                </div>
              </div>
              <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Ứng dụng đặt lịch</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-white/50">
                      Dễ thao tác
                    </p>
                  </div>
                  <Smartphone className="size-5 text-primary" />
                </div>
                <div className="mt-4 flex gap-2">
                  {[1, 2, 3].map((item) => (
                    <span
                      className="h-20 flex-1 rounded-[18px] border border-slate-200/80 bg-gradient-to-b from-slate-100 to-white dark:border-white/10 dark:from-white/10 dark:to-white/5"
                      key={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -18, 0] }}
        className="absolute left-0 top-24 hidden w-56 -translate-x-8 rounded-[28px] border border-slate-200/80 bg-white/85 p-4 text-slate-950 shadow-[0_24px_80px_-48px_rgba(15,23,42,.32)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-[0_24px_80px_-42px_hsl(var(--accent))] md:block"
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="mb-4 flex items-center gap-3">
          <Layers3 className="size-5 text-accent" />
          <span className="text-sm font-bold">Lớp trải nghiệm</span>
        </div>
        <div className="grid gap-2">
          {["Rõ ràng", "Dễ dùng", "Ổn định"].map((item) => (
            <div
              className="flex items-center justify-between rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white"
              key={item}
            >
              {item}
              <CheckCircle2 className="size-4 text-primary" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [0, -8, 0], y: [0, 16, 0] }}
        className="absolute bottom-10 right-2 hidden w-48 rounded-[28px] border border-slate-200/80 bg-white/85 p-4 text-slate-950 shadow-[0_24px_80px_-48px_rgba(15,23,42,.32)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-[0_24px_80px_-42px_hsl(var(--primary))] md:block"
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-bold">Tín hiệu khách hàng</span>
          <Activity className="size-5 text-primary" />
        </div>
        <div className="flex h-20 items-end gap-2">
          {[36, 64, 52, 88, 72].map((height) => (
            <span
              className="flex-1 rounded-full bg-gradient-to-t from-primary to-accent"
              key={height}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
