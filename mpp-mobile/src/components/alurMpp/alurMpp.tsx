import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
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
  let borderColor = "";
  let arrowtextcolor = "";
  let arrowcolor = "";

  if (status === true) {
    bgcolor = "bg-primary-700";
    borderColor = "border-primary-700";
    arrowtextcolor = "bg-secondary-700";
    arrowcolor = "text-secondary-700";
  } else {
    bgcolor = "bg-secondary-700";
    borderColor = "border-secondary-700";
    arrowtextcolor = "bg-primary-700";
    arrowcolor = "text-primary-700";
  }

  const isTitleFive = title === 5;

  const isTitleFour = title === 4;

  const isTotal = total === 6;

  const isTotalLess = total === 4;
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    // <>
    //   {!isMobile ? (
    //     <div className="flex flex-col">
    //       <div
    //         className={`flex ${
    //           isTitleFive ? "flex-col" : "flex-row"
    //         } items-center`}>
    //         {(isTotal && title === 6) || (isTotalLess && title === 4) ? (
    //           <div
    //             className={`${
    //               isTitleFive ? "w-[100px]" : "w-[200px]"
    //             } flex items-center justify-start ${
    //               isTitleFour ? "pl-16" : "pl-11"
    //             }`}>
    //             <div
    //               className={`h-10 w-10 p-4 rounded-full flex items-center justify-center border ${borderColor} ${bgcolor}`}>
    //               <p className={"text-neutral-50"}>{title}</p>
    //             </div>
    //           </div>
    //         ) : (
    //           <div
    //             className={`${
    //               isTitleFive ? "w-[100px]" : "w-[400px]"
    //             } flex items-center ${
    //               isTitleFive ? "justify-start" : "justify-center"
    //             }`}>
    //             <div
    //               className={`h-10 w-10 p-4 rounded-full flex items-center justify-center border ${borderColor} ${bgcolor}`}>
    //               <p className={"text-neutral-50"}>{title}</p>
    //             </div>
    //           </div>
    //         )}

    //         {!isLastStep && (
    //           <div
    //             className={`${
    //               isTitleFive ? "" : "w-full h-[1px]"
    //             } ${arrowtextcolor}`}></div>
    //         )}
    //       </div>

    //       {(isTotal && title === 6) || (isTotalLess && title === 4) ? (
    //         <div
    //           className={`mt-4 w-[150px] ${
    //             isTitleFour ? "pl-4" : ""
    //           } flex items-center ${
    //             isTotal ? "justify-start pl-10" : "justify-center"
    //           } `}>
    //           <p className={`${isTitleFive ? "pl-16" : ""} text-start`}>
    //             {desc}
    //           </p>
    //         </div>
    //       ) : (
    //         <div
    //           className={`mt-4 w-[150px] ${
    //             isTitleFive ? "pl-18" : ""
    //           } flex items-center justify-center`}>
    //           <p className={`text-center`}>{desc}</p>
    //         </div>
    //       )}
    //     </div>
    //   ) : (
    <div className="flex flex-col w-full justify-center items-center gap-y-3 md:gap-y-6">
      <div className={`flex justify-center items-center`}>
        <div className={` flex flex-col items-center justify-center`}>
          <div
            className={`h-10 w-10 p-4 rounded-full flex items-center justify-center border ${borderColor} ${bgcolor}`}>
            <p className={"text-neutral-50 text-center"}>{title}</p>
          </div>

          <div className={`mt-4 w-full flex items-center justify-center`}>
            <p className={` text-center`}>{desc}</p>
          </div>
        </div>
      </div>

      {!isLastStep && (
        <div className={`${arrowtextcolor} w-[2px] h-20 relative mb-2 md:mb-4`}>
          <svg
            className={`absolute -bottom-3 -right-[29px] ${arrowcolor} w-6 h-6 transform -translate-x-3/4`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </div>
      )}
    </div>
    //   )}
    // </>
  );
}
