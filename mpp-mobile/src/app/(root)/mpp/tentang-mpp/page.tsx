"use client";

import fetchVisiMisi from "@/components/fetching/visimisi/visimisi";
import { useEffect, useState } from "react";
import { VisiMisiType } from "@/types/type";
import parse from "html-react-parser";
import alurmpp from "@/../../public/assets/alurmpplamtim.jpg";
import Image from "next/legacy/image";

export default function MppPage() {
  const [visimisi, setVisimisi] = useState<VisiMisiType>({
    visi: "",
    misi: "",
  });
  const fetchVisiMisiMpp = async () => {
    const visimisi = await fetchVisiMisi();

    setVisimisi(visimisi.data);
  };

  useEffect(() => {
    fetchVisiMisiMpp();
  }, []);

  return (
    <div className="bg-primary-100 md:mx-12 md:h-full">
      <div className="flex flex-col w-full items-center justify-center pb-32 pt-4 px-[35px] md:px-0 bg-primary-100 md:mx-0 mb-4 md:mb-0 md:pb-[150px]">
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none place-items-center md:place-items-start md:mx-[35px] gap-[16px] md:mb-[62px]">
          <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
            <h4 className="text-primary-800 text-[18px] md:text-[26px] font-semibold">
              VISI
            </h4>

            <div className="text-[14px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
              {parse(visimisi.visi)}
            </div>
          </div>

          <div className="flex flex-col text-center gap-4 md:gap-[40px]">
            <h4 className="text-primary-800 text-[18px] md:text-[26px] font-semibold">
              MISI
            </h4>

            <div className="text-[14px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
              {parse(visimisi.misi)}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center mt-8">
          <h4 className="text-primary-800 text-[18px] md:text-[26px] font-semibold md:mb-[40px]">
            ALUR PELAYANAN MPP
          </h4>

          <div className="flex flex-col md:flex-row w-full mt-4 md:px-12 md:gap-x-6">
            <div className="flex flex-col w-full h-full pb-8 bg-neutral-50 shadow-md rounded-2xl">
              <Image
                src={alurmpp}
                alt="alur mpp"
                className="w-full h-ful object-contain rounded-xl"
                loading="lazy"
                placeholder="blur"
                width={1920}
                height={1080}
              />
            </div>

            <div className="flex flex-col w-full h-full pb-8 bg-neutral-50 shadow-md rounded-2xl mt-2 md:mt-0">
              <Image
                src={alurmpp}
                alt="alur mpp"
                className="w-full h-ful object-contain rounded-xl"
                loading="lazy"
                placeholder="blur"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
