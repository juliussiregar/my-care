import React from 'react';

interface DayItemProps {
    day: string;
    date: number;
    isActive: boolean;
    isPracticeDay: boolean;
    onClick: () => void;
}

const DayItem: React.FC<DayItemProps> = ({ day, date, isActive, isPracticeDay, onClick }) => {
    // Capitalize the first letter of the day
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);

    return (
        <div className="flex flex-col items-center">
            <div
                className={`flex flex-col items-center justify-center text-center w-[44px] h-[56px] border
                    ${isActive ? 'bg-[#050577] border-[#050577]' : 'bg-white border-[#D7D7F8]'}
                    rounded-md cursor-pointer hover:border-[#050577]`}
                onClick={onClick}
            >
                <span className={`font-bold text-[12px] ${isActive ? 'text-white' : 'text-[#333333]'}`}>
                    {capitalizedDay}
                </span>
                <span className={`text-[14px] font-bold ${isActive ? 'text-white' : 'text-[#333333]'}`}>
                    {date}
                </span>
            </div>
            {isPracticeDay && (
                <div className="mt-[6px] w-2 h-2 bg-green-500 rounded-full"></div>
            )}
        </div>
    );
};

export default DayItem;
