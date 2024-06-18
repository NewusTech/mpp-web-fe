"use client";

import SearchComponent from "@/components/others/searchComponent/searchComponent";
import CardLayananComponent from "../others/cardLayananComponent";
import backHome from "@/../../public/assets/undraw_back_home_nl-5-c.svg";

export default function ServiceScreen({ instansi, change, search }: any) {
  return (
    <div className="flex flex-col bg-primary-100 items-center mt-[24px] mb-[46px] md:mb-0 md:pb-[46px] md:px-[70px]">
      <h4 className="text-primary-800 text-[16px] md:text-[32px] mb-[32px] font-semibold">
        Layanan Mal Pelayanan Publik
      </h4>

      <div className="flex flex-col md:w-full justify-center gap-[36px]">
        <div className="w-full md:self-end md:w-1/3 md:pr-[60px]">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex flex-col md:w-full md:flex-wrap md:justify-center md:gap-[32px] md:flex-row gap-[16px]">
          {instansi.map((layanan: any) => {
            return (
              <>
                <CardLayananComponent key={layanan.id} layanan={layanan} />
                <CardLayananComponent key={layanan.id} layanan={layanan} />
                <CardLayananComponent key={layanan.id} layanan={layanan} />
                <CardLayananComponent key={layanan.id} layanan={layanan} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
