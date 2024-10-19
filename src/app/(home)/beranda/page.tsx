// src/app/Home.tsx
"use client";

import ActionButtons from "./_components/ActionButtons";
import Header from "./_components/Header";
import HomeIcons from "./_components/HomeIcons";
import LoyaltyPoints from "./_components/LoyaltyPoints";
import BannerCarousel from "./_components/BannerCaraousel";
import Berita from "./_components/Berita";
import Footer from "../_components/Footer";

const Beranda: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen pb-[68px]">
            <Header />
            <ActionButtons />
            <LoyaltyPoints />
            <HomeIcons />

            <div className="h-[172px] pl-6 pt-2">
                <span className="text-[12px] font-bold leading-4 tracking-[0.2px] text-left font-open-sans">
                    Promo Hari ini
                </span>
                <BannerCarousel />
            </div>
            <Berita />

            <div className="flex-grow" />
            <Footer />
        </div>
    );
};

export default Beranda;
