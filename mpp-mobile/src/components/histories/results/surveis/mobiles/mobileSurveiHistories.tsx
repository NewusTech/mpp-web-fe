"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistorySurvei from "@/components/histories/cardHistorySurvei/cardHistorySurvei";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { Input } from "@/components/ui/input";
import { SurveiDataType } from "@/types/type";
import Image from "next/legacy/image";

export default function MobileSurveiHistories({
  currentSurveis,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalItems,
  search,
  change,
  handleDateChange,
  filterDate,
}: {
  currentSurveis: SurveiDataType[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  search: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterDate: {
    startDate: string;
    endDate: string;
  };
}) {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex flex-col w-full gap-y-2">
        <div className="w-full">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex flex-row justify-center items-center w-full gap-x-3">
          <Input
            value={filterDate.startDate}
            onChange={handleDateChange}
            name="startDate"
            type="date"
            className="w-full h-[40px] block border border-neutral-700 px-2"
          />
          <p className="text-center">TO</p>
          <Input
            onChange={handleDateChange}
            name="endDate"
            value={filterDate.endDate}
            type="date"
            className="w-full h-[40px] block border border-neutral-700 px-2"
          />
        </div>
      </div>

      {currentSurveis && currentSurveis.length > 0 ? (
        <>
          {currentSurveis?.map((survei: SurveiDataType, i: number) => {
            return (
              <div key={i}>
                <CardHistorySurvei survei={survei} />
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[311px]">
          <Image src={sad} width={100} height={100} alt="sad" />
          <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
            Data tidak ditemukan!
          </p>
        </div>
      )}
      <PaginationComponent
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
