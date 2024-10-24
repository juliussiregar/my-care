"use client";
import React from 'react';
import HeaderConfirm from './_components/HeaderConfirm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import DoctorSummary from './_components/DoctorSummary';
import PatientSummary from './_components/PatientSummary';
import Image from 'next/image';
import { useRouter } from "next/navigation";


const Confirm = () => {
    const appointmentData = useSelector((state: RootState) => state.appointment);
    const { appointment_date, appointment_time, doctor_name, doctor_specialization, symtomps, type } = appointmentData;
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };
    const handleContinue = () => {
        router.push('Confirm/Payment');
    };
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <HeaderConfirm />
            <div className='h-[770px] bg-[#F0F0FC] border-t'>
                <div className='h-[504px] bg-[#F8F8FF] py-[24px] px-[16px] space-y-[16px]'>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                        Pastikan data yang diisi sudah benar
                    </h3>
                    <DoctorSummary
                        doctor_name={doctor_name}
                        doctor_specialization={doctor_specialization}
                        appointment_date={appointment_date}
                        appointment_time={appointment_time}
                    />
                    <PatientSummary
                        type={type}
                        symtomps={symtomps}
                    />
                </div>
                <div className='h-[168px] bg-white py-[24px] px-[16px] space-y-[8px]'>
                    <div className='w-[328px] h-[48px] py-[16px] border-b border-[#D7D7F8] flex flex-row justify-between'>
                        <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Biaya Booking
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-right text-[#3AB790]">
                            Rp 50.000
                        </h3>
                    </div>
                    <div className='flex flex-row items-start h-[64px] space-x-[8px]'>
                        <Image src="/warning2.svg" alt='warning2' width={16} height={16} />
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#6278A1] text-justify">
                            Untuk mengamankan jadwal konsultasi, diperlukan pembayaran sebesar Rp50.000 sebagai biaya booking. Jumlah ini akan langsung dipotong dari total tagihan pasien saat perawatan.                        </h3>
                    </div>
                </div>
                <div className='h-[98px] px-[20px] py-[30px] space-x-[8px] bg-white'>
                    <button
                        className='text-[#0D0DCD] border-[#0D0DCD] bg-white w-[156px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px] hover:bg-[#F1F1F1]'
                        onClick={handleBackClick}
                    >
                        Ubah Data
                    </button>
                    <button
                        onClick={handleContinue} 
                        className='text-white border-[#0D0DCD] bg-[#0D0DCD] cursor-pointer w-[156px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px]'
                    >
                        Bayar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Confirm;
