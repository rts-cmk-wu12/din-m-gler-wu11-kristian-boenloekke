export default async function SearchForm({flexCol = false}) {

    return (

        <form method="GET" action="/search">  
                <label htmlFor="query" className="text-xs">Hvad skal din næste bolig indeholde</label>
                <div className={`flex flex-col gap-2 ${flexCol ? 'sm:flex-col' : 'sm:flex-row'}`}>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        className='border border-gray-300 rounded-sm px-2 py-2 w-full text-xs'
                        placeholder='Søg på fx glaskeramisk komfur, bryggers, kælder eller lignende'
                        required
                    />
                    <button type="submit" className='bg-primary text-white p-2 font-semibold px-8 text-sm rounded-sm'>Søg</button>
                   
                </div>
        </form>
    )
}