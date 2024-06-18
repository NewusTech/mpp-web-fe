"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: 1,
    name: "Layanan Pembuatan KTP",
  },
  {
    id: 2,
    name: "Layanan Pembuatan Kartu Keluarga",
  },
  {
    id: 3,
    name: "Layanan Pembuatan Surat Sehat",
  },
];

export default function BookingAntrianScreen() {
  const [selected, setSelected] = useState<string | null>();
  const [changeOpacity, setChangeOpacity] = useState(false);

  const handleSelectChangeDinas = (value: string) => {
    setSelected(value);
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeOpacity(true);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeOpacity(true);
  };

  return (
    <div className="flex justify-center bg-primary-100 md:mx-[170px] mt-[53.5px] mb-[120px] md:mb-0 md:pb-[100px]">
      <div className="flex w-full md:w-full flex-col items-center mx-6">
        <div className="md:w-full">
          <h5 className="text-[20px] md:text-[32px] font-semibold text-primary-800">
            Booking Antrian
          </h5>
        </div>

        <div className="flex flex-col w-full md:w-full border border-neutral-700 items-center mt-[32px] bg-white rounded-2xl shadow-lg">
          <form className="flex flex-col w-full px-[16px] md:px-[105px]">
            <div className="flex flex-col w-full items-center mb-[10px] md:mb-[20px] mx-[1px] md:mt-[62px]">
              <Select name="layanan_id" onValueChange={handleSelectChangeDinas}>
                <SelectTrigger
                  className={`${
                    !selected ? "opacity-50" : ""
                  } border-b border-neutral-800 rounded-none pl-4 w-full mx-0 pr-0`}>
                  <SelectValue
                    placeholder="Pilih Layanan"
                    className={selected ? "" : "placeholder:opacity-50"}
                  />
                </SelectTrigger>
                <SelectContent className="w-[266px] md:w-full">
                  <div>
                    {services.map(
                      (service: { id: number; name: string }, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className="pr-none"
                            value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        );
                      }
                    )}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center my-[10px] md:mt-[14px] mx-[1px]">
              <input
                type="date"
                name="tanggal"
                className={`w-full pl-4 h-[40px] rounded-none border-b border-neutral-800 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                placeholder="Tanggal"
                onChange={handleChangeDate}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              />
            </div>

            <div className="flex flex-col items-center my-[10px] md:my-[20px] mx-[1px]">
              <input
                type="time"
                name="jam"
                className={`w-full pl-4 h-[40px] rounded-none border-b border-neutral-800 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                placeholder="time"
                onChange={handleChangeTime}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              />
            </div>

            <div className="flex md:self-end mb-[32px] md:pb-8 mt-[16px]">
              <Link
                href="/layanan/booking-antrian/booking-result"
                className="text-[12px] flex items-center justify-center text-center text-neutral-50 w-[90px] md:w-[235px] h-[30px] md:h-[40px] bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] font-normal md:py-[11px] md:px-[99.5px]"
                type="submit">
                Pilih
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
