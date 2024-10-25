import Image from "next/image";
import Link from "next/link";

const AppointmentTimeline = () => {
    // Data hardcode untuk appointments
    const upcomingAppointment = {
        id: "12345678",
        date: "20 September 2024",
        hospital: "RS Immanuel",
        doctor: "Dr. Romi",
        specialist: "Dokter Gigi",
        type: "Outpatient",
        bookingId: "BF1234567",
    };

    const pastAppointments = [
        {
            id: "123456790",
            date: "15 September 2024",
            hospital: "RS Immanuel",
            doctor: "Dr. Romi",
            specialist: "Dokter Gigi",
            type: "Outpatient",
            bookingId: "BF1234567",
            hasLab: true,
            hasMedicine: true,
            hasRadiology: true,
        },
        {
            id: "123456791",
            date: "10 September 2024",
            hospital: "RS Immanuel",
            doctor: "Dr. Romi",
            specialist: "Dokter Gigi",
            type: "Outpatient",
            bookingId: "BF1234567",
            hasLab: true,
            hasMedicine: true,
            hasRadiology: true,
        },
    ];

    return (
        <div className="w-auto h-auto text-xs text-[#3B4963] font-open-sans p-4 pr-8">
            <h3 className="font-bold mb-4">Rekam Medis</h3>

            {/* Upcoming Appointments */}
            <div className="relative">
                <div className="absolute left-0 top-0 w-4 flex flex-col items-center">
                    <Image
                        src="/sand-clock.svg"
                        alt="Upcoming appointments"
                        width={16}
                        height={16}
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
                <h3 className="ml-6 font-bold">Upcoming appointment</h3>
                <Link
                    href={`/medical-record/${upcomingAppointment.id}/detail/${upcomingAppointment.id}/menu/1`}
                >
                    <div className="ml-6 bg-white rounded-[10px] p-4 border border-[#D7D7F8] my-2 cursor-pointer">
                        <div className="flex items-center mb-2">
                            <Image
                                src="/tanggal.svg"
                                alt="date"
                                width={16}
                                height={16}
                                className="mr-2"
                            />
                            <span className="text-xs">
                                {upcomingAppointment.date}
                            </span>
                        </div>
                        <h4 className="font-bold text-[#191F2A]">
                            {upcomingAppointment.hospital}
                        </h4>
                        <p className="text-xs my-[2px]">
                            {upcomingAppointment.doctor} •{" "}
                            {upcomingAppointment.specialist}
                        </p>
                        <p className="text-[#6C7793] text-xs">
                            {upcomingAppointment.type} •{" "}
                            {upcomingAppointment.bookingId}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Past Appointments */}
            <div className="relative">
                <div className="absolute left-0 top-0 w-4 flex flex-col items-center">
                    <Image
                        src="/past-appointment.svg"
                        alt="Past appointments"
                        width={16}
                        height={16}
                    />
                    <div className="w-[1px] h-[140px] bg-[#C3C3F5]"></div>
                    <Image
                        src="/past-appointment.svg"
                        alt="Past appointments"
                        width={16}
                        height={16}
                    />
                </div>
                {pastAppointments.map((appointment, index) => (
                    <Link
                        href={`/medical-record/${appointment.id}/detail/${appointment.id}/menu/1`}
                        key={index}
                    >
                        <div className="ml-6 bg-white rounded-[10px] p-4 border border-[#D7D7F8] my-4 cursor-pointer">
                            <div className="flex items-center mb-2">
                                <Image
                                    src="/tanggal.svg"
                                    alt="date"
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                />
                                <span className="text-xs">
                                    {appointment.date}
                                </span>
                            </div>
                            <h4 className="font-bold text-[#191F2A]">
                                {appointment.hospital}
                            </h4>
                            <p className="text-xs my-[2px]">
                                {appointment.doctor} • {appointment.specialist}
                            </p>
                            <p className="text-[#6C7793] text-xs">
                                {appointment.type} • {appointment.bookingId}
                            </p>
                            <div className="flex gap-4 mt-3 ml-5">
                                {appointment.hasLab && (
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
                                {appointment.hasMedicine && (
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
                                {appointment.hasRadiology && (
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AppointmentTimeline;
