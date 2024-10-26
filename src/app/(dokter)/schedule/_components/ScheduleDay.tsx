"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Calendar from '../../home/_components/Calendar';
import DayItem from './DayItem';

interface ScheduleDayProps {
    onDateSelect: (date: Date, isPracticeDay: boolean) => void;
    availability: Record<string, string>;
    selectedDate: Date;
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({ 
    onDateSelect, 
    availability,
    selectedDate: parentSelectedDate
}) => {
    const [selectedDate, setSelectedDate] = useState(parentSelectedDate);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(getStartOfWeek(parentSelectedDate));

    useEffect(() => {
        setSelectedDate(parentSelectedDate);
        setStartDate(getStartOfWeek(parentSelectedDate));
    }, [parentSelectedDate]);

    // Fungsi untuk mendapatkan tanggal Minggu di minggu yang sama dengan tanggal yang dipilih
    function getStartOfWeek(date: Date): Date {
        const newDate = new Date(date);
        const day = newDate.getDay(); // 0 = Minggu, 1 = Senin, dst.
        newDate.setDate(newDate.getDate() - day); // Mundur ke hari Minggu
        return newDate;
    }

    const getDaysArray = (startDate: Date) => {
        const days = [];
        const date = new Date(startDate);

        // Array nama hari dalam bahasa Indonesia sesuai urutan Minggu-Sabtu
        const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const shortDayNames = ['Ming', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(date);
            currentDate.setDate(date.getDate() + i);
            const dayName = dayNames[i];
            const isPracticeDay = availability[dayName] !== undefined;

            days.push({
                date: currentDate.getDate(),
                day: shortDayNames[i],
                fullDate: new Date(currentDate),
                isPracticeDay,
            });
        }
        return days;
    };

    const handleDateClick = (date: Date, isPracticeDay: boolean) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(0, 0, 0, 0);
        setSelectedDate(adjustedDate);
        onDateSelect(adjustedDate, isPracticeDay);
    };

    const handleDateSelect = (date: Date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(0, 0, 0, 0);
        setSelectedDate(adjustedDate);
        setStartDate(getStartOfWeek(adjustedDate));
        setShowCalendar(false);
        const dayName = adjustedDate.toLocaleDateString("id-ID", { weekday: "long" }).toLowerCase();
        onDateSelect(adjustedDate, availability?.[dayName] !== undefined);
    };

    const getHeaderLabel = (): string => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (selectedDate.toDateString() === today.toDateString()) {
            return "Hari Ini";
        } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
            return "Besok";
        } else {
            return "";
        }
    };

    const formatDateWithDay = (date: Date): string => {
        const weekday = date.toLocaleDateString('id-ID', { weekday: 'long' });
        const day = date.toLocaleDateString('id-ID', { day: '2-digit' });
        const month = date.toLocaleDateString('id-ID', { month: 'long' });
        const year = date.toLocaleDateString('id-ID', { year: 'numeric' });
        
        // Kapitalisasi huruf pertama hari
        const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        
        return `${capitalizedWeekday}, ${day} ${month} ${year}`;
    };

    return (
        <div className="relative w-full bg-white flex flex-col">
            {/* Schedule Days */}
            <div className="w-auto flex justify-between py-5 px-3">
                {getDaysArray(startDate).map((day, index) => (
                    <DayItem
                        key={index}
                        day={day.day}
                        date={day.date}
                        isActive={selectedDate.toDateString() === day.fullDate.toDateString()}
                        isPracticeDay={day.isPracticeDay}
                        onClick={() => handleDateClick(day.fullDate, day.isPracticeDay)}
                    />
                ))}
            </div>

            {/* Header Label and Calendar Toggle */}
            <div className="flex items-center h-[34px] bg-[#F0F0FC] px-4 w-full">
                <h3 className="font-open-sans text-[#4E6082] text-xs">
                    {getHeaderLabel()}
                </h3>
                {getHeaderLabel() !== "" && (
                    <div className="bg-[#6278A1] rounded-full w-1 h-1 mx-2"></div>
                )}
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <h3 className="font-open-sans text-[#4E6082] font-bold text-xs">
                        {formatDateWithDay(selectedDate)}
                    </h3>
                    <Image
                        src="/down.svg"
                        alt="down"
                        width={11.25}
                        height={6.75}
                        className={`ml-2 transform transition-transform ${showCalendar ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Calendar */}
            {showCalendar && (
                <Calendar
                    year={selectedDate.getFullYear()}
                    month={selectedDate.getMonth()}
                    onDateSelect={handleDateSelect}
                    doctorSchedule={availability}
                    onClose={() => setShowCalendar(false)}
                />
            )}
        </div>
    );
};

export default ScheduleDay;