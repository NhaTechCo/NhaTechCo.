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
  { label: "Trải nghiệm", href: "/#results", id: "results" },
  { label: "Quy trình", href: "/#process", id: "process" },
  { label: "Bài viết", href: "/bai-viet", id: "blog" },
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
    item: typeof navItems[0]
  ) => {
    // If it's not a hash link (e.g. /bai-viet), let Next.js handle it naturally
    if (!item.href.includes("#")) {
      setOpen(false);
      return;
    }

    // If we are not on the home page and clicking a hash link, let it navigate to home page first
    if (pathname !== "/") {
      return;
    }

    // We are on home page and clicking a hash link -> smooth scroll
    event.preventDefault();
    setOpen(false);

    document.getElementById(item.id)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start"
    });

    window.history.replaceState(null, "", `#${item.id}`);
  };

  return (
    <>
      <ScrollToTopButton />
      <header className="safe-shell fixed left-0 right-0 top-0 z-50 pt-[calc(.75rem+env(safe-area-inset-top))]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-slate-200/70 bg-white/75 px-3 py-2 shadow-[0_24px_90px_-62px_rgba(15,23,42,.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_24px_90px_-58px_hsl(var(--primary))]">
          <Link
            className="flex min-h-11 items-center gap-3 rounded-full pl-1 pr-3 font-geist text-base font-extrabold text-slate-950 dark:text-white"
            href="/#top"
            onClick={(event) => handleNavClick(event, navItems[0])}
          >
            <img
              src="/images/logo.png"
              alt="NhaTech Co. Logo"
              className="size-10 rounded-full bg-white object-contain p-1 shadow-[0_18px_50px_-28px_hsl(var(--primary))]"
            />
            <span className="hidden sm:inline">NhaTech Co.</span>
          </Link>

          <nav
            aria-label="Điều hướng chính"
            className="relative hidden min-h-11 items-center rounded-full border border-slate-200/80 bg-slate-100/70 p-1 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:flex"
          >
            {navItems.slice(1).map((item) => {
              const isActive = (active === item.id) || (item.id === "blog" && pathname?.startsWith("/bai-viet"));

              return (
                <Link
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "text-cyan-700 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                  href={item.href}
                  key={item.id}
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {isActive ? (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-white bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] dark:border-white/20 dark:bg-white/20"
                      layoutId="active-nav-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <motion.span
                      className="absolute bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]"
                      layoutId="active-nav-line"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="hidden sm:inline-flex" variant="premium">
              <Link href="/#contact" onClick={(event) => handleNavClick(event, navItems[5])}>Tư vấn miễn phí</Link>
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
              className="mx-auto grid max-w-md gap-3 rounded-[32px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_28px_100px_-62px_rgba(15,23,42,.42)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_28px_100px_-50px_hsl(var(--primary))]"
              exit={{ y: 18, opacity: 0 }}
              initial={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item) => {
                const isActive = (active === item.id) || (item.id === "blog" && pathname?.startsWith("/bai-viet"));

                return (
                  <Link
                    className={cn(
                      "relative flex min-h-14 items-center justify-between rounded-full px-5 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-white text-cyan-700 shadow-sm border border-slate-200 dark:bg-white/20 dark:text-white dark:border-white/10"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                    )}
                    href={item.href}
                    key={item.id}
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                    {isActive ? (
                      <span className="h-2 w-10 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" />
                    )}
                  </Link>
                );
              })}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
