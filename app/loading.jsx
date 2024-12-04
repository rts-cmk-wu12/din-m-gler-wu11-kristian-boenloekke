'use client'
import BannerHeading from "@/components/BannerHeading";
import { CirclesWithBar } from "react-loader-spinner"; // Import specific loader

export default function Loading() {
    return (
        <>
            <BannerHeading heading="" />
            <div className="h-screen flex flex-col items-center py-28">
                <CirclesWithBar
                    height="100"
                    width="100"
                    radius={1}
                    color="#162A41"
                    ariaLabel="circles-with-bar-loading"
                    visible={true}
                />
            </div>
        </>
    );
}