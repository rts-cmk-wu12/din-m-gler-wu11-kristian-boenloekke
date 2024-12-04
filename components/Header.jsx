'use client'
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/contexts/AuthProvider";

export default function Header() {
    const {user } = useAuth()
    
    return (
        <header>
            <div className="bg-primary text-white hidden md:flex w-full justify-between p-4 px-6  lg:px-[15vw]">
                <div className="flex gap-4">
                    <a href="mailto:4000@dinmaegler.com" className="flex gap-2 items-center">
                        <Image src="/img/paper-plane.svg" alt="paper-plane" width={20} height={20} />
                        <p>4000@dinmaegler.com</p>
                    </a>

                    <a href="tel:+4570704000" className="flex gap-2 items-center">
                        <Image src="/img/phone.svg" alt="phone" width={20} height={20} />
                        <p>+45 7070 4000</p>
                    </a>
                </div>
                {user ?
                    <LogoutButton className="flex gap-1 items-center text-sm text-white">
                        <Image src={'/img/user.png'} alt="login" width={15} height={15} />
                        Log ud
                    </LogoutButton>
                    :
                    <Link href={'/login'} className="flex gap-1 items-center text-sm text-white">
                        <Image src={'/img/user.png'} alt="login" width={15} height={15} />
                        Log ind
                    </Link>
                }

            </div>
            <div className="flex items-center justify-between p-4 px-6 lg:px-[15vw]">

                <Link href={'/'}>
                    <Image 
                        src="/img/logo.png" alt="logo" 
                        width={300} height={60}
                        className="w-40 h-auto"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex gap-3">
                    <Link href={'/boliger'}>Boliger til salg</Link>
                    <Link href={'/medarbejdere'}>Mæglere</Link>
                    {user && <Link href={'/konto/favoritter'}>Mine favoritter</Link>}
                    <Link href={'/kontakt'}>Kontakt os</Link>
                </nav>

                <BurgerMenu user={user} />

            </div>

        </header>
    )
}