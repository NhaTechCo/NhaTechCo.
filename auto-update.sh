#!/usr/bin/env bash
# Chay dinh ky boi cron TREN VPS. Kiem tra GitHub (main); neu co commit moi thi tu deploy.
# Pull-based: VPS tu keo code -> khong can inbound SSH -> khong bi firewall aaPanel chan.
set -euo pipefail

REPO="https://github.com/NhaTechCo/NhaTechCo..git"
ROOT=/root/nhatech
SHA_FILE=/root/.nhatech_last_deployed_sha   # de NGOAI /root/nhatech de khong bi rsync --delete
LOCK=/root/.nhatech_deploy.lock

# Tranh chay chong cheo (build mat vai phut)
exec 9>"$LOCK"
flock -n 9 || exit 0

REMOTE_SHA="$(git ls-remote "$REPO" refs/heads/main 2>/dev/null | awk '{print $1}')"
[ -z "$REMOTE_SHA" ] && exit 0
LAST_SHA="$(cat "$SHA_FILE" 2>/dev/null || echo '')"

if [ "$REMOTE_SHA" != "$LAST_SHA" ]; then
  echo "[$(date '+%F %T')] Phat hien commit moi $REMOTE_SHA -> dang deploy..."
  if bash "$ROOT/update.sh"; then
    echo "$REMOTE_SHA" > "$SHA_FILE"
    echo "[$(date '+%F %T')] Deploy THANH CONG."
  else
    echo "[$(date '+%F %T')] Deploy LOI - se thu lai o lan cron sau."
  fi
fi
