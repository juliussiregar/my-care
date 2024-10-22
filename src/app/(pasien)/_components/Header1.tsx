"use client";

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header1: React.FC = () => {
    const { data: session } = useSession();

    // Function to get the name from email
    const getNameFromEmail = (email: string) => {
        const name = email.split('@')[0]; // Take the part before '@'
        return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
    };

    return (
        <div className="flex h-[56px] items-center justify-between ml-4 mr-4">
            {session?.user ? (
                <>
                    <p
                        className="text-[14px] font-normal leading-4 tracking-[0.2px]"
                        style={{ fontFamily: 'Open Sans, sans-serif', color: '#191F2A' }}
                    >
                        {getNameFromEmail(session.user.email)}
                    </p>
                </>
            ) : (
                <Link href="/auth/login">
                    <p className="text-[14px] font-normal leading-4 tracking-[0.2px] cursor-pointer" 
                       style={{ fontFamily: 'Open Sans, sans-serif', color: '#191F2A' }}>
                        Login/Register
                    </p>
                </Link>
            )}
            <div className="justify-end">
                <Image src="/lonceng.png" alt='notif' width={16} height={16} />
            </div>
        </div>
    );
};

export default Header1;
