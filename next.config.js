/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        mdxRs:true,
        serverComponentsExternalPackages: ['mangoose']
    }
}

module.exports = nextConfig
