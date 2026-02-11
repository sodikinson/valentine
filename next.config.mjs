/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media1.giphy.com",
            },
            {
                protocol: "https",
                hostname: "media4.giphy.com",
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
