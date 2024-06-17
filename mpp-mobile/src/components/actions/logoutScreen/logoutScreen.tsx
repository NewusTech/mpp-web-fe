"use client";

import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

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

  return (
    <button
      onClick={handleLogoutClick}
      className="flex flex-row gap-[16px] md:ml-[10px] md:pt-1">
      <LogOut className="text-primary-800 md:text-neutral-700 md:hover:text-primary-700 w-[20px] h-[20px]" />

      <p className="text-primary-800 md:text-neutral-700 md:hover:text-primary-700 text-[14px] md:text-[16px]">
        Keluar
      </p>
    </button>
  );
}
