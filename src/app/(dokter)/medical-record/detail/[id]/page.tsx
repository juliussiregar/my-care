// src/app/(dokter)/medical-record/detail/[id]/page.tsx
import { Metadata } from 'next';
import DoctorProfileDetail from "./_components/DoctorProfileDetail";
import HeaderDetail from "./_components/HeaderDetail";
import MenuMedical from "./_components/MenuMedical";
import UserProfileDetail from "./_components/UserProfileDetail";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Detail Medical Record',
    description: 'Detail medical record page',
};

const DetailMedicalRecord = ({ params }: { params: { id: string } }) => {
    console.log('Params received:', params);
    return (
        <div className="min-h-screen">
            <HeaderDetail />
            <UserProfileDetail />
            <DoctorProfileDetail />
            <MenuMedical />
        </div>
    );
};

export default DetailMedicalRecord;