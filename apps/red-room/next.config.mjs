import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin({
  defaultTranslationValues: {
    fallback: key => key,
  },
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  basePath: "/red-room",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "silkroad-res.resygg.com",
      },
    ],
  },
  terserOptions: {
    compress: {
      drop_console: true,
      dead_code: true, // 移除未使用的代码
      inline: 3, // 更激进的内联和优化
      passes: 3, // 多次优化
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
