import {
  Bell,
  CalendarClock,
  Home,
  ShoppingBag,
  User,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { label: "Đơn hàng mới", value: "+12", icon: ShoppingBag },
  { label: "Lịch hẹn hôm nay", value: "5", icon: CalendarClock },
  { label: "Doanh thu", value: "8.4tr", icon: Wallet }
];

const tabs = [
  { icon: Home, active: true },
  { icon: ShoppingBag, active: false },
  { icon: Bell, active: false },
  { icon: User, active: false }
];

/**
 * Mockup giao diện ứng dụng di động trong khung điện thoại.
 * Thuần trình bày, nhẹ, tự đổi màu theo theme qua token thương hiệu.
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={cn("phone-frame w-[190px] sm:w-[210px]", className)}>
      <div className="phone-screen aspect-[9/19]">
        <div className="phone-island" />

        <div className="flex h-full flex-col px-4 pb-3 pt-8">
          {/* Header app */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-slate-400">Xin chào 👋</p>
              <p className="text-sm font-extrabold text-slate-950 dark:text-white">
                NhaTech App
              </p>
            </div>
            <span className="relative grid size-8 place-items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
              <Bell className="size-4 text-slate-500 dark:text-slate-300" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-coral" />
            </span>
          </div>

          {/* Thẻ ví/gradient */}
          <div className="mt-3 rounded-2xl gradient-brand p-3 text-white shadow-lg shadow-primary/30">
            <p className="text-[10px] font-medium opacity-90">Tổng quan tuần</p>
            <p className="mt-0.5 text-xl font-extrabold">92 điểm</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/30">
              <span className="block h-full w-[86%] rounded-full bg-white" />
            </div>
          </div>

          {/* Danh sách hoạt động */}
          <div className="mt-3 space-y-2">
            {activities.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/80 p-2 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {label}
                </span>
                <span className="text-[11px] font-extrabold text-slate-950 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div className="mt-auto flex items-center justify-around rounded-2xl border border-slate-200/80 bg-white/90 py-2 dark:border-white/10 dark:bg-white/[0.06]">
            {tabs.map(({ icon: Icon, active }, i) => (
              <span
                key={i}
                className={cn(
                  "grid size-8 place-items-center rounded-xl",
                  active
                    ? "gradient-brand text-white shadow-md shadow-primary/30"
                    : "text-slate-400"
                )}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
