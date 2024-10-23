import Image from "next/image";
import React from "react";

interface PatientData {
    patientName: string;
    type: 'Outpatient' | 'Inpatient';
}

interface TimeSlotData {
    time: string;
    duration: string;
    patients: PatientData[];
}

const PatientItem: React.FC<PatientData> = ({ patientName, type }) => {
    return (
        <div className="flex items-center justify-between w-[260px] h-[58px] bg-[#F0F0FC] p-3 rounded">
            <div className="flex items-center">
                <Image
                    src="/outpatient.svg"
                    alt="outpatient"
                    width={20}
                    height={20}
                />
                <div className="font-open-sans ml-2">
                    <h3 className="text-[10px]">{type}</h3>
                    <h3 className="text-xs font-bold">
                        {patientName}
                    </h3>
                </div>
            </div>
            <Image
                src="/icon-right.svg"
                alt="icon-right"
                width={20}
                height={20}
            />
        </div>
    );
};

const TimeSlot: React.FC<TimeSlotData> = ({ time, duration, patients }) => {
    return (
        <div className="flex">
            <div className="flex flex-col items-start w-[60px] text-xs text-[#3B4963] px-2 py-3 ml-2"> 
                <div className="flex items-center">
                    <Image
                        src="/clock.svg"
                        alt="clock"
                        width={16}
                        height={16}
                        className="mr-1"
                    />
                    <h3 className="text-left">{time}</h3>
                </div>
                <h3 className="text-[#4E6082] mt-1">{duration}</h3>
            </div>
            <div className="flex flex-col space-y-2 ml-2 mr-4 py-2">
                {patients.map((patient, index) => (
                    <PatientItem
                        key={index}
                        {...patient}
                    />
                ))}
            </div>
        </div>
    );
};

const ScheduleDetail: React.FC = () => {
    const timeSlots: TimeSlotData[] = [
        {
            time: "08:30",
            duration: "1hr",
            patients: [
                {
                    patientName: "Faisal Kemal",
                    type: "Outpatient"
                },
                {
                    patientName: "Junaedi",
                    type: "Outpatient"
                }
            ]
        },
        {
            time: "09:30",
            duration: "1hr",
            patients: [
                {
                    patientName: "Dian Yuanda",
                    type: "Outpatient"
                },
                {
                    patientName: "Christian",
                    type: "Outpatient"
                },
                {
                    patientName: "Jessica Andreas",
                    type: "Outpatient"
                },
                {
                    patientName: "Nabila Salsabila",
                    type: "Outpatient"
                }
            ]
        },
        {
            time: "10:30",
            duration: "1hr",
            patients: [
                {
                    patientName: "Alice Smith",
                    type: "Outpatient"
                },
                {
                    patientName: "Bob Wilson",
                    type: "Outpatient"
                },
                {
                    patientName: "Carol Brown",
                    type: "Outpatient"
                }
            ]
        }
    ];

    return (
        <div className="relative w-[360px] h-[678px] bg-white flex flex-col gap-4">
            <div className="flex items-center text-xs h-[34px] bg-[#F0F0FC]">
                <h3 className="font-open-sans text-[#4E6082] ml-4">Hari Ini</h3>
                <div className="bg-[#6278A1] rounded-full w-1 h-1 ml-2"></div>
                <h3 className="font-open-sans text-[#4E6082] ml-2 font-bold">
                    Senin, 10 September 2024
                </h3>
                <button
                    className="flex flex-row space-x-1 items-center cursor-pointer ml-2"
                >
                    <Image
                        src="/down.svg"
                        alt="down"
                        width={11.25}
                        height={6.75}
                    />
                </button>
            </div>
            <div className="h-[628px] overflow-y-auto">
                <div className="h-[32px] text-xs text-[#4E6082] flex items-center ml-4">
                    <h3 className="w-[60px]">Time</h3>
                    <h3 className="ml-2">Pasien</h3>
                </div>
                <div className="h-[569px]">
                    <div className="flex flex-col">
                        {timeSlots.map((slot, index) => (
                            <TimeSlot
                                key={index}
                                {...slot}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleDetail;
