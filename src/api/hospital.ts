import axios from 'axios';
import { Hospital } from '../types/hospital'; // Pastikan untuk mengimpor interface Hospital

// Mengambil BASE_URL dari environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined. Please set it in your environment variables.');
}

// Fungsi untuk mengambil data rumah sakit
export const fetchHospitals = async (): Promise<Hospital[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/hospitals`); // Menggunakan URL lengkap
        return response.data;
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
    }
};
