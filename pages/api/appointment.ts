"use server"
import axios from 'axios';

export const createAppointment = async (appointmentData: {
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    symtomps: string;
    name: string;
    type: string;
}, token: string) => {
    try {
        // Make the API request to the external server
        const response = await axios.post("http://157.245.52.172:5000/appointments", appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token here
                'Content-Type': 'application/json',
            },
        });

        console.log("Appointment response:", response);
        return response.data; // Return the response data

    } catch (error: any) {
        console.error("Error creating appointment:", error.response?.data || error.message);
        throw new Error('Failed to create an appointment');
    }
};
