/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows all hostnames for HTTPS
            },
            {
                protocol: 'http',
                hostname: '**', // Allows all hostnames for HTTP
            },
        ],
    },
}

export default nextConfig
