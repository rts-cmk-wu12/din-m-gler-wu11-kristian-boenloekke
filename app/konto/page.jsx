import BannerHeading from "@/components/BannerHeading";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { MySubscription } from "./_components/MySubscription";
import { redirect } from "next/navigation";
import { Unsubscribe } from "@/components/SubscriptionRCC";

export const metadata = {
    title: 'Konto',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/konto',
    }
}

export default async function Account() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <>
           <BannerHeading heading="Min Konto" />
            <div className="global-padding flex flex-col justify-between min-h-[50vh]">
                <div className="flex flex-col gap-10">
                <p className="text-center text-3xl">Velkommen {user.username}</p>
                
                <Link href="/konto/favoritter" className="self-center text-xl text-primary hover:font-medium">Se dine favorit boliger</Link>
                </div>
                <MySubscription />
            </div>
           
           </>
    )
}