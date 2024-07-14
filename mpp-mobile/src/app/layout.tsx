import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import lambang from "@/../../public/assets/DesignLogoMpp.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mal Pelayanan Publik Kabupaten Lampung Timur",
  description: "Mal Pelayanan Publik Kabupaten Lampung Timur",
  icons: {
    icon: {
      url: `${lambang.src}`,
    },
  },
  openGraph: {
    title: "SISTEM INFORMASI MPP KABUPATEN LAMPUNG TIMUR",
    description: "Mal Pelayanan Publik Kabupaten Lampung Timur",
    url: "https://mppdigital.newus.id/",
    siteName: "Mal Pelayanan Publik Kabupaten Lampung Timur",
    images: [
      {
        url: `${lambang.src}`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "id-Id",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
