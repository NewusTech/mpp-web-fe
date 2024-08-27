import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import MobileNotifikasi from "../notifikasi/mobileNotifikasi";
import Cookies from "js-cookie";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const auth = Cookies.get("Authorization");

export default function NavbarMobile() {
  return (
    <div className="w-full flex flex-row">
      <Link
        href="/"
        className="flex justify-center self-center w-full py-4 gap-x-4 bg-primary-100 flex-row md:hidden">
        <div className="w-2/12">
          <Image
            src={logo}
            alt="Lampung Timur"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-col self-center justify-center w-6/12 h-full leading-none">
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

      <div className="flex flex-row bg-primary-100 justify-center pr-5">
        <Popover>
          <PopoverTrigger>
            <Bell className="w-6 h-6 text-primary-800 hover:text-secondary-700" />
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-[390px] bg-primary-500 bg-opacity-80 border border-primary-500 shadow-lg rounded-lg">
            <div className="w-full flex flex-col gap-y-3">
              <div className="w-full border-b border-neutral-900">
                <h3 className="text-neutral-900 font-semibold text-[20px]">
                  Notifikasi
                </h3>
              </div>

              <div className="w-full flex flex-col overflow-y-auto gap-y-3 verticalScroll max-h-screen pb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
                  <MobileNotifikasi key={i} />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
