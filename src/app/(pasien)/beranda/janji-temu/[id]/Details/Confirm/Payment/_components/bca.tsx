import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useSession } from 'next-auth/react';
import { createAppointment } from '../../../../../../../../../../pages/api/appointment';

const Bca = ({ onBackToMethod }: { onBackToMethod: () => void }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const appointmentData = useSelector((state: RootState) => state.appointment);

    const handlePayment = async () => {
        if (!session || !session.user) {
            console.log("Session or user data is missing");
            return;
        }

        if (!appointmentData) {
            console.log("Appointment data is missing");
            return;
        }

        const patient_id = session.user.patient_id ?? 0;
        const name = appointmentData.name ?? session.user.patient_name ?? 'Unknown';

        if (!appointmentData.doctor_id || !appointmentData.appointment_date || !appointmentData.appointment_time || !appointmentData.symtomps || !appointmentData.type) {
            console.log("Incomplete appointment data", appointmentData);
            return;
        }

        // Format the appointment time to HH:MM:SS
        const formattedTime = appointmentData.appointment_time.replace('.', ':');

        const body = {
            patient_id: Number(patient_id),
            doctor_id: Number(appointmentData.doctor_id),
            appointment_date: appointmentData.appointment_date,
            appointment_time: formattedTime,
            symtomps: appointmentData.symtomps,
            name: name,
            type: appointmentData.type,
        };

        console.log("Appointment data being sent:", body);

        try {
            // Use the imported function to create the appointment
            const response = await createAppointment(body, session.user.jwt);

            console.log("Appointment response:", response);

            if (response) {
                router.push('Payment/success');
            } else {
                console.log("Payment failed, please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className='space-y-12'>
            <div className='h-[452.86px] bg-white py-[24px] px-[16px] space-y-[16px]'>
                <span
                    className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963] cursor-pointer"
                    onClick={onBackToMethod}
                >
                    Metode Pembayaran
                </span>
                <div className='flex flex-row h-[54.86px] w-[328px] border-b items-center pl-4 space-x-4'>
                    <Image src="/bca2.svg" alt='bca2' width={32} height={22.86} />
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#191F2A]">
                        BCA Virtual Account
                    </h3>
                </div>
                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963] p-[4px]">
                    Cara Pembayaran
                </h3>
                <div className='w-[328px] h-[270px]'>
                    {/* Payment instructions... */}
                </div>
            </div>
            <div className='h-[98px] bg-white justify-center items-center flex'>
                <button
                    onClick={handlePayment}
                    className='text-white border-[#0D0DCD] bg-[#0D0DCD] cursor-pointer w-[320px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px]'
                >
                    Bayar
                </button>
            </div>
        </div>
    );
};

export default Bca;
