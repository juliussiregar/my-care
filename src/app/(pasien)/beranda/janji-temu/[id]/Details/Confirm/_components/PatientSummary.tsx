import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface PatientSummaryProps {
    type: string | null;
    symtomps: string | null;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ type, symtomps }) => {
    const { data: session } = useSession();

    return (
        <div className='w-[328px] h-[248px] space-y-[12px]'>
            <div className='flex flex-row justify-between h-[16px]'>
                <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                    Pasien
                </h3>
                <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-right text-[#3B4963]">
                    Sesuai Kontak
                </h3>
            </div>
            <div className='w-[328px] h-[220px] rounded-[8px] p-[16px] space-y-[12px] bg-white shadow-[0px_0px_20px_0px_rgba(50,50,219,0.15)] flex'>
                <div className='w-[296px] h-[116px] space-y-[4px]'>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Nama Lengkap
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            {session?.user.patient_name}
                        </h3>
                    </div>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Jenis Kelamin
                        </h3>
                        <div className='flex flex-row space-x-[2px]'>
                            <Image src="/boy.svg" alt='boy' width={16} height={16} />
                            <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                                Laki-laki
                            </h3>
                        </div>
                    </div>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Tanggal Lahir
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            1 September 1987
                        </h3>
                    </div>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            No.HP
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            {session?.user.patient_phonenumber}
                        </h3>
                    </div>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Email
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            {session?.user.email}
                        </h3>
                    </div>
                    <div className='h-[16px] space-x-[4px] flex flex-row'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            Penjamin
                        </h3>
                        <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                            {type}
                        </h3>
                    </div>
                    <div className='w-[296px] h-[60px] space-y-[4px]'>
                        <h3 className="w-[104px] font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963] mt-4">
                            Keluhan
                        </h3>
                        <div className='h-[40px] pt-[4px] pb-[4px] pl-[12px] bg-[#F8F8FF] border-l border-[#3232DB]'>
                            <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                                {symtomps}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientSummary;
