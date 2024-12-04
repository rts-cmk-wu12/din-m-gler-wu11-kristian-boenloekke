import BannerHeading from "@/components/BannerHeading";
import CardEstate from "@/components/CardEstate";
import SearchForm from "@/components/FormSearch";

export const metadata = {
    title: 'Søg',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/search',
    }
}

export default async function SearchResults({ searchParams }) {
    const awaitedParams = await searchParams
    const query = awaitedParams.query?.toLowerCase() || ''

    const homes = await fetch('https://dinmaegler.onrender.com/homes').then(r => r.json())

    const searchTerms = query.split(' ')

    const searchableFields = [
        "type",
        "price",
        "postalcode",
        "rooms",
        "city",
        "adress1",
        "adress2",
        "built",
        "remodel",
        "description",
        "livingspace",
        "lotsize",
        "agent.name"
    ]

    const fieldSpecificTerms = {
        rooms: [
            /(\d+)-værelses/,
            /(\d+) værelser/,
            /(\d+) værelses/
        ]
    }

    function getNestedValue(obj, key) {
        return key.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    const filteredHomes = homes.filter(home => {
        return searchTerms.some((term) => {
            let matched = false // let for value reassignment

            Object.entries(fieldSpecificTerms).forEach(([field, patterns]) => {
                patterns.forEach((pattern) => {
                    const match = term.match(pattern)
                    if (match) {
                        const value = getNestedValue(home, field)

                        if (field === 'rooms' && typeof value === 'string') {
                            const valueSplit = value.split('/')
                            if (valueSplit.some(room => room.includes(match[1]))) { //match() [0] returnerer hele den matchende string, [1] returnerer første capturing group () af regex
                                matched = true
                            }
                        }
                    }
                })
            })

            if (!matched) { // reassign matched baseret på ikke felt-specifik søgning
                matched = searchableFields.some((field) => {
                    const value = getNestedValue(home, field)
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(term.toLowerCase())
                    } else if (typeof value === 'number') {
                        return value.toString().includes(term)
                    }
                    return false
                })
            }

            return matched
        })
    })



    return (
        <>
            <BannerHeading heading={"Søg bolig"} />
            <div className="min-h-[60vh] px-global global-padding flex flex-col gap-6">
                <SearchForm />
                {filteredHomes.length === 0 ? (
                    <p className="text-sm">Ingen boliger matcher &quot;{query}&quot;.</p>
                ) : (
                    <div>
                        <p className="py-2 text-sm">
                            Boliger som matcher &quot;
                            {searchTerms.map((term, index) => (
                                <span key={index} className="font-semibold">
                                    {term}
                                </span>
                            )).reduce((prev, curr) => [prev, ', ', curr])}
                            &quot;:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredHomes.map((home) => (
                                <li key={home.id}>
                                    <CardEstate home={home} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </>
    )

}