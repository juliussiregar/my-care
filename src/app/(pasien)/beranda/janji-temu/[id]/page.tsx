"use client"; // Indicate that this is a client component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { Doctor } from '@/types/doctor';
import { fetchDoctorById } from '@/pages/api/doctor';

export default function UserDetails() {
    const { id } = useParams<{ id: string }>(); // Use useParams to get the 'id' from the URL

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Fetch the doctor data by ID when the component mounts
            const fetchData = async () => {
                try {
                    const fetchedDoctor = await fetchDoctorById(Number(id));
                    setDoctor(fetchedDoctor);
                } catch (error) {
                    console.error('Error fetching doctor:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctor) {
        // Render a custom 404 page if the doctor is not found
        return (
            <div className="p-4 max-w-lg mx-auto bg-gray-100 min-h-screen">
                <h1 className="font-open-sans text-[24px] font-bold text-red-500">
                    Doctor Not Found
                </h1>
                <p>The requested doctor with ID: <strong>{id}</strong> was not found.</p>
                <button
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                    onClick={() => window.history.back()} // Use window.history.back() for backward navigation
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-lg mx-auto bg-gray-100 min-h-screen">
            <button
                className="mb-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => window.history.back()} // Use window.history.back() for backward navigation
            >
                Back
            </button>

            <h1 className="font-open-sans text-[24px] font-bold text-[#0D1F3E]">
                {`${doctor.name} - ${doctor.specialization}`}
            </h1>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Availability:</h2>
                <ul>
                    {doctor.availability ? (
                        Object.entries(doctor.availability).map(([day, time]) => (
                            <li key={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
                            </li>
                        ))
                    ) : (
                        <li>No availability information available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
