// app/pages/api/doctor.ts
"use server"
import axios from 'axios'; // Import Axios

const baseUrl = "http://157.245.52.172:5000";

export const fetchDoctors = async () => {
    try {
        const response = await axios.get(`${baseUrl}/doctors`); // Use Axios to make a GET request
        return response.data; // Return the data directly
    } catch (error) {
        // Handle error
        console.error('Failed to fetch doctors:', error);
        throw new Error('Failed to fetch doctors');
    }
};

// Function to fetch doctor details by ID
export const fetchDoctorById = async (doctorId: number) => {
    try {
        const response = await axios.get(`${baseUrl}/doctors?doctor_id=${doctorId}`); // Make a GET request with doctor_id
        return response.data; // Return the data directly
    } catch (error) {
        // Handle error
        console.error(`Failed to fetch doctor with ID ${doctorId}:`, error);
        throw new Error('Failed to fetch doctor details');
    }
};

// Function to fetch doctor schedule by filter
export const fetchDoctorScheduleFilter = async (startDate?: Date, endDate?: Date) => {
    try {
        const response = await axios.get(`${baseUrl}/doctors/appointments?type=confirmed&start_date=${startDate}&end_date=${endDate}`); // Make a GET request with doctor_id
        return response.data; // Return the data directly
    } catch (error) {
        // Handle error
        console.error(`Failed to fetch doctor with ${startDate} and ${endDate}:`, error);
        throw new Error('Failed to fetch doctor schedule');
    }
};

// Function to fetch doctor schedule
export const fetchDoctorSchedule = async () => {
    try {
        const response = await axios.get(`${baseUrl}/doctors/appointments?type=confirmed`); // Make a GET request with doctor_id
        return response.data; // Return the data directly
    } catch (error) {
        // Handle error
        console.error(`Failed to fetch doctor schedule:`, error);
        throw new Error('Failed to fetch doctor schedule');
    }
};

// Function to fetch appointments within a date range
export const fetchAppointments = async (startDate: string, endDate: string, token: string) => {
    try {
        const response = await axios.get(`${baseUrl}/doctors/appointments?start_date=${startDate}&end_date=${endDate}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the Authorization header
            },
        });

        console.log("Fetched appointments response:", response.data); // Log the response JSON

        return response.data; // Return the fetched appointments
    } catch (error) {
        // Handle error
        console.error(`Failed to fetch appointments from ${startDate} to ${endDate}:`, error);
        throw new Error("Failed to fetch appointments");
    }
};
