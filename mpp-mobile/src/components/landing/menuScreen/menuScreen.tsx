"use client";

import {
  LogIn,
  Send,
  X,
  Mailbox,
  ClipboardList,
  BarChartBig,
  History,
  CircleUserRound,
  Building,
  Smartphone,
  UserRound,
} from "lucide-react";
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
    <div className="flex flex-col justify-end items-end self-end bg-primary-700 min-w-[360px] h-full">
      <DrawerClose className="flex justify-end items-center h-[3.5em] px-2">
        <div>
          <div onClick={closeMenu}>
            <X className={`text-neutral-50 w-8 h-w-8`} />
          </div>
        </div>
      </DrawerClose>

      <div className="grid grid-rows-9 bg-primary-700 w-10/12 place-content-end pb-6 gap-y-6">
        <Link
          href="/mpp/fasilitas"
          onClick={closeMenu}
          className="flex flex-row group justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Fasilitas
          </p>

          <Building className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/mpp/aplikasi-pendukung"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Aplikasi Pendukung
          </p>

          <Smartphone className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/berita"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Berita
          </p>

          <Mailbox className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/survey"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            SKM
          </p>

          <ClipboardList className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/statistik"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Statistik
          </p>

          <BarChartBig className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/pengaduan"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Pengaduan
          </p>

          <Send className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href="/riwayat"
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Riwayat
          </p>

          <History className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        <Link
          href={`/kontak`}
          onClick={closeMenu}
          className="flex flex-row justify-end group gap-x-4 px-6">
          <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
            Kontak
          </p>

          <UserRound className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
        </Link>

        {decoded ? (
          <LogoutScreen handleLogout={handleLogout} />
        ) : (
          <Link
            onClick={closeMenu}
            href="/login"
            className="flex flex-row justify-end group gap-x-4 px-6">
            <p className="text-neutral-50 group-hover:text-secondary-700 text-[14px]">
              Login
            </p>

            <LogIn className="text-neutral-50 group-hover:text-secondary-700 w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
