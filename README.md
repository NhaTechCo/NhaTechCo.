# NhaTech Co. — Website + CMS

Landing page giới thiệu dịch vụ, blog (CMS tự viết), và form thu lead.
Gồm **2 app Next.js** (frontend public + backend API/CMS) dùng chung **PostgreSQL** qua **Prisma**.

- 🌐 Production: <https://nhatechvn.com>
- 📦 Repo: <https://github.com/NhaTechCo/NhaTechCo.>

---

## 1. Kiến trúc

```
                 ┌────────────── VPS (160.22.107.119) ──────────────┐
Internet  ──▶ aaPanel nginx (443, SSL) ──▶ frontend :3000 (Next.js) │
                                              │  rewrite /api/* ─────┐│
                                              ▼                      ▼│
                                        (UI, SSR)            backend :4000 (Next.js)
                                                                     │
                                                                     ▼
                                                           PostgreSQL (Prisma)
                 └──────────────────────────────────────────────────┘
```

| Thành phần | Cổng | Vai trò |
|---|---|---|
| **frontend** | 3000 | Giao diện public + trang admin/CMS. Gọi API qua backend (rewrite `/api/*` → backend) |
| **backend** | 4000 | API: bài viết, lead, xác thực admin. **Sở hữu database** (Prisma) |
| **PostgreSQL** | 5432 | Lưu `Post`, `AdminUser`, `Lead` |
| **aaPanel nginx** | 80/443 | Reverse proxy + SSL cho `nhatechvn.com` → `127.0.0.1:3000` |
| **PM2** | — | Chạy & giữ sống 2 app (`nhatech-frontend`, `nhatech-backend`) |

> ⚠️ **Quan trọng:** chỉ **backend** kết nối database. Frontend KHÔNG dùng DB trực tiếp (nên `.env` frontend không có `DATABASE_URL`).

---

## 2. Công nghệ

| Mảng | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Ngôn ngữ | TypeScript |
| Database | PostgreSQL + Prisma 6 |
| CMS editor | TipTap |
| UI | Tailwind CSS 4, Radix UI, Framer Motion, lucide-react |
| Form & validate | react-hook-form + Zod |
| Auth admin | Cookie phiên (HMAC) + bcrypt (mật khẩu lưu DB) |
| Thông báo lead | Slack webhook |
| Hạ tầng | VPS Ubuntu, PM2, aaPanel nginx |

---

## 3. Cấu trúc thư mục

```
.
├── frontend/                 # Next.js public + admin (cổng 3000)
│   ├── src/app/              # trang, route handlers
│   ├── src/components/       # UI + CMS editor
│   ├── src/lib/              # api, auth, env, prisma...
│   └── prisma/               # schema (chỉ model Post, dùng cho type)
├── backend/                  # Next.js API + CMS (cổng 4000)
│   ├── src/app/api/          # lead, posts, admin/*
│   ├── src/lib/              # leads, posts, admin-auth, env, rate-limit
│   └── prisma/               # schema + migrations + seed (NGUỒN của DB)
├── deploy/nginx/             # mẫu cấu hình nginx
├── ecosystem.config.cjs      # cấu hình PM2
├── deploy.sh                 # build + restart trên VPS
├── update.sh                 # kéo code GitHub + build + restart (chạy tay)
├── auto-update.sh            # cron gọi: có commit mới thì deploy
├── CI.md / DEPLOY.md         # tài liệu deploy
└── README.md
```

---

## 4. Biến môi trường

> File `.env` **không** nằm trong git (đã `.gitignore`) và **không bao giờ bị CI/CD ghi đè**.
> Có thay đổi biến mới thì phải tự sửa `.env` trên VPS, và cập nhật `*.env.example` trong repo cho khỏi quên.

### Backend — `backend/.env`

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `DATABASE_URL` | ✅ | Chuỗi kết nối PostgreSQL, vd `postgresql://user:pass@localhost:5432/nhatech` |
| `BACKEND_API_KEY` | ✅ (prod) | Khoá chia sẻ giữa frontend ↔ backend cho API admin. **Phải trùng** với frontend |
| `FRONTEND_ORIGIN` | ✅ | Origin được phép CORS, vd `https://nhatechvn.com` |
| `SLACK_WEBHOOK_URL` | tuỳ chọn | Nhận thông báo khi có lead mới |

### Frontend — `frontend/.env`

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL public, vd `https://nhatechvn.com` (dùng cho SEO/sitemap) |
| `NEXT_PUBLIC_BACKEND_URL` | — | Để **trống** ở production (gọi `/api` cùng domain) |
| `INTERNAL_BACKEND_URL` | ✅ | Backend nội bộ cho rewrite, vd `http://127.0.0.1:4000` |
| `ADMIN_SESSION_SECRET` | ✅ (prod) | Chuỗi ngẫu nhiên dài để ký cookie phiên admin |
| `BACKEND_API_KEY` | ✅ (prod) | **Phải trùng** với backend |

> Ở production nếu thiếu `BACKEND_API_KEY` hoặc `ADMIN_SESSION_SECRET`, app sẽ báo lỗi (cố ý — tránh dùng giá trị mặc định yếu).

---

## 5. Chạy ở máy local

```bash
# Backend
cd backend
cp .env.example .env        # điền DATABASE_URL, BACKEND_API_KEY...
npm install
npx prisma generate
npx prisma migrate deploy   # tạo bảng
npx tsx prisma/seed.ts "matkhau-admin"   # tạo tài khoản admin
npm run dev                 # http://localhost:4000

# Frontend (terminal khác)
cd frontend
cp .env.example .env        # BACKEND_API_KEY phải trùng backend
npm install
npx prisma generate
npm run dev                 # http://localhost:3000
```

Admin: `http://localhost:3000/admin` (đăng nhập bằng mật khẩu đã seed).

---

## 6. Deploy & CI/CD

Deploy theo cơ chế **pull-based**: VPS tự kiểm tra GitHub mỗi phút bằng cron, có commit mới ở `main` thì tự build + restart. (Không dùng GitHub Actions vì firewall aaPanel hay chặn IP runner.)

### Cách dùng

| Việc bạn muốn | Cách làm |
|---|---|
| **Cập nhật production** | Chỉ cần `git push` lên `main`. VPS tự deploy sau ~1–4 phút |
| Cập nhật ngay (thủ công, trên VPS) | `bash /root/nhatech/update.sh` |
| Chỉ build lại code đang có (không kéo code mới) | `bash /root/nhatech/deploy.sh` |
| Xem log deploy | `tail -f /root/nhatech-auto-update.log` |
| Xem trạng thái app | `pm2 status` / `pm2 logs nhatech-frontend` |

### Các script

| Script | Chạy ở đâu | Làm gì |
|---|---|---|
| `auto-update.sh` | VPS (cron, mỗi phút) | So commit mới nhất với mốc đã deploy; có mới thì gọi `update.sh` |
| `update.sh` | VPS | `git clone` main → rsync vào `/root/nhatech` (trừ `.env`) → gọi `deploy.sh` |
| `deploy.sh` | VPS | backend: install → `prisma generate` → `prisma migrate deploy` → build; frontend: install → `prisma generate` → build; rồi `pm2 restart` |

### `.env` được bảo vệ 3 lớp
1. Nằm trong `.gitignore` → không vào git.
2. `update.sh` rsync có `--exclude .env --exclude '.env.*'`.
3. Build trên VPS đọc `.env` sẵn có tại chỗ.

---

## 7. Khi có thay đổi database (MIGRATION) thì CI/CD thế nào?

Database do **backend** quản lý. Quy trình chuẩn:

### Bước 1 — Sửa schema (local)
Sửa `backend/prisma/schema.prisma` (thêm/sửa model, cột...).

### Bước 2 — Tạo migration (local)
```bash
cd backend
npx prisma migrate dev --name mo_ta_thay_doi
```
Lệnh này tạo thư mục `backend/prisma/migrations/<timestamp>_mo_ta_thay_doi/migration.sql` **và** áp luôn vào DB local.

### Bước 3 — Commit + push
```bash
git add backend/prisma/schema.prisma backend/prisma/migrations
git commit -m "db: mo_ta_thay_doi"
git push
```

### Bước 4 — CI/CD tự áp lên production
Cron trên VPS phát hiện commit mới → chạy `deploy.sh`, trong đó **tự động** có:
```bash
npx prisma migrate deploy   # áp mọi migration đang chờ vào DB production
```
→ Migration được áp **tự động, đúng thứ tự, an toàn**. Bạn không phải làm gì thêm trên VPS.

### Bảng tóm tắt

| Bước | Ở đâu | Lệnh |
|---|---|---|
| 1. Sửa schema | local | sửa `backend/prisma/schema.prisma` |
| 2. Tạo migration | local | `npx prisma migrate dev --name xxx` |
| 3. Commit + push | local | `git add ... && git commit && git push` |
| 4. Áp lên prod | **VPS (tự động)** | `prisma migrate deploy` (nằm trong `deploy.sh`) |

### ⚠️ Lưu ý migration
- **Phải commit cả thư mục migration**, không chỉ sửa `schema.prisma`. `migrate deploy` chỉ áp các file migration có sẵn — nó **không tự sinh** migration.
- `migrate deploy` **không xoá dữ liệu** trừ khi migration của bạn có lệnh phá huỷ (DROP COLUMN/TABLE...). Với thay đổi nhạy cảm, **backup DB trước**:
  ```bash
  PGPASSWORD=*** pg_dump -h localhost -U nhatech_user nhatech > /root/backup-$(date +%F).sql
  ```
- Nếu migration **lỗi trên production**, `deploy.sh` dừng lại (do `set -e`), app cũ vẫn chạy. Xem lỗi ở `/root/nhatech-auto-update.log`, sửa migration rồi push lại.
- Chỉ **backend** chạy migration. Frontend không động vào DB.

---

## 8. Admin / CMS

| Mục | Đường dẫn |
|---|---|
| Đăng nhập admin | `/admin` |
| Tạo bài viết | `/admin/posts/new` |
| Đổi mật khẩu | `/admin/settings` |
| Blog public | `/bai-viet` |

- Mật khẩu admin lưu trong DB (`AdminUser`, băm bằng bcrypt). Tạo/đổi lần đầu bằng seed:
  ```bash
  cd /root/nhatech/backend && npx tsx prisma/seed.ts "matkhau-moi"
  ```

---

## 9. Bảo mật — nên làm

- Đổi (rotate) các secret nếu từng bị lộ: `BACKEND_API_KEY`, `ADMIN_SESSION_SECRET`, mật khẩu DB, Slack webhook/secret, mật khẩu VPS.
- `GET /api/lead` đã được bảo vệ bằng `x-admin-key` (không lộ email khách).
- Form lead và đăng nhập admin có rate limit chống spam/brute-force.
