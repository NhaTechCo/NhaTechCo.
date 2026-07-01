"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Github, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();

  // Hide footer in admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand & Info */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="NhaTech Co. Logo"
                className="size-10 rounded-full bg-white object-contain p-1 shadow-sm"
              />
              <span className="font-geist text-xl font-extrabold text-slate-950 dark:text-white">
                NhaTech Co.
              </span>
            </Link>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 max-w-xs">
              Thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ
              thông minh giúp doanh nghiệp vận hành hiệu quả hơn.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="size-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="size-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Sản phẩm & Dịch vụ
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="/#services" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Website doanh nghiệp
                    </a>
                  </li>
                  <li>
                    <a href="/#services" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Landing page bán hàng
                    </a>
                  </li>
                  <li>
                    <a href="/#services" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Phần mềm quản lý
                    </a>
                  </li>
                  <li>
                    <a href="/#services" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Công cụ tự động hóa
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  NhaTech Co.
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/bai-viet" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Blog & Góc nhìn
                    </Link>
                  </li>
                  <li>
                    <a href="/#process" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Quy trình làm việc
                    </a>
                  </li>
                  <li>
                    <a href="/#results" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Trải nghiệm thực tế
                    </a>
                  </li>
                  <li>
                    <a href="/#contact" className="text-sm leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      Liên hệ tư vấn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Liên hệ
                </h3>
                <ul role="list" className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-6">
                  <li className="flex items-start gap-3">
                    <Mail className="size-5 shrink-0 text-slate-400 mt-0.5" />
                    <span>caoman26@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="size-5 shrink-0 text-slate-400 mt-0.5" />
                    <span>034 868 8001</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="size-5 shrink-0 text-slate-400 mt-0.5" />
                    <span>Phường Ngũ Hành Sơn, Đà Nẵng, Việt Nam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-slate-200/80 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} NhaTech Co. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
