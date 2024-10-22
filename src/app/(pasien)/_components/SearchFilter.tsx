// app/(pasien)/beranda/janji-temu/_components/SearchFilter.tsx

import React from 'react';
import Image from 'next/image';
import DoctorCard from './DoctorCard';

// Define the props type
interface SearchFilterProps {
    onFilterClick: () => void; // onFilterClick is a function that returns void
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterClick }) => {
    return (
        <div>
            <div className='h-[118px] py-[20px] px-[16px] gap-[8px] border-t-[1px]'>
                <div className='flex flex-row w-[328px] h-[40px]'>
                    <div className='w-[280px] h-[40px] border border-[#C0C9D9] rounded-md px-[12px] py-[9px]'>
                        <p className="font-open-sans text-left text-[14px] font-normal leading-[20px] tracking-[0.1px] text-[#C0C9D9]">
                            Cari Dokter
                        </p>
                    </div>
                    <Image src="/search.svg" alt='search' width={24} height={24} className='ml-4' />
                </div>
                <Image 
                    src="/filter.svg" 
                    alt='filter' 
                    height={30} 
                    width={44} 
                    className='transition-transform duration-200 hover:scale-110 mt-3 cursor-pointer' 
                    onClick={onFilterClick} // Use the passed prop
                />
            </div>
            <DoctorCard />
        </div>
    );
};

export default SearchFilter;
