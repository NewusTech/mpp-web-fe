"use client";
import { Home, Landmark, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MenuScreen from "../../menuScreen/menuScreen";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HamburgerMenu() {
  const [isClose, setIsClose] = useState(false);
  const pathName = usePathname();

  const closeMenu = () => setIsClose(false);

  return (
    <section className="grid grid-cols-5 place-items-center w-full px-2 py-4">
      <Link
        href={"/"}
        className={`${
          pathName === "/" ? "bg-primary-700 rounded-xl" : ""
        } grid grid-rows-2 place-items-center gap-y-2 w-full p-2`}>
        <Home
          className={`w-5 h-5 ${
            pathName === "/" ? "text-neutral-50" : "text-primary-700"
          } `}
        />

        <p
          className={`${
            pathName === "/" ? "text-neutral-50" : "text-primary-700"
          } font-normal text-[12px]`}>
          Beranda
        </p>
      </Link>

      <Link
        href={"/mpp/tentang-mpp"}
        className={`${
          pathName === "/mpp/tentang-mpp" ? "bg-primary-700 rounded-xl" : ""
        } grid grid-rows-2 place-items-center gap-y-2 w-full p-2`}>
        <LayoutDashboard
          className={`w-5 h-5 ${
            pathName === "/mpp/tentang-mpp"
              ? "text-neutral-50"
              : "text-primary-700"
          }`}
        />

        <p
          className={`${
            pathName === "/mpp/tentang-mpp"
              ? "text-neutral-50"
              : "text-primary-700"
          } font-normal text-[12px]`}>
          MPP
        </p>
      </Link>

      <Link
        href={"/instansi"}
        className={`${
          pathName === "/instansi" ? "bg-primary-700 rounded-xl" : ""
        } grid grid-rows-2 place-items-center gap-y-2 w-full p-2`}>
        <Landmark
          className={`w-5 h-5 ${
            pathName === "/instansi" ? "text-neutral-50" : "text-primary-700"
          }`}
        />

        <p
          className={`${
            pathName === "/instansi" ? "text-neutral-50" : "text-primary-700"
          } font-normal text-[12px]`}>
          Instansi
        </p>
      </Link>

      <Link
        href={"/kontak"}
        className={`${
          pathName === "/kontak" ? "bg-primary-700 rounded-xl" : ""
        } grid grid-rows-2 place-items-center gap-y-2 w-full p-2`}>
        <UserRound
          className={`w-5 h-5 ${
            pathName === "/kontak" ? "text-neutral-50" : "text-primary-700"
          }`}
        />

        <p
          className={`${
            pathName === "/kontak"
              ? "text-neutral-50 rounded-xl"
              : "text-primary-700"
          } font-normal text-[12px]`}>
          Kontak
        </p>
      </Link>

      <Drawer direction="right" open={isClose} onOpenChange={setIsClose}>
        <DrawerTrigger className="">
          <div
            className={`${
              pathName !== "/" &&
              pathName !== "/mpp/tentang-mpp" &&
              pathName !== "/instansi" &&
              pathName !== "/kontak"
                ? "bg-primary-700 rounded-xl"
                : ""
            } grid grid-rows-2 place-items-center gap-y-2 w-full p-2`}>
            <Menu
              className={`${
                pathName !== "/" &&
                pathName !== "/mpp/tentang-mpp" &&
                pathName !== "/instansi" &&
                pathName !== "/kontak"
                  ? "text-neutral-50"
                  : "text-primary-700"
              } w-5 h-5`}
            />

            <p
              className={`${
                pathName !== "/" &&
                pathName !== "/mpp/tentang-mpp" &&
                pathName !== "/instansi" &&
                pathName !== "/kontak"
                  ? "text-neutral-50"
                  : "text-primary-700"
              } font-normal text-[12px]`}>
              Lainnya
            </p>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <>
            <MenuScreen closeMenu={closeMenu} />
          </>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
