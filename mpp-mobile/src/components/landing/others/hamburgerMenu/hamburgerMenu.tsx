"use client";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MenuScreen from "../../menuScreen/menuScreen";

export default function HamburgerMenu() {
  const [isClose, setIsClose] = useState(false);

  const closeMenu = () => setIsClose(false);

  return (
    <Drawer direction="top" open={isClose} onOpenChange={setIsClose}>
      <DrawerTrigger className="bg-primary-700 w-screen h-[57px] flex justify-end px-[35px] items-center">
        <>
          <Menu className="text-white" />
        </>
      </DrawerTrigger>
      <DrawerContent>
        <>
          <MenuScreen closeMenu={closeMenu} />
        </>
      </DrawerContent>
    </Drawer>
  );
}
