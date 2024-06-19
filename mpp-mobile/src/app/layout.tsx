import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import lambang from "@/../../public/assets/Lambang_Kabupaten_Lampung_Timur (1).png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mal Pelayanan Publik Lampung Timur",
  description: "Mal Pelayanan Publik Lampung Timur",
  icons: {
    icon: {
      url: `${lambang.src}`,
    },
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
