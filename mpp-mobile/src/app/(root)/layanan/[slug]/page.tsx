"use client";

import React, { useEffect, useState } from "react";

interface detailType {
  name?: string;
  alamat?: string;
  desc?: string;
  telp?: string;
  image?: string;
  pj?: string;
  nip_pj?: string;
}

export default function InstansiDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [detailins, setDetailIns] = useState<detailType>();

  const fetchDetail = async (slug: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/instansi/get/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    setDetailIns(result.data);
  };

  useEffect(() => {
    fetchDetail(params.slug);
  }, [params.slug]);

  return (
    <div className="flex flex-col mx-[35px] my-[24px] items-center justify-center mb-[29px]">
      <div className="flex flex-col items-center justify-center mx-[10px] outline outline-1 outline-neutral-700 bg-primary-700 shadow-2xl rounded-2xl">
        <div className="flex items-center justify-center w-[270px]">
          <img
            src={detailins?.image}
            className="w-[108px] h-[144px] mb-[16px] mt-[44px]"
            alt="Lampung Timur"
          />
        </div>

        <div className="grid grid-rows-1 place-items-center mb-[40px]">
          <h6 className="text-[16px] text-center text-neutral-50 font-normal">
            {detailins?.name}
          </h6>
        </div>
      </div>

      <div className="grid grid-rows-5 mt-[32px]">
        <div className="grid grid-cols-2 items-center mb-[15px]">
          <h6 className="text-[12px] text-primary-800 font-semibold">Alamat</h6>

          <p className="text-[12px] text-neutral-900 font-normal pl-[8px]">
            {detailins?.alamat}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center mb-[15px]">
          <h6 className="text-[12px] text-primary-800 font-semibold">Kontak</h6>

          <p className="text-[12px] text-neutral-900 font-normal pl-[8px]">
            {detailins?.telp}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center mb-[15px]">
          <h6 className="text-[12px] text-primary-800 font-semibold">Email</h6>

          <p className="text-[12px] text-neutral-900 font-normal pl-[8px]">
            {detailins?.pj}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center mb-[15px]">
          <h6 className="text-[12px] text-primary-800 font-semibold">
            Jam Operasional
          </h6>

          <p className="text-[12px] text-neutral-900 font-normal pl-[8px]">
            {detailins?.nip_pj}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center">
          <h6 className="text-[12px] text-primary-800 font-semibold">
            Jumlah Layanan
          </h6>

          <p className="text-[12px] text-neutral-900 font-normal pl-[8px]">
            {detailins?.name}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-[32px] w-full">
        <h6 className="text-[14px] text-primary-800 font-semibold">
          Informasi Instansi
        </h6>

        <p className="text-[12px] text-normal text-neutral-900 mt-[16px] text-justify">
          {detailins?.desc}
        </p>
      </div>
    </div>
  );
}
