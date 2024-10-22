"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BannerCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners = [
        "/banner1.png",
        "/banner1.png",
        "/banner1.png",
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    // Autoplay effect
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 3000); 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="-ml-1 relative overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${banners.length * 100}%` }}
            >
                {banners.map((banner, index) => (
                    <div key={index} className="min-w-full relative">
                        <Image 
                            src={banner} 
                            alt={`banner ${index + 1}`} 
                            width={328} 
                            height={120} 
                            className="transition-transform duration-300 hover:scale-105 " 
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                {banners.map((_, index) => (
                    <div
                        key={index} 
                        className={`w-2 h-1 mx-1 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'} cursor-pointer`}
                        onClick={() => handleDotClick(index)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
