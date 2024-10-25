import React from "react";
import Footer from "../_components/Footer_Doctor";
import MedicalHeader from "./_components/MedicalHeader";
import UserProfile from "./_components/UserProfile";
import AppointmentTimeline from "./_components/AppointmentTimeline";

const Medical_Record = () => {
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <MedicalHeader />
            <UserProfile/>
            <AppointmentTimeline/>
            <Footer />
        </div>
    );
};

export default Medical_Record;
