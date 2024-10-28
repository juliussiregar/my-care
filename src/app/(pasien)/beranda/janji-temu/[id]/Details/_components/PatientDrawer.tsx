import { RootState } from "@/app/store";
import { setPatients } from "@/features/appointment/appointmentSlice";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

interface PatientDrawerProps {
    isVisible: boolean;
    onClose: () => void;
}

interface CustomHeaderProps {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({
    isVisible,
    onClose,
}) => {
    const dispatch = useDispatch();
    const patientState = useSelector((state: RootState) => state.appointment);

    // Form state
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedGender, setSelectedGender] = useState("");
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Effect untuk mengisi form dengan data yang sudah ada
    useEffect(() => {
        if (patientState) {
            setName(patientState.name || "");
            setPhoneNumber(patientState.phoneNumber || "");
            setEmail(patientState.email || "");
            setSelectedGender(patientState.gender || "");
            // Convert string date to Date object if exists
            setSelectedDate(patientState.dateOfBirth ? new Date(patientState.dateOfBirth) : null);
        }
    }, [patientState]);

    // Effect untuk memantau perubahan state setelah submit
    useEffect(() => {
        if (isSubmitted) {
            console.log('Updated Redux State:', patientState);
            setIsSubmitted(false);
        }
    }, [patientState, isSubmitted]);

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.replace(/\D/g, "");
        if (!value.startsWith("62")) {
            value = "62" + value;
        }
        setPhoneNumber(value);
    };

    const getDisplayPhoneNumber = () => {
        if (!phoneNumber) return "";
        // Jika nomor dimulai dengan 62, hilangkan untuk tampilan
        return phoneNumber.startsWith("62") ? phoneNumber.slice(2) : phoneNumber;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const toggleGenderDropdown = () => {
        setIsGenderDropdownOpen(!isGenderDropdownOpen);
    };

    const selectGender = (gender: string) => {
        setSelectedGender(gender);
        setIsGenderDropdownOpen(false);
    };

    const handleContinue = () => {
        // Create the patient data object
        const patientData = {
            name: name || null,
            dateOfBirth: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
            phoneNumber: phoneNumber || null,
            email: email || null,
            gender: selectedGender || null
        };

        console.log('Previous Redux State:', patientState);
        console.log('Data to be dispatched:', patientData);

        // Dispatch the action
        dispatch(setPatients(patientData));
        
        // Set submitted flag to true to trigger the useEffect
        setIsSubmitted(true);

        onClose();
    };

    const CustomHeader = ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }: CustomHeaderProps): JSX.Element => {
        const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        return (
            <div className="flex flex-col bg-white p-2">
                <div className="flex justify-between items-center mb-2">
                    <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Image
                            src="/left.svg"
                            alt="Previous"
                            width={20}
                            height={20}
                        />
                    </button>
                    <div className="flex gap-2">
                        <select
                            value={months[date.getMonth()]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                            className="border border-gray-200 rounded px-2 py-1 text-sm font-open-sans"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            value={date.getFullYear()}
                            onChange={({ target: { value } }) =>
                                changeYear(Number(value))
                            }
                            className="border border-gray-200 rounded px-2 py-1 text-sm font-open-sans"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Image
                            src="/right.svg"
                            alt="Next"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`fixed inset-0 transform ${
                isVisible ? "translate-y-0" : "translate-y-full"
            } transition-transform duration-300 ease-in-out bg-white`}
            style={{
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                maxWidth: "100%",
                boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="pt-[20px] px-[20px] flex flex-row items-center justify-between">
                <h2 className="font-open-sans text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A] text-left">
                    Isi Data Pasien
                </h2>
                <div className="w-[56px] h-[56px] flex items-center justify-center">
                    <button onClick={onClose}>
                        <Image
                            src="/x.svg"
                            alt="close"
                            width={48}
                            height={48}
                        />
                    </button>
                </div>
            </div>
            <div className="h-[568px] px-[20px] pt-[20px] pb-[30px] space-y-[20px]">
                <h2 className="font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-[#191F2A] text-justify">
                    Anda mendaftarkan orang lain sebagai pasien. Isi data
                    lengkap pasien untuk membuat jadwal
                </h2>
                <div className="w-[318px] flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Nama Lengkap
                    </span>
                    <input
                        value={name}
                        onChange={handleNameChange}
                        className="h-[32px] rounded-[5px] border border-[#C0C9D9] pl-4 placeholder:font-open-sans placeholder:text-[14px] placeholder:font-normal placeholder:leading-[22px] placeholder:tracking-[0.1px] placeholder:text-[#C0C9D9] outline-none"
                        placeholder="Isi nama lengkap"
                    />
                </div>

                <div className="flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Tanggal Lahir
                    </span>
                    <div className="relative flex items-center border border-[#C0C9D9] rounded-[5px] h-[40px] pl-2">
                        <Image
                            src="/birthday.svg"
                            alt="birthday"
                            width={22}
                            height={22}
                            className="mr-2"
                        />
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Isi tanggal lahir"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            renderCustomHeader={CustomHeader}
                            maxDate={new Date()}
                            yearDropdownItemNumber={100}
                            className="flex-1 pl-2 font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] text-left outline-none text-[#000000D9]"
                            calendarClassName="border border-gray-200 rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                <div className="w-[318px] flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Nomor Telepon
                    </span>
                    <div className="flex items-center h-[40px] space-x-2">
                        <div className="flex items-center pl-2 pr-2 h-full rounded-[5px] border border-[#C0C9D9]">
                            <span className="ml-1 text-[#000000D9] font-open-sans text-[14px]">
                                🇮🇩+62
                            </span>
                        </div>
                        <input
                            value={getDisplayPhoneNumber()}
                            onChange={handlePhoneNumberChange}
                            className="flex-1 h-full rounded-[5px] pl-2 border border-[#C0C9D9] placeholder:font-open-sans placeholder:text-[14px] placeholder:font-normal placeholder:leading-[22px] placeholder:tracking-[0.1px] placeholder:text-[#C0C9D9] outline-none"
                            placeholder="81234567890"
                        />
                    </div>
                </div>

                <div className="w-[318px] flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Email
                    </span>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        className="h-[32px] rounded-[5px] border border-[#C0C9D9] pl-4 placeholder:font-open-sans placeholder:text-[14px] placeholder:font-normal placeholder:leading-[22px] placeholder:tracking-[0.1px] placeholder:text-[#C0C9D9] outline-none"
                        placeholder="Isi email"
                    />
                </div>

                <div className="w-[318px] flex flex-col pb-[24px] space-y-[8px]">
                    <span className="font-open-sans text-[12px] font-normal leading-[20px] text-left text-[#000000D9]">
                        Jenis Kelamin
                    </span>
                    <div className="relative">
                        <button
                            onClick={toggleGenderDropdown}
                            className={`w-full h-[40px] rounded-[5px] border border-[#C0C9D9] pl-4 pr-10 text-left font-open-sans text-[14px] font-normal leading-[22px] tracking-[0.1px] relative ${
                                selectedGender
                                    ? "text-[#191F2A]"
                                    : "text-[#C0C9D9]"
                            }`}
                        >
                            {selectedGender || "Pilih jenis kelamin"}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Image
                                    src="/down2.svg"
                                    alt="dropdown"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </button>
                        {isGenderDropdownOpen && (
                            <div className="absolute w-full mt-1 bg-white border border-[#C0C9D9] rounded-[5px] shadow-lg z-10">
                                <button
                                    onClick={() => selectGender("Laki-laki")}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 font-open-sans text-[14px]"
                                >
                                    Laki-laki
                                </button>
                                <button
                                    onClick={() => selectGender("Perempuan")}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 font-open-sans text-[14px]"
                                >
                                    Perempuan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center mt-[24px]">
                    <button
                        onClick={handleContinue}
                        className="text-white border-[#0D0DCD] bg-[#0D0DCD] cursor-pointer w-[320px] h-[46px] p-[12px_16px] rounded-[12px] border font-open-sans font-semibold text-[14px]"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDrawer;