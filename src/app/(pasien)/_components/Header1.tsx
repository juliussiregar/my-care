"use client";

import Image from 'next/image';

const Header1: React.FC = () => {
    return (
        <div className="flex h-[56px] items-center justify-between ml-4 mr-4">
            <p
                className="text-[14px] font-normal leading-4 tracking-[0.2px]"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#191F2A' }}
            >
                Login/Register
            </p>
            <div className="justify-end">
                <Image src="/lonceng.png" alt='notif' width={16} height={16} />
            </div>
        </div>
    );
};

export default Header1;
