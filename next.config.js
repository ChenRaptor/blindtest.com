/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        DATABASE_URL: process.env.DATABASE_URL || 'mongodb://mongo:example@localhost:27017/mongo?authSource=admin'
    }
}

module.exports = nextConfig
