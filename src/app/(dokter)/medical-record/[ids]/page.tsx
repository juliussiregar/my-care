import React from "react";
import { Metadata } from "next";
import DetailPatientHeader from "./_components/DetailPatientHeader";
import DetailUserProfile from "./_components/DetailUserProfile";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Pasien Medical Record',
    description: 'Pasien medical record page',
};


const Pasien_Medical_Record = ({ params }: { params: { id: string } }) => {
    console.log('Params received:', params);
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <DetailPatientHeader/>
            <DetailUserProfile/>
        </div>
    );
};

export default Pasien_Medical_Record;
