// src/app/(pasien)/_components/Drawer/PatientDrawer.tsx

import Image from 'next/image';
import React from 'react';

interface PatientDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({ isVisible, onClose }) => {
    return (
        <div
            className={`fixed inset-0 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'
                } transition-transform duration-300 ease-in-out bg-white`}
            style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                maxWidth: '100%',
                boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="pt-[20px] px-[20px] flex flex-row items-center justify-between">
                <h2 className="font-open-sans text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] text-left">
                    Isi Data Pasien
                </h2>
                <div className='w-[56px] h-[56px] flex items-center justify-center'>
                    <button onClick={onClose}>
                        <Image src="/x.svg" alt="close" width={48} height={48} />
                    </button>
                </div>
            </div>
            <div className="h-[568px] px-[20px] pt-[20px] pb-[30px] space-y-[20px]">
                <h2 className="font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#191F2A] text-justify">
                    Anda mendaftarkan orang lain sebagai pasien. Isi data lengkap pasien untuk membuat jadwal
                </h2>
                <div className="w-[318px] flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Nama Lengkap
                    </span>
                    <input
                        className="h-[32px] rounded-[5px] border border-[#C0C9D9] pl-4 placeholder:font-open-sans placeholder:text-[14px] placeholder:font-normal placeholder:leading-[22px] placeholder:tracking-[0.1px] placeholder:text-[#C0C9D9] outline-none"
                        placeholder="Isi Nama Lengkap"
                    />
                </div>

                <div className="flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Tanggal Lahir
                    </span>
                    <div className="flex items-center border border-[#C0C9D9] rounded-[5px] h-[32px] pl-2 cursor-text">
                        <Image src="/birthday.svg" alt="birthday" width={22} height={22} />
                        <div
                            className="flex-1 pl-2 font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-left text-[#C0C9D9]"
                        >
                            Isi Tanggal lahir
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDrawer;
