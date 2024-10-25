// ScheduleDay.tsx
"use client";
import { getDayName } from '@/utils/date';
import React, { useState, useEffect } from 'react';

interface DayItemProps {
    day: string;
    date: number;
    isActive: boolean;
    isPracticeDay: boolean;
    onClick: () => void;
}

interface ScheduleDayProps {
    onDateSelect: (date: Date, isPracticeDay: boolean) => void;
    doctorId: number;
    availability: Record<string, string>;
    selectedDate: Date; // Tambah prop ini
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({ 
    onDateSelect, 
    availability,
    selectedDate: parentSelectedDate // Rename untuk menghindari konflik
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Effect untuk update internal state ketika parent date berubah
    useEffect(() => {
        setSelectedDate(parentSelectedDate);
    }, [parentSelectedDate]);

    const getDaysArray = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayName = getDayName(date).toLowerCase();
            
            const isPracticeDay = availability[dayName] !== undefined;

            days.push({
                date: date.getDate(),
                day: getDayName(date).slice(0, 3),
                fullDate: date,
                isPracticeDay,
            });
        }
        return days;
    };

    const handleDateClick = (date: Date, isPracticeDay: boolean) => {
        setSelectedDate(date);
        onDateSelect(date, isPracticeDay);
    };

    return (
        <div className="relative w-[360px] h-[108px] p-[20px] bg-white flex flex-col gap-[4px]">
            <div className="flex justify-between gap-[6px]">
                {getDaysArray().map((day, index) => (
                    <DayItem
                        key={index}
                        day={day.day}
                        date={day.date}
                        isActive={selectedDate.getDate() === day.date && selectedDate.getMonth() === day.fullDate.getMonth()}
                        isPracticeDay={day.isPracticeDay}
                        onClick={() => handleDateClick(day.fullDate, day.isPracticeDay)}
                    />
                ))}
            </div>
            <div className="flex justify-between gap-[6px] mt-1">
                {getDaysArray().map((day, index) => (
                    <div key={index} className="w-[44px] flex justify-center">
                        <Indicator isActive={day.isPracticeDay} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// DayItem dan Indicator components tetap sama
const DayItem: React.FC<DayItemProps> = ({ day, date, isActive, onClick }) => {
    return (
        <div 
            className={`flex flex-col items-center justify-center text-center w-[44px] h-[56px] border 
                ${isActive ? 'bg-[#050577] border-[#050577]' : 'bg-white border-[#D7D7F8]'} 
                rounded-md cursor-pointer hover:border-[#050577]`}
            onClick={onClick}
        >
            <span className={`font-bold text-[12px] ${isActive ? 'text-white' : 'text-[#333333]'}`}>
                {day}
            </span>
            <span className={`text-[14px] font-bold ${isActive ? 'text-white' : 'text-[#333333]'}`}>
                {date}
            </span>
        </div>
    );
};

const Indicator: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <div className={`${isActive ? "w-[6px] h-[6px] bg-green-500 rounded-full" : "w-0 h-0"}`} />
);

export default ScheduleDay;