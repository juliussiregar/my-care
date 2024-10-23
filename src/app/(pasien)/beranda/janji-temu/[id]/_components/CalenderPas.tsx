import Image from 'next/image';
import React, { useState } from 'react';

// Define the type for availability prop
interface Availability {
    [key: string]: string; // Allows keys as day names (e.g., "jumat", "kamis") with string values for time ranges
}

const CalenderPas: React.FC<{ availability: Availability, onDateSelect: (date: Date | null) => void }> = ({ availability, onDateSelect }) => {
    const currentDate = new Date();
    const [month, setMonth] = useState<number>(currentDate.getMonth());
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayMap: { [key: string]: number } = {
        "minggu": 0,
        "senin": 1,
        "selasa": 2,
        "rabu": 3,
        "kamis": 4,
        "jumat": 5,
        "sabtu": 6
    };

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = Array.from({ length: 42 }, (_, index) => {
        const dayNumber = index - firstDayOfMonth + 1;
        return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
    });

    const handlePreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const isAvailable = (dayIndex: number): boolean => {
        return Object.keys(availability).some(day => dayMap[day.toLowerCase()] === dayIndex);
    };

    const handleDateClick = (day: number | null) => {
        if (day) {
            const newSelectedDate = new Date(year, month, day);
            setSelectedDate(newSelectedDate);
            onDateSelect(newSelectedDate);
        }
    };

    return (
        <div className="h-[256px] p-[12px] bg-white rounded-md shadow-[0_0_20px_0_rgba(50,50,219,0.15)]">
            <div className="w-[296px] h-[224px] flex flex-col items-center">
                <div className="flex flex-row w-full max-w-[272px] h-[24px] mx-auto justify-between items-center">
                    <button
                        onClick={handlePreviousMonth}
                        className="hover:bg-gray-200 rounded-full p-2 transition duration-200"
                    >
                        <Image src="/leftcal.svg" alt="left" width={24} height={24} />
                    </button>
                    <div className="font-open-sans text-center text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#172B4D]">
                        {monthNames[month]} {year}
                    </div>
                    <button
                        onClick={handleNextMonth}
                        className="hover:bg-gray-200 rounded-full p-2 transition duration-200"
                    >
                        <Image src="/rightcal.svg" alt="right" width={24} height={24} />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 w-full mt-2 text-center">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
                        <div key={index} className="font-inter text-[11px] font-bold text-[#8193B4]">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2 w-full">
                    {calendarDays.map((day, index) => {
                        const isSelected =
                            selectedDate &&
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() === month &&
                            selectedDate.getFullYear() === year;

                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-center h-[32px] relative cursor-pointer ${
                                    isAvailable(index % 7) ? 'hover:bg-[#3AB790]' : ''
                                } transition duration-200`}
                                onClick={() => handleDateClick(day)}
                            >
                                {isSelected && day && (
                                    <div
                                        className="absolute w-[41px] h-[32px] top-0 left-0 bg-[#3AB790] rounded-[3px_0px_0px_0px] z-0"
                                    />
                                )}
                                <p
                                    className={`font-open-sans text-center text-[13px] font-extrabold leading-[16px] tracking-[0.2px] z-10 ${
                                        isAvailable(index % 7)
                                            ? isSelected
                                                ? 'text-white'
                                                : 'hover:text-white text-[#34A581]'
                                            : 'text-[#DEE0E5]'
                                    }`}
                                >
                                    {day || ''}
                                </p>
                                {isAvailable(index % 7) && day && (
                                    <div className="absolute bottom-0 w-5/6 h-[2px] bg-[#34A581] z-0" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalenderPas;
