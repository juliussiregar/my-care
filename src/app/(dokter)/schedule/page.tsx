// Schedule.tsx
"use client";
import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../home/_components/Header';
import Footer from '../_components/Footer_Doctor';
import ScheduleHero from '../home/_components/ScheduleHero';
import ScheduleDetail from './_components/ScheduleDetail';
import ScheduleDay from './_components/ScheduleDay';

interface AvailabilitySchedule {
    [key: string]: string;
}

const Schedule: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { data: session } = useSession();

    const doctorId = 1;

    const availableSchedule: AvailabilitySchedule = useMemo(() => 
        session?.user?.availability_schedule || {},
        [session?.user?.availability_schedule]
    );

    const hasAppointments = (date: Date) => {
        const day = date.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
        return availableSchedule[day] !== undefined;
    };

    return (
        <div className='flex flex-col min-h-screen pb-[68px]'>
            <Header />
            <ScheduleHero />
            <ScheduleDay 
                onDateSelect={setSelectedDate}
                doctorId={doctorId}
                availability={availableSchedule}
                selectedDate={selectedDate}
            />
            <ScheduleDetail 
                selectedDate={selectedDate}
                hasAppointments={hasAppointments(selectedDate)}
                doctorSchedule={availableSchedule} 
            />
            <Footer />
        </div>
    );
};

export default Schedule;
