"use client";
import FooterScreen from "@/components/landing/footerScreen/footerScreen";
import NavbarScreen from "@/components/landing/navbarScreen/navbarScreen";
import HamburgerMenu from "@/components/landing/others/hamburgerMenu/hamburgerMenu";
import MultipleForm from "@/context/store";

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
    <div className={`${poppins.className} bg-[#F7FBF7] h-full`}>
      {!isMobile ? (
        <Provider store={store}>
          <MultipleForm>
            <>
              <NavbarScreen />
              {children}
              <Toaster position="top-center" />
              <div className="flex flex-col items-end h-full">
                <FooterScreen />
              </div>
            </>
          </MultipleForm>
        </Provider>
      ) : (
        <Provider store={store}>
          <MultipleForm>
            <>
              <HamburgerMenu />
              {children}
              <Toaster position="top-center" />
              <div className="flex flex-col items-end h-full">
                <FooterScreen />
              </div>
            </>
          </MultipleForm>
        </Provider>
      )}
    </div>
  );
}
