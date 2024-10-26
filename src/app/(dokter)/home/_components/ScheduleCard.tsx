"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface AppointmentData {
    appointment_id: number;
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    patient_name: string;
    status: string;
    symtomps: string;
}

interface ScheduleCardProps {
    appointments: AppointmentData[];
}

interface GroupedAppointments {
    time: string;
    count: number;
    type: string;
    status: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ appointments }) => {
    const [groupedAppointments, setGroupedAppointments] = useState<
        GroupedAppointments[]
    >([]);

    useEffect(() => {
        if (!appointments.length) {
            setGroupedAppointments([]);
            return;
        }

        // Group appointments by time
        const grouped = appointments.reduce(
            (acc: { [key: string]: GroupedAppointments }, curr) => {
                const time = curr.appointment_time;
                if (!acc[time]) {
                    acc[time] = {
                        time: time,
                        count: 0,
                        // type: curr.appointment_type,
                        type: "Outpatient",
                        status: curr.status,
                    };
                }
                acc[time].count++;
                return acc;
            },
            {}
        );

        // Convert to array and sort by time
        const groupedArray = Object.values(grouped).sort((a, b) => {
            const timeA = a.time.split(":").map(Number);
            const timeB = b.time.split(":").map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        });

        setGroupedAppointments(groupedArray);
    }, [appointments]);

    const formatTimeRange = (time: string) => {
        const [hours, minutes] = time.split(":");
        const startTime = `${hours}:${minutes}`;
        const endHour = (parseInt(hours) + 1).toString().padStart(2, "0");
        const endTime = `${endHour}:${minutes}`;
        return `${startTime}-${endTime}`;
    };

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case "pending":
                return "#FFDF75";
            case "available":
                return "#3AB790";
            case "come":
                return "#3232DB";
            default:
                return "#3AB790";
        }
    };

    const getStatusText = (status: string): string => {
        switch (status.toLowerCase()) {
            case "pending":
                return "Pasien Menunggu";
            case "complete":
                return "Sedang Berlangsung";
            case "cancelled":
                return "Akan Datang";
            default:
                return "";
        }
    };

    if (!appointments.length) {
        return (
            <div className="h-[170px] pt-[20px] pl-[16px] pr-[16px] pb-[20px] space-y-2">
                <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] w-[328px] h-[24px]">
                    Jadwal Berjalan
                </h2>
                <div className="w-[328px] h-[98px] flex items-center justify-center">
                    <p className="font-open-sans text-[#3B4963] text-xs">
                        Shift Anda hari ini telah selesai!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[170px] pt-[20px] pl-[16px] pr-[16px] pb-[20px] space-y-2">
            <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] w-[328px] h-[24px]">
                Jadwal Berjalan
            </h2>
            <div className="space-y-2">
                {groupedAppointments.map((group) => (
                    <div
                        key={`${group.time}-${group.status}`} // Use a combination of time and status for a unique key
                        className="w-[328px] h-[98px] bg-[#F0F0FC] rounded-xl pt-[8px] pb-[16px]"
                    >
                        <div className="flex flex-row w-[328px] h-[50px] pt-[4px] pr-[12px] pb-[4px] pl-[12px]">
                            <div className="w-[182px] h-[42px] gap-[4px]">
                                <p className="font-open-sans text-left text-[10px] font-normal leading-[14px] tracking-[0.25px] text-[#3B4963] h-[14px]">
                                    {group.type.charAt(0).toUpperCase() +
                                        group.type.slice(1)}
                                </p>
                                <div className="h-[24px] flex flex-row space-x-1 items-center">
                                    <h1 className="font-open-sans text-primary text-left text-[16px] font-bold leading-[24px] tracking-[0.15px] w-[10px] h-[24px]">
                                        {group.count}
                                    </h1>
                                    <h3 className="font-open-sans mt-[2px] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] w-[38px] h-[16px]">
                                        pasien
                                    </h3>
                                </div>
                            </div>
                            <div
                                className="w-[118px] h-[18px] rounded-xl flex justify-center items-center"
                                style={{
                                    backgroundColor: getStatusColor(
                                        group.status
                                    ),
                                }}
                            >
                                <p
                                    className={`font-open-sans text-left text-[10px] font-bold leading-[14px] tracking-[0.25px] ${
                                        group.status === "pending"
                                            ? "text-black"
                                            : "text-white"
                                    }`}
                                >
                                    {getStatusText(group.status)}
                                </p>
                            </div>
                        </div>
                        <div className="w-[328px] h-[24px] flex flex-row pt-[4px] pr-[12px] pb-[4px] pl-[12px] space-x-1">
                            <Image
                                src="/clock.svg"
                                alt="clock"
                                width={16}
                                height={16}
                            />
                            <h3 className="w-[68px] h-[16px] font-open-sans text-[#3B4963] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left">
                                {formatTimeRange(group.time)}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleCard;
