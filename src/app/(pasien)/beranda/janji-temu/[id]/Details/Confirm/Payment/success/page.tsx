"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const Success = () => {
    const router = useRouter(); 
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <div className='h-[56px] justify-end flex'>
                <Image
                    src="/x.svg"
                    alt='x'
                    width={56}
                    height={56}
                    onClick={() => router.push('/beranda')} 
                    className="cursor-pointer"
                />
            </div>
            <div className='h-[706px] py-[24px] px-[16px] space-y-[16px] flex flex-col items-center justify-center '>
                <div className='w-[328px] space-y-[8px]'>
                    <h1 className="font-open-sans text-[16px] font-bold leading-[24px] tracking-[0.15px] text-center text-[#3B4963]">
                        Janji Temu berhasil dibooking!
                    </h1>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-center text-[#6278A1]">
                        Mohon datang 15 menit sebelum waktu yang ditentukan
                    </h3>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-center text-[#6278A1]">
                        Tampilkan QR Code ini ke bagian pendaftaran ketika Anda datang ke Rumah Sakit
                    </h3>
                </div>
                <Image src="/barcode.png" alt='barcode' height={242} width={204} />
                <div className='w-[169px] h-[108px] space-y-[8px]'>
                    <button className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[16px] flex flex-row justify-center bg-[#0D0DCD] items-center space-x-2'>
                        <Image src="/download.svg" alt='download' width={16} height={16} />
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-white'>
                            Unduh QR Code
                        </span>
                    </button>
                    <button className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[12px] flex flex-row justify-center bg-white items-center space-x-2 border-[#0D0DCD] border'>
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-[#0D0DCD]'>
                            Lihat Detail Booking
                        </span>
                    </button>
                    <button
                        className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[12px] flex flex-row justify-center bg-white items-center space-x-2 border-white border'
                        onClick={() => router.push('/beranda')} // Navigate to /beranda when clicked
                    >
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-[#0D0DCD]'>
                            Kembali Ke Beranda
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Success
