import Image from 'next/image';

const WelcomeCard = () => {
    return (
        <div className='relative h-[138px] flex flex-row pt-[20px] pl-[16px] shadow-md' style={{ background: 'linear-gradient(180deg, #3232DB 0%, #0B0B53 100%)' }}>
            <div className='flex flex-col'>
                <h3 className="font-open-sans text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#FFFFFF]">
                    Selamat datang,
                </h3>
                <h2 className="font-open-sans mt-2 text-[#FFFFFF] text-left text-[14px] font-bold leading-[22px] tracking-[0.1px]">
                    drg. Annisa Melinda
                </h2>
                <h3 className="font-open-sans mt-1 text-[#FFFFFF] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                    Kedokteran Gigi
                </h3>
                <h3 className="font-open-sans text-[#FFFFFF] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                    Dokter Gigi
                </h3>
            </div>
            <div className='relative flex-grow' />
            <Image src="/eclips.png" alt='eclips' height={50} width={150} className='absolute bottom-0 right-0' />
            <Image src="/home_doctor.png" alt='gambar dokter konsul' width={190.48} height={86.19} className='absolute bottom-0 right-0 z-10' />
        </div>
    );
};

export default WelcomeCard;
