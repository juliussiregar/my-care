import Image from 'next/image';
import React from 'react';

const Method = ({ onMethodClick }: { onMethodClick: (method: string) => void }) => {
    return (
        <div className='h-[602px] bg-white py-[24px] px-[16px] space-y-[16px]'>
            <h3 className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left text-[#3B4963]">
                Metode Pembayaran
            </h3>
            <div className='w-[328px] h-[439px]'>
                {[
                    { name: 'Gopay', src: '/gopay.svg' },
                    { name: 'OVO', src: '/ovo.svg' },
                    { name: 'Dana', src: '/dana.svg' },
                    { name: 'BCA Virtual Account', src: '/bca.svg' },
                    { name: 'Mandiri Virtual Account', src: '/mandiri.svg' },
                    { name: 'BNI Virtual Account', src: '/bni.svg' },
                    { name: 'BRIVA', src: '/bri.svg' },
                    { name: 'Bank Syariah Indonesia', src: '/bsi.png' },
                ].map((method, index) => (
                    <div
                        key={index}
                        className='h-[54.86px] py-[16px] px-[12px] border-b border-[#D7D7F8] flex flex-row items-center justify-between cursor-pointer transition-all duration-200 hover:bg-[#F0F0FC] hover:shadow-md'
                        onClick={() => onMethodClick(method.name)} // Call the handler on click
                    >
                        <div className='flex flex-row items-center space-x-[12px]'>
                            <Image src={method.src} alt={method.name} width={32} height={22.86} />
                            <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left text-[#191F2A]">
                                {method.name}
                            </h3>
                        </div>
                        <Image src="/rightpay.svg" alt='right' width={20} height={20} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Method;
