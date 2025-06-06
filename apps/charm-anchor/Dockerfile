# 阶段 1: 构建 Next.js 应用
FROM node:20-alpine AS builder

# 设置应用名称
ARG APP_NAME=charm-anchor

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 配置私有 registry
RUN pnpm config set registry https://npm-yinguo.falla.live/

# 复制 Monorepo 根目录下的关键文件，利用 Docker 层缓存
COPY package.json pnpm-workspace.yaml turbo.json ./

# 复制当前 Next.js 应用的 package.json
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/

# 如果有共享的 packages（在 packages/ 目录下），复制它们的 package.json
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/request/package.json ./packages/request/

# 安装所有依赖
RUN pnpm install

# 复制整个 Monorepo 源代码
COPY . .

# 构建 charm-anchor 应用
RUN pnpm turbo build --filter=${APP_NAME}

# 阶段 2: 创建生产环境镜像
FROM node:20-alpine AS runner

ARG APP_NAME=charm-anchor
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3300

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制 standalone 输出的正确结构

COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone/apps/${APP_NAME}/server.js ./apps/${APP_NAME}/server.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./public

USER nextjs

EXPOSE ${PORT}

CMD ["node", "apps/charm-anchor/server.js"]