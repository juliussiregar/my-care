export interface DoctorAvailability {
    senin?: string;
    selasa?: string;
    rabu?: string;
    kamis?: string;
    jumat?: string;
    sabtu?: string;
    minggu?: string;
}

export interface Doctor {
    availability: DoctorAvailability;
    doctor_id: number;
    hospital_id: number;
    name: string;
    specialization: string;
}
