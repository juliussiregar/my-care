"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/auth/login" });
    };

    const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    // Toggle sidebar function
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className="flex flex-row h-[56px]">
                {/* SIDEBAR ICON */}
                <div
                    className="w-[56px] h-[56px] flex justify-center items-center cursor-pointer"
                    onClick={toggleSidebar}
                >
                    <Image
                        src="/sidebar.png"
                        alt="sidebar"
                        width={24}
                        height={24}
                    />
                </div>
                {/* Logo Text */}
                <div className="flex-grow flex justify-center items-center space-x-1">
                    <Image
                        src="/image1.png"
                        alt="logo"
                        width={36}
                        height={36}
                    />
                    <h2 className="font-open-sans text-left text-[14px] font-bold leading-[22px] tracking-[0.1px] text-[#191F2A]">
                        My Care
                    </h2>
                </div>
                {/* Notification Bell */}
                <div className="w-[56px] flex justify-center items-center">
                    <Image
                        src="/lonceng.png"
                        alt="notif"
                        width={13.5}
                        height={18}
                    />
                </div>
            </div>

            {/* Full-Screen Sidebar Menu - conditionally rendered */}
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center border-b border-gray-300 h-[56px] px-4 bg-white">
                        <h2></h2>
                        {/* Close Button */}
                        <button onClick={toggleSidebar}>
                            <Image
                                src="/icon-button.png"
                                alt="Close"
                                width={24}
                                height={24}
                                className="text-blue-600"
                            />{" "}
                            {/* Change color as needed */}
                        </button>
                    </div>

                    <div className="relative w-full h-full">
                        {/* Hero Image */}
                        <div
                            className="relative h-[104px] w-[360px] flex flex-row pt-[24px] pl-[20px] pr-[20px] pb-[24px] shadow-md"
                            style={{
                                background:
                                    "linear-gradient(180deg, #3232DB 0%, #0B0B53 100%)",
                                gap: "12px",
                            }}
                        >
                            {/* Doctor Information */}
                            <div className="flex flex-col">
                                <h2 className="font-open-sans text-[#FFFFFF] text-left text-[14px] font-bold leading-[22px]">
                                    Dr. Romi
                                </h2>
                                <h3 className="font-open-sans mt-1 text-[#FFFFFF] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                                    Kedokteran Gigi
                                </h3>
                                <h3 className="font-open-sans text-[#FFFFFF] text-left text-[12px] font-normal leading-[16px] tracking-[0.2px]">
                                    Dokter Gigi
                                </h3>
                            </div>
                            <div className="relative flex-grow" />
                        </div>

                        {/* Menu Section */}
                        <div className="py-4">
                            <h3 className="font-open-sans text-[12px] font-normal leading-[16px] tracking-[0.2px] text-left">
                                MENU
                            </h3>
                            <ul className="flex flex-col w-full px-4 py-[16px] gap-[12px]">
                                <li className="py-2 cursor-pointer border-b border-[#E0E4EC] hover:bg-[#f7f9fc] transition duration-150 ease-in-out">
                                    <span
                                        // href="/profile"
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <Image
                                                src="/icon-profile.png"
                                                alt="icon-menu"
                                                width={24}
                                                height={24}
                                                className="mr-2"
                                            />
                                            <span className="font-open-sans text-[14px] font-bold leading-[22px] tracking-[0.1px] text-left">
                                                Profil Saya
                                            </span>
                                        </div>
                                        <Image
                                            src="/icon-right.svg"
                                            alt="icon-right"
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                </li>
                                <li className="py-2 cursor-pointer border-b border-[#E0E4EC] hover:bg-[#f7f9fc] transition duration-150 ease-in-out">
                                    <Link
                                        href="#"
                                        onClick={() => {
                                            setSidebarOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <Image
                                                src="/icon-logout.png"
                                                alt="icon-menu"
                                                width={24}
                                                height={24}
                                                className="mr-2"
                                            />
                                            <span className="font-open-sans text-[14px] font-bold leading-[22px] tracking-[0.1px] text-left">
                                                Logout
                                            </span>
                                        </div>
                                        <Image
                                            src="/icon-right.svg"
                                            alt="icon-right"
                                            width={16}
                                            height={16}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
