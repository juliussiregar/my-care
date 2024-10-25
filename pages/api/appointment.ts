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
        const response = await axios.post("http://157.245.52.172:5000/appointments", appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Appointment response:", response);
        return response.data;

    } catch (error: unknown) {
        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
            console.error("Error creating appointment:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error('Failed to create an appointment');
    }
};
