import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import logo from "@/../public/assets/DesignLogoMpp.svg";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function NavbarMobile() {
  return (
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
  );
}
