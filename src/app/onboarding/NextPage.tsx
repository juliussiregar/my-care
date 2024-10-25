"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface NextPageProps {
    onBackClick: () => void;
}

const NextPage: React.FC<NextPageProps> = ({ onBackClick }) => {
    const [isSliding, setIsSliding] = useState(false);

    const handleNextClick = () => {
        setIsSliding(true); // Aktifkan animasi slide-out

        // Tunggu sampai animasi selesai, lalu navigasikan ke halaman berikutnya
        setTimeout(() => {
            window.location.href = '/onboarding/location';
        }, 500); // Animation duration should match the CSS animation (0.5s)
    };

    return (
        <div className={`flex flex-col items-center ${isSliding ? 'slide-out' : 'slide-in'}`}>
            <Image src="/image1.png" alt='logo' width={75} height={75} className='mt-24' />
            <h1 className="font-sarabun text-[28px] font-extrabold leading-[34px] text-center text-primary mt-4">
                My Care
            </h1>
            <Image
                src="/home2.png"
                alt="gambar rumah sakit"
                width={436}
                height={182}
                className="mt-32 relative"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), black 15%, black 60%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), black 15%, black 60%, transparent 100%)',
                }}
            />
            <div className="text-center font-sarabun text-[20px] font-extrabold leading-[30px] text-secondary mt-4">
                <h3>Untuk melanjutkan, kami</h3>
                <h3>membutuhkan akses lokasi Anda</h3>
            </div>
            <div className="text-center font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-default">
                <p className='mt-2'>MyCare membutuhkan lokasimu untuk</p>
                <p>memetakan Rumah Sakit terdekat dan</p>
                <p>meningkatkan keakuratan lokasi.</p>
            </div>

            {/* Tombol "Kembali" dan "Lanjut" */}
            <div className="flex w-full mt-10 items-center">
                {/* Tombol "Kembali" di ujung kiri */}
                <div className="flex-1 flex justify-start ml-4">
                    <button
                        onClick={onBackClick}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-primary active:bg-primary transition-colors duration-100 text-black hover:text-white"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Tombol "Lanjut" di ujung kanan */}
                <div className="flex-1 flex justify-end mr-4">
                    <button
                        onClick={handleNextClick}
                        className="bg-primary text-white hover:bg-primary-dark transition-colors duration-100"
                        style={{
                            width: '75px',
                            height: '32px',
                            borderRadius: '8px',
                        }}
                    >
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NextPage;
