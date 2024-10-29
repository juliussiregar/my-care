/* eslint-disable react/no-unescaped-entities */
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
                <div className='flex flex-row h-[54.86px] w-[328px] border-b border-[#D7D7F8] items-center pl-4 space-x-4'>
                    <Image src="/bca2.svg" alt='bca2' width={32} height={22.86} />
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#191F2A]">
                        BCA Virtual Account
                    </h3>
                </div>
                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963] p-[4px]">
                    Cara Pembayaran
                </h3>
                <div className="w-[328px] h-[270px] text-left font-sans text-[10px] font-normal leading-[14px] tracking-[0.25px]">
                    <div className='h-[42px] flex flex-row justify-between border-b border-[#D7D7F8] py-[12px] px-[8px]'>
                        <h3 className="text-left font-sans text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                            ATM BCA
                        </h3>
                        <div className='flex flex-row space-x-1'>
                            <Image src="/down2.svg"  alt='down' height={16} width={16}/>
                            <Image src="/up.svg"  alt='down' height={16} width={16}/>
                        </div>
                    </div>
                    <div className='h-[144px] py-[16px] px-[8px] border-b border-[#D7D7F8]'>
                        <p>1. Insert your BCA ATM card and PIN</p>
                        <p>2. Select Menu "Other Transaction". Select "Transfer". Select "To BCA Virtual Account"</p>
                        <p>3. Enter Virtual Account Number. Press "Correct" to proceed</p>
                        <p>4. Verify Virtual Account details and then enter amount to be transferred and select "Correct" to confirm</p>
                        <p>5. Once the payment transaction is completed, this invoice will be updated automatically. This may take up to 5 minutes.</p>
                    </div>
                    <div className='h-[42px] flex flex-row justify-between border-b border-[#D7D7F8] py-[12px] px-[8px]'>
                        <h3 className="text-left font-sans text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                            BCA MOBILE
                        </h3>
                        <div className='flex flex-row space-x-1'>
                            <Image src="/down2.svg"  alt='down' height={16} width={16}/>
                        </div>
                    </div>
                    <div className='h-[42px] flex flex-row justify-between border-b border-[#D7D7F8] py-[12px] px-[8px]'>
                        <h3 className="text-left font-sans text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                            KlikBCA
                        </h3>
                        <div className='flex flex-row space-x-1'>
                            <Image src="/down2.svg"  alt='down' height={16} width={16}/>
                        </div>
                    </div>
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
