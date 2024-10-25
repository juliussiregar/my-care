"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Calendar from '../../home/_components/Calendar';
import DayItem from './DayItem';

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
    selectedDate: Date;
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({ 
    onDateSelect, 
    availability,
    selectedDate: parentSelectedDate
}) => {
    const [selectedDate, setSelectedDate] = useState(parentSelectedDate);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setSelectedDate(parentSelectedDate);
    }, [parentSelectedDate]);

    const getDaysArray = (startDate: Date) => {
        const days = [];
        const date = new Date(startDate);

        for (let i = 0; i < 7; i++) {
            const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
            const isPracticeDay = availability[dayName] !== undefined;

            days.push({
                date: date.getDate(),
                day: dayName.slice(0, 3),
                fullDate: new Date(date),
                isPracticeDay,
            });
            date.setDate(date.getDate() + 1);
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
        setStartDate(adjustedDate);
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

    return (
        <div className="relative w-full bg-white flex flex-col gap-[4px]">
            {/* Schedule Days */}
            <div className="w-full flex justify-between gap-[6px] p-4">
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
            <div className="flex items-center space-x-2 w-full text-xs h-[34px] bg-[#F0F0FC] p-4 mt-2">
                <div className="flex items-center">
                    <h3 className="font-open-sans text-[#4E6082]">
                        {getHeaderLabel()}
                    </h3>
                    {getHeaderLabel() !== "" && (
                        <div className="bg-[#6278A1] rounded-full w-1 h-1 ml-2"></div>
                    )}
                </div>
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <h3 className="font-open-sans text-[#4E6082] font-bold">
                        {selectedDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
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
                <div className="w-full">
                    <Calendar
                        year={selectedDate.getFullYear()}
                        month={selectedDate.getMonth()}
                        onDateSelect={handleDateSelect}
                        doctorSchedule={availability}
                        onClose={() => setShowCalendar(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ScheduleDay;
