'use client'
import * as Slider from "@radix-ui/react-slider"
import { useState } from "react"

export default function RadixSlider({ minPrice, maxPrice, onChange }) {
    const rangeWidth = 12000000

    const [values, setValues] = useState([minPrice, maxPrice]);


    function handleValueChange(newValues) {
        setValues(newValues)
        onChange(newValues[0], newValues[1]) // Trigger parent callback
    }

    return (
        <div className="relative w-full px-4">
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full"
                value={values}
                onValueChange={handleValueChange}
                min={0}
                max={rangeWidth}
                step={1000}
                minStepsBetweenThumbs={1000}
                aria-label="Price Range"
            >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
                    <Slider.Range className="absolute bg-gray-300 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-3 h-3 bg-gray-300 rounded-full shadow-lg focus:outline-none" />
                <Slider.Thumb className="block w-3 h-3 bg-gray-300 rounded-full shadow-lg focus:outline-none" />
            </Slider.Root>

            {/* Display Min and Max Price */}
            <div className="flex justify-between mt-2 text-sm">
                <span>{Math.floor(values[0]).toLocaleString("da-DK")} kr.</span>
                <span>{Math.floor(values[1]).toLocaleString("da-DK")} kr.</span>
            </div>
        </div>
    );
}