import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        '10.0.0.13'
    ]
};

export default withNextIntl(nextConfig);
