import { Metadata } from 'next';
import HeaderDetail from './_components/HeaderDetail';
import UserProfileDetail from './_components/UserProfileDetail';
import DoctorProfileDetail from './_components/DoctorProfileDetail';
import MenuMedical from './_components/MenuMedical';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Detail Menu Medical Record',
    description: 'Detail medical menu record page',
};

const DetailMenuMedicalRecord = ({ params }: { params: { id: string } }) => {
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

export default DetailMenuMedicalRecord;