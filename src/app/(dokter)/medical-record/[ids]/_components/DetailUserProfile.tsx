"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchAppoinmentDetail } from "../../../../../../pages/api/doctor";
interface AppointmentDetail {
    appointment_id: number;
    patient_name: string;
    symtomps: string;
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    status: string;
    // tambahkan field lain yang diperlukan
    gender?: string;
    birth_date?: string;
    phone?: string;
    email?: string;
}

interface ActionButtonProps {
    text: string;
    onClick?: () => void;
}

const DetailUserProfile: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const { data: session } = useSession();
    const [appointmentDetail, setAppointmentDetail] = useState<AppointmentDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const appointmentId = params?.ids as string;

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.jwt) {
                console.error("User is not authenticated");
                return;
            }

            setLoading(true);
            try {
                // Fetch all appointments
                const appointments = await fetchAppoinmentDetail(session.user.jwt);
                
                // Find the specific appointment by ID
                const currentAppointment = appointments.find(
                    (appointment: AppointmentDetail) => 
                    appointment.appointment_id.toString() === appointmentId
                );

                if (currentAppointment) {
                    setAppointmentDetail(currentAppointment);
                } else {
                    console.error("Appointment not found");
                }
            } catch (error) {
                console.error("Error fetching appointment detail:", error);
            } finally {
                setLoading(false);
            }
        };

        if (appointmentId) {
            fetchData();
        }
    }, [appointmentId, session]);

    const handleViewMedicalRecord = () => {
        router.push(`/medical-record/${appointmentId}/detail/${appointmentId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <h3 className="text-[#4E6082] text-xs font-open-sans">Loading...</h3>
            </div>
        );
    }

    if (!appointmentDetail) {
        return (
            <div className="flex justify-center items-center h-60">
                <h3 className="text-[#4E6082] text-xs font-open-sans">Data not found</h3>
            </div>
        );
    }

    const customEmail = appointmentDetail.patient_name.toLowerCase().replace(/\s+/g, '') + "@gmail.com";

    return (
        <div className="relative h-60 w-full font-open-sans p-4">
            <div className="flex items-center mb-4">
                <Image
                    src="/profile.svg"
                    alt="profile"
                    width={62}
                    height={62}
                />
                <div className="ml-2">
                    <h1 className="text-lg font-bold text-[#191F2A]">
                        {appointmentDetail.patient_name}
                    </h1>
                    <div className="flex items-center">
                        <Image
                            src="/man.svg"
                            alt="man"
                            width={20}
                            height={20}
                        />
                        <h3 className="text-sm text-[#3B4963]">
                            {appointmentDetail.gender ?? "Laki-laki"}
                        </h3>
                    </div>
                    <h3 className="text-sm text-[#3B4963]">
                        {appointmentDetail.birth_date ?? "1 September 1987"}
                    </h3>
                </div>
            </div>

            <div className="text-sm text-[#3B4963] mb-4">
                <h3 className="font-bold">Contact Detail</h3>
                <div className="flex items-center mt-1">
                    <h3>{appointmentDetail.phone ?? "628123456789"}</h3>
                    <span className="text-[#E0E4EC] mx-1 text-lg translate-y-[2px] inline-block">
                        •
                    </span>
                    <h3>{customEmail ?? "faisalkemal@gmail.com"}</h3>
                </div>
            </div>

            <div className="font-bold font-open-sans text-xs mb-1">Keluhan</div>
            <div className="w-auto h-[40px] border-l-2 border-[#8C8CEB] bg-[#F1F4FA] font-open-sans text-xs px-3">
                <div className="mt-1 pt-1">{appointmentDetail.symtomps}</div>
            </div>

            <div className="flex justify-center mt-4">
                <ActionButton 
                    text="Lihat Medical Record" 
                    onClick={handleViewMedicalRecord}
                />
            </div>
        </div>
    );
};

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center w-[328px] mt-[284px] h-[48px] bg-[#0D0DCD] rounded-xl font-open-sans hover:bg-[#0A0A9F] focus:outline-none focus:ring-2 focus:ring-[#0D0DCD] focus:ring-offset-2"
    >
        <span className="text-white text-[14px] leading-[22px] text-center flex-1 font-semibold">
            {text}
        </span>
    </button>
);

export default DetailUserProfile;