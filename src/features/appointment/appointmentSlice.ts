// src/features/appointment/appointmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
    doctor_name: string | null;
    doctor_specialization: string | null;
    doctor_id: string | null;
    hospital_id: number;
    appointment_date: string | null;
    appointment_time: string | null;
    type: string | null;
    symtomps: string | null;
    // Patient Data
    name: string | null;
    dateOfBirth: string | null;
    phoneNumber: string | null;
    email: string | null;
    gender: string | null;
}

interface PatientData {
    name: string | null;
    dateOfBirth: string | null;
    phoneNumber: string | null;
    email: string | null;
    gender: string | null;
}

const initialState: AppointmentState = {
    doctor_name: null,
    doctor_specialization: null,
    doctor_id: null,
    hospital_id: 1, // Default to 1
    appointment_date: null,
    appointment_time: null,
    type: null,
    symtomps: null,
    // Patient Data
    name: null,
    dateOfBirth: null,
    phoneNumber: null,
    email: null,
    gender: null,
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setAppointmentData: (state, action: PayloadAction<AppointmentState>) => {
            state.doctor_name = action.payload.doctor_name;
            state.doctor_specialization = action.payload.doctor_specialization;
            state.doctor_id = action.payload.doctor_id;
            state.hospital_id = action.payload.hospital_id;
            state.appointment_date = action.payload.appointment_date;
            state.appointment_time = action.payload.appointment_time;
            state.type = action.payload.type;
            state.symtomps = action.payload.symtomps;
        },
        setSymptomps: (state, action: PayloadAction<string>) => {
            state.symtomps = action.payload;
        },
        setPatients: (state, action: PayloadAction<PatientData>) => {
            state.name = action.payload.name;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.phoneNumber = action.payload.phoneNumber;
            state.email = action.payload.email;
            state.gender = action.payload.gender;
        },
        clearAppointmentData: (state) => {
            state.doctor_name = null;
            state.doctor_specialization = null;
            state.doctor_id = null;
            state.hospital_id = 1;
            state.appointment_date = null;
            state.appointment_time = null;
            state.type = null;
            state.symtomps = null;
            // Patient Data
            state.name = null;
            state.dateOfBirth = null;
            state.phoneNumber = null;
            state.email = null;
            state.gender = null;
        },
    },
});

export const { setAppointmentData, setSymptomps, setPatients, clearAppointmentData } = appointmentSlice.actions;

export default appointmentSlice.reducer;
