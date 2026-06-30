"use client";

import type { JSONContent } from "@tiptap/react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignLeft,
  Bold,
  CheckCircle2,
  Clock,
  Eye,
  Heading2,
  Heading3,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Save,
  Sparkles,
  Trash2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slug";

type PostStatus = "DRAFT" | "PUBLISHED";

type EditablePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  contentJson: JSONContent;
  contentHtml: string;
  status: PostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
};

type PostEditorProps = {
  initialPost?: EditablePost | null;
};

const emptyContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "Viết mở bài tại đây..." }]
    }
  ]
};

export function AdminPostEditor({ initialPost = null }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage ?? "");
  const [status, setStatus] = useState<PostStatus>(initialPost?.status ?? "DRAFT");
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initialPost?.seoDescription ?? ""
  );
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.focusKeyword ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost?.canonicalUrl ?? "");
  const [ogImage, setOgImage] = useState(initialPost?.ogImage ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // For real-time editor content
  const [editorContent, setEditorContent] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-cyan-700 underline underline-offset-4"
        }
      }),
      Placeholder.configure({
        placeholder: "Viết nội dung bài, thêm heading, danh sách và liên kết..."
      })
    ],
    content: initialPost?.contentJson ?? emptyContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base leading-8 text-slate-900 outline-none cms-content"
      }
    },
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getText());
      setEditorHtml(editor.getHTML());
    },
    immediatelyRender: false
  });

  useEffect(() => {
    if (editor && initialPost) {
      setEditorContent(editor.getText());
      setEditorHtml(editor.getHTML());
    }
  }, [editor, initialPost]);

  useEffect(() => {
    if (!initialPost && title && !slug) {
      setSlug(slugify(title));
    }
  }, [initialPost, slug, title]);

  const contentText = editorContent;
  const previewTitle = seoTitle || title || "Tiêu đề bài viết";
  const previewDescription =
    seoDescription || excerpt || "Mô tả SEO sẽ hiển thị tại đây.";

  // Word count & Readability
  const wordCount = useMemo(() => {
    return contentText.trim().split(/\s+/).filter(Boolean).length;
  }, [contentText]);
  
  const readingTime = useMemo(() => {
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [wordCount]);

  const headings = useMemo(() => {
    const matches = Array.from(editorHtml.matchAll(/<h([2-6])[^>]*>(.*?)<\/h\1>/gi));
    return matches.map(m => ({ level: parseInt(m[1]), text: m[2].replace(/<[^>]*>?/gm, '') }));
  }, [editorHtml]);

  // SEO Analysis
  const checklist = useMemo(() => {
    const kw = focusKeyword.toLowerCase().trim();
    const hasKw = Boolean(kw);
    const contentHasKeyword = hasKw && contentText.toLowerCase().includes(kw);
    const titleHasKeyword = hasKw && previewTitle.toLowerCase().includes(kw);
    const descHasKeyword = hasKw && previewDescription.toLowerCase().includes(kw);
    const slugHasKeyword = hasKw && slug.toLowerCase().includes(slugify(kw));
    const headingsHaveKeyword = hasKw && headings.some(h => h.text.toLowerCase().includes(kw));

    return [
      {
        label: "Tiêu đề SEO (35-60 ký tự)",
        done: previewTitle.length >= 35 && previewTitle.length <= 60
      },
      {
        label: "Meta description (120-160 ký tự)",
        done: previewDescription.length >= 120 && previewDescription.length <= 160
      },
      {
        label: "Slug ngắn gọn, rõ nghĩa",
        done: slug.length >= 4 && slug.length <= 80
      },
      {
        label: "Nội dung đủ dài (Tối thiểu 300 từ)",
        done: wordCount >= 300
      },
      {
        label: "Có ảnh đại diện hoặc ảnh OG",
        done: Boolean(coverImage || ogImage)
      },
      {
        label: "Có ít nhất 1 heading (H2/H3)",
        done: headings.length > 0
      },
      {
        label: "Từ khóa trong tiêu đề SEO",
        done: hasKw ? titleHasKeyword : false,
        requiresKeyword: true
      },
      {
        label: "Từ khóa trong mô tả SEO",
        done: hasKw ? descHasKeyword : false,
        requiresKeyword: true
      },
      {
        label: "Từ khóa trong đường dẫn (Slug)",
        done: hasKw ? slugHasKeyword : false,
        requiresKeyword: true
      },
      {
        label: "Từ khóa xuất hiện trong nội dung",
        done: hasKw ? contentHasKeyword : false,
        requiresKeyword: true
      },
      {
        label: "Từ khóa nằm trong ít nhất 1 thẻ Heading",
        done: hasKw ? headingsHaveKeyword : false,
        requiresKeyword: true
      }
    ];
  }, [contentText, coverImage, focusKeyword, ogImage, previewDescription, previewTitle, slug, wordCount, headings]);

  const score = Math.round((checklist.filter(c => c.done).length / checklist.length) * 100);

  async function savePost(nextStatus = status) {
    if (!editor) {
      return;
    }

    setIsSaving(true);
    setError("");

    const response = await fetch(
      initialPost ? `/api/admin/posts/${initialPost.id}` : "/api/admin/posts",
      {
        method: initialPost ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          coverImage,
          contentJson: editor.getJSON(),
          contentHtml: editor.getHTML(),
          status: nextStatus,
          seoTitle,
          seoDescription,
          focusKeyword,
          canonicalUrl,
          ogImage
        })
      }
    );

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      post?: { id: string };
    };

    setIsSaving(false);

    if (!response.ok) {
      setError(data.error ?? "Không lưu được bài viết.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleDelete() {
    if (!initialPost || !window.confirm("Bạn có chắc chắn muốn xóa bài viết này không? Không thể hoàn tác!")) {
      return;
    }

    setIsDeleting(true);
    setError("");

    const response = await fetch(`/api/admin/posts/${initialPost.id}`, {
      method: "DELETE"
    });

    setIsDeleting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Không thể xóa bài viết.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  function setLink() {
    const href = window.prompt("Dán URL liên kết");

    if (!href) {
      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* Main content */}
      <div className="grid gap-5">
        {/* Meta card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_200px]">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tiêu đề
              </Label>
              <Input
                id="title"
                className="rounded-xl border-slate-200 text-base font-semibold"
                onBlur={() => !slug && setSlug(slugify(title))}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ví dụ: Thiết kế website doanh nghiệp cần chuẩn bị gì?"
                value={title}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Trạng thái
              </Label>
              <select
                className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                id="status"
                onChange={(event) => setStatus(event.target.value as PostStatus)}
                value={status}
              >
                <option value="DRAFT">📝 Bản nháp</option>
                <option value="PUBLISHED">🚀 Xuất bản</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Slug
            </Label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 pr-3 shadow-sm">
              <span className="pl-4 text-sm text-slate-400">/bai-viet/</span>
              <Input
                id="slug"
                className="flex-1 border-0 bg-transparent font-mono text-sm shadow-none focus:ring-0"
                onChange={(event) => setSlug(slugify(event.target.value))}
                placeholder="thiet-ke-website-doanh-nghiep"
                value={slug}
              />
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="excerpt" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mô tả ngắn
            </Label>
            <Textarea
              id="excerpt"
              className="rounded-xl border-slate-200"
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Tóm tắt nội dung chính trong 1-2 câu..."
              rows={2}
              value={excerpt}
            />
          </div>
        </div>

        {/* Editor card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Nội dung
            </Label>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1"><AlignLeft className="size-3" /> {wordCount} từ</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> {readingTime} phút đọc</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            <EditorButton
              active={editor?.isActive("bold")}
              disabled={!editor}
              icon={<Bold className="size-4" />}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              title="In đậm"
            />
            <EditorButton
              active={editor?.isActive("italic")}
              disabled={!editor}
              icon={<Italic className="size-4" />}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title="In nghiêng"
            />
            <div className="w-px h-5 bg-slate-200 mx-1 my-auto" />
            <EditorButton
              active={editor?.isActive("heading", { level: 2 })}
              disabled={!editor}
              icon={<Heading2 className="size-4" />}
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading 2"
            />
            <EditorButton
              active={editor?.isActive("heading", { level: 3 })}
              disabled={!editor}
              icon={<Heading3 className="size-4" />}
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Heading 3"
            />
            <div className="w-px h-5 bg-slate-200 mx-1 my-auto" />
            <EditorButton
              active={editor?.isActive("bulletList")}
              disabled={!editor}
              icon={<List className="size-4" />}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              title="Danh sách"
            />
            <EditorButton
              active={editor?.isActive("orderedList")}
              disabled={!editor}
              icon={<ListOrdered className="size-4" />}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              title="Danh sách số"
            />
            <div className="w-px h-5 bg-slate-200 mx-1 my-auto" />
            <EditorButton
              active={editor?.isActive("blockquote")}
              disabled={!editor}
              icon={<Quote className="size-4" />}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              title="Trích dẫn"
            />
            <EditorButton
              disabled={!editor}
              icon={<Minus className="size-4" />}
              onClick={() => editor?.chain().focus().setHorizontalRule().run()}
              title="Dòng kẻ ngang"
            />
            <EditorButton
              active={editor?.isActive("link")}
              disabled={!editor}
              icon={<LinkIcon className="size-4" />}
              onClick={setLink}
              title="Chèn link"
            />
          </div>
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="grid content-start gap-5">
        {/* SEO Score Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles className="size-4 text-cyan-600" />
              SEO Score
            </div>
            <div className={cn(
              "px-2.5 py-1 text-xs font-bold rounded-full",
              score >= 80 ? "bg-emerald-100 text-emerald-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            )}>
              {score}/100
            </div>
          </div>

          <div className="grid gap-2">
            {checklist.map((item, idx) => {
              if (item.requiresKeyword && !focusKeyword) {
                return (
                  <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-400 opacity-60" key={idx}>
                    <Minus className="mt-0.5 size-4 shrink-0 text-slate-300" />
                    <span>{item.label} (Cần nhập từ khóa)</span>
                  </div>
                );
              }
              return (
                <div
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                    item.done
                      ? "border-emerald-200 bg-emerald-50/70 text-emerald-800"
                      : "border-slate-100 bg-white text-slate-600"
                  )}
                  key={idx}
                >
                  {item.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="mt-0.5 size-4 shrink-0 text-slate-300" />
                  )}
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Google Preview */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
            <Eye className="size-4 text-cyan-600" />
            Google Preview
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="grid size-4 place-items-center rounded-full bg-slate-100 text-[10px] font-bold">N</span>
              nhatechvn.com › bai-viet › {slug || "slug-bai-viet"}
            </div>
            <div className="mt-1.5 line-clamp-2 text-xl font-medium text-blue-700">
              {previewTitle}
            </div>
            <div className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
              {previewDescription.length > 160
                ? previewDescription.slice(0, 157) + "..."
                : previewDescription}
            </div>
          </div>
        </div>

        {/* SEO fields */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
            SEO & Metadata
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">Từ khóa chính</Label>
              <Input
                className="rounded-xl border-slate-200 text-sm font-medium text-cyan-700"
                onChange={(event) => setFocusKeyword(event.target.value)}
                placeholder="Ví dụ: thiết kế website"
                value={focusKeyword}
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">SEO Title</Label>
              <Input
                className="rounded-xl border-slate-200 text-sm"
                onChange={(event) => setSeoTitle(event.target.value)}
                placeholder="Tối ưu cho Google (55-60 ký tự)"
                value={seoTitle}
              />
              <span className="text-[10px] text-slate-400">{seoTitle.length}/60</span>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">Meta Description</Label>
              <Textarea
                className="rounded-xl border-slate-200 text-sm"
                onChange={(event) => setSeoDescription(event.target.value)}
                placeholder="Mô tả hấp dẫn cho kết quả tìm kiếm (120-160 ký tự)"
                rows={2}
                value={seoDescription}
              />
              <span className="text-[10px] text-slate-400">{seoDescription.length}/160</span>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">Ảnh đại diện</Label>
              <Input
                className="rounded-xl border-slate-200 text-sm"
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="https://..."
                value={coverImage}
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">Ảnh OG (Social)</Label>
              <Input
                className="rounded-xl border-slate-200 text-sm"
                onChange={(event) => setOgImage(event.target.value)}
                placeholder="https://..."
                value={ogImage}
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-slate-500">Canonical URL</Label>
              <Input
                className="rounded-xl border-slate-200 text-sm"
                onChange={(event) => setCanonicalUrl(event.target.value)}
                placeholder="https://nhatechvn.com/bai-viet/..."
                value={canonicalUrl}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <Button
              disabled={isSaving}
              onClick={() => savePost(status)}
              type="button"
              className="flex-1 gap-2 rounded-xl border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              <Save className="size-4" />
              {isSaving ? "Đang lưu..." : "Lưu nháp"}
            </Button>
            <Button
              disabled={isSaving}
              onClick={() => savePost("PUBLISHED")}
              type="button"
              variant="admin"
              className="flex-1 gap-2 rounded-xl"
            >
              <Sparkles className="size-4" />
              {isSaving ? "Đang xuất bản..." : "Xuất bản"}
            </Button>
          </div>
          <div className="flex justify-between items-center px-1">
            <Button asChild type="button" variant="ghost" className="rounded-xl h-9 text-slate-500">
              <Link href="/admin">Huỷ</Link>
            </Button>
            
            {initialPost ? (
              <Button 
                onClick={handleDelete} 
                disabled={isDeleting} 
                variant="ghost" 
                className="rounded-xl h-9 text-red-600 hover:text-red-700 hover:bg-red-50 gap-1.5"
              >
                <Trash2 className="size-3.5" />
                {isDeleting ? "Đang xóa..." : "Xóa bài"}
              </Button>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

function EditorButton({
  active,
  disabled,
  icon,
  onClick,
  title
}: {
  active?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      aria-pressed={Boolean(active)}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg text-sm transition-all",
        active
          ? "bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200"
          : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm",
        disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"
      )}
      disabled={disabled}
      onClick={onClick}
      title={title}
      type="button"
    >
      {icon}
    </button>
  );
}
