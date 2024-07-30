"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import { AntrianDataType } from "@/types/type";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/legacy/image";
import PaginationComponent from "@/components/pagination/paginationComponent";
import TableAntrianComponent from "@/components/histories/others/tableAntrianComponent/tableAntrianComponent";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import InputDate from "@/components/others/inputDate/inputDate";

export default function WebsiteAntrianHistories({
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
      <div className="flex flex-row w-full gap-x-2">
        <div className="w-6/12">
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
          <Table className="md:flex md:flex-col md:w-full md:pb-6 md:pt-4">
            <TableHeader className="md:flex md:w-full">
              <TableRow className="md:flex md:flex-row md:w-full">
                <TableHead className="w-1/2">Nomor Antrian</TableHead>
                <TableHead className="w-full">Instansi</TableHead>
                <TableHead className="w-full">Layanan</TableHead>
                <TableHead className="w-1/2">Tanggal</TableHead>
                <TableHead className="w-1/2">Waktu</TableHead>
                <TableHead className="w-3/12">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAntrians?.map((antrian: AntrianDataType, i: number) => {
                return <TableAntrianComponent key={i} antrian={antrian} />;
              })}
            </TableBody>
          </Table>

          <PaginationComponent
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[311px]">
          <Image src={sad} width={100} height={100} alt="sad" />
          <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
            Data tidak ditemukan!
          </p>
        </div>
      )}
    </div>
  );
}
