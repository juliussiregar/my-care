// Location.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Image from 'next/image';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Hospital {
  name: string;
  position: Coordinates;
  address: string;
}

const hospitals: Hospital[] = [
  {
    name: 'RS Immanuel',
    position: { lat: -6.938, lng: 107.606 },
    address: 'Jl. Raya Kopo No.161, Situsaeur, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40233',
  },
  {
    name: 'RS Bayukarta',
    position: { lat: -6.936, lng: 107.604 },
    address: 'Jl. Kertabumi No.44, Karawang Kulon, Kec. Karawang Bar., Karawang, Jawa Barat 41311',
  },
];

const Location: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(hospitals[0]);
  const [isListExpanded, setIsListExpanded] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const handleBackClick = () => {
    router.back();
  };

  const handleConfirmClick = () => {
    // Navigasi ke halaman /home setelah menunjukkan loading
    router.push('/beranda');
  };

  const toggleList = () => {
    if (listRef.current) {
      const listElement = listRef.current;
      listElement.style.transition = 'height 0.3s ease';

      if (isListExpanded) {
        listElement.style.height = `${listElement.scrollHeight}px`;
        requestAnimationFrame(() => {
          listElement.style.height = '30px';
        });
      } else {
        listElement.style.height = '30px';
        requestAnimationFrame(() => {
          listElement.style.height = `${listElement.scrollHeight}px`;
        });

        setTimeout(() => {
          if (listElement) {
            listElement.style.height = 'auto';
          }
        }, 300);
      }
      setIsListExpanded(!isListExpanded);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const listElement = listRef.current;
      listElement.style.transition = 'height 0.3s ease';
      listElement.style.overflow = 'hidden';

      if (isListExpanded) {
        listElement.style.height = `${listElement.scrollHeight}px`;
      } else {
        listElement.style.height = '20px';
      }

      const resizeObserver = new ResizeObserver(() => {
        if (isListExpanded) {
          listElement.style.height = `${listElement.scrollHeight}px`;
        }
      });

      resizeObserver.observe(listElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isListExpanded]);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
    >
      <div className="flex flex-col" style={{ height: '90vh' }}>
        <>
          <div className="p-2">
            <button
              onClick={handleBackClick}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-primary active:bg-primary transition-colors duration-150 text-primary hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex-grow" style={{ height: '50vh' }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={selectedHospital.position}
              zoom={14}
              options={{
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
              }}
            >
              <Marker
                position={selectedHospital.position}
                label={selectedHospital.name}
              />
            </GoogleMap>
          </div>

          <div
            ref={listRef}
            className="bg-white shadow-md rounded-t-lg cursor-pointer overflow-hidden relative border-t border-gray-300"
            style={{
              height: isListExpanded ? `${listRef.current?.scrollHeight}px` : '20px',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}
            onClick={toggleList}
          >
            <div className="w-full flex justify-center">
              <div className="w-10 h-1 bg-gray-400 rounded-full mt-2"></div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3">RS Terpilih</h3>
              {hospitals.map((hospital, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHospital(hospital);
                  }}
                  className={`flex items-center p-3 cursor-pointer mb-2 -mx-4 px-4 ${selectedHospital.name === hospital.name
                      ? 'bg-[#F0F0FC] hover:bg-[#F0F0FC]'
                      : 'bg-white hover:bg-[#F0F0FC]'
                    }`}
                >
                  <Image
                    src="/rs.svg"
                    alt="Hospital Icon"
                    width={16}
                    height={15}
                    className="mr-3"
                  />
                  <div>
                    <h4
                      className="font-bold"
                      style={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: 700,
                        lineHeight: '22px',
                        letterSpacing: '0.1px',
                        textAlign: 'left',
                      }}
                    >
                      {hospital.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '16px',
                        letterSpacing: '0.2px',
                        textAlign: 'left',
                      }}
                    >
                      {hospital.address}
                    </p>
                  </div>
                </div>
              ))}
              <button
                className="w-full bg-primary text-white py-2 h-[46px] rounded-xl mt-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Open Sans' }}
                onClick={handleConfirmClick}
                disabled={!selectedHospital}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </>
      </div>
    </LoadScript>
  );
};

export default Location;
