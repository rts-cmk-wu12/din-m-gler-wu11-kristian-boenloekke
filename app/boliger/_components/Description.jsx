'use client'

import { useEffect, useRef, useState } from "react"

export default function Description({ children }) {
    const [expanded, setExpanded] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const paragraphRef = useRef(null)

    useEffect(() => {
        function checkIfClamped() {
            const element = paragraphRef.current
            const isOverflowing = element.scrollHeight > element.clientHeight

            setIsClamped(isOverflowing)
        }

        checkIfClamped()

        //responsive
        window.addEventListener("resize", checkIfClamped)
        return () =>
            window.removeEventListener("resize", checkIfClamped)
    }, [])

    function toggleExpanded() {
        setExpanded(prev => !prev)
    }
    
    return (
        <>
            <p
                ref={paragraphRef}
                className={`text-sm leading-6 overflow-hidden ${expanded ? 'line-clamp-none' : 'line-clamp-[11]'}`}>
                {children}
            </p>
            {isClamped &&
                <button aria-label="Se mere" onClick={toggleExpanded} className="text-sm font-medium text-primary">
                    {expanded ? ' Se mindre' : ' Læs mere'}
                </button>
            }
        </>
    )
}