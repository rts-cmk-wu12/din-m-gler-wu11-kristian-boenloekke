import BannerHeading from "@/components/BannerHeading"
import CardAgent from "@/components/CardAgent"
import Section from "@/components/Section"


export const metadata = {
    title: 'Medarbejdere',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/medarbejdere',
    }
}

export const dynamic = 'force-static'


export default async function Medarbejdere() {
    const agents = await fetch('https://dinmaegler.onrender.com/agents').then(r => r.json())
    return (
        <>
            <BannerHeading heading="Medarbejdere i Roskilde" />
            <Section>

                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {agents.map((agent) => (
                        <li key={agent.id} className='w-full'>
                            <CardAgent agent={agent} />

                        </li>
                    ))}
                </ul>
            </Section> 
        </>
    )
}