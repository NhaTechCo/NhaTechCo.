"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { name: "Bài viết & Thống kê", href: "/admin", icon: LayoutDashboard },
  { name: "Nội dung trang", href: "/admin/content", icon: Globe },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings }
];

export function AdminShell({ 
  children, 
  title, 
  subtitle, 
  headerActions 
}: { 
  children: React.ReactNode, 
  title: string, 
  subtitle?: string, 
  headerActions?: React.ReactNode 
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex sticky top-0 h-screen">
        <div className="flex h-16 items-center border-b border-slate-200 px-6 gap-3">
          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-sm font-bold text-white shadow-sm">
            N
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
            NhaTech CMS
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-50 text-cyan-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? "text-cyan-600" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200 p-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-4 text-slate-400 group-hover:text-red-600" />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-sm font-bold text-white shadow-sm">
                  N
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  CMS
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-500 hover:text-slate-700">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <nav className="grid gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className={`size-4 ${isActive ? "text-cyan-600" : "text-slate-400"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-slate-200 p-4">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="size-4 text-slate-400" />
                  Đăng xuất
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-700">
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-2">
               <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 text-xs font-bold text-white shadow-sm">
                 N
               </span>
               <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
                 CMS
               </span>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {headerActions}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="lg:hidden mb-6">
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
