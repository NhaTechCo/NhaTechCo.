import { featurePill } from "@/lib/contrast";
import { cn } from "@/lib/utils";

const logos = [
  "Website hiện đại",
  "Ứng dụng di động",
  "Phần mềm quản lý",
  "Ứng dụng máy tính",
  "Công cụ thông minh",
  "Dễ dùng mỗi ngày",
  "Hiển thị đẹp",
  "Dễ liên hệ"
];

export function LogoMarquee() {
  const items = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden border-y border-slate-200/80 bg-background/50 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-background/40">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track gap-4">
        {items.map((logo, index) => (
          <div
            className={cn(featurePill, "flex h-10 min-w-36 items-center justify-center px-5 text-sm font-semibold")}
            key={`${logo}-${index}`}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
