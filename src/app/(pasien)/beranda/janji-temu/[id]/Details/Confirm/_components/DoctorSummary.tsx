"use client"
import React from 'react'
import Image from 'next/image'

interface AppointmentSummaryProps {
    doctor_name: string | null;
    doctor_specialization: string | null;
    appointment_date: string | null;
    appointment_time: string | null;
}

const DoctorSummary: React.FC<AppointmentSummaryProps> = ({
    doctor_name,
    doctor_specialization,
    appointment_date,
    appointment_time,
}) => {
    return (
        <div className='w-[328px] h-[160px] rounded-[8px] bg-white py-[16px] px-[24px] space-y-[8px] shadow-[0px_0px_20px_0px_rgba(50,50,219,0.15)]'>
            <div className='w-[280px] h-[64px] space-x-[12px] flex flex-row'>
                <Image src="/profile.svg" alt='profile' width={64} height={64} />
                <div className='w-[204px] h-[56px] space-y-[4px]'>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                        {doctor_name}
                    </h3>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                        {doctor_specialization}
                    </h3>
                    <div className='flex flex-row h-[16px] space-x-[4px]'>
                        <Image src="/suitcase.svg" alt='suitcase' width={16} height={16} />
                        <h3 className="font-open-sans text-[12px] tracking-[0.2px] text-[#3B4963] ">
                            RS Immanuel
                        </h3>
                    </div>
                </div>
            </div>
            <div className='w-[280px] h-[56px] space-y-[4px]'>
                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
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
    )
}

export default DoctorSummary
