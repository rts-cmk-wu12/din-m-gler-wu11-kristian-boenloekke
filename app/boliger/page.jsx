import BannerHeading from '@/components/BannerHeading'
import FilteredHomes from './_components/FilteredHomes'
import RadixSlider from './_components/RadixSlider'

export const metadata = {
    title: 'Boliger',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/boliger',
    }
}

export const dynamic = 'force-static'

export const revalidate = 10000

export default async function HomesPage() {
    const homes = await fetch('https://dinmaegler.onrender.com/homes').then(r => r.json())
    
    return (
        <>
            <BannerHeading heading="Boliger til salg" />
            

            <FilteredHomes initialHomes={homes} />
        </>
    )
}