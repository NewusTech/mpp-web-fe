"use client";

import Image from "next/legacy/image";
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
    <div className="bg-primary-100 md:h-full md:pb-[315px]">
      <div className="flex flex-col bg-primary-100 md:rounded-2xl md:shadow-xl mx-[35px] md:mx-[70px] md:px-[70px] my-[24px] md:mt-[36px] md:my-0 items-center justify-center mb-[29px] md:pb-[30px] md:mb-0 md:pt-[36px]">
        <div className="md:flex md:flex-row md:w-full">
          <div className="flex flex-col items-center justify-center mx-[10px] md:mx-0 outline outline-1 outline-neutral-700 bg-primary-700 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-center w-[270px]">
              <Image
                src={detailins?.image || ""}
                className="w-[108px] md:w-[170px] h-[144px] md:h-[190px] mb-[16px] mt-[44px]"
                alt="Lampung Timur"
                width={108}
                height={144}
              />
            </div>

            <div className="grid grid-rows-1 place-items-center mb-[40px] px-3">
              <h6 className="text-[16px] text-center text-neutral-50 font-normal">
                {detailins?.name}
              </h6>
            </div>
          </div>

          <div className="grid grid-rows-5 mt-[32px] md:ml-[70px]">
            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Alamat
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.alamat}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Kontak
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.telp}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Email
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.pj}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jam Operasional
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.nip_pj}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jumlah Layanan
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-[32px] w-full">
          <h6 className="text-[14px] md:text-[20px] text-primary-800 font-semibold">
            Informasi Instansi
          </h6>

          <p className="text-[12px] md:text-[14px] font-normal text-neutral-900 mt-[16px] text-justify">
            {detailins?.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
