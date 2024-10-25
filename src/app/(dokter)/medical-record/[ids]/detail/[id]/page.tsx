import { Metadata } from "next";
import MedicalHeader from "./_components/MedicalHeader";
import UserProfile from "./_components/UserProfile";
import AppointmentTimeline from "./_components/AppointmentTimeline";
import Footer from "@/app/(dokter)/_components/Footer_Doctor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Detail Medical Record",
    description: "Detail medical record page",
};

const DetailMedicalRecord = ({ params }: { params: { id: string } }) => {
    console.log("Params received:", params);
    return (
        <div className="min-h-screen">
            <MedicalHeader />
            <UserProfile />
            <AppointmentTimeline />
            <Footer />
        </div>
    );
};

export default DetailMedicalRecord;
