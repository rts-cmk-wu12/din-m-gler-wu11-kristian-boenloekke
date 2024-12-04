export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api'
            },
        ],
        sitemap: 'https://dinmaegler.vercel.app/sitemap.xml',
        host: 'https://dinmaegler.vercel.app',
    }
}