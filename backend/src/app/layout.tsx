import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NhaTech Co.",
  description: "Khu vực tiếp nhận yêu cầu tư vấn của NhaTech Co."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
