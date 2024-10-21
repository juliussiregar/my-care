import Image from 'next/image';

const Header = () => {
    return (
        <div className='flex flex-row h-[56px] '>
            {/* SIDEBAR */}
            <div className='w-[56px] h-[56px] flex justify-center items-center'>
                <Image src="/sidebar.png" alt='sidebar' width={24} height={24} />
            </div>
            {/* Logo Tulisan */}
            <div className='w-[248px] flex justify-center items-center space-x-1'>
                <Image src="/image1.png" alt='logo' width={36} height={36} />
                <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] w-[58px] h-[22px] text-[#191F2A]">
                    My Care
                </h2>
            </div>
            {/* Lonceng notif */}
            <div className='w-[56px] flex justify-center items-center'>
                <Image src="/lonceng.png" alt='notif' width={13.5} height={18} />
            </div>
        </div>
    );
};

export default Header;
