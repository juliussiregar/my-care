import Image from "next/image";
import Link from "next/link";

const DetailPatientHeader = () => {
    return (
        <div className="flex items-center h-14 w-full px-4 font-open-sans text-base text-[#3B4963] shadow-custom">
            <Link href="/schedule">
                <Image
                    src="/left.svg"
                    alt="left"
                    width={24}
                    height={24}
                    className="mr-4"
                />
            </Link>
            <h2 className="font-bold m-4">Detail Pasien</h2>
        </div>
    );
};

export default DetailPatientHeader;
