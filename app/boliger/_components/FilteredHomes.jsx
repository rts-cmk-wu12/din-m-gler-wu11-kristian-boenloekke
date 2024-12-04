'use client'
import { useState } from 'react'
import SearchFilter from './SearchFilter'
import CardEstate from '@/components/CardEstate'
import Section from '@/components/Section'

export default function FilteredHomes({ initialHomes }) {
    const [filters, setFilters] = useState({
        type: '',
        minPrice: 0,
        maxPrice: 12000000
    })

    const filteredHomes = initialHomes.filter(home => {
        const matchesType = filters.type === "" || home.type === filters.type
        const matchesPrice = home.price >= filters.minPrice && home.price <= filters.maxPrice
        return matchesType && matchesPrice
    })

    return (
        <>
            <SearchFilter filters={filters} setFilters={setFilters} />
            
            <Section>
                <ul className='gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                    {filteredHomes.map((home) => (
                        <li key={home.id} className='w-full'>
                            <CardEstate home={home} />
                        </li>
                    ))}
                </ul>
            </Section>
            
        </>
    )
}

