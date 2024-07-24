"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistoryAntrian from "@/components/histories/cardHistoryAntrian/cardHistoryAntrian";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { Input } from "@/components/ui/input";
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
  handleDateChange,
  filterDate,
}: {
  currentAntrians: AntrianDataType[];
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
        {/* <div className="flex items-center w-full md:w-4/12 h-[40px] justify-between bg-neutral-50 border border-neutral-700 rounded-[50px]">
          <Select>
            <SelectTrigger
              className={`w-full rounded-xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none`}>
              <SelectValue
                placeholder="Pilih By Instansi"
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
        </div> */}

        <div className="w-full">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex flex-row justify-center items-center w-full gap-x-3">
          <Input
            name="startDate"
            onChange={handleDateChange}
            value={filterDate?.startDate}
            type="date"
            className="w-full h-[40px] block border border-neutral-700 px-2"
          />
          <p className="text-center">TO</p>
          <Input
            onChange={handleDateChange}
            name="endDate"
            value={filterDate?.endDate}
            type="date"
            className="w-full h-[40px] block border border-neutral-700 px-2"
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
