"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; 

        if (session) {
            console.log("Session:", session); 
            // Periksa role pengguna
            if (session.user.role === "doctor") {
                router.push("/home"); 
            } else if (session.user.role === "patient") {
                router.push("/beranda"); 
            } else {
                console.error("Role tidak dikenali:", session.user.role);
            }
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return <LoginForm />;
}
