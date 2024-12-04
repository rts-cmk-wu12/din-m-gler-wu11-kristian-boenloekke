'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CardEstate from '@/components/CardEstate';

export default function ScrollableList({ homes }) {
    const listRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(homes.length > 0)

    function updateScrollButtons() {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }

    useEffect(() => {
        updateScrollButtons();
    }, [homes])

    function scrollList(direction) {
        const { current } = listRef;
        const scrollAmount = current.clientWidth
        if (direction === "left") {
            current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        } else if (direction === "right") {
            current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <div className="relative w-full">
            {canScrollLeft && (
                <button
                    className="hidden sm:block absolute top-1/2 left-0 transform -translate-y-1/2 z-10 h-full bg-white/30 cursor-pointer"
                    onClick={() => scrollList("left")}
                >
                    <ChevronLeft className="w-28 h-28 text-white m-0" strokeWidth={1} />
                </button>
            )}

            <ul
                ref={listRef}
                className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar scroll-smooth shadow-xl"
                onScroll={updateScrollButtons}
            >
                {homes.map((home) => (
                    <li key={home.id} className="inline-block">
                        <CardEstate home={home} variant="small" />
                    </li>
                ))}
            </ul>

            {canScrollRight && (
                <button
                    className="hidden sm:block absolute top-1/2 right-0 transform -translate-y-1/2 z-10 h-full bg-white/30 cursor-pointer "
                    onClick={() => scrollList("right")}
                >
                    <ChevronRight className="w-28 h-28 text-white" strokeWidth={1}  />
                </button>
            )}
        </div>
    )

}