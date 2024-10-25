import React, { useRef } from 'react';

interface CalendarProps {
    year: number;
    month: number;
    onDateSelect: (date: Date) => void;
    doctorSchedule: { [key: string]: string } | null;
    onClose?: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
    year,
    month,
    onDateSelect,
    doctorSchedule,
    onClose = () => {}
}) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const dayNameMapper = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const generateCalendarDays = (year: number, month: number): (Date | null)[] => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: (Date | null)[] = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

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
                        <div key={day} className="text-center font-inter uppercase text-[#8193B4] text-[11px] leading-4">
                            {day}
                        </div>
                    ))}
                </div>
                <h2 className="text-md font-open-sans font-bold text-xs text-left mb-3 mt-6">
                    {new Date(year, month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays(year, month).map((date, index) => {
                        const dayName = date ? date.toLocaleString('id-ID', { weekday: 'long' }).toLowerCase() : '';
                        const isPracticeDay = doctorSchedule?.[dayName] !== undefined;

                        return (
                            <div key={date ? date.toISOString() : `empty-${index}`} className="h-8 flex items-center justify-center">
                                {date ? (
                                    <button
                                        className={`w-[46.86px] h-8 flex items-center justify-center relative rounded font-open-sans text-xs tracking-[0.2px] font-bold
                                            ${isPracticeDay
                                                ? 'text-[#34A581] hover:bg-gray-50 hover:rounded-md active:bg-gray-100 hover:text-black' 
                                                : 'text-[#DEE0E5]'
                                            }
                                            ${isPracticeDay && `after:content-[""] 
                                                after:absolute 
                                                after:bottom-0 
                                                after:left-[6px]
                                                after:right-[6px]
                                                after:border-t-2
                                                after:border-[#34A581]`}`}
                                        onClick={() => onDateSelect(date)}
                                        title={isPracticeDay ? doctorSchedule?.[dayName] : 'Tidak ada jadwal praktek'}
                                    >
                                        {date.getDate()}
                                    </button>
                                ) : (
                                    <div className="w-[46.86px] h-8"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-end"
            onClick={handleOverlayClick}
        >
            <div 
                ref={calendarRef}
                onClick={e => e.stopPropagation()}
                className="w-full bg-white rounded-t-3xl border-t border-x border-gray-200"
            >
                <div className="flex justify-center pt-3 pb-5">
                    <div className="w-8 h-1 bg-[#E0E4EC] rounded-tl-full" />
                </div>
                <div className="px-6 pb-8">
                    <div className="overflow-y-auto max-h-[70vh]">
                        {renderMonth(year, month)}
                        {renderMonth(year, month + 1)}
                        {renderMonth(year, month + 2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
