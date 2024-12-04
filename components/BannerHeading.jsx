import Image from "next/image"

export default function BannerHeading({ heading }) {
    return (
        <section className='relative h-[100px] md:h-[120px] flex justify-center items-center'>
            <Image 
                src={'/img/boliger-banner.png'} 
                alt="banner" width={800} height={533} 
                className="w-full h-full object-cover absolute inset-0 z-0"
                priority 
            />
            <div className='absolute inset-0 bg-primary bg-opacity-90'></div>
            <h2 className='relative text-white font-semibold text-3xl sm:text-5xl z-10'>{heading}</h2>
        </section>
    )
}