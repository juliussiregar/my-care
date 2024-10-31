"use client";
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useSession } from 'next-auth/react';

const Success = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const appointmentData = useSelector((state: RootState) => state.appointment);

    if (!session || !session.user) {
        console.log("Session or user data is missing");
        return null;
    }

    if (!appointmentData) {
        console.log("Appointment data is missing");
        return null;
    }

    const patient_id = session.user.patient_id ?? 0;
    const name = session.user.patient_name ?? 'Unknown';

    if (!appointmentData.doctor_id || !appointmentData.appointment_date || !appointmentData.appointment_time || !appointmentData.symtomps || !appointmentData.type) {
        console.log("Incomplete appointment data", appointmentData);
        return null;
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

    // Convert body to JSON string for QR code
    const qrData = JSON.stringify(body);

    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <div className='h-[56px] justify-end flex'>
                <Image
                    src="/x.svg"
                    alt='x'
                    width={56}
                    height={56}
                    onClick={() => router.push('/beranda')}
                    className="cursor-pointer"
                />
            </div>
            <div className='h-[706px] py-[24px] px-[16px] space-y-[16px] flex flex-col items-center justify-center'>
                <div className='w-[328px] space-y-[8px]'>
                    <h1 className="font-open-sans text-[16px] font-bold leading-[24px] tracking-[0.15px] text-center text-[#3B4963]">
                        Janji Temu berhasil dibooking!
                    </h1>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-center text-[#6278A1]">
                        Mohon datang 15 menit sebelum waktu yang ditentukan
                    </h3>
                    <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-center text-[#6278A1]">
                        Tampilkan QR Code ini ke bagian pendaftaran ketika Anda datang ke Rumah Sakit
                    </h3>
                </div>
                <div className="relative flex items-center justify-center">
                    {/* QR Code Canvas with body data */}
                    <QRCodeCanvas
                        value={qrData}
                        size={242}
                        level="H" // High error correction level to allow for logo overlay
                        includeMargin={true}
                    />
                    {/* Centered Logo */}
                    <div className="absolute flex items-center justify-center">
                        <Image
                            src="/logo.png" // Replace with actual logo path
                            alt="Center Logo"
                            width={60} // Adjusted logo size
                            height={60}
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className='w-[169px] h-[108px] space-y-[8px]'>
                    <button className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[16px] flex flex-row justify-center bg-[#0D0DCD] items-center space-x-2'>
                        <Image src="/download.svg" alt='download' width={16} height={16} />
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-white'>
                            Unduh QR Code
                        </span>
                    </button>
                    {/* <button className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[12px] flex flex-row justify-center bg-white items-center space-x-2 border-[#0D0DCD] border'>
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-[#0D0DCD]'
                            onClick={() => router.push('success/detail-booking')}
                        >
                            Lihat Detail Booking
                        </span>
                    </button> */}
                    <button
                        className='h-[32px] w-[169px] rounded-[8px] py-[5px] px-[12px] flex flex-row justify-center bg-white items-center space-x-2 border-white border'
                        onClick={() => router.push('/beranda')}
                    >
                        <span className='font-open-sans text-[14px] font-semibold leading-[22px] text-center text-[#0D0DCD]'>
                            Kembali Ke Beranda
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;
