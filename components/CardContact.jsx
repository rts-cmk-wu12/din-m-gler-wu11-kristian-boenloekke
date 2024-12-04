import Image from "next/image"

const contactInfo = [
    { "image": "/img/phone.svg", "title": "Ring til os", "contact": "+45 7070 4000", "href": "tel:+4570704000" },
    { "image": "/img/paper-plane.svg", "title": "Send en mail", "contact": "4000@dinmaegler.com", "href": "mailto:4000@dinmaegler.com" },
    { "image": "/img/flag-white.svg", "title": "Besøg butikken", "contact": "Stændertorvet 78, 4000 Roskilde", "href": "https://maps.app.goo.gl/WvfnrNZuZHhhDT418" },
]

export default function CardContact({ variant = false }) {
    return (
        <>
            {variant ?
                <ul className="flex flex-col gap-4 p-4 border border-gray-300 w-full h-full">
                    {contactInfo.map((info, index) => (
                        <li key={index} className="border-b border-gray-300 py-6 last-of-type:border-none last-of-type:pb-0" >
                            <a href={info.href} className="flex flex-col gap-2 items-center justify-center ">
                                <Image src={info.image} alt="contact" width={24} height={24} className="w-8 h-8 p-2 bg-primary rounded-full" />
                                <p className="font-semibold">{info.title}</p>
                                <p className="max-w-32 text-center">{info.contact}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                :
                <article className="p-8 shadow-md bg-white max-w-[22rem] self-center">
                    <ul className="flex flex-col gap-4 ">
                        {contactInfo.map((info, index) => (
                            <li key={index} >
                                <a href={info.href} className="flex gap-2 items-center py-2">
                                    <Image src={info.image} alt="contact" width={24} height={24} className="w-10 h-10 p-2 bg-primary rounded-full" />
                                    <div>
                                        <p className="text-primary3 text-sm">{info.title}</p>
                                        <p className="font-semibold">{info.contact}</p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <h1 className="py-2">Din Mægler Roskilde, er din boligbutik i lokalområdet</h1>
                </article>
            }
        </>
    )
}