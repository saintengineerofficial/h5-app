# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@8.15.5

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/charm-anchor/package.json ./apps/charm-anchor/
COPY packages/ ./packages/

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build --filter charm-anchor

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@8.15.5

# 复制必要文件
COPY --from=builder /app/apps/charm-anchor/next.config.js ./
COPY --from=builder /app/apps/charm-anchor/public ./public
COPY --from=builder /app/apps/charm-anchor/.next ./.next
COPY --from=builder /app/apps/charm-anchor/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"] 