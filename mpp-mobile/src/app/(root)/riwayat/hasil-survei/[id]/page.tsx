"use client";

import FetchSurveiId from "@/components/fetching/surveiId/surveiId";
import CardSurveiDetail from "@/components/histories/cardSurveiDetail/cardSurveiDetail";
import { formatLongDate } from "@/helpers/logout/formatted";
import { DataFormatType, SurveyDetailType } from "@/types/type";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurveiDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const [survei, setSurvei] = useState<SurveyDetailType>();

  const getSurveiId = async (id: number) => {
    try {
      const data = await FetchSurveiId(id);

      setSurvei(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurveiId(params.id);
  }, [params.id]);

  let surveiDate = "";
  if (survei) {
    surveiDate = formatLongDate(survei?.date);
  }

  return (
    <div className="flex flex-col mx-6 md:mx-20 md:mb-16 px-6 md:px-14 py-6 rounded-xl mt-2 gap-y-4 md:gap-y-0">
      <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full md:mb-8">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] text-neutral-800 mr-2 md:mr-4" />
          </button>

          <h5 className="text-[18px] md:text-[20px] text-start text-primary-800 font-semibold">
            Detail Survei
          </h5>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 w-full mt-6 md:mt-0 gap-y-2 md:gap-y-4">
        <div className="grid grid-cols-2 w-full">
          <h4 className="font-semibold text-primary-900 md:text-[16px]">
            Nama Instansi
          </h4>

          <p className="text-neutral-900 md:text-[16px]">
            : {survei?.instansi_name}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <h4 className="font-semibold text-primary-900 md:text-[16px]">
            Nomor SKM
          </h4>

          <p className="text-neutral-900 md:text-[16px]">: {survei?.no_skm}</p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <h4 className="font-semibold text-primary-900 md:text-[16px]">
            Nama Layanan
          </h4>

          <p className="text-neutral-900 md:text-[16px]">
            : {survei?.layanan_name}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <h4 className="font-semibold text-primary-900 md:text-[16px]">
            Tanggal
          </h4>

          <p className="text-neutral-900 md:text-[16px]">: {surveiDate}</p>
        </div>
      </div>

      <div className="flex flex-col w-full bg-neutral-50 shadow-md md:mb-32 px-6 md:px-14 py-6 rounded-xl mt-2 md:mt-6 gap-y-4 md:gap-y-6">
        {survei?.formatteddata.map((data: DataFormatType, i: number) => {
          return (
            <div key={i} className="flex flex-col w-full md:gap-y-4">
              <CardSurveiDetail data={data} i={i + 1} />
            </div>
          );
        })}

        <div className="flex flex-col w-full gap-y-2 md:gap-y-4">
          <h5 className="font-semibold text-primary-700 md:text-[16px]">
            Kritik dan Saran
          </h5>

          <p className="text-neutral-900 md:text-[16px]">
            {survei?.kritiksaran}
          </p>
        </div>
      </div>
    </div>
  );
}
