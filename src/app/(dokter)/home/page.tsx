"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from './_components/Header';
import WelcomeCard from './_components/WelcomeCard';
import Schedule from './_components/Schedule';
import ScheduleCard from './_components/ScheduleCard';
import Footer from '../_components/Footer_Doctor';
import { fetchAppointments } from '../../../../pages/api/doctor';
import { formatDate } from '@/utils/date';

interface AppointmentData {
    appointment_id: number;
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    patient_name: string;
    status: string;
    symtomps: string;
}

const Home = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const { data: session } = useSession();

    const fetchAppointmentsData = useCallback(async (date: string) => {
        if (!session?.user?.jwt) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const token = session.user.jwt;
            const fetchedAppointments = await fetchAppointments(date, date, token);
            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }, [session]);

    const setDefaultDate = useCallback(() => {
        const today = new Date();
        const formattedDate = formatDate(today);
        setSelectedDate(formattedDate);
        
        // Format date for API (YYYY-MM-DD)
        const apiDate = today.toLocaleDateString('en-CA');
        fetchAppointmentsData(apiDate);
    }, [fetchAppointmentsData]);

    useEffect(() => {
        if (session?.user?.jwt) {
            setDefaultDate();
        }
    }, [session, setDefaultDate]);

    const handleDateSelect = (date: Date) => {
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        
        // Format date for API (YYYY-MM-DD)
        const apiDate = date.toLocaleDateString('en-CA');
        fetchAppointmentsData(apiDate);
    };

    return (
        <div className='flex flex-col min-h-screen pb-[68px]'>
            <Header />
            <WelcomeCard />
            <Schedule 
                selectedDate={selectedDate}
                appointments={appointments}
                onDateSelect={handleDateSelect}
            />
            <ScheduleCard 
                appointments={appointments}
            />
            <Footer />
        </div>
    );
};
   
export default Home;