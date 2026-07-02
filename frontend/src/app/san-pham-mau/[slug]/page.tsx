import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, Smartphone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTypescript
} from "react-icons/si";
import { AiPhone, AiPhoneCluster } from "@/components/effects/ai-app-screens";
import { CosmicBackground } from "@/components/effects/cosmic-background";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bodyText, headingText, mutedText, surfaceCard } from "@/lib/contrast";
import { getSampleProduct, getSampleProducts } from "@/lib/sample-products";
import { absoluteUrl, siteName } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

const techIcons: Record<string, IconType> = {
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  PostgreSQL: SiPostgresql,
  "Node.js": SiNodedotjs,
  Prisma: SiPrisma
};

export function generateStaticParams() {
  return getSampleProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getSampleProduct(slug);

  if (!product) {
    return { title: `Không tìm thấy sản phẩm | ${siteName}` };
  }

  const title = `${product.name} | ${siteName}`;
  const description = product.summary;
  const canonical = absoluteUrl(`/san-pham-mau/${product.slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: ["/images/hero-studio.png"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-studio.png"]
    }
  };
}

export default async function SampleProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getSampleProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden text-foreground">
      <CosmicBackground />

      {/* Hero */}
      <section className="safe-shell relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:pt-32 md:pt-36">
        <div className="aurora-field" />
        <Link
          href="/san-pham-mau"
          className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          <ArrowLeft className="size-4" />
          Tất cả sản phẩm mẫu
        </Link>

        <SplitReveal
          className="relative z-10 mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"
          left={
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="dark">{product.category}</Badge>
                <Badge variant="accent">
                  <Smartphone className="size-4" />
                  {product.platform}
                </Badge>
              </div>
              <h1 className={cn("mt-5 text-4xl font-extrabold leading-[1.08] md:text-[56px]", headingText)}>
                {product.name}
              </h1>
              <p className={cn("mt-5 max-w-xl text-base leading-8 md:text-lg", bodyText)}>
                {product.tagline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="premium">
                  <Link href="/#contact">Đặt làm sản phẩm tương tự</Link>
                </Button>
                <Button asChild size="lg" variant="glass">
                  <Link href="/san-pham-mau">Xem sản phẩm khác</Link>
                </Button>
              </div>
            </div>
          }
          right={<AiPhoneCluster screens={product.heroScreens} />}
        />
      </section>

      {/* Metrics */}
      <section className="safe-shell mx-auto max-w-7xl px-4 py-6">
        <StaggerContainer
          className={cn(
            "grid gap-4",
            product.metrics.length === 4
              ? "grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-3"
          )}
        >
          {product.metrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className={cn(surfaceCard, "p-5 text-center sm:text-left")}>
                <strong className="block text-3xl font-extrabold gradient-brand-text">
                  {m.value}
                </strong>
                <span className={cn("mt-1 block text-sm font-medium", mutedText)}>
                  {m.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Summary */}
      <section className="safe-shell mx-auto max-w-3xl px-4 py-10 text-center">
        <ScrollReveal>
          <p className={cn("text-lg leading-9 md:text-xl", bodyText)}>{product.summary}</p>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="safe-shell mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-16">
          {product.features.map((feature, index) => {
            const Icon = feature.icon;
            const flip = index % 2 === 1;
            return (
              <SplitReveal
                key={feature.title}
                className="grid items-center gap-10 lg:grid-cols-2"
                left={
                  <div className={cn(flip && "lg:order-2")}>
                    <span className="icon-tile size-12 rounded-2xl">
                      <Icon className="size-6" />
                    </span>
                    <h2 className={cn("mt-5 text-2xl font-bold leading-tight md:text-3xl", headingText)}>
                      {feature.title}
                    </h2>
                    <p className={cn("mt-4 text-base leading-8", bodyText)}>{feature.text}</p>
                  </div>
                }
                right={
                  feature.screen ? (
                    <div className={cn("flex justify-center", flip && "lg:order-1")}>
                      <div className="device-stage relative">
                        <div className="device-glow" />
                        <div className="relative">
                          <AiPhone screen={feature.screen} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span />
                  )
                }
              />
            );
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section className="safe-shell mx-auto max-w-4xl px-4 py-12">
        <ScrollReveal className="text-center">
          <Badge variant="dark">Công nghệ</Badge>
          <h2 className={cn("mt-4 text-2xl font-bold md:text-3xl", headingText)}>
            Xây dựng bằng công nghệ hiện đại
          </h2>
        </ScrollReveal>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {product.techStack.map((tech) => {
            const TechIcon = techIcons[tech];
            return (
              <span
                key={tech}
                className={cn(
                  surfaceCard,
                  "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold"
                )}
              >
                {TechIcon ? (
                  <TechIcon className="size-4 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Check className="size-4 text-primary" />
                )}
                {tech}
              </span>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="safe-shell mx-auto max-w-7xl px-4 pb-24 pt-8 md:pb-32">
        <ScrollReveal>
          <div className={cn(surfaceCard, "relative overflow-hidden p-8 text-center md:p-14")}>
            <div className="animated-grid opacity-20" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className={cn("text-3xl font-extrabold leading-tight md:text-[40px]", headingText)}>
                Muốn có sản phẩm như thế này?
              </h2>
              <p className={cn("mx-auto mt-4 max-w-xl text-base leading-8 md:text-lg", bodyText)}>
                NhaTech Co. sẽ tư vấn và thiết kế sản phẩm phù hợp với doanh nghiệp
                của bạn — bắt đầu bằng một buổi trao đổi ngắn.
              </p>
              <Button asChild size="lg" variant="premium" className="mt-8">
                <Link href="/#contact">
                  Nhận tư vấn miễn phí
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
