"use client";

import fetchVisiMisi from "@/components/fetching/visimisi/visimisi";
import { useEffect, useState } from "react";
import {
  AlurAntrianType,
  AlurPermohonanType,
  VisiMisiType,
} from "@/types/type";
import AlurMpp from "@/components/alurMpp/alurMpp";
import fetchAlurAntrian from "@/components/fetching/alurAntrian.tsx/alurAntrian";
import fetchAlurPermohonan from "@/components/fetching/alurPermohonan/alurPermohonan";

const currentAlur = 1;
const statusAntrian = true;
const statusPermohonan = false;

export default function MppPage() {
  const [visimisi, setVisimisi] = useState<VisiMisiType>({
    visi: "",
    misi: "",
  });
  const [alurAntrian, setAlurAntrian] = useState<AlurAntrianType[]>();
  const [alurPermohonan, setAlurPermohonan] = useState<AlurPermohonanType[]>();

  const fetchVisiMisiMpp = async () => {
    const visimisi = await fetchVisiMisi();
    const alurAntrian = await fetchAlurAntrian();
    const alurPermohonan = await fetchAlurPermohonan();

    setVisimisi(visimisi.data);
    setAlurAntrian(alurAntrian.data);
    setAlurPermohonan(alurPermohonan.data);
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

            <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
              {visimisi.visi}
            </p>
          </div>

          <div className="flex flex-col text-center gap-4 md:gap-[40px]">
            <h4 className="text-primary-800 text-[18px] md:text-[26px] font-semibold">
              MISI
            </h4>

            <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
              {visimisi.misi}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full items-center mt-8">
          <h4 className="text-primary-800 text-[18px] md:text-[26px] font-semibold md:mb-[40px]">
            ALUR PELAYANAN MPP
          </h4>

          {/* <div className="flex flex-col w-full mt-4 md:px-12 gap-y-6"> */}
          <div className="flex flex-col md:flex-row w-full mt-4 md:px-12 gap-y-6 md:gap-x-6">
            <div className="flex flex-col w-full h-full pb-8 bg-neutral-50 shadow-xl rounded-2xl gap-8 md:pb-5">
              <div className="flex justify-center pt-4">
                <h4 className="text-[16px] md:text-[26px] text-secondary-700 font-semibold">
                  Booking Antrian
                </h4>
              </div>

              {/* <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-start space-y-2 md:space-y-0 px-4 md:px-5"> */}
              <div className="flex flex-col w-full justify-start space-y-2 md:space-y-0 px-4 md:px-5">
                {alurAntrian?.map((alur: AlurAntrianType, index: number) => (
                  <AlurMpp
                    key={index}
                    title={alur.id}
                    desc={alur.desc}
                    isLastStep={index === alurAntrian.length - 1}
                    isActive={alur.id === currentAlur}
                    status={statusAntrian}
                    total={alurAntrian.length}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full h-full pb-8 bg-neutral-50 shadow-xl rounded-2xl gap-8 mt-4 md:mt-0">
              <div className="flex justify-center pt-4">
                <h4 className="text-[16px] md:text-[26px] text-primary-700 font-semibold">
                  Permohonan Layanan
                </h4>
              </div>

              {/* <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-start gap-y-5 px-8"> */}
              <div className="flex flex-col w-full justify-start gap-y-5 px-8">
                {alurPermohonan?.map(
                  (alur: AlurPermohonanType, index: number) => (
                    <AlurMpp
                      key={index}
                      title={alur.id}
                      desc={alur.desc}
                      isLastStep={index === alurPermohonan.length - 1}
                      isActive={alur.id === currentAlur}
                      status={statusPermohonan}
                      total={alurPermohonan.length}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
