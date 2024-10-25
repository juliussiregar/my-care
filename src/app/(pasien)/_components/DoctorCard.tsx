"use client"
import { Doctor } from '@/types/doctor';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../../../../pages/api/doctor';

const DoctorCard = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const data = await fetchDoctors();
                setDoctors(data);
            } catch (error) {
                console.error(error);
            }
        };
        getDoctors();
    }, []);

    return (
        <div className='bg-[#F0F0FC] flex flex-grow py-[24px] px-[16px] gap-[8px] shadow-md shadow-t flex-col'>
            {doctors.map((doctor) => (
                <Link href={`janji-temu/${doctor.doctor_id}`} key={doctor.doctor_id}>
                    <div className='w-[328px] h-[224px] bg-white border-[#F0F0FC] rounded-md py-[20px] px-[16px] gap-[16px] transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer'>
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
                        <div className='w-[296px] h-[104px] mt-4 p-[8px] bg-[#F0F0FC] border-l-[4px] border-l-[#8C8CEB] px-[20px] py-[12px] justify-center items-center'>
                            <div className='flex flex-col space-y-1'>
                                {Object.entries(doctor.availability).map(([day, time]) => (
                                    <div className='flex items-center' key={day}>
                                        <p className="font-open-sans w-[84px] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#4A576F]">
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </p>
                                        <div className='flex flex-row'>
                                            <Image src="/arrow.svg" alt='arrow' width={16} height={16} />
                                            <p className="font-open-sans text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#4A576F]">{time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default DoctorCard;
