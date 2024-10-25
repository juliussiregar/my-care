import Image from 'next/image'
import React from 'react'

const PilihJadwal = () => {
    return (
            <div className='w-[328px] h-[16px] flex flex-row space-x-10 mb-[12px]'>
                <h3 className="font-open-sans text-left text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963]">
                    Pilih Jadwal
                </h3>
                <div className='w-[212px] flex flex-row  items-center space-x-4'>
                    <div className='flex flex-row w-[52px] space-x-1'>
                        <Image src="/green.svg" alt='green' width={6} height={6} />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] text-[#191F2A]">
                            Tersedia
                        </p>
                    </div>
                    <div className='flex flex-row w-[52px] space-x-1'>
                        <Image src="/yellow.svg" alt='green' width={6} height={6} />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] text-[#191F2A]">
                            Terbatas
                        </p>
                    </div>
                    <div className='flex flex-row w-[80px] space-x-1'>
                        <Image src="/gray.svg" alt='green' width={6} height={6} />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] text-[#191F2A]">
                            Tidak Tersedia
                        </p>
                </div>
            </div>
        </div>)
}

export default PilihJadwal