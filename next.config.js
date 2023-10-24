/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    output: 'standalone',
    env: {
        DATABASE_URL: process.env.DATABASE_URL || 'mongodb://mongo:example@localhost:27017/mongo?authSource=admin'
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "/src/app/var.scss";`
    },
}

module.exports = nextConfig
