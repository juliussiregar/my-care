import React from 'react';

interface DayItemProps {
    day: string;
    date: number;
    isActive: boolean;
}

interface IndicatorProps {
    isActive: boolean;
}

const ScheduleDay: React.FC = () => {
    return (
        <div className="relative w-[360px] h-[108px] p-[20px] bg-white flex flex-col gap-[4px]">
            <div className="flex justify-between gap-[6px]">
                <DayItem day="Ming" date={9} isActive={false} />
                <DayItem day="Senin" date={10} isActive={true} />
                <DayItem day="Selasa" date={11} isActive={false} />
                <DayItem day="Rabu" date={12} isActive={false} />
                <DayItem day="Kamis" date={13} isActive={false} />
                <DayItem day="Jumat" date={14} isActive={false} />
                <DayItem day="Sabtu" date={15} isActive={false} />
            </div>
            <div className="flex justify-between gap-[6px] mt-1">
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={true} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
                <div className="w-[44px] flex justify-center">
                    <Indicator isActive={false} />
                </div>
            </div>
        </div>
    );
};

const DayItem: React.FC<DayItemProps> = ({ day, date, isActive }) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center w-[44px] h-[56px] border border-[#D7D7F8] rounded-md ${isActive ? 'bg-[#050577]' : 'bg-white'}`}>
            <span className={`font-bold text-[12px] ${isActive ? 'text-white' : 'text-[#333333]'}`}>{day}</span>
            <span className={`text-[14px] font-bold ${isActive ? 'bg-[#050577] text-white' : 'text-[#333333]'}`}>
                {date}
            </span>
        </div>
    );
};

const Indicator: React.FC<IndicatorProps> = ({ isActive }) => {
    return (
        <div className={`${isActive ? "w-[6px] h-[6px] bg-green-500 rounded-full" : "w-0 h-0"}`} />
    );
};

export default ScheduleDay;