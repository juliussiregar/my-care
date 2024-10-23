// Schedule.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchDoctorById } from '@/pages/api/doctor'; 
import Calendar from './Calendar'; 
import { useSession } from 'next-auth/react';

interface ScheduleAvailability {
    [key: string]: string; 
}

interface DoctorSchedule {
    availability: ScheduleAvailability;
}

const Schedule = () => {
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [doctorSchedule, setDoctorSchedule] = useState<ScheduleAvailability | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [highlightedDates, setHighlightedDates] = useState<number[]>([]); // Store highlighted dates

    const id = 1; // Static ID for testing, replace with session user ID if applicable

    // Fetch doctor schedule
    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            try {
                const data: DoctorSchedule[] = await fetchDoctorById(Number(id));
                setDoctorSchedule(data[0].availability);

                // Calculate highlighted dates based on the schedule
                const daysInMonth = new Date(year, month + 1, 0).getDate();   // Total days in the current month
                const practiceDays: number[] = [];

                // Loop through the days of the current month
                for (let day = 1; day <= daysInMonth; day++) {
                    const tempDate = new Date(year, month, day);
                    const dayName = tempDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase(); // Get the weekday
                    // Check if the day has availability
                    if (data[0].availability[dayName]) {
                        practiceDays.push(day); // Store the date for practice
                    }
                }
                setHighlightedDates(practiceDays);
            } catch (err) {
                console.error("Error fetching schedule:", err);
                setError("Failed to fetch schedule");
            }
            setLoading(false);
        };

        fetchSchedule();
        setDefaultDate();
    }, []);

    const setDefaultDate = () => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        setSelectedDate(formattedDate);
    };

    const handleDateSelect = (date: Date) => {
        const dayName = date.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
        if (doctorSchedule && doctorSchedule[dayName]) {
            const scheduleTime = doctorSchedule[dayName];
            const formattedDate = date.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            setSelectedDate(`${formattedDate} (${scheduleTime})`);
            setShowCalendar(false);
        }
    };

    return (
        <div className="relative h-[272px] pt-5 px-4 pb-5 space-y-3">
            <div className="flex flex-row justify-between">
                <h1 className="text-open-sans text-[#191F2A] text-left text-base font-bold leading-6 tracking-[0.15px]">
                    Jadwal
                </h1>
                <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex flex-row space-x-1 items-center cursor-pointer"
                >
                    <Image src="/calender.svg" alt="calender" width={16} height={16} />
                    <p>{selectedDate}</p>
                    <Image 
                        src="/down.svg" 
                        alt="down" 
                        width={11.25} 
                        height={6.75}
                        className={`transform transition-transform ${showCalendar ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {showCalendar && (
                <div className="absolute top-16 right-0 z-50 bg-white shadow-lg rounded-lg p-4 w-[320px]">
                    {loading && <p className="text-center py-4">Loading schedule...</p>}
                    {error && <p className="text-center py-4 text-red-500">{error}</p>}
                    {!loading && !error && (
                        <Calendar
                            year={year}
                            month={month}
                            onDateSelect={handleDateSelect}
                            doctorSchedule={doctorSchedule} // Pass the doctor's schedule
                        />
                    )}
                </div>
            )}

            {/* Existing patient summary section */}
            <div className="flex flex-row w-[328px] h-[92px] space-x-2">
                <div className="flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4">
                    <div className="flex items-end">
                        <Image src="/outpatient.svg" alt="outpatient" width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Outpatient
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px]" >
                            5
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>

                {/* Other patient summary cards go here */}
                <div className="flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4">
                    <div className="flex items-end">
                        <Image src="/online.svg" alt="online" width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Online
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px]">
                            1
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4">
                    <div className="flex items-end">
                        <Image src="/inpatient.svg" alt="inpatient" width={16} height={16} className="mr-1" />
                        <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                            Inpatient
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px]">
                            2
                        </h2>
                        <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#3B4963] ml-1">
                            Pasien
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-[328px] h-[92px] border border-[#D7D7F8] rounded-xl gap-[8px] pt-4 pl-3 pb-4 space-y-3">
                <div className="flex flex-row w-[304px] h-4 items-center space-x-1">
                    <Image src="/total.svg" alt="total" width={16} height={16} />
                    <p className="font-open-sans mt-1 text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[284px] h-[14px] text-[#3B4963]">
                        Total Pasien
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px]">
                        8
                    </h2>
                    <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#3B4963] ml-1">
                        Pasien
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
