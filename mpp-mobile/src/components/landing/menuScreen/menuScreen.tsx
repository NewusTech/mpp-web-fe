"use client";
import { LogIn, X } from "lucide-react";
import { Home } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Landmark } from "lucide-react";
import { Mailbox } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { BarChartBig } from "lucide-react";
import { History } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutScreen from "@/components/actions/logoutScreen/logoutScreen";

interface JwtPayload {
  userId: string;
}

export default function MenuScreen({ closeMenu }: { closeMenu: any }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (currentPath !== pathname) {
      closeMenu();
      setCurrentPath(pathname);
    }
  }, [pathname, currentPath, closeMenu]);

  useEffect(() => {
    const auth = Cookies.get("Authorization");
    if (auth) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(auth);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("Authorization");
    setDecoded(null);
  };

  return (
    <div className="grid grid-rows-2 bg-primary-700 min-w-[360px] h-[57px]">
      <DrawerClose className="flex justify-end items-center h-[3.5em] px-[35px]">
        <div>
          <div onClick={closeMenu}>
            <X className="text-neutral-50 w-[24px] h-[24px]" />
          </div>
        </div>
      </DrawerClose>

      <div className="grid grid-rows-9 h-[25em] bg-white w-screen mt-[28px] place-item-center] p-[16px] gap-[4px]">
        <Link href="/" onClick={closeMenu} className="flex flex-row gap-[16px]">
          <Home className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Beranda</p>
        </Link>

        <Link
          href="/mpp"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <LayoutDashboard className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">MPP</p>
        </Link>

        <Link
          href="/layanan"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <Landmark className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Layanan</p>
        </Link>

        <Link
          href="/berita"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <Mailbox className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Berita</p>
        </Link>

        <Link
          href="/survey"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <ClipboardList className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">SKM</p>
        </Link>

        <Link
          href="/statistik"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <BarChartBig className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Statistik</p>
        </Link>

        <Link
          href="/riwayat"
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <History className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Riwayat</p>
        </Link>

        <Link
          href={`/profile/${decoded?.userId}`}
          onClick={closeMenu}
          className="flex flex-row gap-[16px]">
          <CircleUserRound className="text-primary-800 w-[20px] h-[20px]" />

          <p className="text-primary-800 text-[14px]">Profile</p>
        </Link>

        {decoded ? (
          <LogoutScreen handleLogout={handleLogout} />
        ) : (
          <Link
            onClick={closeMenu}
            href="/login"
            className="flex flex-row gap-[16px]">
            <LogIn className="text-primary-800 w-[20px] h-[20px]" />

            <p className="text-primary-800 text-[14px]">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}
