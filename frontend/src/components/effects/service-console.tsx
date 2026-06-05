"use client";

import { motion } from "framer-motion";
import {
  AppWindow,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  WandSparkles
} from "lucide-react";
import type { ComponentType } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  bodyText,
  featureItem,
  headingText,
  surfaceCard
} from "@/lib/contrast";
import { cn } from "@/lib/utils";
import { useDesignStore, type ServiceKey } from "@/store/use-design-store";

const services: Record<
  ServiceKey,
  {
    icon: ComponentType<{ className?: string }>;
    title: string;
    tabLabel: string;
    description: string;
    bullets: string[];
    gradient: string;
  }
> = {
  web: {
    icon: AppWindow,
    title: "Website doanh nghiệp",
    tabLabel: "Website",
    description:
      "Trang web giới thiệu thương hiệu, dịch vụ và sản phẩm một cách chuyên nghiệp, dễ đọc và dễ liên hệ.",
    bullets: ["Dễ đọc", "Dễ liên hệ", "Hiển thị đẹp", "Dễ cập nhật"],
    gradient: "from-primary/20 via-accent/10 to-transparent"
  },
  mobile: {
    icon: Smartphone,
    title: "Ứng dụng điện thoại",
    tabLabel: "Ứng dụng",
    description:
      "Ứng dụng cho khách hàng, nhân viên hoặc cộng đồng của bạn, được thiết kế để thao tác đơn giản trên di động.",
    bullets: ["Dễ thao tác", "Thông tin rõ ràng", "Phù hợp di động", "Dễ sử dụng"],
    gradient: "from-coral/20 via-primary/10 to-transparent"
  },
  product: {
    icon: WandSparkles,
    title: "Phần mềm quản lý",
    tabLabel: "Phần mềm",
    description:
      "Công cụ giúp quản lý đơn hàng, khách hàng, lịch hẹn, nhân sự hoặc công việc nội bộ gọn gàng hơn.",
    bullets: ["Quản lý đơn hàng", "Theo dõi khách hàng", "Sắp xếp lịch hẹn", "Báo cáo rõ ràng"],
    gradient: "from-accent/20 via-primary/10 to-transparent"
  },
  growth: {
    icon: LayoutDashboard,
    title: "Công cụ thông minh",
    tabLabel: "Công cụ",
    description:
      "Trợ lý hoặc công cụ giúp tự động hóa những việc lặp lại, hỗ trợ chăm sóc khách hàng và xử lý thông tin nhanh hơn.",
    bullets: ["Trả lời nhanh hơn", "Nhắc việc kịp thời", "Lưu thông tin", "Dễ theo dõi"],
    gradient: "from-primary/20 via-coral/10 to-transparent"
  }
};

const keys: ServiceKey[] = ["web", "mobile", "product", "growth"];

export function ServiceConsole() {
  const selectedService = useDesignStore((state) => state.selectedService);
  const setSelectedService = useDesignStore((state) => state.setSelectedService);
  const active = services[selectedService];
  const Icon = active.icon;

  return (
    <Tabs
      value={selectedService}
      onValueChange={(value) => setSelectedService(value as ServiceKey)}
    >
      <TabsList className="grid w-full grid-cols-2 gap-1 md:grid-cols-4">
        {keys.map((key) => (
          <TabsTrigger key={key} value={key}>
            {services[key].tabLabel}
          </TabsTrigger>
        ))}
      </TabsList>
      {keys.map((key) => (
        <TabsContent key={key} value={key}>
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(surfaceCard, `relative overflow-hidden bg-gradient-to-br ${active.gradient} p-6`)}
          >
            <div className="animated-grid opacity-25" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl border border-cyan-200/80 bg-cyan-50 text-cyan-700 shadow-lg shadow-cyan-200/50 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-cyan-500/10">
                  <Icon className="size-6" />
                </div>
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                  <Sparkles className="size-4" />
                  Bắt đầu bằng một buổi trao đổi ngắn
                </p>
                <h3 className={cn("text-2xl font-bold leading-tight md:text-3xl", headingText)}>
                  {active.title}
                </h3>
                <p className={cn("mt-4 max-w-2xl text-base leading-7", bodyText)}>
                  {active.description}
                </p>
              </div>
              <div className="grid gap-3">
                {active.bullets.map((item) => (
                  <div
                    className={cn(featureItem, "flex min-h-14 items-center justify-between rounded-2xl px-4 text-sm font-semibold")}
                    key={item}
                  >
                    <span>{item}</span>
                    <span className="size-2 rounded-full bg-cyan-600 shadow-[0_0_16px_rgba(8,145,178,.28)] dark:bg-cyan-300 dark:shadow-[0_0_16px_rgba(34,211,238,.55)]" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
