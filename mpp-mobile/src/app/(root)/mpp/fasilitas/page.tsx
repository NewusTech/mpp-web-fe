"use client";

import facilitiesFetch from "@/components/fetching/facilities/facilities";
import CardFasilitas from "@/components/mpp/cardFasilitas/cardFasilitas";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { FacilityType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
const itemsPerPage = 12;
const limitData = 1000000;

export default function Fasilitas() {
  const [fasilitas, setFasilitas] = useState<FacilityType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchFasilitas = async (page: number, limit: number) => {
    try {
      const fasilitas = await facilitiesFetch(page, limit);

      setFasilitas(fasilitas.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    fetchFasilitas(1, limitData);
  }, []);

  const paginate = (
    items: FacilityType[],
    pageNumber: number,
    itemsPerPage: number
  ) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const FasilitasData = paginate(fasilitas || [], currentPage, itemsPerPage);

  return (
    <section className="flex flex-col items-center justify-between pt-6 px-8 md:px-16 bg-primary-100 mb-32 md:mb-0 md:pb-36">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-x-3 gap-y-4">
        {FasilitasData &&
          FasilitasData.map((item: FacilityType, i: number) => {
            return <CardFasilitas key={i} fasilitas={item} />;
          })}
      </div>

      <PaginationComponent
        totalItems={fasilitas?.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
