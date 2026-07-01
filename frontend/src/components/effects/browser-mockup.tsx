import {
  ArrowUpRight,
  BarChart3,
  Lock,
  MonitorSmartphone,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = ["Trang chủ", "Dịch vụ", "Dự án", "Liên hệ"];

const websiteCards = [
  { title: "Website doanh nghiệp", tone: "from-primary/25 to-primary/5" },
  { title: "Landing bán hàng", tone: "from-accent/25 to-accent/5" },
  { title: "Phần mềm quản lý", tone: "from-coral/25 to-coral/5" }
];

/**
 * Mockup giao diện website đặt trong khung trình duyệt.
 * Thuần trình bày (không state, không pointer handler) để render nhẹ & nét.
 */
export function BrowserMockup({ className }: { className?: string }) {
  return (
    <div className={cn("browser-frame", className)}>
      {/* Thanh trình duyệt */}
      <div className="browser-bar flex items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-coral" />
          <span className="size-3 rounded-full bg-[#f7b955]" />
          <span className="size-3 rounded-full bg-primary" />
        </div>
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <Lock className="size-3 text-emerald-500" />
          nhatechvn.com
        </div>
        <MonitorSmartphone className="size-4 text-slate-400" />
      </div>

      {/* Nội dung website */}
      <div className="browser-screen px-5 pb-6 pt-5 sm:px-7 sm:pb-8">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg gradient-brand text-white">
              <Sparkles className="size-3.5" />
            </span>
            <span className="text-sm font-extrabold text-slate-950 dark:text-white">
              NhaTech
            </span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            {navItems.map((item) => (
              <span
                key={item}
                className="text-[11px] font-semibold text-slate-500 dark:text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
          <span className="rounded-full gradient-brand px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-primary/30">
            Tư vấn
          </span>
        </div>

        {/* Hero */}
        <div className="mt-6 grid gap-5 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
              <Sparkles className="size-3" />
              Giải pháp số
            </span>
            <h3 className="mt-3 text-xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-2xl">
              Website & phần mềm{" "}
              <span className="gradient-brand-text">giúp bạn vận hành tốt hơn</span>
            </h3>
            <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              Thiết kế hiện đại, dễ dùng, tối ưu tốc độ và chuyển đổi khách hàng.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1.5 text-[11px] font-bold text-white">
                Bắt đầu <ArrowUpRight className="size-3" />
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                Xem mẫu
              </span>
            </div>
          </div>

          {/* Panel số liệu */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                Lượt liên hệ
              </span>
              <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-primary">
                <BarChart3 className="size-4" />
              </span>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-slate-950 dark:text-white">
              +48%
            </div>
            <div className="mt-3 flex h-14 items-end gap-1.5">
              {[38, 54, 46, 72, 60, 88, 76].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-full gradient-brand"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lưới dịch vụ */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {websiteCards.map((card) => (
            <div
              key={card.title}
              className={cn(
                "rounded-xl border border-slate-200/80 bg-gradient-to-br p-3 dark:border-white/10",
                card.tone
              )}
            >
              <span className="block size-6 rounded-lg gradient-brand" />
              <p className="mt-2 text-[10px] font-bold leading-tight text-slate-700 dark:text-slate-200">
                {card.title}
              </p>
              <span className="mt-1.5 block h-1 w-8 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
