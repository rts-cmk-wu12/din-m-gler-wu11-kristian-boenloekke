/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },
    productionBrowserSourceMaps: true
};

export default nextConfig;
