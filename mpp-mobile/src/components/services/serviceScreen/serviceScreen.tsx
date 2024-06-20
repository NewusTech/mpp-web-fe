"use client";

import SearchComponent from "@/components/others/searchComponent/searchComponent";
import CardLayananComponent from "../others/cardLayananComponent";
import backHome from "@/../../public/assets/undraw_back_home_nl-5-c.svg";
import Image from "next/image";

interface Layanantype {
  id: number;
  name: string;
  image?: string;
  slug: string;
  jmlLayanan: number;
}

export default function ServiceScreen({ instansi, change, search }: any) {
  return (
    <div className="w-full flex flex-col bg-primary-100 items-center px-[35px] mt-[24px] mb-[46px] md:mb-0 md:pb-[200px] md:px-[70px]">
      <h4 className="text-primary-800 text-[16px] md:text-[32px] mb-[32px] font-semibold">
        Layanan Mal Pelayanan Publik
      </h4>

      <div className="flex w-full flex-col md:w-full justify-center gap-[36px]">
        <div className="w-full md:self-end md:w-1/3 md:pr-[60px]">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex w-full flex-col md:w-full md:flex-wrap md:justify-center md:gap-[16px] md:flex-row gap-[16px]">
          {instansi.length > 0 ? (
            <>
              {instansi.map((layanan: Layanantype, i: number) => {
                return <CardLayananComponent key={i} layanan={layanan} />;
              })}
            </>
          ) : (
            <div className="container mx-auto flex flex-col md:w-full justify-center items-center w-full h-full">
              <Image src={backHome} width={300} height={300} alt="sad" />
              <p className="text-center text-neutral-900 text-[12px] md:text-[32px] font-thin mt-4">
                Data tidak ditemukan!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
