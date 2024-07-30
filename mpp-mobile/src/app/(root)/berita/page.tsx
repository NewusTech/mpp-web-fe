"use client";

import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import fetchNews from "@/components/fetching/berita/berita";
import { Berita, Instansi } from "@/types/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardNewsComponent from "@/components/news/others/cardNewsComponent";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import PaginationComponent from "@/components/pagination/paginationComponent";
import Image from "next/legacy/image";
import LoadingComponent from "@/components/loading/LoadingComponent";
import { formatDateArrange } from "@/helpers/logout/formatted";
import InputDate from "@/components/others/inputDate/inputDate";
export const dynamic = "force-dynamic";

export default function BeritaPage() {
  const [news, setNews] = useState<Berita[]>();
  const [filteredNews, setFilteredNews] = useState<Berita[]>([]);
  const [instansis, setInstansis] = useState<Instansi[]>();
  const [selectedInstansiId, setSelectedInstansiId] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const searchDebounce = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 12;
  const limitData = 1000000;

  const fetchDinas = async (search: string, page: number, limit: number) => {
    try {
      const dinas = await fetchInstansi(search, page, limit);

      setInstansis(dinas.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    fetchDinas("", currentPage, limitData);
  }, []);

  const fetchBerita = async (
    page: number,
    limit: number,
    searchNews: string,
    startDate: string,
    endDate: string,
    instansiId: string
  ) => {
    setIsLoading(true);
    try {
      const berita = await fetchNews(
        page,
        limit,
        searchNews,
        startDate,
        endDate,
        instansiId
      );
      setNews(berita.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    } finally {
      setIsLoading(false);
    }
  };

  const startDateFormatted = startDate
    ? formatDateArrange(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate
    ? formatDateArrange(new Date(endDate))
    : undefined;

  useEffect(() => {
    const instansiId = selectedInstansiId || "";
    if (startDateFormatted && endDateFormatted) {
      fetchBerita(
        currentPage,
        limitData,
        searchDebounce,
        startDateFormatted,
        endDateFormatted,
        instansiId
      );
    }
  }, [
    searchDebounce,
    startDateFormatted,
    endDateFormatted,
    currentPage,
    selectedInstansiId,
  ]);

  const paginate = (
    items: Berita[],
    pageNumber: number,
    itemsPerPage: number
  ) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleInstansiChange = (instansi_id: string) => {
    setSelectedInstansiId(instansi_id);
  };

  const handleAllClick = () => {
    setSelectedInstansiId("");
    setSearch("");
  };

  const currentDataBerita = paginate(news || [], currentPage, itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className="flex flex-col items-center pt-6 px-9 bg-primary-100 pb-32 md:pb-48 md:px-[70px]">
      <h3 className="text-primary-800 font-semibold text-[16px] md:text-[32px] mb-[32px]">
        Berita
      </h3>

      <div className="flex w-full md:flex-row flex-col md:self-start md:items-start rounded-xl gap-4 mb-4">
        <div className="flex flex-row w-full gap-x-2">
          <div
            onClick={handleAllClick}
            className={`flex items-center justify-center w-1/2 md:w-4/12 text-[14px] self-center h-[40px] border bg-neutral-50 active:border-primary-700 rounded-[50px] cursor-pointer ${
              !selectedInstansiId
                ? "bg-primary-200 border-primary-700 text-primary-700"
                : "border-neutral-700 text-neutral-700"
            }`}>
            Semua
          </div>

          <div className="flex items-center w-full md:w-8/12 h-[40px] justify-between bg-neutral-50 border border-neutral-700 rounded-[50px]">
            <Select onValueChange={handleInstansiChange}>
              <SelectTrigger
                className={`w-full rounded-xl overflow-auto border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none ${
                  Number(selectedInstansiId) !== null
                    ? "text-primary-700"
                    : "opacity-50"
                }`}>
                <SelectValue
                  placeholder="Pilih Instansi"
                  className="text-neutral-800 w-full"
                />
              </SelectTrigger>
              <SelectContent>
                <div className="pt-2">
                  {instansis?.map((instansi: Instansi, i: number) => {
                    return (
                      <SelectItem
                        className={`w-full px-4`}
                        key={i}
                        value={String(instansi.id)}>
                        {instansi.name}
                      </SelectItem>
                    );
                  })}
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full md:w-full">
          <SearchComponent change={handleSearch} search={search} />
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-10/12 gap-y-2">
          <div className="flex flex-row justify-center items-center w-full gap-x-2 md:gap-x-3">
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
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full md:w-3/12 h-48">
          <LoadingComponent />
        </div>
      ) : news?.length ?? 0 > 0 ? (
        <>
          <div className="flex flex-col md:grid md:grid-cols-4 md:w-full md:items-start justify-center gap-[20px] md:pb-5 md:gap-x-4 md:gap-y-8">
            {currentDataBerita.map((berita: Berita, i: number) => (
              <CardNewsComponent key={i} news={berita} />
            ))}
          </div>

          <PaginationComponent
            totalItems={filteredNews.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="container mx-auto flex flex-col md:w-full justify-center items-center w-full h-full">
          <Image src={backHome} width={300} height={300} alt="sad" />
          <p className="text-center text-neutral-900 text-[12px] md:text-[32px] font-thin mt-4">
            Data tidak ditemukan!
          </p>
        </div>
      )}
    </section>
  );
}
