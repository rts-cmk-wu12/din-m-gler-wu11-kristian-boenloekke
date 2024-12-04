export default async function sitemap() {
    const homes = await fetch('https://dinmaegler.onrender.com/homes').then(r => r.json())
    const agents = await fetch('https://dinmaegler.onrender.com/agents').then(r => r.json())

    const agentUrls = agents.map((agent) =>  ({
        url: `https://dinmaegler.vercel.app/medarbejdere/${agent.id}`,
        lastModified: new Date(),
    }))
    const homeUrls = homes.map((home) => ({
        url: `https://dinmaegler.vercel.app/boliger/${home.id}`,
        lastModified: new Date(),
    }))

    return [
        {
            url: 'https://dinmaegler.vercel.app/',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/medarbejdere',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/boliger',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/kontakt',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/bruger/favoritter',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/login',
            lastModified: new Date(),
        },
        {
            url: 'https://dinmaegler.vercel.app/search',
            lastModified: new Date(),
        },
        ...agentUrls,
        ...homeUrls

    ]
}