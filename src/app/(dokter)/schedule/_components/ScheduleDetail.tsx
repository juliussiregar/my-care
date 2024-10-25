// ScheduleDetail.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import Calendar from "../../home/_components/Calendar";
import { useRouter } from "next/navigation";
import PinModal from "../../medical-record/[ids]/detail/[id]/_components/PinModal";

interface PatientData {
    id: string;
    patientName: string;
    type: "Outpatient" | "Inpatient";
}

interface TimeSlotData {
    id: string;
    time: string;
    duration: string;
    patients: PatientData[];
}

interface ScheduleDetailProps {
    selectedDate: Date;
    hasAppointments: boolean;
    onDateChange?: (date: Date) => void;
    doctorSchedule?: { [key: string]: string };
}

const PatientItem: React.FC<PatientData & { className?: string }> = ({
    id,
    patientName,
    type,
    className,
}) => {
    const router = useRouter();
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const handlePatientClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPinModalOpen(true);
    };

    const handlePinSubmit = (pin: string[]) => {
        const enteredPin = pin.join("");
        // Replace with actual pin validation
        if (enteredPin === "123456") {
            setIsPinModalOpen(false);
            // Navigate to the specific medical record detail page using the patient's ID
            router.push(`/medical-record/${id}`);
        } else {
            alert("Invalid PIN");
        }
    };

    return (
        <>
            <div
                className={`flex items-center justify-between w-[260px] h-[58px] border border-[#F0F0FC] p-3 rounded ${className} cursor-pointer`}
                onClick={handlePatientClick}
            >
                <div className="flex items-center">
                    <Image
                        src="/outpatient.svg"
                        alt="outpatient"
                        width={20}
                        height={20}
                    />
                    <div className="font-open-sans ml-2">
                        <h3 className="text-[10px]">{type}</h3>
                        <h3 className="text-xs font-bold">{patientName}</h3>
                    </div>
                </div>
                <Image
                    src="/icon-right.svg"
                    alt="icon-right"
                    width={20}
                    height={20}
                />
            </div>

            <PinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                onSubmit={handlePinSubmit}
            />
        </>
    );
};

const TimeSlot: React.FC<TimeSlotData & { slotIndex: number }> = ({
    time,
    duration,
    patients,
    slotIndex,
}) => {
    const isHighlighted = slotIndex === 0 || slotIndex === 2;

    return (
        <div className="flex">
            <div className="flex flex-col items-start w-[60px] text-xs text-[#3B4963] px-2 py-3 ml-2">
                <div className="flex items-center">
                    <Image
                        src="/clock.svg"
                        alt="clock"
                        width={16}
                        height={16}
                        className="mr-1"
                    />
                    <h3 className="text-left">{time}</h3>
                </div>
                <h3 className="text-[#4E6082] mt-1">{duration}</h3>
            </div>
            <div className="flex flex-col space-y-2 ml-2 mr-4 py-2">
                {patients.map((patient) => (
                    <PatientItem
                        key={patient.id}
                        {...patient}
                        className={isHighlighted ? "bg-[#F0F0FC]" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
    selectedDate,
    hasAppointments,
    onDateChange,
    doctorSchedule = {},
}) => {
    const [showCalendar, setShowCalendar] = useState(false);

    // Updated timeSlots with unique IDs for each patient
    const timeSlots: TimeSlotData[] = [
        {
            id: "slot1",
            time: "08:30",
            duration: "1hr",
            patients: [
                {
                    id: "patient_001",
                    patientName: "Faisal Kemal",
                    type: "Outpatient",
                },
                {
                    id: "patient_002",
                    patientName: "Junaedi",
                    type: "Outpatient",
                },
            ],
        },
        {
            id: "slot2",
            time: "09:30",
            duration: "1hr",
            patients: [
                {
                    id: "patient_003",
                    patientName: "Dian Yuanda",
                    type: "Outpatient",
                },
                {
                    id: "patient_004",
                    patientName: "Christian",
                    type: "Outpatient",
                },
            ],
        },
        {
            id: "slot3",
            time: "10:30",
            duration: "1hr",
            patients: [
                {
                    id: "patient_005",
                    patientName: "Alice Smith",
                    type: "Outpatient",
                },
                {
                    id: "patient_006",
                    patientName: "Bob Wilson",
                    type: "Outpatient",
                },
            ],
        },
    ];

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

    const handleDateSelect = (date: Date) => {
        const dayName = date
            .toLocaleString("en-US", { weekday: "long" })
            .toLowerCase();
        if (doctorSchedule?.[dayName]) {
            onDateChange?.(date);
            setShowCalendar(false);
        }
    };

    return (
        <div className="relative w-[360px] h-[678px] bg-white flex flex-col gap-4">
            <div className="flex items-center text-xs h-[34px] bg-[#F0F0FC]">
                <h3 className="font-open-sans text-[#4E6082] ml-4">
                    {getHeaderLabel()}
                </h3>
                {getHeaderLabel() !== "" && (
                    <div className="bg-[#6278A1] rounded-full w-1 h-1 ml-2 mr-2"></div>
                )}
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowCalendar(true)}
                >
                    <h3 className="font-open-sans text-[#4E6082] font-bold">
                        {formatDate(selectedDate)}
                    </h3>
                    <Image
                        src="/down.svg"
                        alt="down"
                        width={11.25}
                        height={6.75}
                        className={`ml-2 transform transition-transform ${
                            showCalendar ? "rotate-180" : ""
                        }`}
                    />
                </div>
            </div>

            {showCalendar && (
                <Calendar
                    year={selectedDate.getFullYear()}
                    month={selectedDate.getMonth()}
                    onDateSelect={handleDateSelect}
                    doctorSchedule={doctorSchedule}
                    onClose={() => setShowCalendar(false)}
                />
            )}

            <div className="h-[628px] overflow-y-auto">
                {hasAppointments ? (
                    <div className="flex flex-col h-full">
                        <div className="h-[32px] text-xs text-[#4E6082] flex items-center ml-4">
                            <h3 className="w-[60px]">Time</h3>
                            <h3 className="ml-2">Pasien</h3>
                        </div>
                        <div className="flex flex-col h-full">
                            {timeSlots.map((slot, index) => (
                                <TimeSlot
                                    key={slot.id}
                                    {...slot}
                                    slotIndex={index}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <h3 className="text-[#4E6082] text-xs font-open-sans">
                            Tidak ada jadwal
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleDetail;
