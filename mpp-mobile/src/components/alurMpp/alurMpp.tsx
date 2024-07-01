import { AlurAntrianType, AlurPermohonanType } from "@/types/type";
import React, { useState } from "react";

export interface CardStepProp {
  title: number;
  isLastStep: boolean;
  isActive: boolean;
  desc: string;
  status: boolean;
  total: number;
}

export default function AlurMpp({
  title,
  isLastStep,
  isActive,
  desc,
  status,
  total,
}: CardStepProp) {
  let bgcolor = "";
  let textcolor = "";
  let borderColor = "";
  let arrowtextcolor = "";

  if (status === true) {
    bgcolor = "bg-primary-700";
    textcolor = "text-primary-700";
    borderColor = "border-primary-700";
    arrowtextcolor = "bg-secondary-700";
  } else {
    bgcolor = "bg-secondary-700";
    textcolor = "text-secondary-700";
    borderColor = "border-secondary-700";
    arrowtextcolor = "bg-primary-700";
  }

  const isTitleFive = title === 5;

  const isTitleFour = title === 4;

  const isTotal = total === 6;

  const isTotalLess = total === 4;

  return (
    <div className="flex flex-col">
      <div
        className={`flex ${
          isTitleFive ? "flex-col" : "flex-row"
        } items-center`}>
        {(isTotal && title === 6) || (isTotalLess && title === 4) ? (
          <div
            className={`${
              isTitleFive ? "w-[100px]" : "w-[200px]"
            } flex items-center justify-start pl-16`}>
            <div
              className={`h-10 w-10 p-4 rounded-full flex items-center justify-center border ${borderColor} ${bgcolor}`}>
              <p className={"text-neutral-50"}>{title}</p>
            </div>
          </div>
        ) : (
          <div
            className={`${
              isTitleFive ? "w-[100px]" : "w-[400px]"
            } flex items-center justify-center`}>
            <div
              className={`h-10 w-10 p-4 rounded-full flex items-center justify-center border ${borderColor} ${bgcolor}`}>
              <p className={"text-neutral-50"}>{title}</p>
            </div>
          </div>
        )}

        {!isLastStep && (
          <div
            className={`${
              isTitleFive ? "" : "w-full h-[1px]"
            } ${arrowtextcolor}`}></div>
        )}
      </div>

      {(isTotal && title === 6) || (isTotalLess && title === 4) ? (
        <div
          className={`mt-4 w-[150px] ${
            isTitleFour ? "pl-4" : ""
          } flex items-center justify-center`}>
          <p className={`${isTitleFive ? "pl-16" : ""} text-start`}>{desc}</p>
        </div>
      ) : (
        <div
          className={`mt-4 w-[150px] ${
            isTitleFive ? "pl-20" : ""
          } flex items-center justify-center`}>
          <p className={`text-center`}>{desc}</p>
        </div>
      )}
    </div>
  );
}
