"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

interface ActionButtonProps {
    text: string;
    onClick?: () => void;
}

const DetailUserProfile: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const patientId = params?.ids as string; // Get the patient ID from the URL

    const handleViewMedicalRecord = () => {
        // Navigate to the detailed medical record page using both IDs
        // We use the current patient ID (from URL) and a specific medical record ID
        router.push(`/medical-record/${patientId}/detail/med_001`);
    };

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
                        Faisal Kemal
                    </h1>
                    <div className="flex items-center">
                        <Image
                            src="/man.svg"
                            alt="man"
                            width={20}
                            height={20}
                        />
                        <h3 className="text-sm text-[#3B4963]">Laki-laki</h3>
                    </div>
                    <h3 className="text-sm text-[#3B4963]">1 September 1987</h3>
                </div>
            </div>

            <div className="text-sm text-[#3B4963] mb-4">
                <h3 className="font-bold">Contact Detail</h3>
                <div className="flex items-center mt-1">
                    <h3>628123456789</h3>
                    <span className="text-[#E0E4EC] mx-1 text-lg translate-y-[2px] inline-block">
                        •
                    </span>
                    <h3>faisalkemal@gmail.com</h3>
                </div>
            </div>

            <div className="font-bold font-open-sans text-xs mb-1">Keluhan</div>
            <div className="w-auto h-[40px] border-l-2 border-[#8C8CEB] bg-[#F1F4FA] font-open-sans text-xs px-3">
                <div className="mt-1 pt-1">Gigi belakang kanan saya sakit</div>
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