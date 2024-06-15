"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { History } from "lucide-react";
import { LogOut } from "lucide-react";
import logo from "@/../public/assets/450px-Lokasi_Lampung_Kabupaten_Lampung_Timur.png";
import Image from "next/image";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function NavbarScreen() {
  const pathName = usePathname();
  return (
    <div className="flex relative py-[32px] justify-between mx-[70px] md:mx-0 z-10 md:bg-primary-700 md:px-[70px]">
      <Link href="/" className="flex flex-row w-[266px] h-[64px]">
        <Image src={logo} alt="Lampung Timur" className="w-[73px] h-[64px]" />

        <div className="flex flex-col w-[193px] h-[64px] leading-none">
          <h3
            className={`text-[#3A6C38] text-[24px] ${raleway.className} font-extrabold`}>
            MPP
          </h3>

          <h3
            className={`${raleway.className} font-bold text-[14px] text-[#F3CB53] py-[4px]`}>
            MAL PELAYANAN PUBLIK
          </h3>

          <h3
            className={`${raleway.className} font-normal text-[#656565] text-[12px]`}>
            Lampung Timur
          </h3>
        </div>
      </Link>

      <div className="flex flex-row justify-center items-center w-[733px] h-[64px]">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            Beranda
          </Link>
          <Link
            href="/mpp"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/mpp"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            MPP
          </Link>
          <Link
            href="/layanan"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/layanan"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            Layanan
          </Link>
          <Link
            href="/berita"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/berita"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            Berita
          </Link>
          <Link
            href="/survey"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/skm"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            SKM
          </Link>
          <Link
            href="/statistics"
            className={`text-center w-[111.5px] text-[20px] text-[#3A6C38] ${
              pathName === "/statistik"
                ? "text-[#F3CB53] hover:text-[#3A6C38]"
                : "text-[#3A6C38] hover:text-[#F3CB53]"
            } font-light`}>
            Statistik
          </Link>
        </div>

        <div className="flex flex-row justify-center ml-[10px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row justify-center ml-[10px]">
                <CircleUserRound className="w-[24px] h-[24px] text-[#3A6C38] hover:text-[#F3CB53]" />

                <ChevronDown className="w-[24px] h-[24px] text-[#3A6C38] hover:text-[#F3CB53]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link
                href="/profile"
                className={`${
                  pathName === "/profile"
                    ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                    : "text-[#C4C4C4] hover:text-[#7BBA78]"
                }`}>
                <DropdownMenuItem className="text-[#C4C4C4] hover:text-[#7BBA78] focus:text-[#7BBA78]">
                  <CircleUserRound
                    className={`${
                      pathName === "/profile"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } w-[20px] h-[20px] mr-[16px]`}
                  />

                  <p
                    className={`${
                      pathName === "/profile"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } text-[16px]`}>
                    Profile
                  </p>
                </DropdownMenuItem>
              </Link>

              <Link
                href="/riwayat"
                className={`${
                  pathName === "/riwayat"
                    ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                    : "text-[#C4C4C4] hover:text-[#7BBA78]"
                }`}>
                <DropdownMenuItem className="text-[#C4C4C4] hover:text-[#7BBA78] focus:text-[#7BBA78]">
                  <History
                    className={`${
                      pathName === "/riwayat"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } w-[20px] h-[20px] mr-[16px]`}
                  />

                  <p
                    className={`${
                      pathName === "/riwayat"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } text-[16px]`}>
                    Riwayat
                  </p>
                </DropdownMenuItem>
              </Link>

              <button
                className={`${
                  pathName === "/logout"
                    ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                    : "text-[#C4C4C4] hover:text-[#7BBA78]"
                }`}>
                <DropdownMenuItem className="text-[#C4C4C4] hover:text-[#7BBA78] focus:text-[#7BBA78]">
                  <LogOut
                    className={`${
                      pathName === "/logout"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } w-[20px] h-[20px] mr-[16px]`}
                  />

                  <p
                    className={`${
                      pathName === "/logout"
                        ? "text-[#7BBA78] hover:text-[#C4C4C4]"
                        : "text-[#C4C4C4] hover:text-[#7BBA78]"
                    } text-[16px]`}>
                    Keluar
                  </p>
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
