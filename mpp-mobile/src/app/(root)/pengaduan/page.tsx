import CardPengaduanComponent from "@/components/pengaduan/cardPengaduanComponent/cardPengaduanComponent";
import PopUpPengaduanComponent from "@/components/pengaduan/popUpPengaduanComponent/popUpPengaduanComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function PengaduanScreen() {
  return (
    <div className="flex flex-col bg-primary-100 mt-[24px] mx-[35px] pb-[24px]">
      <div>
        <h1 className="text-[20px] text-primary-800 font-bold">
          Pengaduan Layanan
        </h1>

        <div className="w-full mt-8">
          <PopUpPengaduanComponent />

          <div className="flex flex-col">
            <CardPengaduanComponent />
            <CardPengaduanComponent />
            <CardPengaduanComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
