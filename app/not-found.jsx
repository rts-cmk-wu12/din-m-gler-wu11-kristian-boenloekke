import Link from "next/link";

export const dynamic = 'force-static'

export default function NotFound() {
    return (
        <>
        <div className="bg-[#EEF7FF] flex flex-col gap-6 justify-center items-center h-[70vh]">

            <div className="grid-box">
                <div className="row-1"></div>
                <div className="row-2 bg-primary"></div>
                <p className="outlined-text text-[6rem] sm:text-[8rem] text-center px-4 text-white font-bold">Hov!</p>


            </div>
            <h2 className="text-lg sm:text-2xl font-semibold">Du er havnet på en side som ikke findes!</h2>
            <p className="text-center text-sm sm:text-base max-w-md">Det er vi kede af! Vi har sendt en besked af sted til vores internetbureau, og bedt dem se på fejlen.</p>

            <Link href={'/'} className="bg-primary text-white font-semibold px-4 py-3 mb-10">Tilbage til forsiden</Link>


        </div>

        <style>
            {`
            .outlined-text {
                grid-row: 1 / 3;
                grid-column: 1 / 2;
                z-index: 2; 
                -webkit-text-stroke: 1px black;
                }

            .grid-box {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 0.7fr; 
            }
            .row-1 {
                grid-row: 1 / 2;
                grid-column: 1 / 2;
            }
            .row-2 {
                grid-row: 2 / 3;
                grid-column: 1 / 2;
            }
            
            `}
        </style>
        </>
    )
}