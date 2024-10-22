export interface Doctor {
    availability: {
        [key: string]: string; // e.g., "senin": "9:00 AM - 5:00 PM"
    };
    doctor_id: number;
    hospital_id: number;
    name: string;
    specialization: string;
}
