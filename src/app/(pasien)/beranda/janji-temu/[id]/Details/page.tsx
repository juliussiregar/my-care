// src/pages/Details.tsx

"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter
import { RootState } from '@/app/store';
import Header from '@/app/(pasien)/_components/Header';
import DoctorInfo from './_components/DoctorInfo';
import ContactInfo from './_components/ContactInfo';
import PatientInfo from './_components/PatientInfo';
import ComplaintSection from './_components/ComplainSection';
import Image from 'next/image';

const Details = () => {
    const router = useRouter(); // Initialize useRouter
    const appointmentData = useSelector((state: RootState) => state.appointment);
    const [isOn, setIsOn] = useState(true);

    if (!appointmentData || !appointmentData.doctor_id) {
        return <div>No appointment data found.</div>;
    }

    const { appointment_date, appointment_time, doctor_name, doctor_specialization, symtomps } = appointmentData;

    const handleContinue = () => {
        router.push('Details/Confirm');
    };

    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <Header />
            <DoctorInfo
                doctor_name={doctor_name ?? 'Unknown Doctor'}
                doctor_specialization={doctor_specialization ?? 'Unknown Specialization'}
                appointment_date={appointment_date}
                appointment_time={appointment_time}
            />
            <div className='h-[324px] bg-[#F8F8FF] pt-[24px] pr-[16px] pb-[24px] pl-[16px] space-y-[24px]'>
                <ContactInfo />
                <PatientInfo isOn={isOn} setIsOn={setIsOn} />
            </div>
            <ComplaintSection initialSymptomps={symtomps} />
            <div className='h-[8px] bg-[#F8F8FF]'></div>
            <div className='h-[168px] py-[24px] px-[16px] space-y-[8px]'>
                <div className='flex flex-row py-[16px] border-b border-[#D7D7F8] justify-between'>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                        Biaya Booking
                    </h3>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-right text-[#3AB790]">
                        Rp 50.000
                    </h3>
                </div>
                <div className='flex flex-row items-start h-[64px] space-x-[8px]'>
                    <Image src="/warning2.svg" alt='warning2' width={16} height={16} />
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-justify text-[#6278A1]">
                        Untuk mengamankan jadwal konsultasi, diperlukan pembayaran sebesar Rp50.000 sebagai biaya booking. Jumlah ini akan langsung dipotong dari total tagihan pasien saat perawatan.
                    </h3>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[24px]">
                <button
                    onClick={handleContinue} // Add onClick handler to navigate
                    className='text-white border-[#0D0DCD] bg-[#0D0DCD] cursor-pointer w-[320px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px]'
                >
                    Lanjutkan
                </button>
            </div>
        </div>
    );
};

export default Details;
