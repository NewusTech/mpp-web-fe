"use client";
import FooterScreen from "@/components/landing/footerScreen/footerScreen";
import NavbarScreen from "@/components/landing/navbarScreen/navbarScreen";
import HamburgerMenu from "@/components/landing/others/hamburgerMenu/hamburgerMenu";
import NavbarMobile from "@/components/landing/others/navbarMobile/navbarMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import { store } from "@/store/store";
import { Poppins } from "next/font/google";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Worker } from "@react-pdf-viewer/core";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <div
      className={`${poppins.className} bg-primary-50 w-full relative flex flex-col min-h-screen`}>
      {!isMobile ? (
        <Provider store={store}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <NavbarScreen />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex-1 overflow-y-auto pt-28 bg-primary-100">
                {children}
              </div>
            </Suspense>
            <Toaster position="top-center" />
            <div className="w-full absolute bottom-0 bg-primary-50">
              <FooterScreen />
            </div>
          </Worker>
        </Provider>
      ) : (
        <Provider store={store}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <NavbarMobile />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex-1 overflow-y-auto w-full bg-primary-100">
                {children}
              </div>
            </Suspense>
            <Toaster position="top-center" />
            <div className="bottom-0 z-50 fixed w-full bg-primary-100 shadow-md">
              <HamburgerMenu />
            </div>
          </Worker>
        </Provider>
      )}
    </div>
  );
}
