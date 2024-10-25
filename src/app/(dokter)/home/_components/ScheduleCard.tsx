import React from 'react';
import Image from 'next/image';

const ScheduleCard = () => {
    return (
        <div className='h-[170px] pt-[20px] pl-[16px] pr-[16px] pb-[20px] space-y-2'>
            <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] w-[328px] h-[24px]">
                Jadwal Berjalan
            </h2>
            <div className='w-[328px] h-[98px] bg-[#F0F0FC] rounded-xl pt-[8px] pb-[16px]'>
                <div className='flex flex-row w-[328px] h-[50px] pt-[4px] pr-[12px] pb-[4px] pl-[12px]'>
                    <div className='w-[182px] h-[42px] gap-[4px]'>
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] text-[#3B4963] h-[14px]">
                            Outpatient
                        </p>
                        <div className='h-[24px] flex flex-row space-x-1 items-center'>
                            <h1 className="font-open-sans text-primary text-left text-[16px] font-bold leading-[24px] tracking-[0.15px] w-[10px] h-[24px]">
                                2
                            </h1>
                            <h3 className="font-open-sans mt-[2px] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] w-[38px] h-[16px]">
                                pasien
                            </h3>
                        </div>
                    </div>
                    {/* Status */}
                    <div className='w-[118px] h-[18px] bg-[#3AB790] rounded-xl flex justify-center items-center'>
                        <p className="font-open-sans text-left text-[10px] font-bold leading-[14px] tracking-[0.25px] text-[#FFFFFF]">
                            Sedang Berlangsung
                        </p>
                    </div>
                </div>

                {/* Jam Jadwal */}
                <div className='w-[328px] h-[24px] flex flex-row pt-[4px] pr-[12px] pb-[4px] pl-[12px] space-x-1'>
                    <Image src="/clock.svg" alt='clock' width={16} height={16} />
                    <h3 className='w-[68px] h-[16px] font-open-sans text-[#3B4963] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left'>
                        08:30-09:30
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCard;
