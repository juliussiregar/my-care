import Image from 'next/image';

const Schedule = () => {
    return (
        <div className='h-[272px] pt-[20px] pr-[16px] pb-[20px] pl-[16px] gap-[8px] space-y-3'>
            <div className='flex flex-row justify-between'>
                <h1 className="text-open-sans text-[#191F2A] text-left text-[16px] font-bold leading-[24px] tracking-[0.15px]">
                    Jadwal
                </h1>
                <div className='flex flex-row space-x-1'>
                    <Image src="/calender.svg" alt='calender' width={16} height={16} />
                    <p>Kamis, 20 Sept 2024</p>
                    <Image src="/down.svg" alt='down' width={11.25} height={6.75} />
                </div>
            </div>

            {/* Outpatient Online Inpatient */}
            <div className='flex flex-row w-[328px] h-[92px] space-x-2'>
                <div className='flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4'>
                    <div className='flex items-end'>
                        <Image src="/outpatient.svg" alt='outpatient' width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Outpatient
                        </p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px] text-left w-[14px] h-[32px]">
                            5
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] w-[44px] h-[22px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4'>
                    <div className='flex items-end'>
                        <Image src="/online.svg" alt='outpatient' width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Online
                        </p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px] text-left w-[14px] h-[32px]">
                            1
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] w-[44px] h-[22px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4'>
                    <div className='flex items-end'> {/* Change this to items-end */}
                        <Image src="/inpatient.svg" alt='outpatient' width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Inpatient
                        </p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px] text-left w-[14px] h-[32px]">
                            2
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] w-[44px] h-[22px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-[328px] h-[92px] border border-[#D7D7F8] rounded-xl gap-[8px] pt-[16px] pl-[12px] pb-[16px] space-y-3'>
                <div className='flex flex-row w-[304px] h-[16px] items-center space-x-1'>
                    <Image src="/total.svg" alt='total' width={16} height={16} />
                    <p className="font-open-sans mt-1 text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[284px] h-[14px] text-[#3B4963]">
                        Total Pasien
                    </p>
                </div>
                <div className='flex flex-row items-center'>
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px] text-left w-[14px] h-[32px]">
                            7
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] w-[44px] h-[22px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default Schedule;
