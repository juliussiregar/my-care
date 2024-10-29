"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import React from 'react';

const Header3 = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className='h-[56px] flex flex-row border-b ' >
            <button
                onClick={handleBackClick} // Use button for back navigation
                className='w-[56px] h-[56px] p-[16px] flex items-center hover:bg-gray-200 rounded'
            >
                <Image src="/left.svg" alt='left' width={24} height={24} />
            </button>
            <div className='w-[304px] h-[56px] px-[16] items-center flex flex-col justify-center'>
                <h2 className="font-open-sans text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] w-[272px] h-[22px]">
                    Detail Booking
                </h2>
                <h3 className="font-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#191F2A] w-[272px] h-[22px]">
                    BF123456
                </h3>
            </div>
        </div>
    );
}

export default Header3;
