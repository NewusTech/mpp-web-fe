"use client";
import { store } from "@/store/store";
import { Poppins } from "next/font/google";
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
  return (
    <Provider store={store}>
      <div className={`${poppins.className} h-full w-screen`}>
        {children}
        <Toaster position="top-center" />
      </div>
    </Provider>
  );
}
