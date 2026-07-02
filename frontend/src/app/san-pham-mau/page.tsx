import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowUpRight, LayoutGrid, Sparkles } from "lucide-react";
import Link from "next/link";
import { AiPhone } from "@/components/effects/ai-app-screens";
import { CosmicBackground } from "@/components/effects/cosmic-background";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { bodyText, headingText, mutedText, surfaceCard } from "@/lib/contrast";
import { getSampleProducts } from "@/lib/sample-products";
import { absoluteUrl, siteName } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Sản phẩm mẫu | ${siteName}`,
  description:
    "Bộ sản phẩm mẫu của NhaTech Co. — website, ứng dụng di động và giải pháp AI được thiết kế hiện đại, chuẩn SaaS. Xem giao diện demo trước khi đặt làm.",
  alternates: { canonical: absoluteUrl("/san-pham-mau") },
  openGraph: {
    title: `Sản phẩm mẫu | ${siteName}`,
    description:
      "Website, ứng dụng di động và giải pháp AI thiết kế hiện đại, chuẩn SaaS.",
    url: absoluteUrl("/san-pham-mau"),
    type: "website"
  }
};

export default function SampleProductsPage() {
  const products = getSampleProducts();

  return (
    <main className="relative overflow-hidden text-foreground">
      <CosmicBackground />

      <section className="safe-shell relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:pt-32 md:pt-36">
        <div className="aurora-field" />
        <ScrollReveal className="relative z-10 mx-auto max-w-3xl text-center">
          <Badge variant="dark">
            <LayoutGrid className="size-4" />
            Sản phẩm mẫu
          </Badge>
          <h1 className={cn("mt-5 text-4xl font-extrabold leading-[1.1] md:text-[56px]", headingText)}>
            Giao diện <span className="gradient-brand-text">demo</span> cho sản phẩm của bạn
          </h1>
          <p className={cn("mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg", bodyText)}>
            Bộ sản phẩm mẫu được thiết kế hiện đại, chuẩn SaaS — website, ứng dụng
            di động và giải pháp AI. Xem trước giao diện để hình dung sản phẩm của
            bạn sẽ trông như thế nào.
          </p>
        </ScrollReveal>
      </section>

      <section className="safe-shell mx-auto max-w-7xl px-4 pb-24 md:pb-32">
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem className="h-full" key={product.slug}>
              <Link
                href={`/san-pham-mau/${product.slug}`}
                style={
                  {
                    "--brand": product.accent.from,
                    "--brand2": product.accent.to
                  } as CSSProperties
                }
                className={cn(
                  surfaceCard,
                  "group flex h-full flex-col overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1.5"
                )}
              >
                {/* Preview màn hình app */}
                <div className="relative flex h-64 items-end justify-center overflow-hidden bg-gradient-to-b from-slate-100/80 to-white dark:from-white/[0.06] dark:to-transparent">
                  <div className="animated-grid opacity-40" />
                  {product.featured && (
                    <span className="brand-bg brand-shadow absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white">
                      <Sparkles className="size-3" /> Nổi bật
                    </span>
                  )}
                  <div className="relative z-[1] origin-bottom translate-y-8 scale-[0.82] transition-transform duration-500 group-hover:translate-y-6">
                    <AiPhone screen={product.previewScreen} accent={product.accent} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="brand-text text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h2 className={cn("mt-2 text-xl font-bold leading-tight", headingText)}>
                    {product.name}
                  </h2>
                  <p className={cn("mt-2 line-clamp-2 flex-1 text-sm leading-6", mutedText)}>
                    {product.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="brand-text mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                    Xem chi tiết
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </main>
  );
}
