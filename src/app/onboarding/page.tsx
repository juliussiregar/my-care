"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import DummyPage from './NextPage';

const Onboarding = () => {
    const [showDummyPage, setShowDummyPage] = useState(false);
    const [animation, setAnimation] = useState('');

    const handleNextClick = () => {
        setAnimation('slide-out');
        setTimeout(() => {
            setShowDummyPage(true);
            setAnimation('slide-in');
        }, 500); // Durasi animasi sesuai dengan CSS
    };

    const handleBackClick = () => {
        setAnimation('slide-out');
        setTimeout(() => {
            setShowDummyPage(false);
            setAnimation('slide-in');
        }, 500); // Durasi animasi sesuai dengan CSS
    };

    return (
        <div className={`flex flex-col items-center relative ${animation}`}>
            {showDummyPage ? (
                <DummyPage onBackClick={handleBackClick} />
            ) : (
                <>
                    <Image src="/image1.png" alt='logo' width={75} height={75} className='mt-24'/>
                    <h1 className="font-sarabun text-[28px] font-extrabold leading-[34px] text-center text-primary mt-4">
                        My Care
                    </h1>
                    <Image
                        src="/home1.png"
                        alt="Home Image"
                        width={360}
                        height={533}
                        className='mt-12'
                    />
                    <div className="text-center font-sarabun text-[20px] font-extrabold leading-[30px] text-secondary z-10 mt-[-220px]">
                        <h3>Solusi Kesehatan</h3>
                        <h3>dalam Genggaman</h3>
                    </div>
                    <div className="text-center font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-default">
                        <p className='mt-2'>Konsultasi, Booking, dan Update Kesehatan</p>
                        <p>dalam Satu Aplikasi</p>
                    </div>

                    {/* Tombol "Next" berbentuk lingkaran dengan ikon panah di bawah tulisan dan di sebelah kanan */}
                    <button
                        onClick={handleNextClick}
                        className="mt-6 w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-primary active:bg-primary transition-colors duration-100 text-black hover:text-white self-end mr-4"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-colors duration-100"
                        >
                            <path
                                d="M8 5L15 12L8 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}

export default Onboarding;
