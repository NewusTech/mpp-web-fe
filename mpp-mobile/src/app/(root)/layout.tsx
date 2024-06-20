"use client";
import FooterScreen from "@/components/landing/footerScreen/footerScreen";
import NavbarScreen from "@/components/landing/navbarScreen/navbarScreen";
import HamburgerMenu from "@/components/landing/others/hamburgerMenu/hamburgerMenu";

import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import { store } from "@/store/store";
import { Poppins } from "next/font/google";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <div className={`${poppins.className} bg-primary-100 w-full relative`}>
      {!isMobile ? (
        <Provider store={store}>
          <>
            <NavbarScreen />
            <div className="flex-1 overflow-y-auto">{children}</div>
            <Toaster position="top-center" />
            <div className="w-full absolute bottom-0 bg-primary-100">
              <FooterScreen />
            </div>
          </>
        </Provider>
      ) : (
        <Provider store={store}>
          <>
            <HamburgerMenu />
            <div className="flex-1 overflow-y-auto w-full bg-primary-100">
              {children}
            </div>
            <Toaster position="top-center" />
            <div className="bottom-0 w-full bg-primary-100">
              <FooterScreen />
            </div>
          </>
        </Provider>
      )}
    </div>
  );
}
