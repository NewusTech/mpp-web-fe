"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistoryAntrian from "@/components/histories/cardHistoryAntrian/cardHistoryAntrian";
import DataNotFound from "@/components/loading/dataNotFound";
import InputDate from "@/components/others/inputDate/inputDate";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { AntrianDataType } from "@/types/type";
import Image from "next/legacy/image";

export default function MobileAntrianHistories({
  currentAntrians,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalItems,
  search,
  change,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  currentAntrians: AntrianDataType[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  search: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex flex-col w-full gap-y-2">
        <div className="w-full">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex flex-row justify-center items-center w-full gap-x-3">
          <InputDate
            date={startDate ?? null}
            setDate={(e) => setStartDate(e ?? undefined)}
          />
          <p className="text-center">to</p>
          <InputDate
            date={endDate ?? null}
            setDate={(e) => setEndDate(e ?? undefined)}
          />
        </div>
      </div>
      {currentAntrians && currentAntrians.length > 0 ? (
        <>
          {currentAntrians?.map((antrian: AntrianDataType, i: number) => {
            return (
              <div key={i}>
                <CardHistoryAntrian antrian={antrian} />
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[311px]">
          <DataNotFound />
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
