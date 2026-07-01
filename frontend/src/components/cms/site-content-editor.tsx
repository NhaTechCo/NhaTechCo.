"use client";
// Force TS update

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Loader2,
  MessageSquareQuote,
  Phone,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Type
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminShell } from "@/components/cms/admin-shell";

/* ---------- Types ---------- */
interface SectionConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  fields: FieldConfig[];
}

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "array" | "object-array";
  arrayItemFields?: FieldConfig[];
}

/* ---------- Section definitions ---------- */
const sections: SectionConfig[] = [
  {
    key: "hero",
    label: "Hero (Banner chính)",
    icon: Sparkles,
    fields: [
      { name: "badge", label: "Badge text", type: "text" },
      { name: "title", label: "Tiêu đề H1", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      { name: "cta1", label: "Nút CTA 1", type: "text" },
      { name: "cta2", label: "Nút CTA 2", type: "text" },
      {
        name: "metrics",
        label: "Chỉ số",
        type: "object-array",
        arrayItemFields: [
          { name: "value", label: "Giá trị", type: "number" },
          { name: "suffix", label: "Hậu tố", type: "text" },
          { name: "label", label: "Nhãn", type: "text" }
        ]
      }
    ]
  },
  {
    key: "services",
    label: "Dịch vụ",
    icon: Globe,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      {
        name: "items",
        label: "Danh sách dịch vụ",
        type: "object-array",
        arrayItemFields: [
          { name: "title", label: "Tên dịch vụ", type: "text" },
          { name: "text", label: "Mô tả", type: "textarea" }
        ]
      }
    ]
  },
  {
    key: "experience",
    label: "Trải nghiệm",
    icon: Type,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      { name: "highlights", label: "Điểm nổi bật", type: "array" }
    ]
  },
  {
    key: "process",
    label: "Quy trình",
    icon: ChevronRight,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      {
        name: "steps",
        label: "Các bước",
        type: "object-array",
        arrayItemFields: [
          { name: "title", label: "Tên bước", type: "text" },
          { name: "text", label: "Mô tả", type: "textarea" }
        ]
      }
    ]
  },
  {
    key: "solutions",
    label: "Giải pháp",
    icon: Globe,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      { name: "tags", label: "Tags sản phẩm", type: "array" }
    ]
  },
  {
    key: "testimonials",
    label: "Đánh giá",
    icon: MessageSquareQuote,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      {
        name: "items",
        label: "Đánh giá khách hàng",
        type: "object-array",
        arrayItemFields: [
          { name: "quote", label: "Nhận xét", type: "textarea" },
          { name: "name", label: "Tên", type: "text" },
          { name: "role", label: "Vai trò", type: "text" }
        ]
      }
    ]
  },
  {
    key: "contact",
    label: "Liên hệ (CTA)",
    icon: Phone,
    fields: [
      { name: "title", label: "Tiêu đề", type: "textarea" },
      { name: "description", label: "Mô tả", type: "textarea" },
      { name: "benefits", label: "Ưu điểm", type: "array" }
    ]
  },
  {
    key: "footer",
    label: "Footer",
    icon: Type,
    fields: [
      { name: "description", label: "Mô tả công ty", type: "textarea" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Số điện thoại", type: "text" },
      { name: "address", label: "Địa chỉ", type: "text" }
    ]
  }
];

/* ---------- Component ---------- */
export function SiteContentEditor() {
  const [activeSection, setActiveSection] = useState(sections[0].key);
  const [data, setData] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadSection = useCallback(async (key: string) => {
    if (data[key]) return;
    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch(`/api/admin/site-content/${key}`);
      const json = await res.json();

      if (json.value) {
        setData((prev) => ({ ...prev, [key]: json.value as Record<string, unknown> }));
      }
    } catch {
      // Silent fail, form will show empty
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  }, [data]);

  useEffect(() => {
    loadSection(activeSection);
  }, [activeSection, loadSection]);

  const currentSection = sections.find((s) => s.key === activeSection)!;
  const currentData = data[activeSection] || {};

  function updateField(name: string, value: unknown) {
    setData((prev) => ({
      ...prev,
      [activeSection]: { ...prev[activeSection], [name]: value }
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/site-content/${activeSection}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: currentData })
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Lỗi khi lưu.");
      }

      setSuccess(`Đã lưu "${currentSection.label}" thành công!`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lưu.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Nội dung trang chủ" subtitle="Chỉnh sửa nội dung hiển thị trên website">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar - Section list */}
        <aside>
            {/* Mobile toggle */}
            <button
              className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="flex items-center gap-2">
                {(() => {
                  const Icon = currentSection.icon;
                  return <Icon className="size-4 text-cyan-600" />;
                })()}
                {currentSection.label}
              </span>
              <ChevronDown className={`size-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>

            <nav className={`grid gap-1.5 ${sidebarOpen ? "" : "hidden lg:grid"}`}>
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.key;

                return (
                  <button
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                    }`}
                    key={section.key}
                    onClick={() => {
                      setActiveSection(section.key);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className={`size-4 ${isActive ? "text-cyan-600" : "text-slate-400"}`} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main content area */}
          <main>
            {loading[activeSection] ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-6 animate-spin text-cyan-600" />
                <span className="ml-3 text-sm text-slate-500">Đang tải...</span>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    {currentSection.label}
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Chỉnh sửa nội dung hiển thị trên trang chủ
                  </p>
                </div>

                <div className="grid gap-6 p-6">
                  {currentSection.fields.map((field) => (
                    <FieldRenderer
                      key={field.name}
                      field={field}
                      value={currentData[field.name]}
                      onChange={(val) => updateField(field.name, val)}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 px-6 py-4">
                  {error ? (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  ) : null}
                  {success ? (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                      <CheckCircle2 className="size-4" />
                      {success}
                    </div>
                  ) : null}
                  <Button
                    className="gap-2"
                    disabled={saving}
                    onClick={handleSave}
                    variant="admin"
                  >
                    {saving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}
                    {saving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
    </AdminShell>
  );
}

/* ---------- Field Renderer ---------- */
function FieldRenderer({
  field,
  value,
  onChange
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  if (field.type === "text" || field.type === "number") {
    return (
      <div className="grid gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {field.label}
        </Label>
        <Input
          className="rounded-xl border-slate-200"
          onChange={(e) =>
            onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
          }
          placeholder={field.label}
          type={field.type === "number" ? "number" : "text"}
          value={String(value ?? "")}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="grid gap-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {field.label}
        </Label>
        <textarea
          className="min-h-24 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
          value={String(value ?? "")}
        />
      </div>
    );
  }

  if (field.type === "array") {
    const items = (Array.isArray(value) ? value : []) as string[];

    return (
      <div className="grid gap-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {field.label}
        </Label>
        {items.map((item, i) => (
          <div className="flex items-center gap-2" key={i}>
            <Input
              className="rounded-xl border-slate-200"
              onChange={(e) => {
                const updated = [...items];
                updated[i] = e.target.value;
                onChange(updated);
              }}
              value={item}
            />
            <Button
              className="shrink-0 text-red-500 hover:text-red-700"
              onClick={() => {
                const updated = items.filter((_, idx) => idx !== i);
                onChange(updated);
              }}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button
          className="gap-1.5 self-start text-sm"
          onClick={() => onChange([...items, ""])}
          size="sm"
          type="button"
          variant="ghost"
        >
          <Plus className="size-3.5" />
          Thêm
        </Button>
      </div>
    );
  }

  if (field.type === "object-array" && field.arrayItemFields) {
    const items = (Array.isArray(value) ? value : []) as Record<string, unknown>[];

    return (
      <div className="grid gap-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {field.label}
        </Label>
        {items.map((item, i) => (
          <div
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
            key={i}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                #{i + 1}
              </span>
              <Button
                className="size-8 text-red-500 hover:text-red-700"
                onClick={() => {
                  const updated = items.filter((_, idx) => idx !== i);
                  onChange(updated);
                }}
                size="icon"
                type="button"
                variant="ghost"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
            <div className="grid gap-3">
              {field.arrayItemFields!.map((subField) => (
                <FieldRenderer
                  key={subField.name}
                  field={subField}
                  value={item[subField.name]}
                  onChange={(val) => {
                    const updated = [...items];
                    updated[i] = { ...updated[i], [subField.name]: val };
                    onChange(updated);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        <Button
          className="gap-1.5 self-start text-sm"
          onClick={() => {
            const emptyItem: Record<string, unknown> = {};
            for (const subField of field.arrayItemFields!) {
              emptyItem[subField.name] = subField.type === "number" ? 0 : "";
            }
            onChange([...items, emptyItem]);
          }}
          size="sm"
          type="button"
          variant="ghost"
        >
          <Plus className="size-3.5" />
          Thêm
        </Button>
      </div>
    );
  }

  return null;
}
