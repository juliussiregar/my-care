// components/ActionButtons.tsx
"use client";

import Image from 'next/image';

const ActionButtons: React.FC = () => {
    return (
        <div className='h-[84px]' style={{ background: 'linear-gradient(180deg, #3232DB 0%, #0B0B53 100%)' }}>
            <div className='flex flex-row justify-between items-center ml-4 mr-4 mt-6'>
                <div className='flex flex-row items-center'>
                    <Image src="/rs_white.svg" alt="RS White" width={16} height={16} className='mb-4' />
                    <div className='flex flex-col text-white ml-2'>
                        <p className="text-[12px] font-normal leading-4 tracking-[0.2px] text-left" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            RS Terpilih
                        </p>
                        <p className="text-[12px] font-bold leading-4 tracking-[0.2px] text-left" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            RS Immanuel
                        </p>
                    </div>
                </div>
                <p className="text-[#F0F0FC] text-[12px] font-semibold leading-5 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Ubah
                </p>
            </div>
        </div>
    );
};

export default ActionButtons;
