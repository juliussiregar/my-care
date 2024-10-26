"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchAppoinmentDetail } from '../../../../../../../../../../pages/api/doctor';

interface AppointmentDetail {
    appointment_id: number;
    patient_name: string;
    symtomps: string;
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    status: string;
    gender?: string;
    birth_date?: string;
}

const UserProfileDetail = () => {
    const params = useParams();
    const { data: session } = useSession();
    const [appointmentDetail, setAppointmentDetail] = useState<AppointmentDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const appointmentId = params?.id as string;

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.jwt) {
                console.error("User is not authenticated");
                return;
            }

            setLoading(true);
            try {
                const appointments = await fetchAppoinmentDetail(session.user.jwt);
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

    if (loading) {
        return (
            <div className="w-auto h-[118px] flex items-center justify-center">
                <h3 className="text-[#4E6082] text-xs">Loading...</h3>
            </div>
        );
    }

    if (!appointmentDetail) {
        return (
            <div className="w-auto h-[118px] flex items-center justify-center">
                <h3 className="text-[#4E6082] text-xs">Data not found</h3>
            </div>
        );
    }

    return (
        <div className="w-auto h-[118px] shadow-[0_4px_15px_-3px_rgba(240,240,252,0.5)]">
            <div className='w-auto h-[62px] mx-4 mt-8 font-open-sans text-xs text-[#3B4963]'>
                <h2 className='text-[14px] leading-[22px] font-bold'>
                    {appointmentDetail.patient_name}
                </h2>
                <h3 className='my-1'>{appointmentDetail.gender ?? "Laki-laki"}</h3>
                <h3>{appointmentDetail.birth_date ?? "1 September 1987"}</h3>
            </div>
        </div>
    );
};

export default UserProfileDetail;
