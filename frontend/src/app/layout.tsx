import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Geist,
  Inter,
  Plus_Jakarta_Sans
} from "next/font/google";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/footer";
import { PremiumHeader } from "@/components/premium-header";
import { getSiteContent } from "@/lib/site-content";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-be-vietnam"
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist"
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://nhatechvn.com"
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: "NhaTech Co. | Giải pháp Website, Ứng dụng và Phần mềm hiện đại",
  description:
    "NhaTech Co. thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ thông minh giúp doanh nghiệp vận hành hiệu quả hơn.",
  keywords: [
    "website doanh nghiệp",
    "thiết kế website",
    "ứng dụng di động",
    "phần mềm quản lý",
    "ứng dụng máy tính",
    "công cụ thông minh",
    "giải pháp số cho doanh nghiệp"
  ],
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png"
  },
  openGraph: {
    type: "website",
    siteName: "NhaTech Co.",
    title: "NhaTech Co. | Giải pháp Website, Ứng dụng và Phần mềm hiện đại",
    description:
      "NhaTech Co. thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ thông minh giúp doanh nghiệp vận hành hiệu quả hơn.",
    url: siteUrl,
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "NhaTech Co. Logo"
      }
    ],
    locale: "vi_VN"
  },
  twitter: {
    card: "summary_large_image",
    title: "NhaTech Co. | Giải pháp Website, Ứng dụng và Phần mềm hiện đại",
    description:
      "NhaTech Co. thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ thông minh giúp doanh nghiệp vận hành hiệu quả hơn.",
    images: ["/images/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NhaTech Co.",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "NhaTech Co. thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ thông minh cho doanh nghiệp.",
  sameAs: []
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  const footerContent = (content.footer as Record<string, string>) || undefined;

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${beVietnam.variable} ${inter.variable} ${plusJakarta.variable} ${geist.variable} font-sans antialiased flex min-h-screen flex-col`}
      >
        <Providers>
          <PremiumHeader />
          <div className="flex-1">
            {children}
          </div>
          <Footer initialContent={footerContent} />
        </Providers>
      </body>
    </html>
  );
}
