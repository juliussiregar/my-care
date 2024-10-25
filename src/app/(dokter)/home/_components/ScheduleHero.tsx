import Image from "next/image";

const ScheduleHero = () => {
    return (
        <div
            className="relative w-[360px] h-auto flex flex-row pt-[20px] pb-[32px] pl-[16px] pr-[16px] shadow-md"
            style={{
                background: "linear-gradient(180deg, #3232DB 0%, #0B0B53 100%)",
            }}
        >
            <div className="flex flex-col">
                <h3 className="font-open-sans text-left text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#FFFFFF]">
                    Schedule
                </h3>
                <h2 className="font-open-sans mt-2 text-[#FFFFFF] text-left text-[14px] font-bold leading-[22px] tracking-[0.1px]">
                    Dr. Romi
                </h2>
            </div>
            <div className="relative flex-grow" />
            <Image
                src="/eclips.png"
                alt="eclips"
                height={50}
                width={150}
                className="absolute bottom-0 right-0"
            />
            <Image
                src="/hospital-bed.png"
                alt="gambar dokter konsul"
                width={190.48}
                height={86.19}
                className="absolute bottom-0 right-0 z-10"
            />
        </div>
    );
};

export default ScheduleHero;
