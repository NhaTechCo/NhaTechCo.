"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bodyText, headingText, mutedText, surfaceCard } from "@/lib/contrast";
import { cn } from "@/lib/utils";

const defaultTestimonials = [
  {
    quote:
      "NhaTech Co. giúp chúng tôi sắp xếp lại nội dung website rõ ràng hơn. Khách hàng dễ hiểu dịch vụ và liên hệ nhanh hơn.",
    name: "Minh Hoàng",
    role: "Chủ cửa hàng nội thất"
  },
  {
    quote:
      "Ứng dụng đặt lịch mới dễ dùng hơn cho cả khách và nhân viên. Việc theo dõi lịch hẹn cũng gọn gàng hơn trước.",
    name: "Linh Trần",
    role: "Quản lý spa"
  },
  {
    quote:
      "Điểm tôi thích là cách tư vấn rất dễ hiểu. Những phần chưa cần thiết được lược bớt để sản phẩm tập trung hơn.",
    name: "Quang Phạm",
    role: "Nhà sáng lập trung tâm đào tạo"
  }
];

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialCarouselProps {
  items?: TestimonialItem[];
}

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const testimonials = items && items.length > 0 ? items : defaultTestimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true
  });

  return (
    <div className="grid gap-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {testimonials.map((item, index) => (
            <motion.article
              className={cn(surfaceCard, "min-w-0 flex-[0_0_88%] rounded-[30px] p-6 md:flex-[0_0_48%] lg:flex-[0_0_32%]")}
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              viewport={{ once: true }}
            >
              <Quote className="mb-8 size-7 text-cyan-700 dark:text-cyan-300" />
              <p className={cn("relative z-10 min-h-32 text-base leading-7", bodyText)}>
                {item.quote}
              </p>
              <div className="relative z-10 mt-8 border-t border-slate-200/80 pt-5 dark:border-white/10">
                <strong className={cn("block text-sm font-bold", headingText)}>{item.name}</strong>
                <span className={cn("text-sm", mutedText)}>{item.role}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          aria-label="Xem đánh giá trước"
          onClick={() => emblaApi?.scrollPrev()}
          size="icon"
          type="button"
          variant="glass"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          aria-label="Xem đánh giá tiếp theo"
          onClick={() => emblaApi?.scrollNext()}
          size="icon"
          type="button"
          variant="glass"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
