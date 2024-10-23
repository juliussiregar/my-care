// src/pages/Details.tsx

"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header from '@/app/(pasien)/_components/Header';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


const Details = () => {
    const { data: session } = useSession();
    const appointmentData = useSelector((state: RootState) => state.appointment);

    if (!appointmentData || !appointmentData.doctor_id) {
        return <div>No appointment data found.</div>;
    }

    const { doctor_id, hospital_id, appointment_date, appointment_time, type, doctor_name, doctor_specialization } = appointmentData;

    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <Header />
            <div className='flex flex-row h-[112px] pt-[32px] pr-[16px] pb-[24px] pl-[16px] border-t border-b border-[#F0F0FC] shadow-[0_0_20px_0_#3232DB26]'>
                <div className='w-[160px] h-[56px] space-y-1'>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                        {doctor_name}
                    </h3>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                        {doctor_specialization}
                    </h3>
                    <div className='flex flex-row items-center space-x-1'>
                        <Image src="/suitcase.svg" alt='suitcase' width={16} height={16} />
                        <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] ">
                            RS Immanuel
                        </h3>
                    </div>
                </div>
                <div className='w-[160px] h-[56px] space-y-1'>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                        Jadwal
                    </h3>
                    <div className='flex flex-row space-x-1'>
                        <Image src="/tanggal.svg" alt='tanggal' width={16} height={16} />
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                            {appointment_date
                                ? new Date(appointment_date).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })
                                : 'Tanggal tidak tersedia'}
                        </h3>
                    </div>
                    <div className='flex flex-row space-x-1'>
                        <Image src="/clock.svg" alt='tanggal' width={16} height={16} />
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                            {appointment_time ? appointment_time.slice(0, 5).replace('.', ':') : ''}
                        </h3>
                    </div>

                </div>
            </div>

            <p>test</p>
            <h2>Appointment Details</h2>
            <p><strong>USER ID:</strong> {session?.user.id}</p>
            <p><strong>Doctor ID:</strong> {doctor_id}</p>
            <p><strong>Hospital ID:</strong> {hospital_id}</p>
            <p><strong>Appointment Date:</strong> {appointment_date}</p>
            <p><strong>Appointment Time:</strong> {appointment_time}</p>
            <p><strong>Type:</strong> {type}</p>
        </div>
    );
};

export default Details;
