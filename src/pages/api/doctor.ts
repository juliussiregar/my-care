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
