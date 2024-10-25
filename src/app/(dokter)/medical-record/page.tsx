import React from "react";
import Footer from "../_components/Footer_Doctor";
import Header from "../home/_components/Header";
import SearchMedicalRecord from "./_components/SearchMedicalRecord";

const Medical_Record = () => {
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <Header />
            <SearchMedicalRecord/>
            <Footer />
        </div>
    );
};

export default Medical_Record;
