"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const HeaderDetail = () => {
    const params = useParams();
    const ids = params?.ids;  // ID pasien
    const id = params?.id;    // ID appointment

    return (
        <div className="flex items-center h-14 w-full px-4 font-open-sans text-base text-[#191F2A] shadow-custom">
            <Link href={`/medical-record/${ids}/detail/${id}`}>
                <Image
                    src="/left.svg"
                    alt="left"
                    width={24}
                    height={24}
                    className="mr-4"
                />
            </Link>
            <div className="flex-row">
                <h2 className="font-bold ml-4">Detail Rekam Medis</h2>
                <h3 className="text-xs ml-4 mb-[9px]">12345678</h3>
            </div>
        </div>
    );
};

export default HeaderDetail;