import React from "react";

export interface CardStepProp {
  title: number;
  isLastStep: boolean;
  isActive: boolean;
  desc: string;
  status: boolean;
}

export default function AlurMpp({
  title,
  isLastStep,
  isActive,
  desc,
  status,
}: CardStepProp) {
  let bgcolor = "";
  let textcolor = "";
  let arrowbgcolor = "";
  let arrowtextcolor = "";

  if (status === true) {
    bgcolor = "bg-primary-700";
    textcolor = "text-primary-700";
    arrowbgcolor = "text-secondary-700";
    arrowtextcolor = "text-secondary-700";
  } else {
    bgcolor = "bg-secondary-700";
    textcolor = "text-secondary-700";
    arrowbgcolor = "text-primary-700";
    arrowtextcolor = "text-primary-700";
  }

  const isTitleFive = title === 5;

  return (
    <div className="flex flex-col md:flex-row md:pb-8">
      <div className="grid grid-rows-2 w-[220px] place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
        <div
          className={`flex justify-center items-center ${bgcolor} rounded-[50%] w-[50px] h-[50px] space-y-2`}>
          <p className="text-[16px] text-neutral-50 font-bold">{title}</p>
        </div>

        <div className="flex justify-center items-center">
          <p className="text-center text-[10px] text-neutral-800">{desc}</p>
        </div>
      </div>

      {!isLastStep && (
        <div className={`relative flex mt-6 ${isTitleFive ? "w-0" : "w-6/12"}`}>
          {!isTitleFive && (
            <div className={`w-6/12 h-0.5 ${arrowbgcolor} relative`}>
              <svg
                className={`absolute right-0 transform translate-x-2 -translate-y-1/2 ${arrowtextcolor}`}
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}

          {isTitleFive && (
            <div
              className={`w-0 h-full border-none ${arrowbgcolor} absolute left-6`}></div>
          )}
        </div>
      )}
    </div>
  );
}
