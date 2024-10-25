"use client"
import React, { useState } from 'react'
import HeaderPayment from './_components/HeaderPayment'
import Method from './_components/Method'
import Bca from './_components/bca' 
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/navigation'


const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null); 
    const router = useRouter();
    const { data: session } = useSession(); 
    const appointmentData = useSelector((state: RootState) => state.appointment); 
    console.log(`session ada: ${session?.user.patient_name}`);
    console.log(`appointmend data ada: ${appointmentData.symtomps}`);

    const handleMethodClick = (method: string) => {
        if (method === 'BCA Virtual Account') {
            setSelectedMethod('BCA');
        }
    };

    const handleBackToMethod = () => {
        setSelectedMethod(null); // Reset to the initial state to show Method component again
    };

    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <HeaderPayment />
            <div className='h-[706px] flex flex-col space-y-[8px] bg-[#F0F0FC] border-t'>
                <div className='h-[96px] py-[24px] px-[16px] bg-white space-y-[8px]'>
                    <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                        Biaya Booking
                    </h3>
                    <h3 className="font-open-sans text-[16px] font-bold leading-[24px] tracking-[0.15px] text-[#0000B8]">
                        Rp 50.000
                    </h3>
                </div>
                {selectedMethod === 'BCA' ? (
                    <div className="slide-in">
                        <Bca onBackToMethod={handleBackToMethod} /> {/* Pass the handler to Bca */}
                    </div>
                ) : (
                    <div className="slide-in">
                        <Method onMethodClick={handleMethodClick} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payment
