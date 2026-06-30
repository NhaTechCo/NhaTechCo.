#!/usr/bin/env bash
# Deploy script chay TREN VPS. Duoc GitHub Actions goi sau khi da rsync code moi len /root/nhatech.
# KHONG dung cham toi cac file .env tren VPS (chung da bi loai tru khi rsync).
set -euo pipefail

ROOT=/root/nhatech

echo "==> [1/3] Backend: cai dependencies, prisma, build"
cd "$ROOT/backend"
npm install --no-audit --no-fund
npx prisma generate
npx prisma migrate deploy
NODE_OPTIONS="--max-old-space-size=512" npx next build --webpack

echo "==> [2/3] Frontend: cai dependencies, build"
cd "$ROOT/frontend"
npm install --no-audit --no-fund
NODE_OPTIONS="--max-old-space-size=640" npx next build --webpack

echo "==> [3/3] Restart PM2 (chi nhatech, khong dung makeup-backend)"
cd "$ROOT"
pm2 reload nhatech-backend nhatech-frontend --update-env
pm2 save

echo "==> Deploy hoan tat."
