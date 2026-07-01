"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Key, Lock, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminShell } from "@/components/cms/admin-shell";

export function SettingsForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Không thể đổi mật khẩu.");
        return;
      }

      setSuccess("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Lỗi kết nối, vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminShell title="Cài đặt tài khoản" subtitle="Quản lý thông tin đăng nhập admin của bạn.">
      <div className="mx-auto max-w-2xl">

        {/* Account info card */}
        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-700">
              <Shield className="size-7" />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-900">Administrator</p>
              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                <Key className="size-3.5" />
                Username: <code className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-700">admin</code>
              </p>
            </div>
          </div>
        </div>

        {/* Change password form */}
        <form
          onSubmit={handleChangePassword}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-2">
            <Lock className="size-5 text-cyan-600" />
            <h2 className="text-lg font-bold text-slate-900">Đổi mật khẩu</h2>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mật khẩu hiện tại
              </Label>
              <Input
                autoFocus
                className="rounded-xl border-slate-200"
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                type="password"
                value={currentPassword}
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mật khẩu mới
              </Label>
              <Input
                className="rounded-xl border-slate-200"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                type="password"
                value={newPassword}
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Xác nhận mật khẩu mới
              </Label>
              <Input
                className="rounded-xl border-slate-200"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                type="password"
                value={confirmPassword}
              />
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="size-4" />
              {success}
            </div>
          ) : null}

          <div className="mt-6">
            <Button
              className="gap-2 rounded-xl"
              disabled={isSaving}
              type="submit"
              variant="admin"
            >
              <Save className="size-4" />
              {isSaving ? "Đang lưu..." : "Đổi mật khẩu"}
            </Button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
