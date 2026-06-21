# Cập nhật / Deploy

## Tự động (khuyên dùng)
Chỉ cần push code lên nhánh `main`. VPS kiểm tra GitHub mỗi phút (cron) và tự động
build + restart khi có commit mới. File `.env` trên VPS không bao giờ bị đụng.

## Thủ công trên VPS
Kéo code mới nhất từ GitHub rồi build + restart:

```bash
bash /root/nhatech/update.sh
```

Chỉ build lại code đang có trên VPS (không kéo code mới):

```bash
bash /root/nhatech/deploy.sh
```

## Xem log auto-deploy
```bash
tail -f /root/nhatech-auto-update.log
```
