import React from "react";

export default function CardDinasStatistikSurvei({
  item,
}: {
  item: { kunci: string; value: number };
}) {
  let color;
  if (item?.kunci === "Laki-laki") {
    color = "text-primary-700";
  } else {
    color = "text-secondary-700";
  }

  return (
    <ul className={`flex flex-col list-disc ${color}`}>
      <li>
        <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
          {item.kunci}
        </h6>

        <p className="text-[#2C2C2C] text-[12px] font-light">{item.value}</p>
      </li>
    </ul>
  );
}
