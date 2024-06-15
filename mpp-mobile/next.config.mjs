/** @type {import('next').NextConfig} */
const nextConfig = {
  async middleware() {
    const { middleware } = await import("./src/middlewares.ts");
    return middleware;
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/profile/:path*",
        destination: "/profile/:path*",
      },
      {
        source: "/riwayat/:path*",
        destination: "/riwayat/:path*",
      },
      {
        source: "/statistik/:path*",
        destination: "/statistik/:path*",
      },
      {
        source: "/survey/:path*",
        destination: "/survey/:path*",
      },
      {
        source: "/layanan/booking-antrian/:path*",
        destination: "/layanan/booking-antrian/:path*",
      },
      {
        source: "/layanan/permohonan-layanan/:path*",
        destination: "/layanan/permohonan-layanan/:path*",
      },
    ];
  },
};

export default nextConfig;
