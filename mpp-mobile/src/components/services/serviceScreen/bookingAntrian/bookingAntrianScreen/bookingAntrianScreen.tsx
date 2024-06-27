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
    <div className="flex w-full justify-center bg-primary-100 px-[35px] md:px-[150px] mt-[24px] mb-[170px] md:mb-0 md:pb-[130px]">
      <div className="flex w-full h-full md:w-full flex-col items-center">
        <div className="md:w-full">
          <h5 className="text-[20px] md:text-[32px] font-semibold text-primary-800">
            Booking Antrian
          </h5>
        </div>

        <div className="flex flex-col w-full md:w-full border border-neutral-700 items-center px-[25px] mt-[32px] bg-white rounded-2xl shadow-lg">
          <form className="flex flex-col w-full md:px-[105px]">
            <div className="flex flex-col w-full items-center mt-8 mb-[10px] md:mb-[20px] mx-[1px] md:mt-[62px]">
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
                            className="pr-none text-neutral-900"
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

            <div className="flex md:self-center mb-[32px] md:gap-5 md:pb-8 mt-[16px]">
              <Link
                href="/layanan/booking-antrian/booking-result"
                className="text-[12px] flex items-center justify-center text-center text-neutral-50 w-[90px] md:w-full h-[30px] md:h-[40px] bg-secondary-700 hover:bg-secondary-600 rounded-[50px] font-normal md:py-[11px] md:px-[99.5px]"
                type="submit">
                Cek Antrian
              </Link>

              <Link
                href="/layanan/booking-antrian/booking-result"
                className="text-[12px] flex items-center justify-center text-center text-neutral-50 w-[90px] md:w-full h-[30px] md:h-[40px] bg-primary-700 hover:bg-primary-600 rounded-[50px] font-normal md:py-[11px] md:px-[99.5px]"
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
