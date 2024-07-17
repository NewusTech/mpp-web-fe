"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/legacy/image";
import { PermohonanDataType } from "@/types/type";
import PaginationComponent from "@/components/pagination/paginationComponent";
import TablePermohonanComponent from "@/components/histories/others/tablePermohonanComponent/tablePermohonanComponent";

export default function WebsitePermohonanHistories({
  currentPermohonans,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalItems,
}: {
  currentPermohonans: PermohonanDataType[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}) {
  return (
    <>
      {currentPermohonans && currentPermohonans.length > 0 ? (
        <>
          <Table className="md:flex md:flex-col md:w-full md:pb-6 md:pt-4">
            <TableHeader className="md:flex md:w-full">
              <TableRow className="md:flex md:flex-row md:w-full">
                <TableHead className="w-1/2">Nomor Permohonan</TableHead>
                <TableHead className="w-full">Instansi</TableHead>
                <TableHead className="w-1/2">Tanggal</TableHead>
                <TableHead className="w-1/2">Status</TableHead>
                <TableHead className="w-3/12">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPermohonans?.map(
                (permohonan: PermohonanDataType, i: number) => {
                  return (
                    <TablePermohonanComponent key={i} permohonan={permohonan} />
                  );
                }
              )}
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
    </>
  );
}
