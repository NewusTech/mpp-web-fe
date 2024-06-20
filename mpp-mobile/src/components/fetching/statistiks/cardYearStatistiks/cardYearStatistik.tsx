import React from "react";

export default function CardYearStatistik({
  year,
  count,
}: {
  year: string;
  count: number;
}) {
  return (
    <ul className="flex flex-col list-disc text-[#7BBA78]">
      <li>
        <h6 className="text-[#2C2C2C] text-[14px] font-semibold">{count}</h6>

        <p className="text-[#2C2C2C] text-[12px] font-light">{year}</p>
      </li>
    </ul>
  );
}
