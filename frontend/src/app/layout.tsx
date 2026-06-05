import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Geist,
  Inter,
  Plus_Jakarta_Sans
} from "next/font/google";
import { Providers } from "@/components/providers";
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
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "NhaTech Co.",
    description:
      "Giải pháp website, ứng dụng và phần mềm hiện đại cho doanh nghiệp và cá nhân.",
    images: ["/images/hero-studio.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${beVietnam.variable} ${inter.variable} ${plusJakarta.variable} ${geist.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
