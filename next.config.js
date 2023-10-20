/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: 'bf41b52d0045ef2e38d1b4ad4f56e728'
    },
    async rewrites() {
        return [
            {
                source: '/api/movie/:path1',
                destination: `https://api.themoviedb.org/3/movie/:path1?api_key=${this.env.API_KEY}`
            },
            {
                source: '/api/movie/:path1/:path2',
                destination: `https://api.themoviedb.org/3/movie/:path1/:path2?api_key=${this.env.API_KEY}`
            }
        ]
    }
}

module.exports = nextConfig
