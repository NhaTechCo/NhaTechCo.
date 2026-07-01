import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import { FloatingElement } from "@/components/motion/FloatingElement";

/**
 * Ảnh sản phẩm thực tế cho hero, đóng khung như một cửa sổ trình duyệt
 * và có thẻ đánh giá nổi để tạo cảm giác "sản phẩm thật", bớt stock.
 */
export function HeroPhoto() {
  return (
    <div className="device-stage relative min-h-[360px] md:min-h-[460px]">
      <div className="device-glow" />

      <FloatingElement className="relative mx-auto max-w-[640px]" duration={10} rotate={0.25} y={6}>
        <div className="browser-frame">
          <div className="browser-bar flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-coral" />
              <span className="size-3 rounded-full bg-[#f7b955]" />
              <span className="size-3 rounded-full bg-primary" />
            </div>
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              nhatechvn.com/du-an
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src="/images/hero-studio.png"
              alt="Sản phẩm website và ứng dụng NhaTech Co. đã thực hiện"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 640px"
              className="object-cover"
            />
          </div>
        </div>
      </FloatingElement>

      {/* Thẻ đánh giá nổi */}
      <FloatingElement
        className="absolute -bottom-3 left-0 z-10 sm:left-2 md:-left-4"
        delay={0.3}
        duration={8}
        rotate={0.4}
        y={9}
      >
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 dark:shadow-black/50">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400">
            <BadgeCheck className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-1 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star className="size-3.5 fill-current" key={i} />
              ))}
            </div>
            <p className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              4.9/5 · khách hàng hài lòng
            </p>
          </div>
        </div>
      </FloatingElement>
    </div>
  );
}
