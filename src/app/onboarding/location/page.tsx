"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BranchLocation {
  address: string;
  geohash: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface BranchAttributes {
  branch_name: string;
  branch_code: string;
  location: BranchLocation;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Branch {
  id: number;
  attributes: BranchAttributes;
}

interface ApiResponse {
  data: Branch[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const BranchesComponent: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('https://vivid-fellowship-82178cbee7.strapiapp.com/api/branches');
      setBranches(response.data.data); // Menyimpan data cabang
    } catch (err) {
      setError('Failed to fetch branches'); // Menangani kesalahan
    } finally {
      setLoading(false); // Mengubah status loading
    }
  };

  useEffect(() => {
    fetchBranches(); // Panggil fungsi fetching saat komponen dipasang
  }, []);

  if (loading) return <div>Loading...</div>; // Menampilkan loading
  if (error) return <div>{error}</div>; // Menampilkan error jika ada

  return (
    <div>
      <h1>Branches</h1>
      <ul>
        {branches.map((branch) => (
          <li key={branch.id}>
            <h2>{branch.attributes.branch_name} ({branch.attributes.branch_code})</h2>
            <p>Address: {branch.attributes.location.address}</p>
            <p>Coordinates: Lat {branch.attributes.location.coordinates.lat}, Lng {branch.attributes.location.coordinates.lng}</p>
            <p>Created At: {branch.attributes.createdAt}</p>
            <p>Updated At: {branch.attributes.updatedAt}</p>
            <p>Published At: {branch.attributes.publishedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchesComponent;
