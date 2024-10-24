// src/app/(pasien)/_components/Details/ComplaintSection.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSymptomps } from '@/features/appointment/appointmentSlice'; // Action to update symptomps

const ComplaintSection = ({ initialSymptomps }: { initialSymptomps: string | null }) => {
    const [symptomps, setSymptompsValue] = useState(initialSymptomps || ''); // Initialize state with initialSymptomps
    const dispatch = useDispatch();

    // Update Redux store when the symptomps value changes
    useEffect(() => {
        dispatch(setSymptomps(symptomps));
    }, [symptomps, dispatch]);

    return (
        <div className='h-[140px] py-[24px] px-[16px]'>
            <div className='w-[328px] h-[28px] pb-[8px] space-x-[4px] flex flex-row items-center'>
                <p className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                    Keluhan Anda
                </p>
                <p className="font-open-sans text-[12px] font-normal leading-[20px] tracking-[0.2px] text-left text-[#00000073]">
                    (opsional)
                </p>
            </div>
            <textarea
                className='w-full h-[40px] rounded-[5px] py-[9px] px-[12px] bg-white border border-[#C0C9D9] font-open-sans text-[14px] leading-[22px] tracking-[0.1px] text-[#000000D9] placeholder-[#C0C9D9] focus:outline-none'
                placeholder='Isi Keluhan Anda'
                value={symptomps}
                onChange={(e) => setSymptompsValue(e.target.value)}
            />
        </div>
    );
};

export default ComplaintSection;
