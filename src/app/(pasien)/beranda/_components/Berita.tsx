// src/app/_components/Berita.tsx
"use client";

import Image from "next/image";

const Berita: React.FC = () => {
    return (
        <div className="h-[284px] py-[20px] pl-[16px] ">
            <p className="font-open-sans text-[12px] font-bold leading-[16px] tracking-[0.2px] text-left">
                Berita
            </p>
            <div className="flex flex-row space-x-4 mt-2">
                <div className="flex flex-col">
                    <Image src="/berita1.png" alt="berita" width={180} height={120} />
                    <span
                        className="
                            font-open-sans 
                            text-[10px] 
                            font-bold 
                            leading-[14px] 
                            tracking-[0.25px] 
                            text-left 
                            text-[#886800]
                            bg-[#FFF2C8]
                            w-[45px] 
                            h-[14px] 
                            block mt-2"
                    >
                        Edukasi
                    </span>
                    <p
                        className="
                            font-open-sans 
                            text-[12px] 
                            font-bold 
                            leading-[16px] 
                            tracking-[0.2px] 
                            text-left 
                            text-[#000096] 
                            w-[180px] 
                            h-[48px] 
                            mb-2 mt-1"
                    >
                        5 Rekomendasi Olahraga untuk Meluruskan Tulang Belakang yang Bengkok
                    </p>
                    <p
                        className="
                            font-open-sans 
                            text-[10px] 
                            font-normal 
                            leading-[14px] 
                            tracking-[0.25px] 
                            text-left 
                            text-[#4E6082] 
                            w-[180px] 
                            h-[14px] -mt-1"
                    >
                        19 September 2024
                    </p>
                </div>
                <div className="flex flex-col">
                    <Image src="/berita2.png" alt="berita" height={120} width={152} />
                    <span
                        className="
                            font-open-sans 
                            text-[10px] 
                            font-bold 
                            leading-[14px] 
                            tracking-[0.25px] 
                            text-left 
                            text-[#886800]
                            bg-[#FFF2C8]
                            w-[45px] 
                            h-[14px] 
                            block mt-2"
                    >
                        Berita
                    </span>
                    <p
                        className="
                            font-open-sans 
                            text-[12px] 
                            font-bold 
                            leading-[16px] 
                            tracking-[0.2px] 
                            text-left 
                            text-[#000096] 
                            w-[180px] 
                            h-[30px] 
                            mb-2 mt-1"
                    >
                        Layanan Komprehesif Kesehatan Jantung
                    </p>
                    <p
                        className="
                            font-open-sans 
                            text-[10px] 
                            font-normal 
                            leading-[14px] 
                            tracking-[0.25px] 
                            text-left 
                            text-[#4E6082] 
                            w-[180px] 
                            h-[14px] -mt-1"
                    >
                        8 September 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Berita;
