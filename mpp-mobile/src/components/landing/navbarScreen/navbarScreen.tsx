"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, Send, ChevronDown, History } from "lucide-react";

import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/image";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import LogoutScreen from "@/components/actions/logoutScreen/logoutScreen";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

interface JwtPayload {
  userId: string;
}

export default function NavbarScreen() {
  const pathName = usePathname();
  const [currentPath, setCurrentPath] = useState(pathName);
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);
  const [navbarColor, setNavbarColor] = useState("bg-primary-800");

  useEffect(() => {
    setCurrentPath(pathName);
    if (pathName === "/") {
      setNavbarColor("bg-primary-800");
    } else {
      setNavbarColor("bg-primary-100");
    }

    const auth = Cookies.get("Authorization");
    if (auth) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(auth);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [pathName]);

  const handleLogout = () => {
    Cookies.remove("Authorization");
    setDecoded(null);
  };

  return (
    <div
      className={`flex relative py-[32px] justify-between mx-[70px] md:mx-0 z-10 md:px-[70px] bg-none`}>
      <Link href="/" className="flex flex-row w-[266px] h-[64px]">
        <Image src={logo} alt="Lampung Timur" className="w-[73px] h-[64px]" />

        <div className="flex flex-col w-[193px] h-[64px] leading-none">
          <h3
            className={`${raleway.className} font-bold text-[14px] text-secondary-700 py-[4px]`}>
            MAL PELAYANAN PUBLIK
          </h3>

          <h3
            className={`${raleway.className} font-normal text-primary-700 text-[12px]`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </Link>

      <div className="flex flex-row justify-center items-center w-[733px] h-[64px]">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Beranda
          </Link>
          <Link
            href="/mpp"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/mpp"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            MPP
          </Link>
          <Link
            href="/layanan"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/layanan"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Layanan
          </Link>
          <Link
            href="/berita"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/berita"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Berita
          </Link>
          <Link
            href="/survey"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/survey"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            SKM
          </Link>
          <Link
            href="/statistik"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/statistik"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Statistik
          </Link>
        </div>

        <div className="flex flex-row justify-center ml-[10px]">
          {decoded ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row justify-center ml-[10px] group">
                  <CircleUserRound className="w-[24px] h-[24px] text-primary-800 group-hover:text-secondary-700" />

                  <ChevronDown className="w-[24px] h-[24px] text-primary-800 group-hover:text-secondary-700" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link
                  href={`/profile/${decoded?.userId}`}
                  className={`${
                    pathName === `/profile/${decoded?.userId}`
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <CircleUserRound
                      className={`${
                        pathName === `/profile/${decoded?.userId}`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === `/profile/${decoded?.userId}`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Profile
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href="/pengaduan"
                  className={`${
                    pathName === "/pengaduan"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <Send
                      className={`${
                        pathName === "/pengaduan"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === "/pengaduan"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Pengaduan
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href="/riwayat"
                  className={`${
                    pathName === "/riwayat"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <History
                      className={`${
                        pathName === "/riwayat"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === "/riwayat"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Riwayat
                    </p>
                  </DropdownMenuItem>
                </Link>

                <LogoutScreen handleLogout={handleLogout} />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="md:w-full md:text-[16px] md:px-[24px] md:py-[6px] md:bg-secondary-700 md:text-neutral-50 md:rounded-[50px] md:hover:bg-secondary-700">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
