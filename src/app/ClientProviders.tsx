// src/app/ClientProviders.tsx

"use client"; // Mark this file as a Client Component

import { SessionProvider } from "next-auth/react";
import ClientProvider from "./provider/ClientProvider";
import ReduxProvider from "./provider/ClientProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReduxProvider>
                <ClientProvider>
                    {children}
                </ClientProvider>
            </ReduxProvider>
        </SessionProvider>
    );
}
