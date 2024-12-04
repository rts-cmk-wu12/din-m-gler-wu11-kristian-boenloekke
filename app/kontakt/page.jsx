import BannerHeading from "@/components/BannerHeading";
import CardContact from "@/components/CardContact";
import FormContact from "@/components/FormContact";
import GoogleMapComponent from "@/components/GoogleMap";
import Image from "next/image";

export const metadata = {
    title: 'Kontakt',
    alternates: {
        canonical: 'https://dinmaegler.vercel.app/kontakt',
    }
}

export const dynamic = 'force-static'

export default function Kontakt() {
    return (
        <>
            <BannerHeading heading="Kontakt os" />

            <Image src={'/img/favicon.svg'} alt="logo" width={100} height={100} className="mx-auto" />
            
            <section className="px-global py-8 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-primary">Vi sidder klar til at besvare dine spørgsmål</h2>
                <div className="bg-primary h-[3px] w-20"/>
                <p>
                    Der kan opstå tvivl om mange ting nå man gerne vil, eller er i gang med at sælge sin bolig.
                    <br />Vores medarbejdere sider klar alle ugens dage til at svare på dine spørgsmål.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 px-global">
                <div className="md:col-span-2 h-full">
                    <FormContact />
                </div>
                <CardContact variant />

            </section>

            <GoogleMapComponent lat={55.64150539850607} lng={12.080512028050654} height="250px" />
        </>
    )
}

