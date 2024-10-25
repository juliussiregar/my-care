import React from "react";

const DoctorProfileDetail = () => {
    return (
        <div className="w-auto h-[144px] py-6 px-4">
            <div className="w-auto h-[96px] p-4 border border-[#D7D7F8] rounded-lg font-open-sans text-xs text-[#3B4963]">
                <div className="grid grid-cols-2">
                    <h2 className="font-bold">Dokter</h2>
                    <h2 className="text-left">Dr. Romi</h2>
                </div>
                <div className="grid grid-cols-2 my-2">
                    <h2 className="font-bold">Rumah Sakit</h2>
                    <h2 className="text-left">RS Immanuel</h2>
                </div>
                <div className="grid grid-cols-2">
                    <h2 className="font-bold">Tanggal Janji</h2>
                    <h2 className="text-left">20 September 2024</h2>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfileDetail;
