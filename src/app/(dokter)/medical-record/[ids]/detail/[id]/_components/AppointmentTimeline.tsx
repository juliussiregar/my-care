"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { fetchAppoinmentDetail } from "../../../../../../../../pages/api/doctor";

interface Appointment {
    appointment_id: number;
    appointment_date: string;
    appointment_time: string;  // Tambahkan appointment_time
    patient_name: string;
    hospital?: string;
    doctor_name?: string;
    specialist?: string;
    appointment_type: string;
    booking_id?: string;
    has_lab?: boolean;
    has_medicine?: boolean;
    has_radiology?: boolean;
}

const AppointmentTimeline = () => {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const patientName = searchParams?.get('patient');
    const selectedDate = searchParams?.get('date'); // Tambahkan parameter date

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.jwt) {
                console.error("User is not authenticated");
                return;
            }

            setLoading(true);
            try {
                const fetchedAppointments = await fetchAppoinmentDetail(session.user.jwt);
                
                let filteredAppointments = fetchedAppointments;
                if (patientName) {
                    filteredAppointments = fetchedAppointments.filter(
                        (appointment: Appointment) => appointment.patient_name === patientName
                    );
                }
                
                const sortedAppointments = filteredAppointments.sort((a: Appointment, b: Appointment) => {
                    const dateTimeA = new Date(`${a.appointment_date}T${a.appointment_time}`);
                    const dateTimeB = new Date(`${b.appointment_date}T${b.appointment_time}`);
                    return dateTimeB.getTime() - dateTimeA.getTime();
                });

                setAppointments(sortedAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session, patientName]);

    if (loading) {
        return (
            <div className="w-auto h-auto text-xs text-[#3B4963] font-open-sans p-4 pr-8 flex justify-center items-center">
                Loading...
            </div>
        );
    }

    const currentDateTime = new Date();
    const selectedDateTime = selectedDate ? new Date(selectedDate) : currentDateTime;

    // Filter untuk upcoming appointment
    const upcomingAppointments = appointments.filter(appointment => {
        const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
        
        // Jika ada selectedDate, filter appointment pada tanggal tersebut yang belum lewat jamnya
        if (selectedDate) {
            const isSameDate = appointmentDateTime.toDateString() === selectedDateTime.toDateString();
            const isUpcoming = appointmentDateTime >= currentDateTime;
            return isSameDate && isUpcoming;
        }
        
        // Jika tidak ada selectedDate, ambil appointment terdekat yang belum lewat
        return appointmentDateTime >= currentDateTime;
    });

    // Ambil appointment paling awal dari upcoming appointments
    const upcomingAppointment = upcomingAppointments[upcomingAppointments.length - 1];

    // Filter untuk past appointments
    const pastAppointments = appointments.filter(appointment => {
        const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
        return appointmentDateTime < currentDateTime;
    });

    const appointmentCard = (appointment: Appointment, isPast: boolean = false) => (
        <div className="bg-white rounded-[10px] p-4 border border-[#D7D7F8] my-2 cursor-pointer">
            <div className="flex items-center mb-2">
                <Image
                    src="/tanggal.svg"
                    alt="date"
                    width={16}
                    height={16}
                    className="mr-2"
                />
                <span className="text-xs">
                    {new Date(appointment.appointment_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                    {' • '}
                    {appointment.appointment_time.substring(0, 5)} {/* Tampilkan jam */}
                </span>
            </div>
            <h4 className="font-bold text-[#191F2A]">
                {appointment.hospital ?? "RS Immanuel"}
            </h4>
            <p className="text-xs my-[2px]">
                {appointment.doctor_name ?? "Dr. Romi"} • {appointment.specialist ?? "Dokter Gigi"}
            </p>
            <p className="text-[#6C7793] text-xs">
                Outpatient • {appointment.booking_id ?? "BF1234567"}
            </p>
            {isPast && (
                <div className="flex gap-4 mt-3 ml-5">
                    {appointment.has_lab && (
                        <div className="flex items-center">
                            <Image
                                src="/check.svg"
                                alt="check"
                                width={16}
                                height={16}
                                className="mr-1"
                            />
                            <span>Lab</span>
                        </div>
                    )}
                    {appointment.has_medicine && (
                        <div className="flex items-center">
                            <Image
                                src="/check.svg"
                                alt="check"
                                width={16}
                                height={16}
                                className="mr-1"
                            />
                            <span>Obat</span>
                        </div>
                    )}
                    {appointment.has_radiology && (
                        <div className="flex items-center">
                            <Image
                                src="/check.svg"
                                alt="check"
                                width={16}
                                height={16}
                                className="mr-1"
                            />
                            <span>Radiologi</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-auto h-auto text-xs text-[#3B4963] font-open-sans p-4 pr-8">
            <h3 className="font-bold mb-4">Rekam Medis</h3>

            <div className="h-[444px] pr-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
                <div className="relative">
                    {/* Upcoming Appointments */}
                    {upcomingAppointment && (
                        <div className="relative">
                            <div className="absolute left-0 top-0 w-4 flex flex-col items-center">
                                <Image
                                    src="/sand-clock.svg"
                                    alt="Upcoming appointments"
                                    width={16}
                                    height={16}
                                    className="mb-2"
                                />
                                <div
                                    className="w-[1px] h-[133px] bg-[#C3C3F5]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, #C3C3F5 50%, transparent 50%)",
                                        backgroundSize: "1px 8px",
                                    }}
                                ></div>
                            </div>
                            <div className="ml-6">
                                <h3 className="font-bold mb-2 text-[#3B4963]">Upcoming appointment</h3>
                                <Link
                                    href={`/medical-record/${upcomingAppointment.appointment_id}/detail/${upcomingAppointment.appointment_id}/menu/${upcomingAppointment.appointment_id}`}
                                >
                                    {appointmentCard(upcomingAppointment)}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Past Appointments */}
                    {pastAppointments.length > 0 && (
                        <div className="relative">
                            {pastAppointments.map((appointment, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute left-0 top-0 w-4 flex flex-col items-center h-full">
                                        <div className="circle-dot w-[8px] h-[8px] bg-[#C3C3F5] rounded-full absolute left-1 top-[10px] z-10"></div>
                                        {index !== pastAppointments.length - 1 && (
                                            <div className="w-[1px] h-[133px] bg-[#C3C3F5] absolute top-[18px]"></div>
                                        )}
                                    </div>
                                    <div className="ml-6">
                                        <Link
                                            href={`/medical-record/${appointment.appointment_id}/detail/${appointment.appointment_id}/menu/${appointment.appointment_id}`}
                                            className="block mb-4"
                                        >
                                            {appointmentCard(appointment, true)}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentTimeline;