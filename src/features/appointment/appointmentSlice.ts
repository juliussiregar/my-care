// src/features/appointment/appointmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
    doctor_name: string | null;
    doctor_specialization: string | null
    doctor_id: string | null;
    hospital_id: number;
    appointment_date: string | null;
    appointment_time: string | null;
    type: string | null;
}

const initialState: AppointmentState = {
    doctor_name: null,
    doctor_specialization: null,
    doctor_id: null,
    hospital_id: 1, // default to 1
    appointment_date: null,
    appointment_time: null,
    type: null,
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setAppointmentData: (state, action: PayloadAction<AppointmentState>) => {
            state.doctor_name = action.payload.doctor_name
            state.doctor_specialization = action.payload.doctor_specialization
            state.doctor_id = action.payload.doctor_id;
            state.hospital_id = action.payload.hospital_id;
            state.appointment_date = action.payload.appointment_date;
            state.appointment_time = action.payload.appointment_time;
            state.type = action.payload.type;
        },
        clearAppointmentData: (state) => {
            state.doctor_name = null;
            state.doctor_specialization =null
            state.doctor_id = null;
            state.hospital_id = 1;
            state.appointment_date = null;
            state.appointment_time = null;
            state.type = null;
        },
    },
});

export const { setAppointmentData, clearAppointmentData } = appointmentSlice.actions;

export default appointmentSlice.reducer;
