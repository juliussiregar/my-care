/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Mengatur CORS untuk semua route
          source: "/:path*",  // Menghapus prefix /api
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",  // Mengizinkan semua origin
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS", 
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization", 
            },
          ],
        },
      ];
    },
};
  
export default nextConfig;
