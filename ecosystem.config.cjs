module.exports = {
  apps: [
    {
      name: "nhatech-frontend",
      cwd: "/root/nhatech/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "cluster",
      listen_timeout: 10000,
      kill_timeout: 5000,
      max_memory_restart: "700M",
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
      instances: 1,
      exec_mode: "cluster",
      listen_timeout: 10000,
      kill_timeout: 5000,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        FRONTEND_ORIGIN: "https://nhatechvn.com"
      }
    }
  ]
};
