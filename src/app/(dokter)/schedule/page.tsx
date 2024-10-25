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
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const { data: session } = useSession();

    const doctorId = 1;

    const availableSchedule: AvailabilitySchedule = useMemo(() => 
        session?.user?.availability_schedule || {},
        [session?.user?.availability_schedule]
    );

    const hasAppointments = (date: Date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(0, 0, 0, 0);
        const dayName = adjustedDate.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
        return availableSchedule[dayName] !== undefined;
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <ScheduleHero />
            <ScheduleDay 
                onDateSelect={(date) => {
                    const adjustedDate = new Date(date);
                    adjustedDate.setHours(0, 0, 0, 0);
                    setSelectedDate(adjustedDate);
                }}
                doctorId={doctorId}
                availability={availableSchedule}
                selectedDate={selectedDate}
            />
            <ScheduleDetail 
                selectedDate={selectedDate}
                hasAppointments={hasAppointments(selectedDate)}
            />
            <Footer />
        </div>
    );
};

export default Schedule;
