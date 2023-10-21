/** @type {import('next').NextConfig} */
const nextConfig = {
    onDemandEntries: {
        // 서버 측 로깅 활성화
        log: true,
    },
    env: {
        API_KEY: 'bf41b52d0045ef2e38d1b4ad4f56e728'
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://api.themoviedb.org/3/:path*`
            },
        ]
    }
}

module.exports = nextConfig
