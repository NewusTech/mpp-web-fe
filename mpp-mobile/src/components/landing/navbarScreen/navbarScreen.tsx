"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUserRound,
  Send,
  ChevronDown,
  History,
  ClipboardList,
} from "lucide-react";

import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
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
      setNavbarColor("bg-primary-50");
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
      className={`flex relative py-[32px] justify-between mx-[70px] md:mx-0 z-10 md:px-[70px] ${navbarColor}`}>
      <Link href="/" className="flex flex-row w-3/12 h-[64px]">
        <Image src={logo} alt="Lampung Timur" className="w-full h-full" />

        <div className="flex flex-col justify-center w-full h-full leading-none">
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

          <div className="w-[111.5px] ml-6 mr-0">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row gap-x-5 justify-center items-center group">
                  <h3 className="text-center text-[20px] text-primary-800 group-hover:text-secondary-700">
                    MPP
                  </h3>

                  <ChevronDown className="w-[24px] h-[24px] text-primary-800 group-hover:text-secondary-700" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link
                  href={`/mpp/tentang-mpp`}
                  className={`${
                    pathName === `/mpp/tentang-mpp`
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === `/mpp/tentang-mpp`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Tentang MPP
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href="/mpp/fasilitas"
                  className={`${
                    pathName === "/pengaduan"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === "/mpp/fasilitas"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Fasilitas
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href="/mpp/aplikasi-pendukung"
                  className={`${
                    pathName === "/mpp/aplikasi-pendukung"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === "/mpp/aplikasi-pendukung"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Aplikasi Pendukung
                    </p>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/instansi"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/instansi"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Instansi
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
            href="/kontak"
            className={`text-center w-[111.5px] text-[20px] text-primary-800 ${
              pathName === "/kontak"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Kontak
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
                  href={`/profile`}
                  className={`${
                    pathName === `/profile`
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <CircleUserRound
                      className={`${
                        pathName === `/profile`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === `/profile`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      Profile
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href="/survey"
                  className={`${
                    pathName === "/survey"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:text-secondary-700 focus:text-secondary-700 group">
                    <ClipboardList
                      className={`${
                        pathName === "/survey"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === "/survey"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700`}>
                      SKM
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
