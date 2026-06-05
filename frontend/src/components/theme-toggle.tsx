"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  const label = mounted
    ? isDark
      ? "Chuyển sang giao diện sáng"
      : "Chuyển sang giao diện tối"
    : "Đổi giao diện sáng tối";

  return (
    <TooltipProvider delayDuration={180}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={label}
            size="icon"
            type="button"
            variant="glass"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted && isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === "system" ? "Theo hệ thống" : label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
