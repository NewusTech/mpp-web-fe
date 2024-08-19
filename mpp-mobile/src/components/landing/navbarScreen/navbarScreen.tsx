"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CircleUserRound,
  Send,
  ChevronDown,
  History,
  ClipboardList,
  Bell,
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
import NotifikasiWebiste from "../others/notifikasi/notifikasi";

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
      className={`flex w-full fixed py-6 justify-between mx-16 md:mx-0 z-10 md:px-16 ${navbarColor}`}>
      <Link href="/" className="flex flex-row w-5/12 h-[64px] gap-x-3">
        <div className="w-3/12 h-full flex flex-col items-center justify-center">
          <Image src={logo} alt="Lampung Timur" className="w-full h-full" />
        </div>

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

      <div className="flex flex-row justify-end items-center w-full">
        <div className="flex flex-row items-center gap-x-8">
          <Link
            href="/"
            className={`text-center w-full text-[20px] text-primary-800 ${
              pathName === "/"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Beranda
          </Link>

          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row gap-x-5 justify-center items-center group">
                  <h3
                    className={`text-center text-[20px] font-normal ${
                      pathName === "/mpp/tentang-mpp" ||
                      pathName === "/mpp/fasilitas" ||
                      pathName === "/mpp/aplikasi-pendukung" ||
                      pathName ===
                        "/mpp/maklumat-mal-pelayanan-publik-lampung-timur" ||
                      pathName ===
                        "/mpp/standar-operasional-mal-pelayanan-publik-lampung-timur"
                        ? "text-secondary-700 group-hover:text-primary-800"
                        : "text-primary-800 group-hover:text-secondary-700"
                    }`}>
                    MPP
                  </h3>

                  <ChevronDown
                    className={`w-[24px] h-[24px] ${
                      pathName === "/mpp/tentang-mpp" ||
                      pathName === "/mpp/fasilitas" ||
                      pathName === "/mpp/aplikasi-pendukung" ||
                      pathName ===
                        "/mpp/maklumat-mal-pelayanan-publik-lampung-timur" ||
                      pathName ===
                        "/mpp/standar-operasional-mal-pelayanan-publik-lampung-timur"
                        ? "text-secondary-700 group-hover:text-primary-800"
                        : "text-primary-800 group-hover:text-secondary-700"
                    }`}
                  />
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
                  <DropdownMenuItem className="text-neutral-700 cursor-pointer hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === `/mpp/tentang-mpp`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700 cursor-pointer`}>
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
                  <DropdownMenuItem className="text-neutral-700 cursor-pointer hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === "/mpp/fasilitas"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700 cursor-pointer`}>
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
                  <DropdownMenuItem className="text-neutral-700 cursor-pointer hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName === "/mpp/aplikasi-pendukung"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700 cursor-pointer`}>
                      Aplikasi Pendukung
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href={`/mpp/maklumat-mal-pelayanan-publik-lampung-timur`}
                  className={`${
                    pathName ===
                    `/mpp/maklumat-mal-pelayanan-publik-lampung-timur`
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 cursor-pointer hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName ===
                        `/mpp/maklumat-mal-pelayanan-publik-lampung-timur`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700 cursor-pointer`}>
                      Maklumat MPP
                    </p>
                  </DropdownMenuItem>
                </Link>

                <Link
                  href={`/mpp/standar-operasional-mal-pelayanan-publik-lampung-timur`}
                  className={`${
                    pathName ===
                    `/mpp/standar-operasional-mal-pelayanan-publik-lampung-timur`
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 cursor-pointer hover:text-secondary-700 focus:text-secondary-700 group">
                    <p
                      className={`${
                        pathName ===
                        `/mpp/standar-operasional-mal-pelayanan-publik-lampung-timur`
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } text-[16px] group-hover:text-secondary-700 cursor-pointer`}>
                      Standar Operasional
                    </p>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/instansi"
            className={`text-center w-full text-[20px] text-primary-800 ${
              pathName === "/instansi"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Instansi
          </Link>

          <Link
            href="/berita"
            className={`text-center w-full text-[20px] text-primary-800 ${
              pathName === "/berita"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Berita
          </Link>

          <Link
            href="/kontak"
            className={`text-center w-full text-[20px] text-primary-800 ${
              pathName === "/kontak"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Kontak
          </Link>

          <Link
            href="/statistik"
            className={`text-center w-full text-[20px] text-primary-800 ${
              pathName === "/statistik"
                ? "text-secondary-700 hover:text-primary-800"
                : "text-primary-800 hover:text-secondary-700"
            } font-light`}>
            Statistik
          </Link>
        </div>

        <div className="flex flex-row justify-center ml-5">
          <Popover>
            <PopoverTrigger>
              <Bell className="w-6 h-6 text-primary-800 hover:text-secondary-700" />
            </PopoverTrigger>
            <PopoverContent className="min-w-[700px] bg-primary-500 bg-opacity-80 border border-primary-500 shadow-lg rounded-lg h-screen">
              <div className="w-full flex flex-col gap-y-3">
                <div className="w-full border-b border-neutral-900">
                  <h3 className="text-neutral-900 font-semibold text-[20px]">
                    Notifikasi
                  </h3>
                </div>

                <div className="w-full flex flex-col overflow-y-auto gap-y-3 verticalScroll max-h-screen pb-36">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
                    <NotifikasiWebiste key={i} />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-row justify-center ml-[10px]">
          {decoded ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row justify-center ml-[10px] group">
                  <CircleUserRound
                    className={`w-[24px] h-[24px] ${
                      pathName === "/profile" ||
                      pathName === "/survei" ||
                      pathName === "/pengaduan" ||
                      pathName === "/riwayat"
                        ? "text-secondary-700 group-hover:text-primary-800"
                        : "text-primary-800 group-hover:text-secondary-700"
                    }`}
                  />

                  <ChevronDown
                    className={`w-[24px] h-[24px] ${
                      pathName === "/profile" ||
                      pathName === "/survei" ||
                      pathName === "/pengaduan" ||
                      pathName === "/riwayat"
                        ? "text-secondary-700 group-hover:text-primary-800"
                        : "text-primary-800 group-hover:text-secondary-700"
                    }`}
                  />
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
                  <DropdownMenuItem className="text-neutral-700 hover:pl-3 hover:text-secondary-700 focus:text-secondary-700 group cursor-pointer">
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
                  href="/survei"
                  className={`${
                    pathName === "/survei"
                      ? "text-secondary-700 hover:text-neutral-700"
                      : "text-neutral-700 hover:text-secondary-700"
                  }`}>
                  <DropdownMenuItem className="text-neutral-700 hover:pl-3 hover:text-secondary-700 focus:text-secondary-700 group cursor-pointer">
                    <ClipboardList
                      className={`${
                        pathName === "/survei"
                          ? "text-secondary-700 hover:text-neutral-700"
                          : "text-neutral-700 hover:text-secondary-700"
                      } w-[20px] h-[20px] mr-[16px] group-hover:text-secondary-700`}
                    />

                    <p
                      className={`${
                        pathName === "/survei"
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
                  <DropdownMenuItem className="text-neutral-700 hover:pl-3 hover:text-secondary-700 focus:text-secondary-700 group cursor-pointer">
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
                  <DropdownMenuItem className="text-neutral-700 hover:pl-3 hover:text-secondary-700 focus:text-secondary-700 group cursor-pointer">
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
              className="md:w-full md:ml-4 md:text-[16px] md:px-[24px] md:py-[6px] md:bg-secondary-700 md:text-neutral-50 md:rounded-[50px] md:hover:bg-secondary-700 cursor-pointer">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
