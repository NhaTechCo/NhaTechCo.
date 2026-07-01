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
  Rocket,
  ShieldCheck,
  Smartphone,
  Smile,
  Sparkles,
  TrendingUp,
  Workflow
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { CosmicBackground } from "@/components/effects/cosmic-background";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { DeviceShowcase } from "@/components/effects/device-showcase";
import { GrowthChart } from "@/components/effects/growth-chart";
import { HeroPhoto } from "@/components/effects/hero-photo";
import { LogoMarquee } from "@/components/effects/logo-marquee";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { MouseSpotlight } from "@/components/effects/mouse-spotlight";
import { ServiceConsole } from "@/components/effects/service-console";
import {
  ServiceMockup,
  type ServiceVisual
} from "@/components/effects/service-visuals";
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
import { getSiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const defaultMetrics = [
  { value: 48, suffix: "%", label: "khách hàng dễ liên hệ hơn", icon: TrendingUp },
  { value: 6, suffix: " tuần", label: "cho phiên bản đầu tiên", icon: Rocket },
  { value: 95, suffix: "+", label: "điểm hài lòng mục tiêu", icon: Smile }
];

const bentoServices: {
  icon: typeof MonitorSmartphone;
  title: string;
  text: string;
  visual: ServiceVisual;
  tags: string[];
}[] = [
  {
    icon: MonitorSmartphone,
    title: "Website doanh nghiệp",
    text: "Trang web giới thiệu thương hiệu, dịch vụ và sản phẩm chuyên nghiệp, dễ đọc và dễ liên hệ.",
    visual: "website",
    tags: ["Responsive", "Chuẩn SEO"]
  },
  {
    icon: AppWindow,
    title: "Landing page bán hàng",
    text: "Trang giới thiệu sản phẩm hoặc chiến dịch, tập trung vào nội dung rõ ràng và tăng chuyển đổi.",
    visual: "landing",
    tags: ["Tối ưu chuyển đổi", "A/B test"]
  },
  {
    icon: Smartphone,
    title: "Ứng dụng điện thoại",
    text: "Ứng dụng cho khách hàng, nhân viên hoặc cộng đồng, thao tác đơn giản trên di động.",
    visual: "mobile",
    tags: ["iOS", "Android"]
  },
  {
    icon: BarChart3,
    title: "Phần mềm quản lý",
    text: "Quản lý đơn hàng, khách hàng, lịch hẹn, nhân sự và công việc nội bộ gọn gàng hơn.",
    visual: "dashboard",
    tags: ["Realtime", "Báo cáo"]
  },
  {
    icon: Blocks,
    title: "Ứng dụng máy tính",
    text: "Giải pháp cho các công việc cần thao tác thường xuyên trên máy tính, ổn định, dễ dùng.",
    visual: "desktop",
    tags: ["Windows", "macOS"]
  },
  {
    icon: Code2,
    title: "Công cụ thông minh",
    text: "Trợ lý và công cụ tự động hóa việc lặp lại, chăm sóc khách hàng và xử lý thông tin nhanh hơn.",
    visual: "ai",
    tags: ["Tự động hoá", "AI"]
  }
];

const defaultProcess = [
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

const defaultStack = [
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

export default async function Home() {
  // Nội dung có thể chỉnh sửa từ CMS (admin), fallback về mặc định của giao diện.
  const content = await getSiteContent();
  const hero = content.hero as Record<string, unknown> | undefined;
  const svc = content.services as Record<string, unknown> | undefined;
  const exp = content.experience as Record<string, unknown> | undefined;
  const proc = content.process as Record<string, unknown> | undefined;
  const sol = content.solutions as Record<string, unknown> | undefined;
  const test = content.testimonials as Record<string, unknown> | undefined;
  const cta = content.contact as Record<string, unknown> | undefined;

  const heroBadge = (hero?.badge as string) || "Website hiện đại · Ứng dụng di động · Dễ dùng mỗi ngày";
  const heroTitle = (hero?.title as string) || "Giải pháp Website, Ứng dụng và Phần mềm giúp doanh nghiệp vận hành tốt hơn";
  const heroDesc = (hero?.description as string) || "NhaTech Co. thiết kế những sản phẩm số dễ dùng, đẹp mắt và phù hợp với cách doanh nghiệp của bạn làm việc mỗi ngày.";
  const heroCta1 = (hero?.cta1 as string) || "Nhận tư vấn miễn phí";
  const heroCta2 = (hero?.cta2 as string) || "Xem dịch vụ";
  const cmsMetrics = hero?.metrics as Array<{ value: number; suffix: string; label: string }> | undefined;
  const metrics = defaultMetrics.map((m, i) => ({ ...m, ...(cmsMetrics?.[i] ?? {}) }));

  const svcTitle = (svc?.title as string) || "Dịch vụ số dành cho doanh nghiệp và cá nhân";
  const svcDesc = (svc?.description as string) || "NhaTech Co. hỗ trợ từ trang web giới thiệu, ứng dụng điện thoại đến phần mềm quản lý và công cụ giúp công việc hằng ngày gọn gàng hơn.";
  const cmsServices = svc?.items as Array<{ title: string; text: string }> | undefined;
  const services = bentoServices.map((s, i) => ({
    ...s,
    title: cmsServices?.[i]?.title ?? s.title,
    text: cmsServices?.[i]?.text ?? s.text
  }));

  const expTitle = (exp?.title as string) || "Trải nghiệm người dùng là ưu tiên đầu tiên";
  const expDesc = (exp?.description as string) || "Một sản phẩm tốt không chỉ là đẹp. Nó phải dễ hiểu, dễ thao tác và giúp người dùng hoàn thành công việc nhanh hơn.";
  const expHighlights = (exp?.highlights as string[]) || [
    "Dễ hiểu ngay từ lần đầu",
    "Đẹp nhưng không rối",
    "Phù hợp với thói quen sử dụng",
    "Sẵn sàng phát triển lâu dài"
  ];
  const expIcons = [ShieldCheck, AppWindow, Code2, LineChart];

  const procTitle = (proc?.title as string) || "Quy trình rõ ràng để bạn dễ theo dõi";
  const procDesc = (proc?.description as string) || "Mỗi bước đều có mục tiêu cụ thể để bạn biết sản phẩm đang được làm đến đâu, cần góp ý gì và khi nào có thể sử dụng.";
  const procSteps = (proc?.steps as typeof defaultProcess) || defaultProcess;

  const solTitle = (sol?.title as string) || "Những sản phẩm NhaTech Co. có thể đồng hành cùng bạn";
  const solDesc = (sol?.description as string) || "Từ một trang giới thiệu đơn giản đến công cụ quản lý riêng, nội dung luôn được sắp xếp để người dùng dễ hiểu và dễ thao tác.";
  const solTags = (sol?.tags as string[]) || defaultStack;

  const testTitle = (test?.title as string) || "Những khách hàng cần sản phẩm dễ hiểu, đẹp và dùng được mỗi ngày";
  const testItems = test?.items as Array<{ quote: string; name: string; role: string }> | undefined;

  const ctaTitle = (cta?.title as string) || "Bạn đang có ý tưởng cho website, app hoặc phần mềm riêng?";
  const ctaDesc = (cta?.description as string) || "Hãy bắt đầu bằng một buổi trao đổi ngắn. NhaTech Co. sẽ giúp bạn nhìn rõ hướng đi phù hợp trước khi xây dựng.";
  const ctaBenefits = (cta?.benefits as string[]) || [
    "Tư vấn cách làm dễ hiểu trước khi báo giá",
    "Đề xuất phạm vi phù hợp với ngân sách",
    "Hỗ trợ chỉnh sửa và phát triển thêm khi cần"
  ];

  return (
    <main className="relative overflow-hidden text-foreground">
      <CosmicBackground />
      <ScrollProgressBar />
      
      <section
        className="safe-shell relative mx-auto max-w-7xl overflow-hidden pb-12 pt-24 sm:pt-28 md:pb-16 md:pt-20"
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
                {heroBadge}
              </Badge>
              <h1 className={cn("max-w-[22rem] text-4xl font-extrabold leading-[1.1] sm:max-w-4xl sm:text-[48px] md:text-[64px] lg:text-[72px]", headingText)}>
                {heroTitle}
              </h1>
              <p className={cn("mt-6 max-w-[22rem] text-base leading-8 sm:max-w-2xl md:text-lg", bodyText)}>
                {heroDesc}
              </p>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-row">
                <MagneticButton className="w-full sm:w-auto" href="#contact">{heroCta1}</MagneticButton>
                <Button asChild className="w-full sm:w-auto" size="lg" variant="glass">
                  <a href="#services">{heroCta2}</a>
                </Button>
              </div>
              <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-3" delay={0.12}>
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <StaggerItem className="h-full" key={metric.label}>
                      <div className={cn(surfaceCard, "h-full p-4")}>
                        <span className="icon-tile mb-3 size-9 rounded-xl">
                          <Icon className="size-5" />
                        </span>
                        <strong className={cn("block text-2xl font-extrabold sm:text-3xl", headingText)}>
                          <AnimatedCounter value={metric.value} />
                          {metric.suffix}
                        </strong>
                        <span className={cn("mt-1 block text-sm font-medium", mutedText)}>
                          {metric.label}
                        </span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          )}
          right={<HeroPhoto />}
        />
      </section>

      <LogoMarquee />

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-28" id="services">
        <ScrollReveal className="max-w-3xl">
          <Badge variant="dark">Dịch vụ</Badge>
          <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
            {svcTitle}
          </h2>
          <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
            {svcDesc}
          </p>
        </ScrollReveal>

        <StaggerContainer className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem className="h-full" key={service.title}>
                <MouseSpotlight
                  className={cn(surfaceCard, "group relative z-0 flex h-full flex-col overflow-hidden p-5")}
                  tilt
                >
                  <ServiceMockup variant={service.visual} />

                  <div className="relative z-10 mt-5 flex flex-1 flex-col">
                    <div className="flex items-center gap-3">
                      <span className="icon-tile size-11 shrink-0 rounded-2xl">
                        <Icon className="size-5" />
                      </span>
                      <h3 className={cn("text-lg font-bold leading-tight sm:text-xl", headingText)}>
                        {service.title}
                      </h3>
                    </div>
                    <p className={cn("mt-3 text-sm leading-6", bodyText)}>
                      {service.text}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200/70 pt-4 dark:border-white/10">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary dark:bg-primary/15"
                        >
                          <CheckCircle2 className="size-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </MouseSpotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      <section className="safe-shell mx-auto max-w-7xl py-12 md:py-24" id="showcase">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Badge variant="dark">
            <MonitorSmartphone className="size-4" />
            Giao diện sản phẩm
          </Badge>
          <h2 className={cn("mt-5 text-3xl font-extrabold leading-tight md:text-[40px] lg:text-[48px]", headingText)}>
            Website và ứng dụng di động sắc nét trên mọi thiết bị
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg", bodyText)}>
            Mỗi sản phẩm được thiết kế đồng bộ từ màn hình lớn đến điện thoại,
            đảm bảo đẹp mắt, dễ dùng và hiển thị mượt mà.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delay={0.1}>
          <DeviceShowcase variant="full" />
        </ScrollReveal>

        <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.1}>
          {[
            ["Website doanh nghiệp", "Giao diện responsive, tối ưu tốc độ và chuẩn SEO.", MonitorSmartphone],
            ["Ứng dụng di động", "Thao tác mượt, thân thiện, phù hợp thói quen người dùng.", Smartphone]
          ].map(([title, text, Icon]) => {
            const IconComponent = Icon as typeof MonitorSmartphone;
            return (
              <StaggerItem key={title as string}>
                <div className={cn(surfaceCard, "flex items-center gap-4 p-5")}>
                  <span className="icon-tile size-12 shrink-0 rounded-2xl">
                    <IconComponent className="size-6" />
                  </span>
                  <div>
                    <h3 className={cn("text-lg font-bold", headingText)}>{title as string}</h3>
                    <p className={cn("mt-1 text-sm leading-6", mutedText)}>{text as string}</p>
                  </div>
                </div>
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
                {expTitle}
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                {expDesc}
              </p>
              <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2" delay={0.08}>
                {expHighlights.map((label, i) => {
                  const IconComponent = expIcons[i % expIcons.length];
                  return (
                    <StaggerItem key={label}>
                      <MouseSpotlight
                        className={cn(surfaceCard, "relative flex min-h-16 items-center gap-3 overflow-hidden rounded-[24px] px-4 text-sm font-semibold")}
                      >
                        <IconComponent className="relative z-10 size-5 text-primary" />
                        <span className={cn("relative z-10", headingText)}>{label}</span>
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
                {procTitle}
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                {procDesc}
              </p>
            </>
          )}
          right={(
            <StaggerContainer className="grid gap-5">
              {procSteps.map((step, index) => (
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
                    {solTitle}
                  </h2>
                  <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                    {solDesc}
                  </p>
                </>
              )}
              right={(
                <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {solTags.map((item) => (
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
            {testTitle}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <TestimonialCarousel items={testItems} />
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
                {ctaTitle}
              </h2>
              <p className={cn("mt-5 text-base leading-8 md:text-lg", bodyText)}>
                {ctaDesc}
              </p>
              <StaggerContainer className="mt-8 grid gap-3" delay={0.08}>
                {ctaBenefits.map((item) => (
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
