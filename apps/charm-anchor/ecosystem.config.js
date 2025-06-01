module.exports = {
  apps: [
    {
      name: "h5-app",
      script: "npm",
      args: "start",
      cwd: "/root/var/www/h5-app",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      exec_mode: "cluster", // 启用 cluster 模式以实现负载均衡
      instances: "4", // 使用 "max" 自动根据 CPU 核心数创建实例，或指定具体实例数（如 4）
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
    },
  ],
}
