// src/app/(pasien)/_components/Details/PatientInfo.tsx

import React from 'react';
import Image from 'next/image';
import ToggleSwitch from '@/app/components/ToogleSwitch';
import { useSession } from 'next-auth/react';



interface PatientInfoProps {
    isOn: boolean;
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ isOn, setIsOn }) => {
    const { data: session } = useSession();

    return (
        <div className='h-[136px] space-y-[12px]'>
            <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                Pasien
            </h3>
            <div className="h-[108px] rounded-[8px] border bg-white shadow-[0px_0px_20px_0px_#3232DB26] border-[#D7D7F8]">
                <div className='flex flex-row h-[40px] bg-[#F0F0FC] py-[8px] px-[16px] items-center justify-between'>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#191F2A] text-left">
                        Sesuai Kontak
                    </h3>
                    <ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
                </div>
                <div className='h-[68px] p-[16px] flex flex-row items-start'>
                    {isOn ? (
                        <>
                            <div className='w-[268px] h-[36px] space-y-1'>
                                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                                    {session?.user.patient_name}
                                </h3>
                                <div className='flex flex-row space-x-[12px]'>
                                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                                        {session?.user.patient_phonenumber}
                                    </h3>
                                    <Image src="/gray2.svg" alt='gray' width={6} height={6} />
                                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                                        1 September 1987
                                    </h3>
                                </div>
                            </div>
                            <Image src="/pencil.svg" alt='pencil' width={16} height={16} />
                        </>
                    ) : (
                        <>
                            <div className='w-[203px] h-[32px] space-x-[4px] flex flex-row items-start'>
                                <Image src="/warning.svg" alt='warning' width={16} height={16} />
                                <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#DD403A] text-left">
                                    Isi Data Pasien yang ingin didaftarkan
                                </h3>
                            </div>
                            <div className='flex flex-row w-[81px] h-[24px] py-[2px] px-[8px] space-x-1'>
                                <p className="font-open-sans text-[12px] font-semibold leading-[20px] text-center text-[#0D0DCD]">
                                    Isi data
                                </p>
                                <Image src="/right.svg" alt='right' width={14} height={14} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
