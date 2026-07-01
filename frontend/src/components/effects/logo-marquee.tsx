import { AppWindow, BarChart3, Bot, Smartphone } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiFigma,
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import { cn } from "@/lib/utils";

type Item =
  | { kind: "tech"; Icon: IconType; label: string }
  | { kind: "service"; Icon: typeof AppWindow; label: string };

const items: Item[] = [
  { kind: "tech", Icon: SiNextdotjs, label: "Next.js" },
  { kind: "tech", Icon: SiReact, label: "React" },
  { kind: "service", Icon: AppWindow, label: "Website doanh nghiệp" },
  { kind: "tech", Icon: SiTypescript, label: "TypeScript" },
  { kind: "tech", Icon: SiTailwindcss, label: "Tailwind CSS" },
  { kind: "service", Icon: Smartphone, label: "Ứng dụng di động" },
  { kind: "tech", Icon: SiPostgresql, label: "PostgreSQL" },
  { kind: "tech", Icon: SiPrisma, label: "Prisma" },
  { kind: "service", Icon: BarChart3, label: "Phần mềm quản lý" },
  { kind: "tech", Icon: SiNodedotjs, label: "Node.js" },
  { kind: "tech", Icon: SiFramer, label: "Motion" },
  { kind: "service", Icon: Bot, label: "Công cụ AI" },
  { kind: "tech", Icon: SiFigma, label: "Figma" }
];

export function LogoMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-slate-200/70 bg-white/40 py-6 dark:border-white/10 dark:bg-white/[0.02]">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
        Xây dựng bằng công nghệ hiện đại
      </p>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
      <div className="marquee-track gap-8">
        {loop.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              className={cn(
                "flex min-w-max items-center gap-2.5 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                item.kind === "service" && "text-slate-600 dark:text-slate-300"
              )}
              key={`${item.label}-${index}`}
            >
              <Icon
                className={cn(
                  "size-5 shrink-0",
                  item.kind === "service" && "text-primary"
                )}
              />
              <span className="whitespace-nowrap text-[15px] font-semibold">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
