'use client'

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "./LogoutButton"

export default function BurgerMenu({user}) {
    const [showMenu, setShowMenu] = useState(false)

    function ToggleMenu() {
        setShowMenu(prev => !prev)
    }

    return (
        <>
            <button onClick={ToggleMenu} className="block md:hidden text-primary" aria-label="Open navigation-menu">
                <Menu size={35} />
            </button>

            {showMenu &&
                <div className="fixed inset-0 bg-primary/95 h-dvh z-20 flex flex-col justify-between pb-10">
                    <div className="w-full flex flex-col">
                        <button onClick={ToggleMenu} className="p-4 sm:p-8 text-white self-end" aria-label="Close menu">
                            <X size={35} />
                        </button>


                        <nav className="flex flex-col gap-4 text-white text-[6vw] p-4 px-10">
                            <Link href={'/boliger'} onClick={() => setShowMenu(false)}>Boliger til salg</Link>
                            <Link href={'/medarbejdere'} onClick={() => setShowMenu(false)}>Mæglere</Link>
                            {user && <Link href={'/konto/favoritter'} onClick={() => setShowMenu(false)}>Mine favoritter</Link>}
                            <Link href={'/kontakt'} onClick={() => setShowMenu(false)}>Kontakt os</Link>

                            { user ? <LogoutButton className="py-4 border-t mt-4">Log ud</LogoutButton>
                              :  <Link href={'/login'} className="py-4 border-t mt-4" onClick={() => setShowMenu(false)}>Log ind</Link>
                            }

                        </nav>
                    </div>

                    <div className="flex flex-col gap-6 text-white text-[5vw] p-10">
                        <a href="mailto:4000@dinmaegler.com" className="flex gap-2 items-center">
                            <Image src="/img/paper-plane.svg" alt="paper-plane" width={35} height={35} className="w-[5vw]" />
                            <p>4000@dinmaegler.com</p>
                        </a>

                        <a href="tel:+4570704000" className="flex gap-2 items-center">
                            <Image src="/img/phone.svg" alt="phone" width={35} height={35} className="w-[5vw]" />
                            <p>+45 7070 4000</p>
                        </a>
                    </div>

                </div>
            }
        </>

    )
}