"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistoryComponent from "@/components/histories/cardHistoryComponent/cardHistoryComponent";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { Input } from "@/components/ui/input";
import { PermohonanDataType } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/legacy/image";
import { statusDatas } from "@/data/data";
import { getStartOfMonth, getToday } from "@/helpers/logout/formatted";
import InputDate from "@/components/others/inputDate/inputDate";
import DataNotFound from "@/components/loading/dataNotFound";

export default function MobilePermohonanHistories({
  currentPermohonans,
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
  handleSelectStatusChange,
}: {
  currentPermohonans: PermohonanDataType[];
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
  handleSelectStatusChange: (e: string) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex items-center w-full md:w-4/12 h-[40px] justify-between bg-neutral-50 border border-neutral-700 rounded-[50px]">
          <Select onValueChange={handleSelectStatusChange}>
            <SelectTrigger
              className={`w-full rounded-xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none`}>
              <SelectValue
                placeholder="Pilih By Status"
                className="text-neutral-800 w-full"
              />
            </SelectTrigger>
            <SelectContent>
              <div className="pt-2">
                {statusDatas &&
                  statusDatas.map(
                    (status: { id: number; value: string }, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={status.id.toString()}>
                          {status.value}
                        </SelectItem>
                      );
                    }
                  )}
              </div>
            </SelectContent>
          </Select>
        </div>

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
      {currentPermohonans && currentPermohonans.length > 0 ? (
        <>
          {currentPermohonans?.map(
            (permohonan: PermohonanDataType, i: number) => {
              return (
                <div key={i}>
                  <CardHistoryComponent permohonan={permohonan} />
                </div>
              );
            }
          )}
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
