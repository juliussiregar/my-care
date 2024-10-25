"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchAppointments } from "../../../../../pages/api/doctor";

interface AppointmentData {
    appointment_id: number;
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    patient_name: string;
    status: string;
    symtomps: string;
}

interface ScheduleDetailProps {
    selectedDate: Date;
    hasAppointments: boolean;
}

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
    selectedDate,
    hasAppointments,
}) => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.jwt) {
                console.error("User is not authenticated");
                return;
            }

            setLoading(true);
            try {
                const localDate = new Date(selectedDate);
                localDate.setHours(0, 0, 0, 0);

                const formattedDate = localDate.toLocaleDateString('en-CA'); // 'en-CA' gives yyyy-mm-dd format
                const token = session.user.jwt;

                const fetchedAppointments = await fetchAppointments(formattedDate, formattedDate, token);

                const filteredAppointments = fetchedAppointments.filter(
                    (appointment: AppointmentData) => appointment.appointment_date === formattedDate
                );

                setAppointments(filteredAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDate, session]);

    // Function to format time to HH:mm
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    return (
        <div className="relative w-full max-w-md h-[628px] bg-white flex flex-col gap-4 overflow-y-auto p-4">
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <h3 className="text-[#4E6082] text-xs font-open-sans">
                        Loading...
                    </h3>
                </div>
            ) : hasAppointments && appointments.length > 0 ? (
                <div className="flex flex-col h-full">
                    <div className="h-[32px] text-xs text-[#4E6082] flex items-center  px-4 border-b border-gray-200">
                        <h3 className="w-[60px]">Time</h3>
                        <h3 className="ml-2 text-center w-64">Patient</h3>
                    </div>
                    <div className="flex flex-col h-full">
                        {appointments.map((appointment) => (
                            <div key={appointment.appointment_id} className="flex border-b border-gray-100 items-center">
                                <div className="flex flex-col items-start w-[60px] text-xs text-[#3B4963] px-2 py-3 ">
                                    <div className="flex items-center justify-center">
                                        <Image
                                            src="/clock.svg"
                                            alt="clock"
                                            width={16}
                                            height={16}
                                            className="mr-1"
                                        />
                                        <h3 className="text-left">{formatTime(appointment.appointment_time)}</h3>
                                    </div>
                                    <h3 className="text-[#4E6082] mt-1 text-center w-full">1hr</h3>
                                </div>
                                <div className="flex flex-col space-y-2 ml-2 py-2 w-full">
                                    <div className="flex items-center justify-between w-full h-[58px] border border-[#F0F0FC] p-3 rounded cursor-pointer">
                                        <div className="flex items-center">
                                            <Image
                                                src="/outpatient.svg"
                                                alt="outpatient"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="font-open-sans ml-2">
                                                <h3 className="text-[10px] text-gray-500">Outpatient</h3>
                                                <h3 className="text-xs font-bold">{appointment.patient_name}</h3>
                                            </div>
                                        </div>
                                        <Image
                                            src="/icon-right.svg"
                                            alt="icon-right"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                            </div>
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
    );
};

export default ScheduleDetail;
