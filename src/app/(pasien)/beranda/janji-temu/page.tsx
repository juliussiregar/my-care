"use client"; // Indicate that this is a client component

import React, { useState } from 'react';
import Footer from '../../_components/Footer';
import Header from '../../_components/Header';
import SearchFilter from '../../_components/SearchFilter';
import FilterComponent from '../../_components/FIlterComponent';

const Janji_Temu = () => {

    const [isFilterActive, setIsFilterActive] = useState(false);
    const [isSlidingOut, setIsSlidingOut] = useState(false);

    const handleFilterClick = () => {
        setIsSlidingOut(true);
        setTimeout(() => {
            setIsFilterActive(true);
            setIsSlidingOut(false);
        }, 500); // Duration must match the slide-out animation duration
    };

    const handleBackToSearch = () => {
        setIsSlidingOut(true);
        setTimeout(() => {
            setIsFilterActive(false);
            setIsSlidingOut(false);
        }, 500); // Duration must match the slide-out animation duration
    };

    return (
        <div className='flex flex-col min-h-screen pb-[68px]'>
            <Header />
            <div className={`transition-transform duration-500 ${isSlidingOut ? 'slide-out' : 'slide-in'}`}>
                {isFilterActive ? (
                    <FilterComponent onBack={handleBackToSearch} />
                ) : (
                    <SearchFilter onFilterClick={handleFilterClick} />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Janji_Temu;
