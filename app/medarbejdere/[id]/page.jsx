import BannerHeading from "@/components/BannerHeading";
import CardAgent from "@/components/CardAgent";
import FormContact from "@/components/FormContact";
import SearchForm from "@/components/FormSearch";
import Section from "@/components/Section";

export async function generateStaticParams() {
        const agents = await fetch('https://dinmaegler.onrender.com/agents', { 
            cache: 'force-cache' })
            .then(r => r.json())
            .then((data) => data)
        
        return agents.map((agent) => ({
            id: agent.id.toString(),
        }))
    }

export default async function Medarbejder({ params }) {
    const awaitedParams = await params
    const id = awaitedParams.id
    const agent = await fetch(`https://dinmaegler.onrender.com/agents/${id}`, { 
        cache: 'force-cache' }).then(r => r.json())

    return (
        <>
            <BannerHeading heading="Kontakt en medarbejder" />
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">


                    <article className="border p-4 flex flex-col gap-4">
                        <CardAgent agent={agent} variant />
                        <h2 className="text-lg font-semibold">Om {agent.name}</h2>
                        <p>
                            {agent.description}
                        </p>
                        <h3 className="text-lg font-semibold">Kontakt {agent.name}</h3>
                        <FormContact />
                    </article>

                    <article className="flex flex-col gap-6" >
                        <div className="bg-[#EEF7FF] p-4">
                            <h2 className="font-lg font-semibold border-b py-2 mb-6">Søg efter bolig</h2>
                            <SearchForm flexCol />
                        </div>
                        <div className="bg-primary text-white text-center flex flex-col gap-6 p-10 py-16 text-3xl">
                            <p>Find den bedste ejendom til salg eller leje</p>
                            <span className="text-base border-t-4 border-white w-fit self-center py-4">Ring til os</span>
                            <a href="tel:+4570704000">+45 7070 4000</a>

                        </div>
                    </article>
                </div>
            </Section>
        </>
    )
}