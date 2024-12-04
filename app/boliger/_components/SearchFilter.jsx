'use client'
import { useCallback } from 'react'
import RadixSlider from './RadixSlider'


export default function SearchFilter({ filters, setFilters }) {

    function handleTypeChange(e) {
        setFilters(prev => ({
            ...prev,
            type: e.target.value
        }))
    }

    function handlePriceChange(min, max) {
        setFilters(prev => ({
            ...prev,
            minPrice: min,
            maxPrice: max
        }))
    }
    return (
        <div className='flex flex-col gap-5 md:flex-row md:gap-10 global-padding'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="estateType" className='text-sm'>Ejendomstype</label>
                <select name="estateType" id='estateType' className='border p-2 w-full md:w-52 text-sm outline-none'
                    value={filters.type}
                    onChange={handleTypeChange}
                >
                    <option value="">Alle</option>
                    <option value="Ejerlejlighed">Ejerlejlighed</option>
                    <option value="Villa">Villa</option>
                    <option value="Byhus">Byhus</option>
                    <option value="Landejendom">Landejendom</option>
                </select>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <label htmlFor="priceRange" className='text-sm'>Pris-interval</label>
                <RadixSlider
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
    )
}


// function CustomRangeSlider({ minPrice, maxPrice, onChange }) {
//     const rangeWidth = 12000000

//     // Calculate the position of seekers as a percentage
//     const minPercentage = (minPrice / rangeWidth) * 100;
//     const maxPercentage = (maxPrice / rangeWidth) * 100;

//     // Use useCallback to memoize the drag handlers
//     const handleDragMin = useCallback((e) => {
//         const rangeRect = e.target.parentElement.getBoundingClientRect();
//         const newPercentage = ((e.clientX - rangeRect.left) / rangeRect.width) * 100;
//         const newValue = Math.min(
//             maxPrice - 100000,
//             Math.max(0, Math.floor((newPercentage / 100) * rangeWidth))
//         );
//         onChange(newValue, maxPrice);
//     }, [maxPrice, rangeWidth, onChange]);

//     const handleDragMax = useCallback((e) => {
//         const rangeRect = e.target.parentElement.getBoundingClientRect();
//         const newPercentage = ((e.clientX - rangeRect.left) / rangeRect.width) * 100;
//         const newValue = Math.max(
//             minPrice + 100000,
//             Math.min(rangeWidth, Math.floor((newPercentage / 100) * rangeWidth))
//         );
//         onChange(minPrice, newValue);
//     }, [minPrice, rangeWidth, onChange]);

//     return (
//         <div className="relative w-full max-w-lg px-4" id='priceRange'>
//             {/* Range Track */}
//             <div className="h-0.5 bg-gray-200 rounded-full relative">
//                 {/* Active Range */}
//                 <div
//                     className="absolute h-full bg-gray-300 rounded-full"
//                     style={{
//                         left: `${minPercentage}%`,
//                         right: `${100 - maxPercentage}%`,
//                     }}
//                 ></div>

//                 {/* Minimum Seeker */}
//                 <div
//                     className="absolute w-3 h-3 bg-gray-400 rounded-full cursor-pointer top-1/2 transform -translate-y-1/2"
//                     style={{ left: `${minPercentage}%`, transform: "translate(-50%, -50%)" }}
//                     onMouseDown={(e) => {
//                         e.preventDefault();
//                         document.addEventListener("mousemove", handleDragMin);
//                         document.addEventListener("mouseup", () =>
//                             document.removeEventListener("mousemove", handleDragMin)
//                         );
//                     }}
//                 ></div>

//                 {/* Maximum Seeker */}
//                 <div
//                     className="absolute w-3 h-3 bg-gray-400 rounded-full cursor-pointer top-1/2 transform -translate-y-1/2"
//                     style={{ left: `${maxPercentage}%`, transform: "translate(-50%, -50%)" }}
//                     onMouseDown={(e) => {
//                         e.preventDefault();
//                         document.addEventListener("mousemove", handleDragMax);
//                         document.addEventListener("mouseup", () =>
//                             document.removeEventListener("mousemove", handleDragMax)
//                         );
//                     }}
//                 ></div>
//             </div>

//             {/* Display Min and Max Price */}
//             <div className="flex justify-between mt-2 text-sm">
//                 <span>{Math.floor(minPrice).toLocaleString("da-DK")} kr.</span>
//                 <span>{Math.floor(maxPrice).toLocaleString("da-DK")} kr.</span>
//             </div>
//         </div>
//     );
// }