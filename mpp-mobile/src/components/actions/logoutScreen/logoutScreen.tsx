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
      className="flex flex-row gap-[16px] md:ml-[10px] md:pt-1 group">
      <LogOut className="text-secondary-700 md:text-neutral-700 w-[20px] h-[20px] group-hover:text-secondary-700" />

      <p className="text-secondary-700 md:text-neutral-700 text-[14px] md:text-[16px] group-hover:text-secondary-700">
        Keluar
      </p>
    </button>
  );
}
