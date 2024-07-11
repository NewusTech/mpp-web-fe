"use client";

import fetchInstansi from "@/components/fetching/instansi/instansi";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import { toast } from "sonner";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import CardLayananComponent from "@/components/services/others/cardLayananComponent";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { Layanantype } from "@/types/type";
import LoadingComponent from "@/components/loading/LoadingComponent";

export default function LayananPage() {
  const [instansi, setInstansi] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const debounceSearch = useDebounce(search);
  const itemsPerPage = 15;
  const limitData = 1000000;

  const fetchLayanan = async (search: string) => {
    try {
      const res = await fetchInstansi(search, 1, limitData);

      setInstansi(res.data || []);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchLayanan(debounceSearch);
  }, [debounceSearch]);

  const paginate = (items: any[], pageNumber: number, itemsPerPage: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentDataInstansi = paginate(
    instansi || [],
    currentPage,
    itemsPerPage
  );

  return (
    <div className="w-full flex flex-col bg-primary-100 items-center px-9 pt-6 mb-40 md:mb-0 md:pb-[200px] md:px-[70px]">
      <h4 className="text-primary-800 text-[16px] md:text-[26px] mb-[32px] font-semibold">
        Layanan Mal Pelayanan Publik
      </h4>

      <div className="flex w-full flex-col md:w-full justify-center gap-[36px]">
        <div className="w-full md:self-end md:w-1/3 md:pr-[60px]">
          <SearchComponent change={change} search={search} />
        </div>

        <div className="flex w-full flex-col md:w-full md:justify-center gap-[16px]">
          {instansi.length > 0 ? (
            <>
              <div className="flex w-full flex-col md:flex-none md:grid md:grid-cols-5 md:flex-wrap md:justify-center md:gap-[16px] md:flex-row gap-[16px]">
                {currentDataInstansi.map((layanan: Layanantype, i: number) => {
                  return <CardLayananComponent key={i} layanan={layanan} />;
                })}
              </div>

              <PaginationComponent
                totalItems={instansi.length || 0}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="container mx-auto flex flex-col md:w-full justify-center items-center w-full h-full">
              <LoadingComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
