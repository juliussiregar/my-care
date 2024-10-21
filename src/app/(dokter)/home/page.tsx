import React from 'react';
import Header from './_components/Header';
import WelcomeCard from './_components/WelcomeCard';
import Schedule from './_components/Schedule';
import Image from 'next/image';
import ScheduleCard from './_components/ScheduleCard';
import Footer from '../_components/Footer_Doctor';

const Home = () => {
    return (
        <div className='flex flex-col min-h-screen pb-[68px]'>
            <Header />
            <WelcomeCard />
            <Schedule />
            <ScheduleCard />
            <Footer />
        </div>
    );
};

export default Home;
