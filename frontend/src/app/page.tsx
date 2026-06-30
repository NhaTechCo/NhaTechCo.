import {
  AppWindow,
  BadgeCheck,
  BarChart3,
  Blocks,
  CheckCircle2,
  Code2,
  Layers3,
  LineChart,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { CosmicBackground } from "@/components/effects/cosmic-background";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { GrowthChart } from "@/components/effects/growth-chart";
import { Hero3DMockup } from "@/components/effects/hero-3d-mockup";
import { LogoMarquee } from "@/components/effects/logo-marquee";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { MouseSpotlight } from "@/components/effects/mouse-spotlight";
import { ServiceConsole } from "@/components/effects/service-console";
import { TestimonialCarousel } from "@/components/effects/testimonial-carousel";
import { FloatingElement } from "@/components/motion/FloatingElement";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { PremiumHeader } from "@/components/premium-header";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  bodyText,
  featurePill,
  headingText,
  mutedText,
  surfaceCard,
} from "@/lib/contrast";
import { cn } from "@/lib/utils";

const metrics = [
  { value: 48, suffix: "%", label: "khách hàng dễ liên hệ hơn" },
  { value: 6, suffix: " tuần", label: "cho phiên bản đầu tiên" },
  { value: 95, suffix: "+", label: "điểm hài lòng mục tiêu" }
];

const bentoServices = [
  {
    icon: MonitorSmartphone,
    title: "Website doanh nghiệp",
    text: "Trang web giới thiệu thương hiệu, dịch vụ và sản phẩm một cách chuyên nghiệp, dễ đọc và dễ liên hệ.",
    span: "lg:col-span-2"
  },
  {
    icon: AppWindow,
    title: "Landing page bán hàng",
    text: "Trang giới thiệu sản phẩm hoặc chiến dịch, tập trung vào nội dung rõ ràng và hành động chuyển đổi.",
    span: ""
  },
  {
    icon: Smartphone,
    title: "Ứng dụng điện thoại",
    text: "Ứng dụng cho khách hàng, nhân viên hoặc cộng đồng của bạn, được thiết kế để thao tác đơn giản trên di động.",
    span: ""
  },
  {
    icon: BarChart3,
    title: "Phần mềm quản lý",
    text: "Công cụ giúp quản lý đơn hàng, khách hàng, lịch hẹn, nhân sự hoặc công việc nội bộ gọn gàng hơn.",
    span: "lg:col-span-2"
  },
  {
    icon: Blocks,
    title: "Ứng dụng máy tính",
    text: "Giải pháp dành cho các công việc cần thao tác thường xuyên trên máy tính, ổn định và dễ sử dụng.",
    span: ""
  },
  {
    icon: Code2,
    title: "Công cụ thông minh",
    text: "Trợ lý hoặc công cụ giúp tự động hóa những việc lặp lại, hỗ trợ chăm sóc khách hàng và xử lý thông tin nhanh hơn.",
    span: ""
  }
];

const process = [
  {
    title: "Lắng nghe nhu cầu",
    text: "Chúng tôi tìm hiểu mục tiêu, khách hàng và vấn đề bạn đang muốn giải quyết."
  },
  {
    title: "Đề xuất hướng làm",
    text: "Bạn nhận được định hướng giao diện, tính năng và lộ trình phù hợp trước khi bắt đầu."
  },
  {
    title: "Thiết kế trải nghiệm",
    text: "Chúng tôi sắp xếp nội dung, màn hình và luồng thao tác sao cho người dùng dễ hiểu nhất."
  },
  {
    title: "Xây dựng sản phẩm",
    text: "Sản phẩm được hoàn thiện theo từng phần để bạn dễ theo dõi và góp ý."
  },
  {
    title: "Kiểm tra và chỉnh sửa",
    text: "Chúng tôi kiểm tra trên nhiều thiết bị, tối ưu trải nghiệm và chỉnh sửa các điểm chưa hợp lý."
  },
  {
    title: "Bàn giao và đồng hành",
    text: "Sau khi hoàn thiện, bạn được hướng dẫn sử dụng và có thể tiếp tục phát triển thêm khi cần."
  }
];

const stack = [
  "Website hiện đại",
  "Ứng dụng di động",
  "Phần mềm quản lý",
  "Ứng dụng máy tính",
  "Công cụ thông minh",
  "Landing page bán hàng",
  "Quản lý lịch hẹn",
  "Theo dõi đơn hàng",
  "Chăm sóc khách hàng",
  "Báo cáo dễ hiểu"
];

export default function Home() {
  return (
    <main className="relative overflow-hidden text-foreground">
      <CosmicBackground />
      <ScrollProgressBar />
      
      <section
        className="safe-shell relative mx-auto max-w-7xl overflow-hidden pb-12 pt-10 md:pb-16 md:pt-20"
        id="top"
      >
        <div className="aurora-field" />
        <div className="animated-grid" />
        <SplitReveal
          className="relative z-10 grid min-h-[calc(92svh-8rem)] items-center gap-12 lg:grid-cols-[.98fr_1.02fr]"
          left={(
            <div className="max-w-[22rem] sm:max-w-4xl">
              <Badge className="mb-5" variant="dark">
                <Sparkles className="size-4" />
                Website hiện đại · Ứng dụng di động · Dễ dùng mỗi ngày
              </Badge>
              <h1 className={cn("max-w-[22rem] text-4xl font-extrabold leading-[1.1] sm:max-w-4xl sm:text-[48px] md:text-[64px] lg:text-[72px]", headingText)}>
                Giải pháp Website, Ứng dụng và Phần mềm giúp doanh nghiệp vận hành tốt hơn
              </h1>
              <p className={cn("mt-6 max-w-[22rem] text-base leading-8 sm:max-w-2xl md:text-lg", bodyText)}>
                NhaTech Co. thiết kế những sản phẩm số dễ dùng, đẹp mắt và phù
                hợp với cách doanh nghiệp của bạn làm việc mỗi ngày.
              </p>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-row">
                <MagneticButton className="w-full sm:w-auto" href="#contact">Nhận tư vấn miễn phí</MagneticButton>
                <Button asChild className="w-full sm:w-auto" size="lg" variant="glass">
                  <a href="#services">Xem dịch vụ</a>
                </Button>
              </div>
              <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-3" delay={0.12}>
                {metrics.map((metric, index) => (
                  <StaggerItem className="h-full" key={metric.label}>
                    <FloatingElement delay={index * 0.35} duration={6 + index} rotate={0.3} y={4}>
                      <MouseSpotlight
                        className={cn(surfaceCard, "relative h-full overflow-hidden p-4")}
                        tilt
                      >
                        <strong className={cn("relative z-10 block text-3xl font-extrabold", headingText)}>
                          <AnimatedCounter value={metric.value} />
                          {metric.suffix}
                        </strong>
                        <span className={cn("relative z-10 mt-1 block text-sm font-medium", mutedText)}>
                          {metric.label}
                        </span>
                      </MouseSpotlight>
                    </FloatingElement>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}
          right={(
            <FloatingElement duration={8} rotate={0.35} y={6}>
              <Hero3DMockup />
            </FloatingElement>
          )}
        />
      </section>

      <LogoMarquee />

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-28" id="services">
        <ScrollReveal className="max-w-3xl">
          <Badge variant="dark">Dịch vụ</Badge>
          <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
            Dịch vụ số dành cho doanh nghiệp và cá nhân
          </h2>
          <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
            NhaTech Co. hỗ trợ từ trang web giới thiệu, ứng dụng điện thoại đến
            phần mềm quản lý và công cụ giúp công việc hằng ngày gọn gàng hơn.
          </p>
        </ScrollReveal>

        <StaggerContainer className="mt-10 grid auto-rows-fr gap-5 lg:grid-cols-3">
          {bentoServices.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem className={cn("h-full", service.span)} key={service.title}>
                <MouseSpotlight
                  className={cn(surfaceCard, "animated-border group relative z-0 h-full overflow-hidden p-7")}
                  tilt
                >
                  <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                    <div>
                      <div className="mb-6 grid size-14 place-items-center rounded-2xl border border-cyan-200/80 bg-cyan-50 text-cyan-700 shadow-lg shadow-cyan-200/40 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-cyan-500/10">
                        <Icon className="size-7" />
                      </div>
                      <h3 className={cn("text-xl sm:text-2xl font-bold leading-tight", headingText)}>
                        {service.title}
                      </h3>
                      <p className={cn("mt-4 text-base leading-7", bodyText)}>
                        {service.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                      <CheckCircle2 className="size-4" />
                      Rõ ràng, dễ dùng, dễ bàn giao
                    </div>
                  </div>
                </MouseSpotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-4">
        <ScrollReveal>
          <FloatingElement duration={9} rotate={0.2} y={5}>
            <div className={cn(surfaceCard, "relative overflow-hidden p-3 md:p-5")}>
              <ServiceConsole />
            </div>
          </FloatingElement>
        </ScrollReveal>
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-28" id="results">
        <SplitReveal
          className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]"
          left={(
            <>
              <Badge variant="dark">Trải nghiệm</Badge>
              <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
                Trải nghiệm người dùng là ưu tiên đầu tiên
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                Một sản phẩm tốt không chỉ là đẹp. Nó phải dễ hiểu, dễ thao tác
                và giúp người dùng hoàn thành công việc nhanh hơn.
              </p>
              <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2" delay={0.08}>
                {[
                  ["Dễ hiểu ngay từ lần đầu", ShieldCheck],
                  ["Đẹp nhưng không rối", AppWindow],
                  ["Phù hợp với thói quen sử dụng", Code2],
                  ["Sẵn sàng phát triển lâu dài", LineChart]
                ].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof ShieldCheck;
                  return (
                    <StaggerItem key={label as string}>
                      <MouseSpotlight
                        className={cn(surfaceCard, "relative flex min-h-16 items-center gap-3 overflow-hidden rounded-[24px] px-4 text-sm font-semibold")}
                        tilt
                      >
                        <IconComponent className="relative z-10 size-5 text-primary" />
                        <span className={cn("relative z-10", headingText)}>{label as string}</span>
                      </MouseSpotlight>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </>
          )}
          right={(
            <FloatingElement delay={0.2} duration={8} rotate={0.3} y={5}>
              <MouseSpotlight
                className={cn(surfaceCard, "animated-border relative overflow-hidden p-5")}
                tilt
              >
                <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className={cn("text-sm font-semibold", mutedText)}>
                      Bảng theo dõi công việc
                    </p>
                    <h3 className={cn("text-xl sm:text-2xl font-bold", headingText)}>
                      Mức độ dễ sử dụng
                    </h3>
                  </div>
                  <Badge variant="accent">
                    <BadgeCheck className="size-4" />
                    Dễ theo dõi
                  </Badge>
                </div>
                <div className="relative z-10">
                  <GrowthChart />
                </div>
              </MouseSpotlight>
            </FloatingElement>
          )}
        />
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-28" id="process">
        <SplitReveal
          className="grid gap-12 lg:grid-cols-[.86fr_1.14fr]"
          left={(
            <>
              <Badge variant="dark">Quy trình</Badge>
              <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
                Quy trình rõ ràng để bạn dễ theo dõi
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                Mỗi bước đều có mục tiêu cụ thể để bạn biết sản phẩm đang được
                làm đến đâu, cần góp ý gì và khi nào có thể sử dụng.
              </p>
            </>
          )}
          right={(
            <StaggerContainer className="grid gap-5">
              {process.map((step, index) => (
                <StaggerItem key={step.title}>
                  <MouseSpotlight
                    className={cn(surfaceCard, "relative grid gap-5 overflow-hidden rounded-[30px] p-5 md:grid-cols-[80px_1fr]")}
                    tilt
                  >
                    <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-geist text-sm font-extrabold text-slate-950 shadow-lg shadow-slate-200/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-50 dark:shadow-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="relative z-10">
                      <h3 className={cn("text-xl sm:text-2xl font-bold leading-tight", headingText)}>
                        {step.title}
                      </h3>
                      <p className={cn("mt-2 text-base leading-7", bodyText)}>
                        {step.text}
                      </p>
                    </div>
                  </MouseSpotlight>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        />
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-6 md:py-10">
        <ScrollReveal>
          <MouseSpotlight
            className={cn(surfaceCard, "relative overflow-hidden p-6 md:p-8")}
            tilt
          >
            <div className="animated-grid opacity-20" />
            <SplitReveal
              className="relative z-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr]"
              left={(
                <>
                  <Badge variant="accent">
                    <Layers3 className="size-4" />
                    Giải pháp
                  </Badge>
                  <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
                    Những sản phẩm NhaTech Co. có thể đồng hành cùng bạn
                  </h2>
                  <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                    Từ một trang giới thiệu đơn giản đến công cụ quản lý riêng,
                    nội dung luôn được sắp xếp để người dùng dễ hiểu và dễ thao tác.
                  </p>
                </>
              )}
              right={(
                <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {stack.map((item) => (
                    <StaggerItem key={item}>
                      <div
                        className={cn(featurePill, "flex min-h-16 items-center justify-center px-3 text-center text-sm font-semibold")}
                      >
                        {item}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            />
          </MouseSpotlight>
        </ScrollReveal>
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-28">
        <ScrollReveal className="mb-10 max-w-3xl">
          <Badge variant="dark">Đánh giá</Badge>
          <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
            Những khách hàng cần sản phẩm dễ hiểu, đẹp và dùng được mỗi ngày
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <TestimonialCarousel />
        </ScrollReveal>
      </section>

      <section className="safe-shell mx-auto max-w-7xl pb-16 pt-12 md:pb-32" id="contact">
        <SplitReveal
          className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start"
          left={(
            <>
              <Badge variant="dark">
                <Workflow className="size-4" />
                Bắt đầu
              </Badge>
              <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
                Bạn đang có ý tưởng cho website, app hoặc phần mềm riêng?
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                Hãy bắt đầu bằng một buổi trao đổi ngắn. NhaTech Co. sẽ giúp bạn
                nhìn rõ hướng đi phù hợp trước khi xây dựng.
              </p>
              <StaggerContainer className="mt-8 grid gap-3" delay={0.08}>
                {[
                  "Tư vấn cách làm dễ hiểu trước khi báo giá",
                  "Đề xuất phạm vi phù hợp với ngân sách",
                  "Hỗ trợ chỉnh sửa và phát triển thêm khi cần"
                ].map((item) => (
                  <StaggerItem hover={false} key={item}>
                    <div className={cn("flex items-center gap-3 text-sm font-semibold", bodyText)}>
                      <CheckCircle2 className="size-5 text-primary" />
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}
          right={(
            <FloatingElement delay={0.18} duration={8} rotate={0.25} y={5}>
              <LeadForm />
            </FloatingElement>
          )}
        />
      </section>
    </main>
  );
}
