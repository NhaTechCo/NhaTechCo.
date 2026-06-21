#!/usr/bin/env bash
# Chay TREN VPS de tu keo code moi nhat tu GitHub (nhanh main) roi build + restart.
# Dung khi muon cap nhat thu cong ma khong qua GitHub Actions.
# KHONG dung cham toi .env tren VPS (da loai tru khi dong bo).
set -euo pipefail

REPO="https://github.com/NhaTechCo/NhaTechCo..git"
ROOT=/root/nhatech
TMP="$(mktemp -d)"

echo "==> Tai code moi nhat tu GitHub (main)..."
git clone --depth 1 -b main "$REPO" "$TMP"

echo "==> Dong bo vao $ROOT (giu nguyen .env, node_modules, .next, .data)..."
rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.data' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '*.log' \
  --exclude '.edge-*' \
  --exclude 'visual-checks' \
  "$TMP"/ "$ROOT"/

rm -rf "$TMP"

echo "==> Build + restart..."
bash "$ROOT/deploy.sh"

echo "==> Cap nhat xong."
