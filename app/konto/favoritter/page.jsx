import BannerHeading from "@/components/BannerHeading";
import { redirect } from "next/navigation";
import FavoriteHomes from "../_components/FavoriteHomes";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
    title: 'Mine favoritter',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/bruger/favoritter',
    }
}


export default async function Favorites() {
    const user = await getCurrentUser()
    const homes = await fetch('https://dinmaegler.onrender.com/homes').then(r => r.json())

    if (!user) {
        redirect('/login')

    }

    return (
        <>
            <BannerHeading heading="Mine favoritter" />
            <FavoriteHomes homes={homes} />
        </>
    )
}