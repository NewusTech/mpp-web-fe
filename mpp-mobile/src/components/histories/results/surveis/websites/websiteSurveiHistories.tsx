"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SurveiDataType } from "@/types/type";
import PaginationComponent from "@/components/pagination/paginationComponent";
import Image from "next/legacy/image";
import TableSurveiComponent from "@/components/histories/others/tableSurveiComponent/tableSurveiComponent";
import { getStartOfMonth, getToday } from "@/helpers/logout/formatted";

export default function WebsiteSurveiHistories({
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
      <div className="flex flex-row w-full gap-x-2">
        <div className="w-6/12">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex flex-row justify-center items-center w-full gap-x-3">
          <Input
            type="date"
            onChange={handleDateChange}
            value={
              filterDate?.startDate ? filterDate?.startDate : getStartOfMonth()
            }
            name="startDate"
            className="w-full h-[40px] block border border-neutral-700 px-2"
          />
          <p className="text-center">to</p>
          <Input
            type="date"
            onChange={handleDateChange}
            value={filterDate?.endDate ? filterDate?.endDate : getToday()}
            name="endDate"
            className="w-full h-[40px] block border border-neutral-700 px-2"
          />
        </div>
      </div>
      {currentSurveis && currentSurveis.length > 0 ? (
        <>
          <Table className="md:flex md:flex-col md:w-full md:pb-6 md:pt-4">
            <TableHeader className="md:flex md:w-full">
              <TableRow className="md:flex md:flex-row md:w-full">
                <TableHead className="w-3/12">Nomor SKM</TableHead>
                <TableHead className="w-6/12">Instansi</TableHead>
                <TableHead className="w-6/12">Layanan</TableHead>
                <TableHead className="w-4/12">Tanggal</TableHead>
                <TableHead className="w-4/12">Waktu</TableHead>
                <TableHead className="w-8/12">Kritik dan Saran</TableHead>
                <TableHead className="w-3/12">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSurveis?.map((survei: SurveiDataType, i: number) => {
                return <TableSurveiComponent survei={survei} key={i} />;
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
