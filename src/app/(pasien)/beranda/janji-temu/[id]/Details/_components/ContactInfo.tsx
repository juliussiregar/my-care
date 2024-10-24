// src/app/(pasien)/_components/Details/ContactInfo.tsx

import React from 'react';
import { useSession } from 'next-auth/react';

const ContactInfo = () => {
    const { data: session } = useSession();

    return (
        <div className='w-[328px] h-[116px] space-y-[12px]'>
            <h3>Data Kontak</h3>
            <div className="h-[88px] p-[16px] space-y-[4px] bg-white shadow-[0px_0px_20px_0px_#3232DB26] rounded-[8px]">
                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                    {session?.user.patient_name}
                </h3>
                <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                    {session?.user.patient_phonenumber}
                </h3>
                <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#3B4963] text-left">
                    {session?.user.email}
                </h3>
            </div>
        </div>
    );
};

export default ContactInfo;
