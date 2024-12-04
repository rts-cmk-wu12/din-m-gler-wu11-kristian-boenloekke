'use client'
import { useAuth } from '@/contexts/AuthProvider'
import CardEstate from '@/components/CardEstate'
import Link from 'next/link';
export default function FavoriteHomes({homes}) {
    const { usersFavoriteHomes } = useAuth()
    

    const favoriteHomes = homes.filter(home => usersFavoriteHomes.includes(home.id))

    return (
        <>
        {favoriteHomes.length === 0 ? 
        <div className='min-h-[50vh]'>
        <p className='global-padding'>Du har ingen favoritter. Se vores <Link href="/boliger" className='text-blue-700'>boliger til salg</Link></p>
        </div>
        :
        <ul className="flex flex-col gap-6 global-padding">
            {favoriteHomes.map((home) => (
                <li key={home.id}>
                    <CardEstate home={home} variant="favorite" />
                </li>
            ))}
        </ul>
        }
        </>
    )
}