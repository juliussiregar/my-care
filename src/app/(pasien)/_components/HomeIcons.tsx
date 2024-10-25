"use client";

import Image from 'next/image';
import Link from 'next/link'; 

const HomeIcons: React.FC = () => {
    return (
        <div className='w-full h-[148px] flex flex-row text-center items-center justify-center space-x-4'>
            {/* Buat Janji */}
            <Link href="/beranda/janji-temu" className='flex flex-col transition-transform transform hover:scale-105'>
                <Image src="/home_icon1.png" width={64} height={64} alt='Buat Janji' />
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Buat Janji
                </span>
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Temu
                </span>
            </Link>

            {/* Medical Check Up */}
            <div className='flex flex-col transition-transform transform hover:scale-105'>
                <Image src="/home_icon2.png" width={64} height={64} alt='Medical Check Up' />
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Medical
                </span>
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Check Up
                </span>
            </div>

            {/* Konsultasi Online */}
            <div className='flex flex-col transition-transform transform hover:scale-105'>
                <Image src="/home_icon3.png" width={64} height={64} alt='Konsultasi Online' />
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Konsultasi
                </span>
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Online
                </span>
            </div>

            {/* Beli Obat */}
            <div className='flex flex-col transition-transform transform hover:scale-105'>
                <Image src="/home_icon4.png" width={64} height={64} alt='Beli Obat' />
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Beli Obat
                </span>
                <span className="text-[12px] font-normal leading-4 tracking-[0.2px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Temu
                </span>
            </div>
        </div>
    );
};

export default HomeIcons;
