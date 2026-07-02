"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Trang chủ", href: "/#top", id: "top" },
  { label: "Dịch vụ", href: "/#services", id: "services" },
  { label: "Quy trình", href: "/#process", id: "process" },
  { label: "Trải nghiệm", href: "/#results", id: "results" },
  { label: "Liên hệ", href: "/#contact", id: "contact" }
];

const navItemIds = navItems.map((item) => item.id);

export function PremiumHeader() {
  const pathname = usePathname();
  const active = useActiveSection(navItemIds, { defaultId: "top" });
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (pathname !== "/") {
      return; // Let standard link navigation happen
    }

    event.preventDefault();
    setOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start"
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <ScrollToTopButton />
      <header className="safe-shell fixed left-0 right-0 top-0 z-50 pt-[calc(.7rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-2 shadow-[0_24px_90px_-62px_rgba(15,23,42,.4)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65 dark:shadow-[0_24px_90px_-58px_rgba(0,0,0,.55)]">
          {/* Hairline gradient trên viền */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/15"
          />

          <a
            className="group flex min-h-11 items-center gap-2.5 rounded-full pl-1 pr-2 font-geist text-base font-extrabold text-slate-950 dark:text-white"
            href="/#top"
            onClick={(event) => handleNavClick(event, "top")}
          >
            <span className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white p-[2px] shadow-sm transition-transform group-hover:scale-105 dark:border-white/15 dark:bg-white/10">
              <img
                src="/images/logo.png"
                alt="NhaTech Co. Logo"
                className="size-full rounded-full bg-white object-contain p-1"
              />
            </span>
            <span className="hidden sm:inline">NhaTech Co.</span>
          </a>

          <nav
            aria-label="Điều hướng chính"
            className="relative hidden min-h-11 items-center rounded-full border border-slate-200/70 bg-slate-100/60 p-1 dark:border-white/10 dark:bg-white/[0.04] md:flex"
          >
            {navItems.slice(1).map((item) => {
              const isActive = active === item.id;

              return (
                <a
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:px-4",
                    isActive
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  )}
                  href={item.href}
                  key={item.id}
                  onClick={(event) => handleNavClick(event, item.id)}
                >
                  {isActive ? (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-slate-200 bg-white shadow-sm dark:border-white/15 dark:bg-white/15"
                      layoutId="active-nav-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="glass" size="sm" className="hidden gap-1.5 lg:inline-flex">
              <Link href="/bai-viet">
                <FileText className="size-3.5" />
                Bài viết
              </Link>
            </Button>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex" variant="premium">
              <a href="/#contact" onClick={(event) => handleNavClick(event, "contact")}>Tư vấn miễn phí</a>
            </Button>
            <Button
              aria-label={open ? "Đóng menu" : "Mở menu"}
              className="md:hidden"
              onClick={() => setOpen((value) => !value)}
              size="icon"
              type="button"
              variant="glass"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-background/80 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-28 backdrop-blur-3xl md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.nav
              animate={{ y: 0, opacity: 1 }}
              aria-label="Menu trên điện thoại"
              className="mx-auto grid max-w-md gap-3 rounded-[32px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_28px_100px_-62px_rgba(15,23,42,.42)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_28px_100px_-50px_rgba(0,0,0,.6)]"
              exit={{ y: 18, opacity: 0 }}
              initial={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item) => {
                const isActive = active === item.id;

                return (
                  <a
                    className={cn(
                      "relative flex min-h-14 items-center justify-between rounded-full px-5 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-white text-slate-950 shadow-sm border border-slate-200 dark:bg-white/20 dark:text-white dark:border-white/10"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                    )}
                    href={item.href}
                    key={item.id}
                    onClick={(event) => handleNavClick(event, item.id)}
                  >
                    {item.label}
                    {isActive ? (
                      <span className="h-2 w-10 rounded-full bg-slate-900 dark:bg-white" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" />
                    )}
                  </a>
                );
              })}
              <Link
                className="flex min-h-14 items-center justify-between rounded-full px-5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                href="/bai-viet"
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <FileText className="size-4" />
                  Bài viết
                </span>
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" />
              </Link>
              <Button asChild className="mt-1 w-full" size="lg" variant="premium">
                <a
                  href="/#contact"
                  onClick={(event) => handleNavClick(event, "contact")}
                >
                  Tư vấn miễn phí
                </a>
              </Button>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
