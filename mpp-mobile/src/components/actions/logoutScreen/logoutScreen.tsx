"use client";

import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";

export default function LogoutScreen({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  const handleLogoutClick = () => {
    Cookies.remove("Authorization");
    handleLogout();
    toast.success("Logout berhasil!", { duration: 1000 });
  };

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      {!isMobile ? (
        <button
          onClick={handleLogoutClick}
          className="flex flex-row gap-[16px] md:ml-[10px] md:pt-1 group hover:pl-1">
          <LogOut className="text-secondary-700 md:text-neutral-700 w-[20px] h-[20px] group-hover:text-secondary-700" />

          <p className="text-secondary-700 md:text-neutral-700 text-[14px] md:text-[16px] group-hover:text-secondary-700">
            Keluar
          </p>
        </button>
      ) : (
        <button
          onClick={handleLogoutClick}
          className="flex flex-row justify-end gap-x-4 md:ml-[10px] px-6 md:pt-1 group">
          <p className="text-neutral-50 md:text-neutral-700 text-[14px] md:text-4 group-hover:text-secondary-700">
            Keluar
          </p>

          <LogOut className="text-neutral-50 md:text-neutral-700 w-5 h-5 group-hover:text-secondary-700" />
        </button>
      )}
    </>
  );
}
