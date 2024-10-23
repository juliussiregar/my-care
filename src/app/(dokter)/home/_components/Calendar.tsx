import React from 'react';

interface CalendarProps {
    year: number;
    month: number;
    onDateSelect: (date: Date) => void;
    doctorSchedule: { [key: string]: string } | null; // Schedule mapping for dates
}

const Calendar: React.FC<CalendarProps> = ({
    year,
    month,
    onDateSelect,
    doctorSchedule
}) => {
    const dayNameMapper = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const generateCalendarDays = (year: number, month: number): (Date | null)[] => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: (Date | null)[] = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const renderMonth = (year: number, month: number) => {
        return (
            <div className="mb-8">
                <div className="grid grid-cols-7 gap-2">
                    {dayNameMapper.map((day) => (
                        <div key={day} className="text-center text-base font-semibold uppercase text-gray-600">
                            {day}
                        </div>
                    ))}
                </div>
                <h2 className="text-md font-semibold text-left mb-4 mt-2">
                    {new Date(year, month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays(year, month).map((date, index) => {
                        const dayName = date ? date.toLocaleString('id-ID', { weekday: 'long' }).toLowerCase() : '';
                        const isPracticeDay = doctorSchedule && doctorSchedule[dayName] !== undefined;

                        return (
                            <div key={index} className="h-12 flex items-center justify-center"> {/* Increased height for larger buttons */}
                                {date ? (
                                    <button
                                        className={`w-10 h-10 flex items-center justify-center rounded-full
                                            ${isPracticeDay
                                                ? 'text-green-600 underline underline-offset-4' // Practice day
                                                : 'text-gray-400' // Non-practice days
                                            }`}
                                        onClick={() => onDateSelect(date)}
                                        title={isPracticeDay ? doctorSchedule[dayName] : 'Tidak ada jadwal praktek'}
                                    >
                                        {date.getDate()}
                                    </button>
                                ) : (
                                    <div className="w-10 h-10"></div> // Empty cell
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-y-scroll h-[300px] w-full">
            {renderMonth(year, month)}
            {renderMonth(year, month + 1)}
            {renderMonth(year, month + 2)} {/* Show next two months */}
        </div>
    );
};

export default Calendar;
