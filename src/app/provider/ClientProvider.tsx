"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}

// Define the ClientProvider component
const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProvider;
