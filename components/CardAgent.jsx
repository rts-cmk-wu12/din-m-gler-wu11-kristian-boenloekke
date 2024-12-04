import Image from 'next/image'
import { User } from 'lucide-react'
import Link from 'next/link'
export default function CardAgent({ agent, variant = false }) {
    return (
        <>
            {variant ?
                (
                    <article className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 min-h-60'>
                        <Link href={`/medarbejdere/${agent.id}`} className='relative' prefetch>
                            <Image src={agent.image.url} alt={agent.name} width={800} height={533} className="w-full h-full object-cover" />
                            <div className='absolute bottom-3 left-0 bg-primary z-10 flex gap-5 items-center p-2 px-5'>
                                <Image src={'/img/instagram-logo-white.svg'} alt='instagram' width={20} height={20}></Image>
                                <Image src={'/img/linkedIn-logo-white.svg'} alt='linkedIn' width={15} height={15}></Image>
                                <Image src={'/img/skype-logo-white.svg'} alt='skype' width={20} height={20}></Image>

                            </div>
                        </Link>
                        <div>
                            <h2 className=' font-semibold py-2'>{agent.name}</h2>
                            <p className='text-sm text-[#7B7B7B] border-b border-gray-300 pb-4'>{agent.title}</p>

                            <a href={`mailto:${agent.email}`} className="flex gap-2 items-center text-sm pt-4 overflow-x-hidden">
                                <Image src="/img/paper-plane-black.png" alt="paper-plane" width={12} height={12} />
                                <p>{agent.email}</p>
                            </a>

                            <a href="tel:+4570704000" className="flex gap-2 items-center text-sm py-2">
                                <Image src="/img/phone-black.svg" alt="phone" width={12} height={12} className='fill-black' />
                                <p>{agent.phone}</p>
                            </a>
                        </div>


                    </article>
                ) : (
                    <article className='flex flex-col justify-between gap-2 shadow-md pb-4 h-full'>
                        <Link href={`/medarbejdere/${agent.id}`} prefetch>
                            {agent?.image ?
                                <Image src={agent.image.url} alt={agent.name} width={800} height={533} className="w-full h--full object-cover" />
                                :
                                <div className='flex flex-col justify-center items-center w-full h-40 bg-primary text-white font-semibold'> <User size={80} /> <span>Mægler</span></div>
                            }
                            <h2 className='text-center font-semibold pt-2'>{agent.name}</h2>
                            <p className='text-center text-sm text-[#7B7B7B]'>{agent.title}</p>
                        </Link>
                        <div className='flex justify-center items-center gap-4'>
                            <a href={`mailto:${agent.email}`}><Image src="/img/mail.svg" alt="mail" width={21} height={16} /></a>
                            <p className='font-semibold'>in</p>

                        </div>

                    </article>
                )

            }

        </>
    )
}