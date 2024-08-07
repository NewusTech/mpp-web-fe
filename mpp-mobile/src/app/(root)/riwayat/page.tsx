"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRiwayatPermohonan } from "@/store/action/actionHistoryPermohonan";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { redirect, useSearchParams } from "next/navigation";
import { fetchRiwayatAntrian } from "@/store/action/actionHistoryAntrian";
import WebsitePermohonanHistories from "@/components/histories/results/permohonans/websites/websitePermohonanHistories";
import MobilePermohonanHistories from "@/components/histories/results/permohonans/mobiles/mobilePermohonanHistories";
import WebsiteAntrianHistories from "@/components/histories/results/antrians/websites/websiteAntrianHistories";
import MobileAntrianHistories from "@/components/histories/results/antrians/mobiles/mobileAntrianHistories";
import { fetchRiwayatSurvei } from "@/store/action/actionHistorySurvei";
import WebsiteSurveiHistories from "@/components/histories/results/surveis/websites/websiteSurveiHistories";
import MobileSurveiHistories from "@/components/histories/results/surveis/mobiles/mobileSurveiHistories";
import { formatDateArrange } from "@/helpers/logout/formatted";

export default function RiwayatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector(
    (state: RootState) => state.historyPermohonan.data
  );
  const historyAntrianData = useSelector(
    (state: RootState) => state.historyAntrian.data
  );
  const historySurveiData = useSelector(
    (state: RootState) => state.historySurvei.data
  );
  const [search, setSearch] = useState<string>("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [filterDate, setFilterDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const searchParams = useSearchParams();
  const [isTabs, setIsTabs] = useState<string>("permohonan");
  const [status, setStatus] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [antrianPage, setAntrianPage] = useState<number>(1);
  const [permohonanPage, setPermohonanPage] = useState<number>(1);
  const [surveiPage, setSurveiPage] = useState<number>(1);
  const itemsPerPage = 10;
  const token = Cookies.get("Authorization");

  const searchTabs = searchParams.get("tabs");

  useEffect(() => {
    if (searchTabs == "permohonan") {
      setIsTabs("permohonan");
    } else if (searchTabs == "survei") {
      setIsTabs("survei");
    }
  }, [search]);

  const startDateFormatted = startDate
    ? formatDateArrange(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate
    ? formatDateArrange(new Date(endDate))
    : undefined;

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }

    const fetchStatus = status === "7" ? "" : status;

    if (startDateFormatted && endDateFormatted) {
      dispatch(
        fetchRiwayatPermohonan(
          search,
          startDateFormatted,
          endDateFormatted,
          fetchStatus
        )
      );
    }
    if (startDateFormatted && endDateFormatted) {
      dispatch(
        fetchRiwayatAntrian(search, startDateFormatted, endDateFormatted)
      );
    }
    if (startDateFormatted && endDateFormatted) {
      dispatch(
        fetchRiwayatSurvei(search, startDateFormatted, endDateFormatted)
      );
    }

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 678);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, token, search, startDateFormatted, endDateFormatted, status]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate({
      ...filterDate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectStatusChange = (statusPermohonan: string) => {
    setStatus(statusPermohonan);
  };

  const paginate = (items: any[], pageNumber: number, itemsPerPage: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items?.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentAntrians = paginate(
    historyAntrianData || [],
    antrianPage,
    itemsPerPage
  );
  const currentPermohonans = paginate(
    historyData || [],
    permohonanPage,
    itemsPerPage
  );
  const currentSurveis = paginate(
    historySurveiData || [],
    surveiPage,
    itemsPerPage
  );

  return (
    <section className="flex flex-col justify-center bg-primary-100 pt-4 md:mt-3 md:mb-0 pb-32 md:pb-[120px] mx-[35px] md:mx-0 md:px-[100px]">
      <div className="flex self-start md:mb-9">
        <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
          History
        </h5>
      </div>

      <div className="flex flex-row w-full gap-[12px] md:px-[38px] md:bg-primary-50 md:pb-[50px] md:rounded-xl md:shadow-md">
        <Tabs
          value={isTabs ? isTabs : "permohonan"}
          onValueChange={(value) => setIsTabs(value)}
          className="flex flex-col w-full gap-[10px]">
          {isDesktop ? (
            <div className="md:flex md:w-full md:mt-[26px]">
              <TabsList className="md:flex md:justify-start md:items-start md:gap-10">
                <TabsTrigger
                  value="antrian"
                  className="text-[16px] md:text-[20px] font-normal">
                  Antrian
                </TabsTrigger>
                <TabsTrigger
                  value="permohonan"
                  className="text-[16px] md:text-[20px] font-normal">
                  Permohonan
                </TabsTrigger>
                <TabsTrigger
                  value="survei"
                  className="text-[16px] md:text-[20px] font-normal">
                  Survei
                </TabsTrigger>
              </TabsList>
            </div>
          ) : (
            <div className="flex mt-[26px]">
              <TabsList className="grid grid-cols-3 w-full gap-[10px]">
                <TabsTrigger value="antrian" className="font-normal">
                  Antrian
                </TabsTrigger>
                <TabsTrigger value="permohonan" className="font-normal">
                  Permohonan
                </TabsTrigger>
                <TabsTrigger value="survei" className="font-normal">
                  Survei
                </TabsTrigger>
              </TabsList>
            </div>
          )}

          <div>
            {isDesktop ? (
              <>
                <TabsContent value="antrian">
                  <WebsiteAntrianHistories
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentAntrians={currentAntrians}
                    itemsPerPage={itemsPerPage}
                    currentPage={antrianPage}
                    onPageChange={setAntrianPage}
                    totalItems={historyAntrianData?.length}
                  />
                </TabsContent>

                <TabsContent value="permohonan">
                  <WebsitePermohonanHistories
                    handleSelectStatusChange={handleSelectStatusChange}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentPermohonans={currentPermohonans}
                    itemsPerPage={itemsPerPage}
                    currentPage={permohonanPage}
                    onPageChange={setPermohonanPage}
                    totalItems={historyData?.length}
                  />
                </TabsContent>

                <TabsContent value="survei">
                  <WebsiteSurveiHistories
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentSurveis={currentSurveis}
                    itemsPerPage={itemsPerPage}
                    currentPage={surveiPage}
                    onPageChange={setSurveiPage}
                    totalItems={historySurveiData?.length}
                  />
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="antrian">
                  <MobileAntrianHistories
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentAntrians={currentAntrians}
                    itemsPerPage={itemsPerPage}
                    currentPage={antrianPage}
                    onPageChange={setAntrianPage}
                    totalItems={historyAntrianData?.length}
                  />
                </TabsContent>

                <TabsContent className="flex flex-col gap-4" value="permohonan">
                  <MobilePermohonanHistories
                    handleSelectStatusChange={handleSelectStatusChange}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentPermohonans={currentPermohonans}
                    itemsPerPage={itemsPerPage}
                    currentPage={permohonanPage}
                    onPageChange={setPermohonanPage}
                    totalItems={historyData?.length}
                  />
                </TabsContent>

                <TabsContent className="flex flex-col gap-4" value="survei">
                  <MobileSurveiHistories
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    change={handleSearch}
                    search={search}
                    currentSurveis={currentSurveis}
                    itemsPerPage={itemsPerPage}
                    currentPage={surveiPage}
                    onPageChange={setSurveiPage}
                    totalItems={historySurveiData?.length}
                  />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
