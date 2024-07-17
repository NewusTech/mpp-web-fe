"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistoryComponent from "@/components/histories/cardHistoryComponent/cardHistoryComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { PermohonanDataType } from "@/types/type";
import Image from "next/legacy/image";

export default function MobilePermohonanHistories({
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
    </>
  );
}
