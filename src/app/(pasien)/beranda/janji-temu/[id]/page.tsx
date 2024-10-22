// app/janji-temu/[id]/page.tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { Doctor } from '@/types/doctor';
import { fetchDoctors } from '@/pages/api/doctor'; // Adjust the import path as necessary

type CheckoutProps = {
    doctor: Doctor | null;
};

export default function UserDetails({ doctor }: CheckoutProps) {
    return (
        <div className="p-4 max-w-lg mx-auto bg-gray-100 min-h-screen">
            <button
                className="mb-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => window.history.back()}
            >
                Back
            </button>

            {doctor ? (
                <>
                    <h1 className="font-open-sans text-[24px] font-bold text-[#0D1F3E]">
                        {`${doctor.name} - ${doctor.specialization}`}
                    </h1>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Availability:</h2>
                        <ul>
                            {Object.entries(doctor.availability).map(([day, time]) => (
                                <li key={day}>
                                    {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen text-gray-500">
                    User ID: Not Found
                </div>
            )}
        </div>
    );
}

// Fungsi untuk mendapatkan semua jalur yang akan dipra-render
export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const doctors = await fetchDoctors(); // Ambil semua data dokter
        const paths = doctors.map((doctor) => ({
            params: { id: doctor.doctor_id.toString() }, // Konversi doctor_id ke string
        }));

        return {
            paths, // Jalur yang akan dipra-render
            fallback: false, // Jika false, maka halaman yang tidak terdaftar akan menghasilkan 404
        };
    } catch (error) {
        console.error('Error fetching doctors for paths:', error);
        return { paths: [], fallback: false };
    }
};

// Fungsi untuk mendapatkan data dokter berdasarkan parameter id
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };

    try {
        const doctors = await fetchDoctors(); // Ambil semua data dokter
        const doctor = doctors.find((doc: Doctor) => doc.doctor_id === Number(id)) || null; // Temukan dokter berdasarkan id

        return {
            props: {
                doctor, // Kirim data dokter ke komponen sebagai props
            },
        };
    } catch (error) {
        console.error('Error fetching doctor:', error);
        return {
            props: {
                doctor: null, // Jika terjadi error, kirim null sebagai props
            },
        };
    }
};
