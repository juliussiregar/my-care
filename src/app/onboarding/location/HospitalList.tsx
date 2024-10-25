// HospitalList.tsx
import React from 'react';

interface Hospital {
  name: string;
  address: string;
}

interface HospitalListProps {
  hospitals: Hospital[];
  onConfirm: () => void;
}

const HospitalList: React.FC<HospitalListProps> = ({ hospitals, onConfirm }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', marginTop: '-20px' }}>
      <h3>RS Terpilih</h3>
      {hospitals.map((hospital, index) => (
        <div
          key={index}
          style={{ padding: '10px', backgroundColor: index === 0 ? '#f0f4ff' : '#fff', borderRadius: '5px', marginBottom: '10px' }}
        >
          <h4>{hospital.name}</h4>
          <p>{hospital.address}</p>
        </div>
      ))}
      <button
        onClick={onConfirm}
        style={{
          backgroundColor: '#0000ff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          width: '100%',
          marginTop: '10px',
        }}
      >
        Konfirmasi
      </button>
    </div>
  );
};

export default HospitalList;
