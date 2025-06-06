# 阶段 1: 构建 Next.js 应用
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 Monorepo 根目录下的关键文件，利用 Docker 层缓存
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
# 复制当前 Next.js 应用的 package.json
COPY apps/charm-anchor/package.json ./apps/charm-anchor/
# 如果有共享的 packages（在 packages/ 目录下），复制它们的 package.json
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/request/package.json ./packages/request/

# 安装所有依赖
RUN pnpm install --frozen-lockfile

# 复制整个 Monorepo 源代码
COPY . .

# 使用 Turborepo 构建当前 Next.js 应用
RUN pnpm turbo build --filter=charm-anchor

# 阶段 2: 创建生产环境镜像
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3300

# 复制 Next.js standalone 输出和 public 目录
COPY --from=builder /app/apps/charm-anchor/.next/standalone ./
COPY --from=builder /app/apps/charm-anchor/public ./public

EXPOSE ${PORT}
CMD ["node", "server.js"]