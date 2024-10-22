"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

// Form schema for validation
const formSchema = z.object({
    email: z
        .string(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result?.error) {
            console.error(result.error); 
            alert("Login failed: " + result.error); 
        } else {
            window.location.href = "/home";
        }
    }

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#3232DB] to-[#0B0B53] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-b from-[#3232DB] to-[#0B0B53] rounded-[100%] transform -translate-x-1/4 -translate-y-1/4"></div>

            <div className="relative z-10 flex flex-col items-center justify-center mt-24 text-white">
                <div className="flex items-center mb-8">
                    <Image src="/Logo.png" alt="logo" width={56} height={56} />
                    <p className="text-2xl ml-2 font-bold">MyCare</p>
                </div>
            </div>

            <div className="relative z-10 bg-white rounded-t-2xl shadow-lg p-8 max-w-md w-full mx-auto flex flex-col justify-between min-h-[50vh] h-full mt-10 flex-grow">
                <div>
                    <h2 className="text-center text-xl font-bold text-blue-800 mb-4">
                        Halo Dokter! <br />
                        Selamat datang di My Care
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Silakan login untuk menggunakan aplikasi
                    </p>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Masuk dengan email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="Isi email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...form.register("password")}
                                    placeholder="Isi password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-black"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 2C5.5 2 1.6 5 0 10c1.6 5 5.5 8 10 8s8.4-3 10-8c-1.6-5-5.5-8-10-8zm0 13a5 5 0 110-10 5 5 0 010 10zM10 8a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-black"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 2C5.5 2 1.6 5 0 10c1.6 5 5.5 8 10 8s8.4-3 10-8c-1.6-5-5.5-8-10-8zm0 13a5 5 0 110-10 5 5 0 010 10zM10 8a2 2 0 100 4 2 2 0 000-4z" />
                                            <path
                                                d="M2 2l16 16"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Ingat Saya
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
                        >
                            Masuk
                        </button>
                    </form>
                </div>

                <footer className="mt-8 text-center text-gray-400 text-sm">
                    Version 1.0.1
                </footer>
            </div>
        </div>
    );
};

export default LoginForm;
