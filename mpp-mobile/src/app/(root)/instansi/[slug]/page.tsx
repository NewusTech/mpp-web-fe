"use client";

import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface detailType {
  id?: number;
  name?: string;
  email?: string;
  alamat?: string;
  desc?: string;
  telp?: string;
  image?: string;
  pj?: string;
  jam_buka?: string;
  jam_tutup?: string;
  nip_pj?: string;
  jmlLayanan?: number;
  Layanans?: LayanansType[];
}

interface LayanansType {
  name?: string;
  dasarhukum?: string;
  desc?: string;
  syarat?: string;
}

function splitByNumberedItems(text: string) {
  let splitText = [""];
  if (text) {
    splitText = text.split(/(?=\d+\.\s)/).map((item: string) => item.trim());
    return splitText;
  }
}

export default function InstansiDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [detailins, setDetailIns] = useState<detailType>();
  const [activeTab, setActiveTab] = useState("Persyaratan");

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
    <div className="bg-primary-100 md:h-full md:pb-[200px]">
      <div className="flex flex-col bg-primary-100 md:rounded-2xl md:shadow-xl mx-[35px] md:mx-[70px] md:px-[70px] my-[24px] md:mt-[36px] md:my-0 items-center justify-center mb-[29px] md:pb-[30px] md:mb-0 md:pt-[36px]">
        <div className="md:flex md:flex-row md:w-full">
          <div className="flex flex-col items-center w-full md:w-10/12 h-[500px] md:min-h-full justify-center md:mx-0 outline outline-1 outline-neutral-700 bg-primary-700 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-center w-full">
              <Image
                src={detailins?.image || ""}
                className="=w-full h-full object-contain"
                alt="Lampung Timur"
                width={108}
                height={144}
              />
            </div>

            <div className="grid grid-rows-1 w-full mt-8 place-items-center mb-[40px] px-3">
              <h6 className="text-[16px] text-center text-neutral-50 font-normal">
                {detailins?.name}
              </h6>
            </div>
          </div>

          <div className="grid grid-rows-6 mt-[32px] md:ml-[70px]">
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
                {detailins?.email}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jam Operasional
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.jam_buka} - {detailins?.jam_tutup}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-[15px]">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jumlah Layanan
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-[8px]">
                {detailins?.jmlLayanan}
              </p>
            </div>

            <div className="flex flex-row md:justify-between w-full items-center gap-x-4 self-center">
              <Button
                variant="secondary"
                className="bg-secondary-700 px-5 hover:bg-secondary-600 text-neutral-50 w-6/12">
                <Link
                  href={`/instansi/booking-antrian/${detailins?.id}`}
                  className="w-full flex justify-center items-center">
                  Booking Antrian
                </Link>
              </Button>

              <Button variant="success" className="w-6/12 text-neutral-50 px-5">
                <Link
                  href={`/instansi/permohonan-layanan/${detailins?.id}`}
                  className="w-full flex justify-center items-center">
                  Permohonan Layanan
                </Link>
              </Button>
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

      <div className="flex flex-col bg-primary-100 md:rounded-2xl md:shadow-xl mx-[35px] md:mx-[70px] md:px-[70px] my-[24px] md:mt-[36px] md:my-0 mb-[29px] md:pb-[30px] md:mb-0 md:pt-[36px]">
        <h5 className="text-[14px] md:text-[20px] text-primary-800 font-semibold mb-8">
          Informasi Layanan
        </h5>

        <Accordion type="single" collapsible>
          {detailins?.Layanans &&
            detailins?.Layanans?.map((item: LayanansType, i: number) => {
              return (
                <AccordionItem
                  className="w-full h-full mb-2"
                  value={`item-${i}`}>
                  <AccordionTrigger>{item.name}</AccordionTrigger>
                  <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                    <div className="grid grid-cols-3 w-full md:w-6/12 p-2 mt-8 items-center justify-between border border-neutral-700 bg-neutral-50 rounded-full">
                      <button
                        className={`p-2 ${
                          activeTab === "Persyaratan"
                            ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
                            : "text-neutral-900"
                        }`}
                        onClick={() => setActiveTab("Persyaratan")}>
                        Persyaratan
                      </button>

                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Dasar Hukum"
                            ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
                            : "text-neutral-900"
                        }`}
                        onClick={() => setActiveTab("Dasar Hukum")}>
                        Dasar Hukum
                      </button>

                      <button
                        className={`p-2 ${
                          activeTab === "Pelayanan"
                            ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
                            : "text-neutral-900"
                        }`}
                        onClick={() => setActiveTab("Pelayanan")}>
                        Pelayanan
                      </button>
                    </div>

                    <div className="mt-6">
                      {activeTab === "Persyaratan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[20px] mb-6">
                            Persyaratan
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                              {item.syarat}
                            </li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "Dasar Hukum" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[20px]">
                            Dasar Hukum
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                              {item.dasarhukum}
                            </li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "Pelayanan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[20px]">
                            Pelayanan
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                              {item.desc}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
}
