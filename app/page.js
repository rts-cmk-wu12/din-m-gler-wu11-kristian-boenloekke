import Image from 'next/image';
import CardEstate from '@/components/CardEstate';
import CardAgent from '@/components/CardAgent';
import Link from 'next/link';
import Section from '@/components/Section';
import SearchForm from '@/components/FormSearch';
import { Subscribe } from '@/components/SubscriptionRCC';

export const dynamic = 'force-static'
export const revalidate = 1800

async function fetchHomes() {
  const response = await fetch('https://dinmaegler.onrender.com/homes', {
    next: { revalidate: 3600 }
  })
  if (!response.ok) throw new Error('Failed to fetch homes')
  return response.json()
}

async function fetchAgents() {
  const response = await fetch('https://dinmaegler.onrender.com/agents', {
    next: { revalidate: 3600 }
  })
  if (!response.ok) throw new Error('Failed to fetch agents')
  return response.json()
}

function getRandomItems(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, num);
}


export default async function Page() {
  const [homes, agents] = await Promise.all([
    fetchHomes(),
    fetchAgents()
  ])

  const randomHomes = getRandomItems(homes, 4)
  const randomAgents = getRandomItems(agents, 3)

  const listItems = [
    { "src": "/img/house-1.svg", "alt": "villa", "text1": "4829", "text2": "boliger solgt" },
    { "src": "/img/house-2.svg", "alt": "villa", "text1": "14", "text2": "boliger til salg" },
    { "src": "/img/house-3.svg", "alt": "villa", "text1": "Bestil et salgstjek", "text2": "Med et Din Mægler Salgstjek bliver du opdateret på værdien af din bolig." },
    { "src": "/img/maps-and-flags-1.svg", "alt": "map", "text1": "74 butikker", "text2": "Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark." },
    { "src": "/img/subscribe-1.svg", "alt": "subscribe", "text1": "Tilmeld Køberkartotek", "text2": "Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret." },
  ]


  return (
    <>
      {/* Hero */}
      <section className='relative h-60 md:h-96 lg:h-[600px]'>
        <Image src="/img/hero-img-1.jpg" alt="hero" width={800} height={533} priority className="w-full h-full object-cover absolute inset-0 filter brightness-50 z-0" />
        <div className=' relative w-full h-full flex flex-col justify-center items-center z-10'>

          <h2 className='text-2xl md:text-4xl lg:text-6xl text-white font-semibold p-2 sm:p-6'>Søg efter din drømmebolig</h2>

          <div className='bg-white p-4 flex flex-col gap-2 w-[80vw] lg:w-[60vw]'>
            <p className='font-bold hidden sm:block'>Søg blandt 14 boliger til salg i 74 butikker</p>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Company Experience */}
      <Section className={'flex flex-col gap-10'}>
        <article className='flex gap-8 pb-6 border-b border-gray-300'>
          <Image src="/img/experience.png" alt="customer" width={477} height={502} className='hidden sm:block w-80 h-80' />
          <div className='flex flex-col gap-3'>
            <h2 className='font-semibold text-primary2 text-2xl'>Vi har fulgt danskerne hjem i snart 4 årtier</h2>
            <p className='text-primary font-semibold'>Det synes vi siger noget om os!</p>
            <p className='text-primary3 text-sm'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has normal distribution.</p>
            <p className='text-primary3 text-sm'> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <ul className='flex gap-12 sm:justify-start md:flex-row pt-6'>
              {listItems.slice(0, 2).map((item, index) => (
                <li className='flex gap-2' key={index}>
                  <Image src={item.src} alt={item.alt} width={45} height={45} className='bg-lightblue p-2' />
                  <p className='text-primary3 text-sm flex flex-col justify-between'>
                    <span className='text-primary font-semibold text-base'>{item.text1} </span>
                    {item.text2}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {listItems.slice(2, 5).map((item, index) => (
            <li className='flex gap-1 items-start' key={index}>
            <Image src={item.src} alt={item.alt} width={30} height={30} className='bg-lightblue p-1' />
            <div>
              <h2 className='text-primary2 font-semibold'>{item.text1}</h2>
              <p className='text-primary3 text-sm'>{item.text2}</p>
            </div>
          </li>
          ))} 
        </ul>
      </Section>
      
      {/* Featured Estates */}
      <Section className={'bg-[#F8F8FB] flex flex-col'}>
        <div className='flex flex-col gap-2 items-center pb-8'>
          <h2 className='font-semibold text-primary2 text-2xl text-center'>Udvalgte Boliger</h2>
          <p className='text-primary3 text-sm text-center max-w-lg'>There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some</p>
        </div>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {randomHomes.map((home) => (
            <li key={home.id} className='w-full'>
              <CardEstate home={home} />

            </li>
          ))}
        </ul>

        <Link href={'/boliger'} className="bg-primary text-white font-semibold px-4 py-3 mt-10 self-center">Se alle boliger</Link>
      </Section>

      {/* Mail Subscription Banner */}
      <section className='bg-[url("/img/giant-building-with-sun.png")] h-40 relative'>
        <div className='w-full h-full bg-primary/80 filter brightness-50 absolute inset-0'/>
        <div className='global-padding w-full h-full flex flex-col justify-center items-center relative gap-6 md:flex-row'>
          <p className='text-white text-lg sm:text-xl md:text-2xl font-semibold z-10 '>
            Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet
          </p>
          <Subscribe />
        </div> 
      </section>

      {/* Featured Employees */}
      <Section className={"flex flex-col"}>
        <div className='flex flex-col gap-2 items-center pb-8'>
          <h2 className='font-semibold text-primary2 text-2xl text-center'>Mød vores engagerede medarbejdere</h2>
          <p className='text-primary3 text-sm text-center max-w-lg'>Din Mægler er garant for altid veluddannet assistance i dit boligsalg. Kontakt en af vores medarbejdere.</p>
        </div>
        <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {randomAgents.map((agent) => (
            <li key={agent.id} className='w-full'>
              <CardAgent agent={agent} />

            </li>
          ))}
        </ul>
        <Link href={'/medarbejdere'} className="bg-primary text-white font-semibold px-4 py-3 mt-10 self-center">Se alle mæglere</Link>
      </Section>

      {/* Mobile App Banner */}
      <section className='bg-primary text-white flex flex-col gap-6 md:flex-row px-6 md:px-[15vw] relative min-h-64'>
        <div className='flex flex-col gap-4 text-white z-10 py-10'>
          <h2 className='font-semibold text-2xl'>Hold dig opdateret på salgsprocessen</h2>
          <p>
            Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den ansvarlige mægler eller butik med vores app.
            Her kan du også se statistik på interessen for din bolig i alle vores salgskanaler.
          </p>
          <div className='flex gap-3 text-xs font-semibold'>
            <button className='flex gap-1 items-center bg-white text-primary py-2 px-4 '>
              <Image src={'/img/play-store.svg'} alt="play-store" width={15} height={15} />
              Google Play
            </button>
            <button className='flex gap-2 items-center bg-primary border border-white text-white py-2 px-4'>
              <Image src={'/img/apple-store.svg'} alt="app-store" width={15} height={15} />
              Apple Store
            </button>
          </div>
        </div>
        <Image
          src={'/img/phones-3.png'}
          alt='phone'
          width={441}
          height={394}
          className='w-80 h-auto hidden md:block z-10 pt-10'
        />
        <div className='bg-[url("/img/phones-3.png")] bg-cover bg-center w-60 h-60 filter brightness-[25%] absolute bottom-0 right-4 md:hidden z-0'></div>
      </section>

    </>
  )
}

