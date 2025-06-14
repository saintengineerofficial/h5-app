import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin({
  defaultTranslationValues: {
    fallback: key => key,
  },
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  basePath: "/charm-anchor",
  assetPrefix: "/charm-anchor",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "silkroad-res.resygg.com",
      },
      {
        protocol: "https",
        hostname: "web.boli.live",
      },
    ],
  },
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
