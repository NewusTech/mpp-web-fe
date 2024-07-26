"use client";

import { DataFormatType } from "@/types/type";

export default function CardSurveiDetail({
  data,
  i,
}: {
  data: DataFormatType;
  i: number;
}) {
  let nilaiData = "";
  if (data.nilai === 1) {
    nilaiData = "Tidak Sesuai";
  } else if (data.nilai === 2) {
    nilaiData = "Kurang Sesuai";
  } else if (data.nilai === 3) {
    nilaiData = "Sesuai";
  } else if (data.nilai === 4) {
    nilaiData = "Sangat Sesuai";
  }

  return (
    <div className="flex flex-col w-full gap-y-4 md:gap-y-6">
      <h5 className="font-semibold text-primary-700 md:text-[16px]">
        Pertanyaan {i}
      </h5>

      <div className="flex flex-col md:grid md:grid-rows-2 gap-y-4 md:gap-y-4">
        <p className="font-normal text-neutral-900 md:text-[16px]">
          {data.surveyform_name}
        </p>

        <p className="font-semibold text-neutral-900 md:text-[16px]">
          Jawaban:{" "}
          <span className="font-normal text-neutral-900 md:text-[16px]">
            {nilaiData}
          </span>
        </p>
      </div>
    </div>
  );
}
