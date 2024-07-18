import React from "react";

type DataStatistik = {
  data: {
    name: string;
    permohonan_count: number;
    skm_count: number;
  };
};

export default function CardGrafikBulananComponent({ data }: DataStatistik) {
  return (
    <div className="grid grid-rows-5 w-full bg-neutral-50 rounded-xl shadow-md p-[17px] gap-2">
      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Instansi</p>

        <p className="text-[12px] font-normal text-primary-800">
          : {data.name}
        </p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Total</p>

        <p className="text-[12px] font-normal text-primary-800">: 300</p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Antrian</p>

        <p className="text-[12px] font-normal text-primary-800">: 100</p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Permohonan</p>

        <p className="text-[12px] font-normal text-primary-800">
          : {data.permohonan_count}
        </p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">SKM</p>

        <p className="text-[12px] font-normal text-primary-800">
          : {data.skm_count}
        </p>
      </div>
    </div>
  );
}
