"use client";

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Footer from '../_components/Footer';

const Akun = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' }); 
  };

  return (
    <div className="min-h-[95vh] flex flex-col">
      <div className="flex-grow">
        <h1 className="text-xl font-bold mb-4">Akun</h1>
        {session?.user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <p className="text-gray-500">Anda belum login.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Akun;
