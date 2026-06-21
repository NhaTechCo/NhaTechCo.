module.exports = {
  apps: [
    {
      name: "nhatech-frontend",
      cwd: "/root/nhatech/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://nhatechvn.com",
        NEXT_PUBLIC_BACKEND_URL: "",
        INTERNAL_BACKEND_URL: "http://127.0.0.1:4000"
      }
    },
    {
      name: "nhatech-backend",
      cwd: "/root/nhatech/backend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4000",
      env: {
        NODE_ENV: "production",
        FRONTEND_ORIGIN: "https://nhatechvn.com"
      }
    }
  ]
};
