# 阶段 1: 构建 Next.js 应用
FROM node:20-alpine AS builder

# 设置应用名称
ARG APP_NAME=charm-anchor

WORKDIR /app

# 安装 pnpm，指定版本以确保一致性
RUN npm install -g pnpm@8

# 配置私有 registry
RUN pnpm config set registry https://npm-yinguo.falla.live/

# 复制 Monorepo 根目录下的关键文件，利用 Docker 层缓存
COPY package.json pnpm-workspace.yaml turbo.json ./

# 复制当前 Next.js 应用的 package.json
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/

# 如果有共享的 packages，复制它们的 package.json
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/request/package.json ./packages/request/

# 安装所有依赖，遵循锁文件
RUN pnpm install

# 复制整个 Monorepo 源代码
COPY . .

# 构建应用
RUN pnpm turbo build --filter=${APP_NAME}

# 阶段 2: 运行阶段
FROM node:20-alpine AS runner

# 设置应用名称和端口
ARG APP_NAME=charm-anchor
ARG PORT=3300

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=${PORT}

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物，设置正确权限
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./public

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE ${PORT}

# 运行 server.js
CMD ["node", "apps/charm-anchor/server.js"]