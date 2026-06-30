"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useTransition } from "react";

export function AdminPostFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "ALL";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm theo tiêu đề hoặc slug..."
          className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          defaultValue={q}
          onChange={(e) => {
            const val = e.target.value;
            // Debounce lightly
            setTimeout(() => updateParams("q", val), 300);
          }}
        />
      </div>
      <select
        className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all sm:w-[160px]"
        defaultValue={status}
        onChange={(e) => updateParams("status", e.target.value)}
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="PUBLISHED">Đã xuất bản</option>
        <option value="DRAFT">Bản nháp</option>
      </select>
    </div>
  );
}
