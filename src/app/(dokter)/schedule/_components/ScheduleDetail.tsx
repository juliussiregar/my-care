"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchAppointments } from "../../../../../pages/api/doctor";
import { useRouter } from "next/navigation";
import PinModal from "../../medical-record/[ids]/detail/[id]/_components/PinModal";

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

// PatientItem Component
const PatientItem: React.FC<{
    patientName: string;
    className?: string;
    onClick: () => void;
}> = ({ patientName, className = "", onClick }) => (
    <div
        className={`flex items-center justify-between w-[260px] h-[58px] border border-[#F0F0FC] p-3 rounded ${className} cursor-pointer`}
        onClick={onClick}
    >
        <div className="flex items-center">
            <Image
                src="/outpatient.svg"
                alt="outpatient"
                width={20}
                height={20}
            />
            <div className="font-open-sans ml-2">
                <h3 className="text-[10px] text-gray-500">Outpatient</h3>
                <h3 className="text-xs font-bold">{patientName}</h3>
            </div>
        </div>
        <Image src="/icon-right.svg" alt="icon-right" width={20} height={20} />
    </div>
);

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
    selectedDate,
    hasAppointments,
}) => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
    const { data: session } = useSession();
    const router = useRouter();

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

                const formattedDate = localDate.toLocaleDateString("en-CA");
                const token = session.user.jwt;

                const fetchedAppointments = await fetchAppointments(
                    formattedDate,
                    formattedDate,
                    token
                );

                const filteredAppointments = fetchedAppointments.filter(
                    (appointment: AppointmentData) =>
                        appointment.appointment_date === formattedDate
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

    const handlePatientClick = (appointmentId: number) => {
        setSelectedAppointmentId(appointmentId);
        setIsPinModalOpen(true);
    };

    const handlePinSubmit = (pin: string[]) => {
        const enteredPin = pin.join("");
        // Replace with actual pin validation
        if (enteredPin === "123456") {
            setIsPinModalOpen(false);
            // Setelah PIN benar, arahkan ke DetailUserProfile
            const selectedAppointment = appointments.find(
                appointment => appointment.appointment_id === selectedAppointmentId
            );
            if (selectedAppointment) {
                router.push(`/medical-record/${selectedAppointmentId}`);
            }
        } else {
            alert("Invalid PIN");
        }
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    return (
        <div className="relative w-[360px] h-[678px] bg-white flex flex-col gap-4">
            <div className="h-[628px] overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <h3 className="text-[#4E6082] text-xs font-open-sans">
                            Loading...
                        </h3>
                    </div>
                ) : hasAppointments && appointments.length > 0 ? (
                    <div className="flex flex-col h-full">
                        <div className="h-[32px] text-xs text-[#4E6082] flex items-center ml-4">
                            <h3 className="w-[60px]">Time</h3>
                            <h3 className="ml-2">Pasien</h3>
                        </div>
                        <div className="flex flex-col h-full">
                            {appointments.map((appointment, index) => (
                                <div
                                    key={appointment.appointment_id}
                                    className="flex"
                                >
                                    <div className="flex flex-col items-start w-[60px] text-xs text-[#3B4963] px-2 py-3 ml-2">
                                        <div className="flex items-center">
                                            <Image
                                                src="/clock.svg"
                                                alt="clock"
                                                width={16}
                                                height={16}
                                                className="mr-1"
                                            />
                                            <h3 className="text-left">
                                                {formatTime(
                                                    appointment.appointment_time
                                                )}
                                            </h3>
                                        </div>
                                        <h3 className="text-[#4E6082] mt-1">
                                            1hr
                                        </h3>
                                    </div>
                                    <div className="flex flex-col space-y-2 ml-2 mr-4 py-2">
                                        <PatientItem
                                            patientName={
                                                appointment.patient_name
                                            }
                                            className={
                                                index % 3 === 0 ||
                                                index % 3 === 2
                                                    ? "bg-[#F0F0FC]"
                                                    : ""
                                            }
                                            onClick={() => handlePatientClick(appointment.appointment_id)}
                                        />
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

            {/* PIN Modal */}
            <PinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                onSubmit={handlePinSubmit}
            />
        </div>
    );
};

export default ScheduleDetail;