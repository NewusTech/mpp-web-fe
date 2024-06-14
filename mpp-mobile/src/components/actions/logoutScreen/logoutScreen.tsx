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
    <button onClick={handleLogoutClick} className="flex flex-row gap-[16px]">
      <LogOut className="text-primary-800 w-[20px] h-[20px]" />

      <p className="text-primary-800 text-[14px]">Keluar</p>
    </button>
  );
}
