"use client";

import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import CardHistoryAntrian from "@/components/histories/cardHistoryAntrian/cardHistoryAntrian";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { AntrianDataType } from "@/types/type";
import Image from "next/legacy/image";

export default function MobileAntrianHistories({
  currentAntrians,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalItems,
}: {
  currentAntrians: AntrianDataType[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}) {
  return (
    <>
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
    </>
  );
}
