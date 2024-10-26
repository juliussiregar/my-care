// Schedule.tsx
"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Calendar from "./Calendar";
import { useSession } from "next-auth/react";
import { Appointment } from "@/types/appointment";

interface ScheduleProps {
    selectedDate: string;
    appointments: Appointment[];
    onDateSelect: (date: Date) => void;
}

interface PatientSummaryProps {
    icon: string;
    label: string;
    count: number;
}

const PatientSummaryCard: React.FC<PatientSummaryProps> = ({
    icon,
    label,
    count,
}) => (
    <div className="flex flex-col w-[104px] h-[92px] border border-[#D7D7F8] rounded-xl pl-3 pt-3 space-y-4">
        <div className="flex items-end">
            <Image
                src={icon}
                alt={label.toLowerCase()}
                width={16}
                height={16}
                className="mr-1"
            />
            <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] w-[60px] h-[14px] text-[#3B4963]">
                {label}
            </p>
        </div>
        <div className="flex flex-row items-center">
            <h2 className="font-sarabun text-primary text-[24px] font-extrabold leading-[32px]">
                {count}
            </h2>
            <p className="font-open-sans mt-1 text-left text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#3B4963] ml-1">
                Pasien
            </p>
        </div>
    </div>
);

const Schedule: React.FC<ScheduleProps> = ({ selectedDate, appointments, onDateSelect }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const { data: session } = useSession();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const appointmentCounts = useMemo(() => {
        const counts = {
            outpatient: 0,
            online: 0,
            inpatient: 0
        };

        appointments.forEach(appointment => {
            switch (appointment.appointment_type.toLowerCase()) {
                case 'outpatient':
                    counts.outpatient++;
                    break;
                case 'online':
                    counts.online++;
                    break;
                case 'inpatient':
                    counts.inpatient++;
                    break;
            }
        });

        return counts;
    }, [appointments]);

    const patientSummary = useMemo(
        () => [
            {
                id: "outpatient",
                icon: "/outpatient.svg",
                label: "Outpatient",
                count: appointments.length,
            },
            {
                id: "online",
                icon: "/online.svg",
                label: "Online",
                count: appointmentCounts.online,
            },
            {
                id: "inpatient",
                icon: "/inpatient.svg",
                label: "Inpatient",
                count: appointmentCounts.inpatient,
            },
        ],
        [appointmentCounts, appointments.length]
    );

    const handleDateSelect = (date: Date) => {
        onDateSelect(date);
        setShowCalendar(false);
    };

    return (
        <div className="relative h-[272px] pt-5 px-4 pb-5 space-y-3">
            <div className="flex flex-row justify-between">
                <h1 className="text-open-sans text-[#191F2A] text-left text-base font-bold leading-6 tracking-[0.15px]">
                    Jadwal
                </h1>
                <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex flex-row space-x-1 items-center cursor-pointer text-xs tracking-[0.2px]"
                >
                    <Image
                        src="/calender.svg"
                        alt="calender"
                        width={16}
                        height={16}
                    />
                    <p>{selectedDate}</p>
                    <Image
                        src="/down.svg"
                        alt="down"
                        width={11.25}
                        height={6.75}
                        className={`transform transition-transform ${
                            showCalendar ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>

            {showCalendar && (
                <Calendar
                    year={year}
                    month={month}
                    onDateSelect={handleDateSelect}
                    doctorSchedule={session?.user?.availability_schedule ?? {}}
                    onClose={() => setShowCalendar(false)}
                />
            )}

            <div className="flex flex-row w-[328px] h-[92px] space-x-2">
                {patientSummary.map((summary) => (
                    <PatientSummaryCard key={summary.id} {...summary} />
                ))}
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
                        {appointments.length}
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