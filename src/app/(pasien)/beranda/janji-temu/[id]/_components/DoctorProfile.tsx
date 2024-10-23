// app/(pasien)/_components/DoctorProfile.tsx

import React from 'react';
import Image from 'next/image';
import { Doctor } from '@/types/doctor';

type DoctorProfileProps = {
    doctor: Doctor;
};

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
    return (
        <div className="h-[216px] pt-[32px] pr-[16px] pb-[24px] pl-[16px] border-t">
            <div className='flex flex-row w-[296px] h-[64px] gap-[8px]'>
                <Image src="/profile.svg" alt='profile' width={64} height={64} />
                <div className='flex flex-col w-[224px] h-[54px]'>
                    <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#0D1F3E]">
                        {doctor.name}
                    </h2>
                    <h3 className="font-open-sans text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#4A576F]">
                        {doctor.specialization}
                    </h3>
                </div>
            </div>

            <div className='w-[328px] h-[72px] mt-4 mb-2'>
                <h3 className="font-open-sans text-left text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963]">
                    Lokasi Praktek
                </h3>
                <div className='flex flex-row w-[328px] h-[52px] items-start justify-between mt-1'>
                    <Image src="/suitcase.svg" alt='suitcase' width={16} height={16} />
                    <div className='w-[304px] h-[52px]'>
                        <h3 className="font-open-sans text-left text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963]">
                            RS Immanuel
                        </h3>
                        <h3 className="font-open-sans text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963]">
                            Jl. Raya Kopo No.161, Situsaeur, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40233
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
