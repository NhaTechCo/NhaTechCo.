"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bodyText, headingText, surfaceCard } from "@/lib/contrast";
import { cn } from "@/lib/utils";

const defaultEndpoint = (
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:4000")
).replace(/\/$/, "");

const leadSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên."),
  email: z.string().email("Email công ty chưa hợp lệ."),
  company: z.string().min(2, "Vui lòng nhập tên doanh nghiệp."),
  service: z.enum(["website", "mobile-app", "product-design", "full-stack"]),
  budget: z.enum(["under-50", "50-100", "100-250", "250-plus"]),
  message: z
    .string()
    .min(12, "Mô tả ngắn giúp chúng tôi tư vấn chính xác hơn.")
    .max(800, "Mô tả nên dưới 800 ký tự.")
});

type LeadFormValues = z.infer<typeof leadSchema>;

type LeadResponse = {
  ok: boolean;
  error?: string;
};

const serviceOptions = [
  { value: "website", label: "Website doanh nghiệp" },
  { value: "mobile-app", label: "Ứng dụng điện thoại" },
  { value: "product-design", label: "Thiết kế trải nghiệm sản phẩm" },
  { value: "full-stack", label: "Phần mềm quản lý hoặc công cụ riêng" }
];

const budgetOptions = [
  { value: "under-50", label: "Dưới 50 triệu" },
  { value: "50-100", label: "50 - 100 triệu" },
  { value: "100-250", label: "100 - 250 triệu" },
  { value: "250-plus", label: "Trên 250 triệu" }
];

async function submitLead(values: LeadFormValues) {
  const response = await fetch(`${defaultEndpoint}/api/lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  const data = (await response.json().catch(() => ({}))) as LeadResponse;

  if (!response.ok) {
    throw new Error(data.error ?? "Chưa gửi được thông tin.");
  }

  return data;
}

export function LeadForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "website",
      budget: "50-100",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: submitLead,
    onSuccess: () => reset()
  });

  const firstError = Object.values(errors)[0]?.message;

  return (
    <form
      className={cn(surfaceCard, "animated-border relative z-10 grid gap-5 overflow-hidden p-5 sm:p-7")}
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
            <Sparkles className="size-4" />
            Bắt đầu trao đổi
          </div>
          <h3 className={cn("text-2xl font-bold leading-tight", headingText)}>
            Nhận tư vấn miễn phí
          </h3>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Họ tên</Label>
          <Input id="name" placeholder="Nguyễn Minh Anh" {...register("name")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Doanh nghiệp</Label>
          <Input id="company" placeholder="Cửa hàng An Phát" {...register("company")} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email công ty</Label>
        <Input
          id="email"
          placeholder="anh@congty.vn"
          type="email"
          {...register("email")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Nhu cầu</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label>Ngân sách dự kiến</Label>
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Bạn muốn xây dựng điều gì?</Label>
        <Textarea
          id="message"
          placeholder="Ví dụ: cần website giới thiệu dịch vụ, form liên hệ và phần quản lý lịch hẹn đơn giản."
          {...register("message")}
        />
      </div>

      <Button
        className="mt-1 w-full"
        disabled={mutation.isPending}
        size="lg"
        type="submit"
        variant="premium"
      >
        {mutation.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {mutation.isPending ? "Đang gửi..." : "Nhận tư vấn miễn phí"}
      </Button>

      <AnimatePresence mode="wait">
        {firstError ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-300/20 dark:bg-red-500/10 dark:text-red-200"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
          >
            {firstError}
          </motion.p>
        ) : null}
        {mutation.isError ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-300/20 dark:bg-red-500/10 dark:text-red-200"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
          >
            {mutation.error.message}
          </motion.p>
        ) : null}
        {mutation.isSuccess ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={cn("rounded-2xl border border-cyan-200/80 bg-cyan-50 px-4 py-3 text-sm font-semibold dark:border-cyan-300/20 dark:bg-cyan-400/10", bodyText)}
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
          >
            Đã nhận thông tin. Chúng tôi sẽ liên hệ bạn sớm.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
