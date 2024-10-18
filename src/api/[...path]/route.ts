import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

// Mengambil BASE_URL dari environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is not defined. Please set it in your environment variables.');
}

export const dynamic = 'force-dynamic'; // Mengatur agar route selalu dinamis

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Fungsi untuk mengonversi Headers ke objek yang sesuai dengan axios
function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export async function handler(
  request: NextRequest, 
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  const url = `${BASE_URL}/${path.join('/')}`;

  try {
    const response = await axios({
      url,
      method: request.method,
      headers: headersToObject(request.headers), // Konversi Headers ke objek
      data: request.body ? await request.json() : null,
    });

    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    // Casting error ke AxiosError
    const axiosError = error as AxiosError;
    console.error('Error processing request:', axiosError.message);
    return new NextResponse(
      JSON.stringify({ message: axiosError.message || 'Unknown error occurred.' }),
      {
        status: axiosError.response?.status || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}
