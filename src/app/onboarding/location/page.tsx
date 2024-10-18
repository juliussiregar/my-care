"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Hospital {
  hospital_id: number;
  name: string;
  address: string;
  phone_number: string;
}

const HospitalsComponent: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('/hospitals'); // Using the proxied route
      setHospitals(response.data); // Save hospitals data
    } catch (err) {
      setError('Failed to fetch hospitals'); // Handle error
    } finally {
      setLoading(false); // Change loading status
    }
  };

  useEffect(() => {
    fetchHospitals(); // Call fetching function when component mounts
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div>
      <h1>Hospitals</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.hospital_id}>
            <h2>{hospital.name}</h2>
            <p>Address: {hospital.address}</p>
            <p>Phone Number: {hospital.phone_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalsComponent;
