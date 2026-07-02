import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  Search,
  Send,
  Sparkles,
  Star
} from "lucide-react";
import type { CSSProperties } from "react";
import { AnimatedBars, AnimatedMeter } from "@/components/effects/animated-bars";
import { cn } from "@/lib/utils";

export type AiScreen =
  | "chat"
  | "inbox"
  | "order"
  | "analytics"
  | "booking"
  | "pos";

export type Accent = { from: string; to: string };

function brandStyle(accent?: Accent): CSSProperties | undefined {
  if (!accent) return undefined;
  return { "--brand": accent.from, "--brand2": accent.to } as CSSProperties;
}

/** Khung điện thoại + màn hình app dựng bằng code (nét, theo theme, màu theo sản phẩm). */
export function AiPhone({
  screen,
  accent,
  className
}: {
  screen: AiScreen;
  accent?: Accent;
  className?: string;
}) {
  return (
    <div
      className={cn("phone-frame w-[224px] sm:w-[248px]", className)}
      style={brandStyle(accent)}
    >
      <div className="phone-screen aspect-[9/19]">
        <div className="phone-island" />
        <div className="flex h-full flex-col px-3.5 pb-3 pt-8 text-slate-900 dark:text-white">
          {screen === "chat" && <ChatScreen />}
          {screen === "inbox" && <InboxScreen />}
          {screen === "order" && <OrderScreen />}
          {screen === "analytics" && <AnalyticsScreen />}
          {screen === "booking" && <BookingScreen />}
          {screen === "pos" && <PosScreen />}
        </div>
      </div>
    </div>
  );
}

function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 dark:ring-white/10",
        className
      )}
    >
      {/* Logo NhaTech gắn vào app mẫu */}
      <img
        src="/images/logo.png"
        alt="NhaTech"
        className="size-[70%] object-contain"
      />
    </span>
  );
}

function AppHeader({
  title,
  subtitle,
  ai = true
}: {
  title: string;
  subtitle?: string;
  ai?: boolean;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5 border-b border-slate-100 pb-2.5 dark:border-white/10">
      <BrandLogo className="size-8" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold leading-tight">{title}</p>
        {subtitle && (
          <p className="flex items-center gap-1 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {subtitle}
          </p>
        )}
      </div>
      {ai && (
        <span className="brand-soft brand-text rounded-full px-2 py-0.5 text-[8px] font-bold">
          AI
        </span>
      )}
    </div>
  );
}

function ChatScreen() {
  return (
    <>
      <AppHeader title="Thời Trang ABC" subtitle="AI đang trực" />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="max-w-[78%] self-start rounded-2xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-[10px] leading-snug text-slate-700 dark:bg-white/[0.08] dark:text-slate-200">
          Áo này còn size M không shop?
        </div>
        <div className="brand-bg max-w-[85%] self-end rounded-2xl rounded-br-sm px-2.5 py-1.5 text-[10px] leading-snug text-white">
          Dạ còn ạ! Áo thun ABC size M đang sẵn hàng, mình gửi mẫu nha 👇
        </div>
        <div className="self-end w-[85%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="flex gap-2 p-2">
            <span className="brand-grad-soft size-11 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-bold">Áo thun ABC — Trắng</p>
              <p className="brand-text text-[10px] font-extrabold">199.000đ</p>
              <div className="mt-0.5 flex items-center gap-0.5 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star className="size-2 fill-current" key={i} />
                ))}
                <span className="ml-0.5 text-[7px] text-slate-400">(230)</span>
              </div>
            </div>
          </div>
          <button className="brand-bg w-full py-1 text-[9px] font-bold text-white">
            Đặt mua ngay
          </button>
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {["Còn màu nào?", "Phí ship?", "Đặt hàng"].map((q) => (
            <span
              key={q}
              className="brand-soft brand-text brand-border rounded-full border px-2 py-0.5 text-[8px] font-semibold"
            >
              {q}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1.5 dark:bg-white/[0.06]">
        <Sparkles className="brand-text size-3" />
        <span className="flex-1 text-[9px] text-slate-400">AI đang soạn trả lời…</span>
        <span className="brand-bg grid size-5 place-items-center rounded-full text-white">
          <Send className="size-2.5" />
        </span>
      </div>
    </>
  );
}

function InboxScreen() {
  const rows = [
    { name: "Nguyễn Minh", msg: "Cho mình đặt 2 áo size L", ch: "Zalo", t: "2 phút", done: true },
    { name: "Trần Thu", msg: "Shop còn hàng không ạ?", ch: "Mess", t: "8 phút", done: true },
    { name: "Lê Hoàng", msg: "Ship về Đà Nẵng bao lâu?", ch: "Web", t: "15 phút", done: true },
    { name: "Phạm An", msg: "Mình muốn đổi size", ch: "Zalo", t: "1 giờ", done: false }
  ];
  return (
    <>
      <AppHeader title="Hộp thư đa kênh" subtitle="3 kênh · realtime" />
      <div className="mb-2 flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5 dark:bg-white/[0.06]">
        <Search className="size-3 text-slate-400" />
        <span className="text-[9px] text-slate-400">Tìm hội thoại…</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-2 dark:border-white/10 dark:bg-slate-900/60"
          >
            <span className="brand-grad-soft brand-text grid size-8 shrink-0 place-items-center rounded-full text-[9px] font-bold">
              {r.name.split(" ").slice(-1)[0][0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="truncate text-[9.5px] font-bold">{r.name}</p>
                <span className="rounded bg-slate-100 px-1 text-[7px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {r.ch}
                </span>
              </div>
              <p className="truncate text-[8.5px] text-slate-500 dark:text-slate-400">{r.msg}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[7px] text-slate-400">{r.t}</span>
              {r.done ? (
                <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/12 px-1 py-0.5 text-[7px] font-bold text-emerald-600 dark:text-emerald-400">
                  <BadgeCheck className="size-2" /> AI
                </span>
              ) : (
                <span className="rounded-full bg-amber-500/15 px-1 py-0.5 text-[7px] font-bold text-amber-600">
                  Chờ
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function OrderScreen() {
  return (
    <>
      <AppHeader title="Chốt đơn tự động" subtitle="AI đã tổng hợp" />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/10 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="brand-grad-soft size-9 rounded-lg" />
            <div className="flex-1">
              <p className="text-[9.5px] font-bold">Áo thun ABC — Trắng, M</p>
              <p className="text-[8px] text-slate-400">Số lượng: 2</p>
            </div>
            <p className="brand-text text-[10px] font-extrabold">398k</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-white/[0.05]">
          <Row label="Tạm tính" value="398.000đ" />
          <Row label="Phí ship" value="30.000đ" />
          <div className="my-1 border-t border-dashed border-slate-200 dark:border-white/10" />
          <Row label="Tổng cộng" value="428.000đ" bold />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/10 dark:bg-slate-900/60">
          <InfoRow icon={CheckCircle2} text="Nguyễn Minh" />
          <InfoRow icon={Phone} text="0901 234 567" />
          <InfoRow icon={MapPin} text="12 Lê Lợi, Q.1, TP.HCM" />
        </div>
        <p className="brand-text flex items-center gap-1 text-[8px] font-medium">
          <Sparkles className="size-2.5" /> AI tự điền từ hội thoại
        </p>
      </div>
      <button className="brand-bg brand-shadow mt-2 w-full rounded-full py-2 text-[10px] font-bold text-white">
        Xác nhận đơn hàng
      </button>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className={cn("text-[9px]", bold ? "font-bold" : "text-slate-500 dark:text-slate-400")}>
        {label}
      </span>
      <span className={cn("text-[9.5px]", bold ? "brand-text font-extrabold" : "font-semibold")}>
        {value}
      </span>
    </div>
  );
}

function InfoRow({ icon: Icon, text }: { icon: typeof Phone; text: string }) {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <Icon className="brand-text size-3" />
      <span className="text-[9px] font-medium text-slate-600 dark:text-slate-300">{text}</span>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <>
      <AppHeader title="Tổng quan CSKH" subtitle="Cập nhật realtime" />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="grid grid-cols-2 gap-1.5">
          <Kpi label="Hội thoại" value="1.284" />
          <Kpi label="Tỷ lệ chốt" value="38%" />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/10 dark:bg-slate-900/60">
          <p className="mb-1.5 text-[8.5px] font-semibold text-slate-500 dark:text-slate-400">
            Đơn chốt 7 ngày
          </p>
          <AnimatedBars
            values={[45, 62, 50, 78, 66, 92, 72]}
            highlight={5}
            className="h-16"
          />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/10 dark:bg-slate-900/60">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8.5px] font-semibold text-slate-500 dark:text-slate-400">
              Mức hài lòng
            </span>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">96%</span>
          </div>
          <AnimatedMeter
            value={96}
            className="bg-slate-100 dark:bg-white/10"
            barClassName="bg-emerald-500"
          />
        </div>
      </div>
    </>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-2 dark:border-white/10 dark:bg-slate-900/60">
      <p className="text-[8px] font-medium text-slate-400">{label}</p>
      <p className="text-[15px] font-extrabold leading-tight">{value}</p>
    </div>
  );
}

function BookingScreen() {
  const days = ["T2", "T3", "T4", "T5", "T6"];
  const times = ["09:00", "10:30", "14:00", "15:30"];
  return (
    <>
      <AppHeader title="Đặt lịch Spa" subtitle="AI nhắc lịch tự động" />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <Calendar className="brand-text size-3.5" />
          <span className="text-[9px] font-semibold">Tháng 7, 2026</span>
        </div>
        <div className="flex gap-1.5">
          {days.map((d, i) => (
            <div
              key={d}
              className={cn(
                "flex flex-1 flex-col items-center rounded-lg py-1.5",
                i === 2 ? "brand-bg text-white" : "bg-slate-100 dark:bg-white/[0.06]"
              )}
            >
              <span className="text-[7px] opacity-70">{d}</span>
              <span className="text-[10px] font-bold">{10 + i}</span>
            </div>
          ))}
        </div>
        <p className="text-[8.5px] font-semibold text-slate-500 dark:text-slate-400">Chọn giờ</p>
        <div className="grid grid-cols-2 gap-1.5">
          {times.map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-lg border py-1.5 text-center text-[9px] font-semibold",
                i === 1
                  ? "brand-border brand-soft brand-text"
                  : "border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-slate-50 p-2.5 dark:bg-white/[0.05]">
          <p className="text-[9px] font-bold">Chăm sóc da mặt · 60 phút</p>
          <p className="brand-text text-[10px] font-extrabold">350.000đ</p>
        </div>
      </div>
      <button className="brand-bg brand-shadow mt-2 w-full rounded-full py-2 text-[10px] font-bold text-white">
        Xác nhận đặt lịch
      </button>
    </>
  );
}

function PosScreen() {
  const items = [
    { n: "Cà phê sữa", p: "29k" },
    { n: "Trà đào", p: "39k" },
    { n: "Bánh mì", p: "25k" },
    { n: "Nước ép", p: "45k" }
  ];
  return (
    <>
      <AppHeader title="Bán hàng POS" subtitle="Đồng bộ tồn kho" ai={false} />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="grid grid-cols-2 gap-1.5">
          {items.map((it, i) => (
            <div
              key={it.n}
              className={cn(
                "rounded-lg border p-1.5",
                i === 0 ? "brand-border brand-soft" : "border-slate-200 dark:border-white/10"
              )}
            >
              <span className="brand-grad-soft mb-1 block h-9 rounded-md" />
              <p className="truncate text-[8.5px] font-semibold">{it.n}</p>
              <p className="brand-text text-[9px] font-extrabold">{it.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-slate-50 p-2.5 dark:bg-white/[0.05]">
          <Row label="Giỏ hàng (3)" value="93.000đ" />
          <Row label="Giảm giá" value="−10.000đ" />
          <div className="my-1 border-t border-dashed border-slate-200 dark:border-white/10" />
          <Row label="Tổng" value="83.000đ" bold />
        </div>
      </div>
      <button className="brand-bg brand-shadow mt-2 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-[10px] font-bold text-white">
        <CreditCard className="size-3.5" /> Thanh toán
      </button>
    </>
  );
}

/** Cụm điện thoại xoè nhiều màn hình cho hero trang chi tiết. */
export function AiPhoneCluster({
  screens,
  accent
}: {
  screens: AiScreen[];
  accent?: Accent;
}) {
  const list = screens.slice(0, 3);
  return (
    <div className="device-stage relative mx-auto flex min-h-[420px] items-center justify-center md:min-h-[520px]">
      <div className="device-glow" style={brandStyle(accent)} />
      {list.map((s, i) => {
        const pos =
          list.length === 1
            ? "relative z-10"
            : i === 1
              ? "relative z-20 -mx-6"
              : "relative z-10 hidden translate-y-6 opacity-95 sm:block";
        const scale = list.length > 1 && i !== 1 ? "scale-90" : "";
        return (
          <div key={s} className={cn(pos, scale)}>
            <AiPhone screen={s} accent={accent} />
          </div>
        );
      })}
      <span className="pointer-events-none absolute right-2 top-6 z-30 hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-200 md:flex">
        <BrandLogo className="size-4" /> AI trả lời 24/7
      </span>
    </div>
  );
}
