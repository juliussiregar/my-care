/* eslint-disable react-hooks/exhaustive-deps */

// src/app/(pasien)/beranda/janji-temu/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAppointmentData } from '@/features/appointment/appointmentSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Doctor } from '@/types/doctor';
import Header from '@/app/(pasien)/_components/Header';
import DoctorProfile from './_components/DoctorProfile';
import PilihJadwal from './_components/PilihJadwal';
import CalenderPas from './_components/CalenderPas';
import { fetchDoctorById } from '../../../../../../pages/api/doctor';

export default function Appointment() {
    const router = useRouter();
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/').pop();

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const fetchedData = await fetchDoctorById(Number(id));
                    const doctorDetails = Array.isArray(fetchedData) ? fetchedData[0] : null;
                    setDoctor(doctorDetails);
                } catch (error) {
                    console.error('Error fetching doctor:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (selectedDate && doctor) {
            generateTimeSlots(selectedDate);
        }
    }, [selectedDate, doctor]);

    const generateTimeSlots = (date: Date) => {
        const dayOfWeek = date.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
        const availability = doctor?.availability[dayOfWeek];

        if (availability) {
            const [start, end] = availability.split(' - ');
            const startTime = new Date(`1970-01-01T${convertTo24Hour(start)}`);
            const endTime = new Date(`1970-01-01T${convertTo24Hour(end)}`);
            const slots = [];

            const currentTime = startTime;
            while (currentTime < endTime) {
                slots.push(currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
                currentTime.setHours(currentTime.getHours() + 1);
            }
            setTimeSlots(slots);
        } else {
            setTimeSlots([]);
        }
    };

    const convertTo24Hour = (time: string) => {
        const [hours, minutes, period] = RegExp(/(\d+):(\d+) (\w+)/).exec(time)?.slice(1) || [];
        let hour = parseInt(hours, 10);
        if (period.toLowerCase() === 'pm' && hour < 12) hour += 12;
        if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, '0')}:${minutes}`;
    };

    const handleTimeSlotClick = (slot: string) => {
        setSelectedTime(slot);
    };

    const handleOptionSelect = (option: string) => {
        if (option === "Pribadi") {
            setSelectedOption(option);
        }
    };

    const handleContinue = () => {
        if (!selectedDate || !selectedTime || !selectedOption || !id) return;

        // Format the appointment date using toLocaleDateString to prevent timezone issues
        const appointmentDate = selectedDate.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
        const appointmentTime = `${selectedTime}:00`;

        // Dispatch the data to Redux
        dispatch(setAppointmentData({
            doctor_name: doctor?.name ?? null,
            doctor_specialization: doctor?.specialization ?? null,
            doctor_id: id,
            hospital_id: 1,
            appointment_date: appointmentDate,
            appointment_time: appointmentTime,
            type: selectedOption,
            symtomps: null
        }));

        // Navigate to the next page
        router.push(`${id}/Details`);
    };

    const isButtonEnabled = selectedDate !== null && selectedTime !== null && selectedOption === "Pribadi";

    if (!doctor) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <Header />
            <DoctorProfile doctor={doctor} />
            <div className='flex-grow h-auto min-h-[542px] bg-[#F8F8FF] shadow-sm'>
                <div className='flex h-auto pt-[24px] pr-[16px] pb-[24px] pl-[16px]'>
                    <div className='w-[328px]'>
                        <h3 className="font-open-sans text-left text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] mb-2">
                            Penjamin
                        </h3>
                        <div className="h-[54px] bg-white rounded-lg shadow-[0_0_20px_0_rgba(50,50,219,0.15)] flex flex-row items-center px-4 space-x-6">
                            <div
                                onClick={() => handleOptionSelect("Pribadi")}
                                className={`flex flex-row items-center space-x-2 cursor-pointer p-[8px] rounded`}
                            >
                                <div className="relative">
                                    <Image src="/circle.svg" alt="circle" width={16} height={16} />
                                    {selectedOption === "Pribadi" && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-[8px] h-[8px] bg-[#0D0DCD] rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                                <p className={`font-open-sans text-left text-[14px] font-normal leading-[22px] text-[#191F2A]`}>
                                    Pribadi
                                </p>
                            </div>
                            <div
                                className={`flex flex-row items-center space-x-2 cursor-not-allowed p-[8px] rounded opacity-50`}
                            >
                                <Image src="/circle.svg" alt="circle" width={16} height={16} />
                                <p className="font-open-sans text-left text-[14px] font-normal leading-[22px] text-[#191F2A]">
                                    Asuransi
                                </p>
                            </div>
                        </div>
                        <div className='w-[328px] h-[284px] mt-[24px]'>
                            <PilihJadwal />
                            <CalenderPas availability={doctor.availability} onDateSelect={setSelectedDate} />
                        </div>
                        {selectedDate && (
                            <div className='h-auto mt-[24px]'>
                                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                                    Pilih Waktu
                                </h3>
                                <div className='h-auto bg-white mt-[12px] p-[16px] rounded-[8px] shadow-[0_0_20px_0_rgba(50,50,219,0.15)]'>
                                    {timeSlots.length > 0 ? (
                                        <div className='grid grid-cols-3 gap-[16px]'>
                                            {timeSlots.map((slot, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleTimeSlotClick(slot)}
                                                    className={`w-[90px] h-[24px] p-[4px_8px] rounded-[40px] border border-[#3AB790] cursor-pointer transition duration-200 ${selectedTime === slot ? 'bg-[#3AB790] text-white' : 'text-[#3AB790]'
                                                        } hover:bg-[#3AB790] hover:text-white`}
                                                >
                                                    <h3 className="font-open-sans text-[12px] font-extrabold leading-[16px] tracking-[0.2px] text-center">
                                                        {slot}
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="font-open-sans text-center text-[14px] text-[#8193B4]">No available slots</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='h-[96px] pt-[20px] pb-[30px] pl-[20px] pr-[20px] justify-center items-center bg-white'>
                    <button
                        onClick={handleContinue}
                        disabled={!isButtonEnabled}
                        className={`w-[320px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px] ${isButtonEnabled
                                ? 'bg-[#0D0DCD] text-white border-[#0D0DCD] cursor-pointer'
                                : 'bg-[#F1F4FA] text-[#8193B4] border-[#8193B4] cursor-not-allowed'
                            }`}
                    >
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}
