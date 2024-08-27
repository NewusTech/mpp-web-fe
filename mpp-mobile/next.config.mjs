/** @type {import('next').NextConfig} */
const nextConfig = {
  // async middleware() {
  //   const { middleware } = await import("./src/middlewares.ts");
  //   return middleware;
  // },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "https://newus-bucket.s3.ap-southeast-2.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newus-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/dir_mpp/**",
      },
    ],
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
        source: "/survei/:path*",
        destination: "/survei/:path*",
      },
      {
        source: "/instansi/booking-antrian/:path*",
        destination: "/instansi/booking-antrian/:path*",
      },
      {
        source: "/instansi/permohonan-layanan/:path*",
        destination: "/instansi/permohonan-layanan/:path*",
      },
      {
        source: "/pengaduan/:path*",
        destination: "/pengaduan/:path*",
      },
    ];
  },
};

export default nextConfig;
