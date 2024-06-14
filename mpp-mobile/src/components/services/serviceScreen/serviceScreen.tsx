"use client";

import SearchComponent from "@/components/others/searchComponent/searchComponent";
import CardLayananComponent from "../others/cardLayananComponent";

export default function ServiceScreen({ instansi, change, search }: any) {
  return (
    <div className="flex flex-col items-center mt-[24px] mb-[46px]">
      <h4 className="text-primary-800 text-[16px] mb-[32px] font-semibold">
        Layanan Mal Pelayanan Publik
      </h4>

      <div className="flex flex-col justify-center gap-[16px]">
        <SearchComponent change={change} search={search} />

        {instansi.map((layanan: any) => {
          return <CardLayananComponent key={layanan.id} layanan={layanan} />;
        })}
      </div>
    </div>
  );
}
