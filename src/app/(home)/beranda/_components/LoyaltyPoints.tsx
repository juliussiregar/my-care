// components/LoyaltyPoints.tsx
"use client";

import { useRouter } from 'next/navigation';

const LoyaltyPoints: React.FC = () => {
    const router = useRouter();

    const handleNextClick = () => {
        router.push('/loyalty');
    };

    return (
        <div className='w-[328px] h-[40px] flex items-center bg-white mx-auto rounded-lg -mt-[20px] border border-[#E0E4EC] shadow-md pr-2 pl-4'>
            <span
                className="text-[12px] font-bold leading-4 tracking-[0.2px] text-left"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
                Loyalty Points
            </span>
            <span
                className="text-[12px] font-normal leading-4 tracking-[0.2px] text-left ml-2"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
                1000 points
            </span>
            <button
                onClick={handleNextClick}
                className="ml-auto w-10 h-10 flex items-center justify-center hover:bg-primary active:bg-primary transition-colors duration-100 text-black hover:text-white"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-100"
                >
                    <path
                        d="M8 5L15 12L8 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default LoyaltyPoints;
