import {
  Bell,
  Home,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceVisual =
  | "website"
  | "landing"
  | "mobile"
  | "dashboard"
  | "desktop"
  | "ai";

/** Mini "ảnh sản phẩm" UI thật (có chữ, nét) minh hoạ cho từng dịch vụ. */
export function ServiceMockup({
  variant,
  className
}: {
  variant: ServiceVisual;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/70 p-2.5 dark:border-white/10 dark:bg-white/[0.04]",
        className
      )}
    >
      {variant === "website" && <WebsiteVisual />}
      {variant === "landing" && <LandingVisual />}
      {variant === "mobile" && <MobileVisual />}
      {variant === "dashboard" && <DashboardVisual />}
      {variant === "desktop" && <DesktopVisual />}
      {variant === "ai" && <AiVisual />}
    </div>
  );
}

const card =
  "rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-white/10";
const dots = (
  <div className="flex items-center gap-1">
    <span className="size-1.5 rounded-full bg-coral" />
    <span className="size-1.5 rounded-full bg-[#f7b955]" />
    <span className="size-1.5 rounded-full bg-primary" />
  </div>
);
const brandMark = (
  <span className="grid size-3.5 place-items-center rounded bg-primary text-white">
    <Sparkles className="size-2.5" />
  </span>
);

function WebsiteVisual() {
  return (
    <div className={cn(card, "flex h-full flex-col overflow-hidden")}>
      <div className="flex items-center gap-2 border-b border-slate-100 px-2 py-1.5 dark:border-white/10">
        {dots}
        <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[7px] font-medium text-slate-400 dark:bg-white/10">
          nhatechvn.com
        </span>
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {brandMark}
            <span className="text-[8px] font-extrabold text-slate-900 dark:text-white">
              NhaTech
            </span>
          </div>
          <div className="flex gap-1.5 text-[7px] font-semibold text-slate-400">
            <span>Trang chủ</span>
            <span>Dịch vụ</span>
            <span>Liên hệ</span>
          </div>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-[1.25fr_1fr] gap-2">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-extrabold leading-tight text-slate-900 dark:text-white">
              Website chuyên nghiệp cho doanh nghiệp
            </p>
            <p className="mt-1 text-[7px] font-medium text-slate-400">
              Đẹp · dễ dùng · chuẩn SEO
            </p>
            <span className="mt-1.5 w-max rounded-md bg-primary px-2 py-1 text-[7px] font-bold text-white">
              Xem thêm
            </span>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/12 ring-1 ring-inset ring-primary/10" />
        </div>
      </div>
    </div>
  );
}

function LandingVisual() {
  return (
    <div className={cn(card, "flex h-full flex-col items-center justify-center gap-1.5 px-3 text-center")}>
      <span className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2 py-0.5 text-[7px] font-bold text-coral">
        <Sparkles className="size-2" /> Ưu đãi hôm nay
      </span>
      <p className="text-[15px] font-black leading-none text-slate-900 dark:text-white">
        Giảm <span className="text-primary">30%</span>
      </p>
      <p className="text-[7px] font-medium text-slate-400">
        Gói thiết kế website trọn gói
      </p>
      <span className="mt-0.5 rounded-md bg-primary px-3 py-1 text-[8px] font-bold text-white shadow-md shadow-primary/30">
        Đăng ký ngay
      </span>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-2.5">
      <div className="flex h-[136px] w-[74px] flex-col gap-1 rounded-[16px] border-2 border-slate-300 bg-white p-1.5 dark:border-white/20 dark:bg-slate-900">
        <span className="mx-auto mb-0.5 h-1 w-5 rounded-full bg-slate-300 dark:bg-white/25" />
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-bold text-slate-900 dark:text-white">Ví của tôi</span>
          <Bell className="size-2.5 text-slate-400" />
        </div>
        <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-1.5 text-white">
          <p className="text-[6px] opacity-90">Số dư</p>
          <p className="text-[9px] font-extrabold leading-tight">12.5tr</p>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-slate-50 px-1 py-1 dark:bg-white/[0.05]">
          <ShoppingBag className="size-2.5 text-primary" />
          <span className="text-[6px] font-semibold text-slate-600 dark:text-slate-300">Đơn #1024</span>
          <span className="ml-auto text-[6px] font-bold text-emerald-600">+250k</span>
        </div>
        <div className="mt-auto flex items-center justify-around border-t border-slate-100 pt-1 dark:border-white/10">
          <Home className="size-2.5 text-primary" />
          <Search className="size-2.5 text-slate-300" />
          <User className="size-2.5 text-slate-300" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="text-[10px] font-extrabold leading-tight text-slate-900 dark:text-white">
          App di động mượt mà
        </p>
        <p className="text-[7px] font-medium text-slate-400">iOS &amp; Android</p>
        <div className="flex gap-1">
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[6px] font-bold text-primary">Đặt lịch</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[6px] font-bold text-primary">Thanh toán</span>
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className={cn(card, "flex h-full gap-1.5 p-1.5")}>
      <div className="flex w-11 flex-col gap-1 rounded-lg bg-slate-50 p-1 dark:bg-white/[0.05]">
        <div className="mb-0.5 flex items-center gap-1">
          {brandMark}
          <span className="text-[6px] font-bold text-slate-700 dark:text-white">Quản lý</span>
        </div>
        {["Tổng quan", "Đơn hàng", "Khách hàng"].map((t, i) => (
          <span
            key={t}
            className={cn(
              "rounded px-1 py-0.5 text-[6px] font-semibold",
              i === 0
                ? "bg-primary/12 text-primary"
                : "text-slate-400 dark:text-slate-500"
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-slate-50 p-1.5 dark:bg-white/[0.05]">
            <p className="text-[6px] font-medium text-slate-400">Doanh thu</p>
            <p className="text-[10px] font-extrabold text-slate-900 dark:text-white">82tr</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-1.5 dark:bg-white/[0.05]">
            <p className="text-[6px] font-medium text-slate-400">Đơn hàng</p>
            <p className="text-[10px] font-extrabold text-slate-900 dark:text-white">128</p>
          </div>
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-lg bg-slate-50 p-1.5 dark:bg-white/[0.05]">
          {[45, 68, 52, 92, 74, 60].map((h, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-t", i === 3 ? "bg-primary" : "bg-primary/30")}
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopVisual() {
  return (
    <div className={cn(card, "flex h-full flex-col overflow-hidden")}>
      <div className="flex items-center gap-2 border-b border-slate-100 px-2 py-1.5 dark:border-white/10">
        {dots}
        <span className="ml-1 text-[7px] font-bold text-slate-500 dark:text-slate-300">
          NhaTech Desktop
        </span>
        <Settings className="ml-auto size-2.5 text-slate-300" />
      </div>
      <div className="flex flex-1 gap-1.5 p-2">
        <div className="flex w-6 flex-col items-center gap-1.5 rounded-lg bg-slate-50 py-1.5 dark:bg-white/[0.05]">
          <Home className="size-2.5 text-primary" />
          <User className="size-2.5 text-slate-300" />
          <Settings className="size-2.5 text-slate-300" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <div>
            <p className="text-[6px] font-medium text-slate-400">Tên khách hàng</p>
            <div className="mt-0.5 h-3 rounded bg-slate-100 dark:bg-white/10" />
          </div>
          <div>
            <p className="text-[6px] font-medium text-slate-400">Số điện thoại</p>
            <div className="mt-0.5 h-3 rounded bg-slate-100 dark:bg-white/10" />
          </div>
          <span className="w-max rounded-md bg-primary px-2.5 py-1 text-[7px] font-bold text-white">
            Lưu thông tin
          </span>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className={cn(card, "flex h-full flex-col gap-1.5 p-2")}>
      <div className="flex items-center gap-1 border-b border-slate-100 pb-1 dark:border-white/10">
        <span className="grid size-3.5 place-items-center rounded-full bg-primary text-white">
          <Sparkles className="size-2" />
        </span>
        <span className="text-[7px] font-bold text-slate-700 dark:text-white">Trợ lý NhaTech</span>
      </div>
      <div className="max-w-[80%] self-start rounded-lg rounded-bl-sm bg-slate-100 px-1.5 py-1 text-[7px] font-medium leading-snug text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
        Xin chào! Tôi giúp gì được ạ?
      </div>
      <div className="max-w-[85%] self-end rounded-lg rounded-br-sm bg-primary px-1.5 py-1 text-[7px] font-medium leading-snug text-white">
        Soạn email chăm sóc khách cũ
      </div>
      <div className="mt-auto flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-white/[0.06]">
        <span className="text-[7px] text-slate-400">Nhập yêu cầu…</span>
        <span className="ml-auto grid size-4 place-items-center rounded-full bg-primary text-white">
          <Send className="size-2" />
        </span>
      </div>
    </div>
  );
}
