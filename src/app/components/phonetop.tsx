import Image from 'next/image';
import React from 'react';

const Phonetop = () => {
  return (
    <div className="relative w-full h-[40px]">
      {/* Jam di kiri atas */}
      <div
        className="absolute text-black font-bold"
        style={{
          width: '28.43px',
          height: '11.09px',
          top: '17.17px',
          left: '14px',
          opacity: 1, 
        }}
      >
        09:41
      </div>

      <Image
        src="/phonetop.svg"
        alt="Indikator ponsel"
        width={68}
        height={12}
        className="absolute"
        style={{
          top: '17.33px',
          left: '278.67px',
          opacity: 1, 
        }}
        priority
      />
    </div>
  );
};

export default Phonetop;
