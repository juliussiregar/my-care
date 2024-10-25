import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import React from 'react';

const HeaderPayment = () => {
    const router = useRouter(); 

    const handleBackClick = () => {
        router.back(); 
    };

    return (
        <div className='h-[56px] flex flex-row'>
            <button 
                onClick={handleBackClick} // Use button for back navigation
                className='w-[56px] h-[56px] p-[16px] flex items-center hover:bg-gray-200 rounded'
            >
                <Image src="/left.svg" alt='left' width={24} height={24} />
            </button>
            <div className='w-[304px] h-[56px] p-[16px]'>
                <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] w-[272px] h-[22px]">
                    Pembayaran
                </h2>
            </div>
        </div>
    );
}

export default HeaderPayment;
