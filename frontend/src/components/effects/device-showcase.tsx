import { BrowserMockup } from "@/components/effects/browser-mockup";
import { PhoneMockup } from "@/components/effects/phone-mockup";
import { FloatingElement } from "@/components/motion/FloatingElement";
import { cn } from "@/lib/utils";

type DeviceShowcaseProps = {
  /** "hero" gọn cho cột hero, "full" lớn hơn cho section riêng. */
  variant?: "hero" | "full";
  className?: string;
};

/**
 * Ảnh sản phẩm: khung website (trình duyệt) + khung app (điện thoại) đè lên
 * góc dưới. Chuyển động nổi nhẹ, không pointer-tracking để giữ mượt.
 */
export function DeviceShowcase({
  variant = "hero",
  className
}: DeviceShowcaseProps) {
  const full = variant === "full";

  return (
    <div
      aria-label="Mô phỏng giao diện website và ứng dụng di động của NhaTech Co."
      className={cn(
        "device-stage",
        full ? "min-h-[420px] md:min-h-[500px]" : "min-h-[380px] md:min-h-[520px]",
        className
      )}
    >
      <div className="device-glow" />

      {/* Website */}
      <FloatingElement
        className={cn(
          "relative mx-auto",
          full ? "max-w-[720px]" : "max-w-[640px] md:pr-10"
        )}
        duration={9}
        rotate={0.4}
        y={7}
      >
        <BrowserMockup />
      </FloatingElement>

      {/* Điện thoại đè góc dưới-phải */}
      <FloatingElement
        className={cn(
          "absolute -bottom-2 right-0 z-10 sm:right-2",
          full ? "md:right-8" : "md:right-0"
        )}
        delay={0.4}
        duration={7}
        rotate={0.6}
        y={10}
      >
        <PhoneMockup />
      </FloatingElement>
    </div>
  );
}
