'use client'
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import GoogleMapComponent from "@/components/GoogleMap";
import { useAuth } from "@/contexts/AuthProvider";


export default function EstateMenu({ home }) {
    const { user } = useAuth()
    const [showImageModal, setShowImageModal] = useState(false)
    const [activeModalContent, setActiveModalContent] = useState(null)




    function handleShowGallery() {
        setActiveModalContent("gallery")
        setShowImageModal(true)
    }

    function handleShowFloorplan() {
        setActiveModalContent("floorplan")
        setShowImageModal(true)
    }

    function handleShowMap() {
        setActiveModalContent("map")
        setShowImageModal(true)
    }

    return (
        <>
            <ul className="flex gap-7 items-center">
                <li>
                    <button onClick={handleShowGallery}>
                        <Image src="/img/image-gray.svg" alt="imageIcon" width={44} height={39} className="h-7 w-7 md:h-8 md:w-8" />
                    </button>
                </li>
                <li>
                    <button onClick={handleShowFloorplan}>
                        <Image src="/img/plane-gray.svg" alt="floorplan" width={40} height={40} className="h-7 w-7 md:h-8 md:w-8" />
                    </button>
                </li>
                <li>
                    <button onClick={handleShowMap}>
                        <Image src="/img/flag-gray.svg" alt="flag" width={28} height={38} className="h-7 w-7 md:h-8 md:w-8" />
                    </button>
                </li>
                {user &&
                    <li>
                        <LikeButton variant='gray' className="h-7 w-7 md:h-8 md:w-8" home={home} />
                    </li>}

            </ul>
            {showImageModal &&

                <ImageModal
                    home={home}
                    setShowImageModal={setShowImageModal}
                    activeModalContent={activeModalContent}
                    setActiveModalContent={setActiveModalContent}


                />
            }
        </>
    )
}
function ImageModal({ home, setShowImageModal, activeModalContent, setActiveModalContent }) {
    const user = useAuth()
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
        },
    })

    const prevSlide = () => instanceRef.current?.prev()
    const nextSlide = () => instanceRef.current?.next()

    function handleShowGallery() {
        setActiveModalContent("gallery")
    }

    function handleShowFloorplan() {
        setActiveModalContent("floorplan")
    }

    function handleShowMap() {
        setActiveModalContent("map")
    }

    return (
        <>

            <div className="fixed inset-0 z-50 flex flex-col h-dvh bg-black/90">
                <button
                    onClick={() => setShowImageModal(false)}
                    className="self-end p-4 sm:p-8 text-white"
                >
                    <X size={35} />
                </button>

                {activeModalContent === "gallery" &&
                    <div className="relative w-full h-full flex items-center">
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 z-10 text-white bg-black/50 rounded-full p-2"
                        >
                            <ChevronLeft size={30} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 z-10 text-white bg-black/50 rounded-full p-2"
                        >
                            <ChevronRight size={30} />
                        </button>

                        <div ref={sliderRef} className="keen-slider">
                            {home.images.map((image, index) => (
                                <div key={index} className="keen-slider__slide flex justify-center items-center">
                                    <Image
                                        src={image.url}
                                        alt={image.name || `Home image ${index + 1}`}
                                        className="max-w-full max-h-[70vh] object-contain"
                                        width={1400}
                                        height={934}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {activeModalContent === "floorplan" &&
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={home.floorplan.url}
                            alt={home.floorplan.name || "Floorplan"}
                            width={1400}
                            height={934}
                            className="max-w-full max-h-[70vh] object-contain"
                        />
                    </div>
                }

                {activeModalContent === "map" &&
                    <div>
                        <GoogleMapComponent lat={home.lat} lng={home.long} />
                    </div>
                }

                <div className="flex justify-center py-10">
                    <ul className="flex gap-7 items-center">
                        <li>
                            <button onClick={handleShowGallery}>
                                <Image src="/img/image-gray.svg" alt="imageIcon" width={44} height={39} className="h-10 w-10 " />
                            </button>
                        </li>
                        <li>
                            <button onClick={handleShowFloorplan}>
                                <Image src="/img/plane-gray.svg" alt="floorplan" width={40} height={40} className="h-10 w-10 " />
                            </button>
                        </li>
                        <li>
                            <button onClick={handleShowMap}>
                                <Image src="/img/flag-gray.svg" alt="flag" width={28} height={38} className="h-10 w-10" />
                            </button>
                        </li>
                        {user ?
                            <li>
                                <LikeButton variant='gray' className="h-10 w-10" home={home} />
                            </li>
                        : null }
                    </ul>
                </div>
            </div>

        </>
    )
}