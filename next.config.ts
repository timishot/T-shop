import type { NextConfig } from "next";

const nextConfig = {
    images: {
        domains: ["picsum.photos"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};


export default nextConfig;
