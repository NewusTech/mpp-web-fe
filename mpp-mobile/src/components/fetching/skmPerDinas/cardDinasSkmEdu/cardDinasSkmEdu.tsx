import React from "react";

export default function CardDinasStatistikSurveiEducation({
  item,
}: {
  item: { kunci: string; value: number };
}) {
  let color;
  if (item?.kunci === "Tidak Sekolah") {
    color = "text-neutral-700";
  } else if (item?.kunci === "SD") {
    color = "text-primary-700";
  } else if (item?.kunci === "SMP") {
    color = "text-secondary-700";
  } else if (item?.kunci === "SMA") {
    color = "text-success-700";
  } else if (item?.kunci === "D1") {
    color = "text-warning-700";
  } else if (item?.kunci === "D2") {
    color = "text-error-700";
  } else if (item?.kunci === "D3") {
    color = "text-primary-800";
  } else if (item?.kunci === "D4/S1") {
    color = "text-secondary-800";
  } else if (item?.kunci === "S2") {
    color = "text-success-800";
  } else if (item?.kunci === "S3") {
    color = "text-warning-900";
  }

  return (
    <ul className={`w-full mx-8 md:mx-0 flex flex-col list-disc ${color}`}>
      <li>
        <h6 className="text-[#2C2C2C] text-[14px] font-semibold md:px-2">
          {item.kunci}
        </h6>

        <p className="text-[#2C2C2C] px-2 text-[12px] font-light">
          {item.value}
        </p>
      </li>
    </ul>
  );
}
