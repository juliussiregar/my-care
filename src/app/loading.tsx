// app/loading.tsx
"use client";

import Image from 'next/image';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(180deg, #3232DB 0%, #0B0B53 100%)',
      }}
    >
      {/* Gambar lingkaran besar (loading2.png) dengan efek fade mencolok */}
      <Image
        src="/loading2.png"
        alt="Loading 2"
        width={645.74}
        height={634.63}
        className="absolute animate-fade-blink-slow"
        style={{
          top: '40vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        priority
      />

      {/* Gambar lingkaran kecil (loading1.png) dengan efek fade mencolok */}
      <Image
        src="/loading1.png"
        alt="Loading 1"
        width={502.94}
        height={495.01}
        className="absolute animate-fade-blink-fast"
        style={{
          top: '42vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Kontainer untuk logo dan teks */}
      <div
        className="absolute flex items-center text-white z-10 animate-text-blink"
        style={{
          top: '40vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Logo */}
        <Image
          src="/logo_loading.png"
          alt="Logo Loading"
          width={80}
          height={80}
          className="mr-4"
        />

        {/* Teks di sebelah kanan logo */}
        <div className="text-left">
          <h1
            style={{
              fontFamily: 'Sarabun',
              fontSize: '28px',
              fontWeight: 800,
              lineHeight: '34px',
              whiteSpace: 'nowrap',
            }}
          >
            MyCare
          </h1>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '0.15px',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Solusi Kesehatan
          </p>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '0.15px',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            dalam Genggaman
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
