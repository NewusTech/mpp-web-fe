"use client";

import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import loginDong from "@/../../public/assets/undraw_back_home_nl-5-c.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import wrapText from "@/utils/formatText";
import parse from "html-react-parser";

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
  status: boolean;
  slug: string;
}

interface LayanansType {
  name?: string;
  dasarhukum?: string;
  desc?: string;
  syarat?: string;
}

export default function InstansiDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [detailins, setDetailIns] = useState<detailType>();
  const [activeTab, setActiveTab] = useState("Persyaratan");
  const [token, setToken] = useState<string | undefined>(undefined);

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
    setToken(Cookies.get("Authorization"));
  }, [params.slug]);

  const email = wrapText(detailins?.email || "", 15);

  return (
    <div className="bg-primary-100 md:h-full pb-32">
      <div className="flex flex-col bg-neutral-50 rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-4 md:my-0 items-center justify-center mb-[29px] md:pb-[30px] md:mb-0 md:pt-9">
        <div className="flex flex-col md:items-center md:flex-row w-full bg-neutral-50 p-4 rounded-xl">
          <div className="flex flex-col items-center border border-neutral-700 w-full md:w-10/12 h-full md:min-h-full justify-center md:mx-0 bg-neutral-50 shadow-lg rounded-xl">
            {detailins?.image && (
              <div className="flex items-center justify-center w-full h-full p-8 md:p-24">
                <Image
                  src={detailins?.image}
                  className="w-full h-full object-contain"
                  alt={detailins?.name || ""}
                  width={230}
                  height={230}
                />
              </div>
            )}

            <div className="grid grid-rows-1 w-full mt-2 bg-primary-700 place-items-center place-content-center rounded-b-xl py-5 px-3">
              <h6 className="text-[20px] text-center text-neutral-50 font-normal">
                {detailins?.name}
              </h6>
            </div>
          </div>

          <div className="grid grid-rows-7 mt-8 md:ml-[70px]">
            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Alamat
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.alamat || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Kontak
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.telp || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Email
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {email || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Website
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                -
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jam Operasional
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.jam_buka} - {detailins?.jam_tutup}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jumlah Layanan
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.jmlLayanan || "-"}
              </p>
            </div>

            <div className="flex flex-row w-full md:justify-between justify-center items-center gap-x-2 self-center">
              {!token ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-secondary-700 text-[12px] md:text-[16px] px-5 flex items-center justify-center hover:bg-secondary-600 text-neutral-50 w-full h-[40px] rounded-full">
                      Booking Antrian
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center p-6">
                    <DialogHeader>
                      <div className="bg-neutral-50 w-full">
                        <Image
                          src={loginDong}
                          alt="Login Dong"
                          width={200}
                          height={200}
                        />

                        <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                          Maaf, Anda tidak mempunyai akses!
                        </p>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="w-full">
                      <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                        <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                        <Link href={"/login"} className="text-primary-800">
                          Login
                        </Link>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  {detailins?.status === true ? (
                    <Button className="w-full flex justify-center font-normal items-center rounded-full bg-secondary-700 hover:bg-secondary-600 text-neutral-50 p-3">
                      <Link href={`/instansi/booking-antrian/${detailins?.id}`}>
                        Booking Antrian
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full flex justify-center font-normal items-center rounded-full bg-secondary-700 hover:bg-secondary-600 text-neutral-50 p-3">
                      <Link href={`/instansi/${detailins?.slug}`}>
                        Booking Antrian
                      </Link>
                    </Button>
                  )}
                </>
              )}

              {!token ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-primary-700 px-5 font-normal text-[12px] md:text-[16px] flex items-center justify-center hover:bg-primary-600 text-neutral-50 w-full h-[40px] rounded-full">
                      Permohonan Layanan
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center p-6">
                    <DialogHeader>
                      <div className="bg-neutral-50 w-full">
                        <Image
                          src={loginDong}
                          alt="Login Dong"
                          width={200}
                          height={200}
                        />

                        <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                          Maaf, Anda tidak mempunyai akses!
                        </p>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="w-full">
                      <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                        <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                        <Link href={"/login"} className="text-primary-800">
                          Login
                        </Link>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  {detailins?.status === true ? (
                    <Link
                      className="w-full h-[40px] md:w-full flex justify-center font-normal items-center rounded-full bg-primary-700 hover:bg-primary-600 text-neutral-50 p-3"
                      href={`/instansi/permohonan-layanan/${detailins?.id}`}>
                      <Button className="font-normal">
                        Permohonan Layanan
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      className="w-full h-[40px] flex justify-center items-center font-normal rounded-full bg-primary-700 hover:bg-primary-600 text-neutral-50 p-3"
                      href={`/instansi/${detailins?.slug}`}>
                      <Button className="font-normal" disabled>
                        Permohonan Layanan
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-50 p-4 rounded-xl shadow-lg md:rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-[36px] md:my-0 mb-[29px] md:pb-[30px] md:mb-0 md:pt-9">
        <h5 className="text-[14px] md:text-[20px] text-primary-800 font-semibold mb-8">
          Informasi Layanan
        </h5>

        <Accordion type="single" collapsible>
          {detailins?.Layanans &&
            detailins?.Layanans?.map((item: LayanansType, i: number) => {
              return (
                <AccordionItem
                  key={i}
                  className="w-full h-full mb-2"
                  value={`item-${i}`}>
                  <AccordionTrigger className="text-[12px]">
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                    <div className="grid grid-cols-3 w-full md:w-6/12 p-2 items-center justify-between border border-neutral-700 bg-neutral-50 rounded-full">
                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Persyaratan"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Persyaratan")}>
                        Persyaratan
                      </button>

                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Dasar Hukum"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Dasar Hukum")}>
                        Dasar Hukum
                      </button>

                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Pelayanan"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Pelayanan")}>
                        Pelayanan
                      </button>
                    </div>

                    <div className="mt-6">
                      {activeTab === "Persyaratan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Persyaratan
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[12px] md:text-[16px] list-disc ml-6">
                              {item.syarat && parse(item?.syarat)}
                            </li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "Dasar Hukum" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Dasar Hukum
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[12px] md:text-[16px] list-disc ml-6">
                              {item.dasarhukum && parse(item?.dasarhukum)}
                            </li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "Pelayanan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Pelayanan
                          </h5>

                          <ul>
                            <li className="text-neutral-900 font-normal text-[12px] md:text-[16px] list-disc ml-6">
                              {item.desc && parse(item?.desc)}
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
