"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Prescription {
    id: string;
    name: string;
    dosis: string;
    durasi: string;
    indikasi: string;
}

interface LabData {
    jenisPemeriksaan: string;
    tanggalSampel: string;
    dokterPengirim: string;
    keterangan: string;
    buttonText: string;
}

interface ObatData {
    prescriptions: Prescription[];
    buttonText: string;
}

interface RadiologiData {
    jenisPemeriksaan: string;
    tanggalSampel: string;
    radiolog: string;
    hasilPemeriksaan: { id: string; text: string }[];
    keterangan: string;
    buttonText: string;
}

interface MedicalData {
    lab: LabData;
    obat: ObatData;
    radiologi: RadiologiData;
}

interface ActionButtonProps {
    text: string;
    onClick?: () => void;
}

const MenuMedical: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"lab" | "obat" | "radiologi">(
        "lab"
    );

    const tabs = [
        { id: "lab" as const, label: "Lab" },
        { id: "obat" as const, label: "Obat" },
        { id: "radiologi" as const, label: "Radiologi" },
    ];

    const medicalData: MedicalData = {
        lab: {
            jenisPemeriksaan: "drg. Annisa Melinda",
            tanggalSampel: "20 September 2024",
            dokterPengirim: "dr. Emira",
            keterangan:
                "Semua parameter dalam batas normal. Tidak ditemukan kelainan pada hasil darah lengkap.",
            buttonText: "Lihat Hasil Lab",
        },
        obat: {
            prescriptions: [
                {
                    id: "amox1",
                    name: "Amoxicillin 500mg",
                    dosis: "1 kapsul, 3 kali sehari",
                    durasi: "7 hari",
                    indikasi: "Infeksi gigi setelah pencabutan gigi bungsu",
                },
                {
                    id: "ibup1",
                    name: "Ibuprofen 400mg",
                    dosis: "1 tablet, sesuai kebutuhan (maksimal 3 kali sehari)",
                    durasi: "Sesuai kebutuhan",
                    indikasi: "Nyeri pasca-operasi",
                },
                {
                    id: "chlor1",
                    name: "Chlorhexidine Mouthwash 0.12%",
                    dosis: "Kumur 15ml, 2 kali sehari",
                    durasi: "10 hari",
                    indikasi: "Untuk mencegah infeksi pada luka pasca-operasi",
                },
            ],
            buttonText: "Lihat Resep",
        },
        radiologi: {
            jenisPemeriksaan: "drg. Annisa Melinda",
            tanggalSampel: "20 September 2024",
            radiolog: "dr. Emira",
            hasilPemeriksaan: [
                {
                    id: "hasil1",
                    text: "Paru-paru tampak jernih, tidak ada tanda-tanda infeksi atau lesi.",
                },
                {
                    id: "hasil2",
                    text: "Jantung berukuran normal, tidak ada tanda-tanda pembesaran.",
                },
                {
                    id: "hasil3",
                    text: "Diafragma dalam posisi normal, tidak ada kelainan.",
                },
            ],
            keterangan:
                "Tidak ada kelainan radiologi yang signifikan pada dada. Kondisi paru-paru dan jantung dalam batas normal.",
            buttonText: "Lihat Hasil Radiologi",
        },
    };

    return (
        <div>
            <div className="flex justify-between w-auto h-[46px] font-open-sans text-[14px] leading-[22px] font-bold text-[#6278A1] p-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`h-8 w-[120px] text-center focus:outline-none ${
                            activeTab === tab.id
                                ? "text-[#191F2A] border-b-2 border-[#0D0DCD]"
                                : "text-black"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="w-auto h-auto ">
                {activeTab === "lab" && <LabContent data={medicalData.lab} />}
                {activeTab === "obat" && (
                    <ObatContent data={medicalData.obat} />
                )}
                {activeTab === "radiologi" && (
                    <RadiologiContent data={medicalData.radiologi} />
                )}
            </div>
        </div>
    );
};

const LabContent: React.FC<{ data: LabData }> = ({ data }) => (
    <>
        <div className="w-auto h-[96px] p-4 mt-2 rounded-lg font-open-sans text-xs text-[#3B4963]">
            <div className="grid grid-cols-2">
                <div className="font-bold">Jenis Pemeriksaan</div>
                <div className="text-left">{data.jenisPemeriksaan}</div>
            </div>
            <div className="grid grid-cols-2 my-2">
                <div className="font-bold">Tanggal Sampel</div>
                <div className="text-left">{data.tanggalSampel}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="font-bold">Dokter Pengirim</div>
                <div className="text-left">{data.dokterPengirim}</div>
            </div>
        </div>
        <div className="w-auto h-auto border border-l-2 border-[#8C8CEB] bg-[#F1F4FA] font-open-sans text-xs px-5 mx-4">
            <div className="font-bold my-1">Keterangan</div>
            <div className="mb-1">{data.keterangan}</div>
        </div>
        <ActionButton text={data.buttonText} />
    </>
);

const ObatContent: React.FC<{ data: ObatData }> = ({ data }) => (
    <>
        <div className="w-auto px-4 pt-4 mt-2 rounded-lg font-open-sans text-xs text-[#3B4963]">
            {data.prescriptions.map((prescription) => (
                <div key={prescription.id} className="mb-4 border-b pb-2">
                    <div className="font-bold text-sm mb-2">
                        {prescription.name}
                    </div>
                    <div className="ml-2">
                        <p>
                            <span className="font-semibold">Dosis:</span>{" "}
                            {prescription.dosis}
                        </p>
                        <p>
                            <span className="font-semibold">Durasi:</span>{" "}
                            {prescription.durasi}
                        </p>
                        <p>
                            <span className="font-semibold">Indikasi:</span>{" "}
                            {prescription.indikasi}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        <ActionButton text={data.buttonText} />
    </>
);

const RadiologiContent: React.FC<{ data: RadiologiData }> = ({ data }) => (
    <>
        <div className="w-auto h-auto p-4 mt-2 rounded-lg font-open-sans text-xs text-[#3B4963]">
            <div className="grid grid-cols-2">
                <div className="font-bold">Jenis Pemeriksaan</div>
                <div className="text-left">{data.jenisPemeriksaan}</div>
            </div>
            <div className="grid grid-cols-2 my-2">
                <div className="font-bold">Tanggal Sampel</div>
                <div className="text-left">{data.tanggalSampel}</div>
            </div>
            <div className="grid grid-cols-2 mb-2">
                <div className="font-bold">Radiolog</div>
                <div className="text-left">{data.radiolog}</div>
            </div>
            <div>
                <div className="font-bold mb-1">Hasil Pemeriksaan:</div>
                <ul className="list-disc ml-4">
                    {data.hasilPemeriksaan.map((hasil) => (
                        <li key={hasil.id}>{hasil.text}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="w-auto h-auto border border-l-2 border-[#8C8CEB] bg-[#F1F4FA] font-open-sans text-xs px-5 mx-4">
            <div className="font-bold my-1">Keterangan</div>
            <div className="mb-1">{data.keterangan}</div>
        </div>
        <ActionButton text={data.buttonText} />
    </>
);

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center w-[328px] h-[48px] bg-[#0D0DCD] rounded-xl m-4 mb-2 font-open-sans hover:bg-[#0A0A9F] focus:outline-none focus:ring-2 focus:ring-[#0D0DCD] focus:ring-offset-2"
    >
        <Image src="/eye.svg" alt="" width={22} height={15} className="ml-4" />
        <span className="text-white text-[14px] leading-[22px] text-center flex-1 font-semibold">
            {text}
        </span>
    </button>
);

export default MenuMedical;
