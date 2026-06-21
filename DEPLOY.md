# Deploy Len Linux

Huong dan nay deploy frontend Next.js o port noi bo `3000`, backend Next.js o port noi bo `4000`, source nam tai `/root/nhatech`, va public qua domain `https://nhatechvn.com`.

## 1. Chuan bi server

Dang nhap server:

```bash
ssh root@160.22.107.119
```

Cap nhat he thong va cai Node.js 22, Nginx, PM2:

```bash
apt update
apt install -y curl nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
```

Mo firewall neu server dang bat UFW:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## 2. Dua source len server

Neu server da bi long thu muc sai, xoa sach va tao lai cau truc dung:

```bash
rm -rf /root/nhatech
mkdir -p /root/nhatech
mkdir -p /root/nhatech/frontend
mkdir -p /root/nhatech/backend
```

Sau do copy source tu may local len server. Chay cac lenh nay tai thu muc goc project local, noi co `frontend`, `backend`, `DEPLOY.md`.

Neu may local co `rsync`, dung cach nay:

```bash
rsync -av --delete --exclude node_modules --exclude .next --exclude .git --exclude "*.log" frontend/ root@160.22.107.119:/root/nhatech/frontend/
rsync -av --delete --exclude node_modules --exclude .next --exclude .git --exclude ".data" --exclude "*.log" backend/ root@160.22.107.119:/root/nhatech/backend/
rsync -av deploy/ root@160.22.107.119:/root/nhatech/deploy/
rsync -av ecosystem.config.cjs DEPLOY.md root@160.22.107.119:/root/nhatech/
```

Neu dung Windows PowerShell va khong co `rsync`, tao file nen roi upload:

```powershell
tar --exclude=frontend/node_modules --exclude=frontend/.next --exclude=frontend/.edge-* --exclude=frontend/visual-checks --exclude=backend/node_modules --exclude=backend/.next --exclude=backend/.data --exclude=.git --exclude=*.log -czf nhatech-deploy.tar.gz frontend backend deploy ecosystem.config.cjs DEPLOY.md
scp .\nhatech-deploy.tar.gz root@160.22.107.119:/root/nhatech/
ssh root@160.22.107.119 "cd /root/nhatech && tar -xzf nhatech-deploy.tar.gz && rm nhatech-deploy.tar.gz"
```

Khong upload nguyen folder `nhatech` vao `/root/nhatech`. Chi upload cac muc ben trong project, de ket qua tren server la:

```text
/root/nhatech/frontend
/root/nhatech/backend
/root/nhatech/deploy
/root/nhatech/ecosystem.config.cjs
/root/nhatech/DEPLOY.md
```

Tren server:

```bash
cd /root/nhatech
ls -la
```

Neu thay `/root/nhatech/nhatech`, nghia la van upload sai. Xoa lai va copy theo dung lenh o tren:

```bash
rm -rf /root/nhatech
mkdir -p /root/nhatech/frontend /root/nhatech/backend
```

## 3. Cau hinh bien moi truong

Neu PostgreSQL cai truc tiep tren server, tao database rieng cho CMS:

```bash
# Ubuntu/Debian
apt install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql

# CentOS/RHEL/Alma/Rocky neu dung dnf/yum thi cai package postgresql-server tu repo cua server,
# sau do initdb/start service theo he dieu hanh.
```

Tao user/database:

```bash
sudo -u postgres psql
```

Trong man hinh `psql`, chay:

```sql
CREATE USER nhatech_user WITH PASSWORD 'mat-khau-manh';
CREATE DATABASE nhatech OWNER nhatech_user;
GRANT ALL PRIVILEGES ON DATABASE nhatech TO nhatech_user;
\q
```

Kiem tra ket noi noi bo:

```bash
psql "postgresql://nhatech_user:mat-khau-manh@127.0.0.1:5432/nhatech" -c "select 1;"
```

Frontend:

```bash
cp frontend/.env.production.example frontend/.env.production
```

Sua `frontend/.env.production` va dien PostgreSQL + admin:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/nhatech
ADMIN_PASSWORD=mat-khau-admin-rieng
ADMIN_SESSION_SECRET=chuoi-bi-mat-dai-random
```

Vi du neu PostgreSQL nam cung VPS:

```bash
DATABASE_URL=postgresql://nhatech_user:mat-khau-manh@127.0.0.1:5432/nhatech
ADMIN_PASSWORD=doi-mat-khau-nay-ngay
ADMIN_SESSION_SECRET=tao-chuoi-random-dai-it-nhat-32-ky-tu
```

Backend:

```bash
cp backend/.env.production.example backend/.env.production
```

Neu co Slack webhook, sua `backend/.env.production` va dien `SLACK_WEBHOOK_URL`.

## 4. Cai dependencies va build

Neu VPS chi co 2GB RAM, nen tao them swap truoc khi build de tranh treo hoac bi kill:

```bash
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

```bash
cd /root/nhatech/frontend
npm install --no-audit --no-fund
npx prisma generate
npx prisma migrate deploy
npm run build

cd /root/nhatech/backend
npm install --no-audit --no-fund
npm run build
```

Neu Next bao loi Turbopack/SWC tren Linux, build truc tiep bang Webpack:

```bash
cd /root/nhatech/frontend
npx next build --webpack

cd /root/nhatech/backend
npx next build --webpack
```

Neu build bao thieu `lightningcss.linux-x64-gnu.node`, `react-redux`, hoac `motion-utils`, cai bo sung frontend:

```bash
cd /root/nhatech/frontend
npm install lightningcss-linux-x64-gnu @next/swc-linux-x64-gnu react-redux motion-utils --no-audit --no-fund
npx prisma generate
npx prisma migrate deploy
NODE_OPTIONS="--max-old-space-size=512" npx next build --webpack
```

## 5. Chay bang PM2

Neu dung domain/Nginx/aaPanel, frontend chay noi bo o `3000`, backend chay noi bo o `4000`, Nginx/aaPanel public `https://nhatechvn.com` va proxy vao `127.0.0.1:3000`. Backend khong can public port `4000`.

Truoc khi build, dat bien moi truong nhu sau:

```bash
cd /root/nhatech
cat > frontend/.env.production <<'EOF'
NEXT_PUBLIC_SITE_URL=https://nhatechvn.com
NEXT_PUBLIC_BACKEND_URL=
INTERNAL_BACKEND_URL=http://127.0.0.1:4000
EOF

cat > backend/.env.production <<'EOF'
FRONTEND_ORIGIN=https://nhatechvn.com
EOF
```

Sau khi sua `.env.production`, build lai frontend vi `NEXT_PUBLIC_*` duoc dong vao bundle luc build:

```bash
cd /root/nhatech/frontend
rm -rf .next
npx prisma generate
npx prisma migrate deploy
NODE_OPTIONS="--max-old-space-size=512" npx next build --webpack

cd /root/nhatech/backend
rm -rf .next
NODE_OPTIONS="--max-old-space-size=512" npx next build --webpack
```

```bash
cd /root/nhatech
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Sau khi chay `pm2 startup`, copy lenh ma PM2 in ra va chay lai mot lan nua de tu khoi dong khi reboot.

Kiem tra:

```bash
pm2 status
pm2 logs
```

## 6. Cau hinh Nginx

Neu server dung Ubuntu/Debian:

```bash
cp /root/nhatech/deploy/nginx/nhatech.conf /etc/nginx/sites-available/nhatech
ln -s /etc/nginx/sites-available/nhatech /etc/nginx/sites-enabled/nhatech
nginx -t
systemctl reload nginx
```

Neu file default cua Nginx dang chiem host, co the tat:

```bash
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Neu server dung CentOS/RHEL/Alma/Rocky va khong co `sites-available`, copy vao `conf.d`:

```bash
cp /root/nhatech/deploy/nginx/nhatech.conf /etc/nginx/conf.d/nhatech.conf
nginx -t
systemctl enable nginx
systemctl start nginx
```

Neu Nginx dang chay roi:

```bash
systemctl reload nginx
```

Neu server dung aaPanel, nen cau hinh qua giao dien aaPanel. Neu VPS da co website khac dang chay tren cung IP, khong tao site moi bang IP `160.22.107.119`; hay tao bang domain rieng `nhatechvn.com`.

1. Trong trang DNS cua domain, tao record `A` cho `@` tro ve `160.22.107.119`, va record `A` cho `www` tro ve `160.22.107.119`.
2. Vao aaPanel **Website** > **Proxy Project** > **Add proxy**.
3. Domain dien `nhatechvn.com` va `www.nhatechvn.com`.
4. Target URL dien `http://127.0.0.1:3000`.
5. Tao proxy xong, bat SSL/Let's Encrypt cho `nhatechvn.com` va `www.nhatechvn.com`.
6. Neu aaPanel khong co Proxy Project, tao **PHP Project** voi PHP **Static**, sau do vao **Config** va thay bang cau hinh reverse proxy ben duoi.

Vi du config aaPanel cho domain `nhatechvn.com`:

```nginx
server {
    listen 80;
    server_name nhatechvn.com www.nhatechvn.com;

    location /api/ {
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Neu muon lam bang lenh tren server aaPanel, thu muc Nginx thuong la:

```bash
cp /root/nhatech/deploy/nginx/nhatech.conf /www/server/panel/vhost/nginx/nhatech.conf
/www/server/nginx/sbin/nginx -t
bt reload
```

Neu `bt reload` khong reload Nginx, dung:

```bash
/etc/init.d/nginx reload
```

## 7. Kiem tra public

Neu chay tam thoi bang port rieng, mo:

```text
http://160.22.107.119:3000
```

Kiem tra API qua frontend proxy:

```bash
curl http://160.22.107.119:3000/api/lead
```

Neu da cau hinh Nginx/domain, mo:

```text
https://nhatechvn.com
```

Kiem tra API:

```bash
curl https://nhatechvn.com/api/lead
```

## 8. Deploy lai khi co code moi

```bash
# Neu copy source tu may local, tao lai goi deploy tai D:\WebHome roi upload:
# tar --exclude=frontend/node_modules --exclude=frontend/.next --exclude=frontend/.edge-* --exclude=frontend/visual-checks --exclude=backend/node_modules --exclude=backend/.next --exclude=backend/.data --exclude=.git --exclude=*.log -czf nhatech-deploy.tar.gz frontend backend deploy ecosystem.config.cjs DEPLOY.md
# scp .\nhatech-deploy.tar.gz root@160.22.107.119:/root/nhatech/
# ssh root@160.22.107.119 "cd /root/nhatech && tar -xzf nhatech-deploy.tar.gz && rm nhatech-deploy.tar.gz"

cd frontend
npm install --no-audit --no-fund
npx prisma generate
npx prisma migrate deploy
npm run build

cd ../backend
npm install --no-audit --no-fund
npm run build

cd ..
pm2 reload ecosystem.config.cjs --update-env
```

## 9. Tao tai khoan admin (bat buoc lan dau)

Tai khoan admin duoc luu trong database (bang `AdminUser` cua backend), khong doc tu `ADMIN_PASSWORD`.
Phai chay seed mot lan de tao/ doi mat khau admin (username mac dinh la `admin`):

```bash
cd /root/nhatech/backend
npx prisma migrate deploy
npx tsx prisma/seed.ts "mat-khau-admin-cua-ban"
```

Sau khi deploy CMS, vao admin:

```text
https://nhatechvn.com/admin
```

Dang nhap bang mat khau vua seed o tren. Sau do co the doi mat khau trong trang `/admin/settings`.
