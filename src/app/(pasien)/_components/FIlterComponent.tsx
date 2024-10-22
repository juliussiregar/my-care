// app/(pasien)/beranda/janji-temu/_components/FilterComponent.tsx

'use client'; // Make sure to declare this as a client component
import React from 'react';
import Image from 'next/image';
import ActionButtons from './ActionButtons';

// Define the props type
interface FilterComponentProps {
    onBack: () => void; // Define the type of onBack as a function that returns void
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onBack }) => {
    return (
        <div className='flex flex-grow flex-col'>
            <ActionButtons />
            <div className='h-[634px] pt-[20px] px-[20px] pb-[30px] space-y-[20px]'>
                <div className='w-[318px] h-[38px]'>
                    <h2 className="font-bold text-[14px] leading-[22px] tracking-[0.1px] text-left text-[#191F2A] w-[318px] h-[22px] transition-opacity duration-300">
                        Punya dokter atau spesialis tujuan?
                    </h2>
                    <h3 className="font-normal text-[12px] leading-[16px] tracking-[0.2px] text-left text-[#191F2A] w-[318px] h-[16px]">
                        Cari menggunakan filter di bawah ini
                    </h3>
                </div>

                <div className='w-[318px] h-[276px]'>
                    <div className='h-[92px] pb-[24px]'>
                        <div className='h-[28px] pb-[8px]'>
                            <p className="font-open-sans text-[12px] leading-[20px] text-left text-[#000000D9]">
                                Spesialisasi
                            </p>
                        </div>
                        <div className="w-[318px] h-[40px] p-[9px] rounded-lg border-[1px] border-[#C0C9D9] bg-white flex flex-row justify-between">
                            <h2 className="font-normal text-[14px] leading-[22px] tracking-[0.1px] text-left text-[#191F2A]">
                                Kedokteran Gigi
                            </h2>
                            <Image src="/arrow_down.svg" alt='arrow down' width={22} height={22} />
                        </div>
                    </div>

                    <div className='h-[92px] pb-[24px]'>
                        <div className='h-[28px] pb-[8px]'>
                            <p className="font-open-sans text-[12px] leading-[20px] text-left text-[#000000D9]">
                                Hari Janji Temu
                            </p>
                        </div>
                        <div className="w-[318px] h-[40px] p-[9px] rounded-lg border-[1px] border-[#C0C9D9] bg-white flex flex-row justify-between">
                            <h2 className="font-open-sans text-[14px] leading-[22px] tracking-[0.1px] text-left text-[#191F2A]">
                                Semua hari
                            </h2>
                            <Image src="/arrow_down.svg" alt='arrow down' width={22} height={22} />
                        </div>
                    </div>

                    <div className='h-[92px] pb-[24px]'>
                        <div className='h-[28px] pb-[8px]'>
                            <p className="font-open-sans text-[12px] leading-[20px] text-left text-[#000000D9]">
                                Nama Dokter
                            </p>
                        </div>
                        <div className="w-[318px] h-[40px] p-[9px] rounded-lg border-[1px] border-[#C0C9D9] bg-white flex flex-row justify-between">
                            <h2 className="font-normal text-[14px] leading-[22px] tracking-[0.1px] text-left text-[#C0C9D9]">
                                Isi nama dokter bila ada
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onBack} className='p-2 w-full bg-blue-500 text-white rounded-xl'>
                Cari
            </button>
        </div>
    );
};

export default FilterComponent;
