// MapComponent.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Hospital {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
}

interface MapComponentProps {
  hospitals: Hospital[];
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -6.938, // Set the center latitude
  lng: 107.606, // Set the center longitude
};

const MapComponent: React.FC<MapComponentProps> = ({ hospitals }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAbwV5W2aFHOgIhQisaG2kaTd2xBWGuVeo">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
        {hospitals.map((hospital, index) => (
          <Marker key={index} position={hospital.position} label={hospital.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
