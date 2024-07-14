"use client";

import statistikFetch from "@/components/fetching/statistiks/statistik";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardGrafikBulananComponent from "@/components/statistics/cardGrafikBulananComponent/cardGrafikBulananComponent";
import CardYearStatistik from "@/components/fetching/statistiks/cardYearStatistiks/cardYearStatistik";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { DataStatistik, StatistikType } from "@/types/type";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticsPage() {
  const [statistik, setStatistik] = useState<StatistikType | null>();
  const [dataChart, setDataChart] = useState<
    ChartData<"doughnut", number[], unknown>
  >({
    labels: [],
    datasets: [],
  });
  const [totalCount, setTotalCount] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState(2.5);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [statistiData, setStatistiData] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("month");
  const itemsPerPage = 10;
  const limitData = 1000000;

  const now = new Date();
  const thisYear = now.getFullYear();

  const fetchStatistik = async (month: string, year: number) => {
    try {
      const result = await statistikFetch(limitData, month, year);

      setStatistik(result.data);
      updateChartData(result.data.countPerYear);
      calculateTotalCount(result.data.countPerYear);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchStatistik(selectedMonth, selectedYear || thisYear);
  }, [selectedMonth, selectedYear, filterType]);

  const paginate = (items: any[], pageNumber: number, itemsPerPage: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentDataGrafik = paginate(
    statistik?.formattedCountByInstansi || [],
    statistiData,
    itemsPerPage
  );

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setAspectRatio(4.0);
        setIsWideScreen(true);
      } else {
        setAspectRatio(2.5);
        setIsWideScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateChartData = (countPerYear: { [key: string]: number }) => {
    const labels = Object.keys(countPerYear);
    const data = Object.values(countPerYear);
    setDataChart({
      labels: labels,
      datasets: [
        {
          label: "Statistics",
          data: data,
          backgroundColor: ["#3568C0", "#FF9742", "#FFC595"],
        },
      ],
    });
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    cutout: "60%",
    datasets: {
      doughnut: {
        weight: 0.1,
      },
    },
    aspectRatio: aspectRatio,
  };

  const renderYearStats = () => {
    if (!statistik || !statistik.countPerYear) {
      return null;
    }
    return Object.entries(statistik.countPerYear).map(
      ([year, count], i: number) => (
        <CardYearStatistik key={i} year={year} count={count} />
      )
    );
  };

  const calculateTotalCount = (countPerYear: { [key: string]: number }) => {
    const total = Object.values(countPerYear).reduce(
      (sum, count) => sum + count,
      0
    );
    setTotalCount(total);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year, 10));
  };

  const handleAllClick = () => {
    setSelectedMonth("");
    setSelectedYear(null);
  };

  return (
    <div className="flex items-center md:w-full justify-center pt-6 bg-primary-100 pb-32 md:pb-[120px] md:mb-0 md:mt-0 md:pt-[56px] md:mx-0">
      <div className="flex flex-col md:w-full gap-[10px] md:mx-[70px]">
        <div className="flex flex-col items-center md:flex-none md:grid md:grid-cols-2 md:w-full gap-4">
          <div className="flex flex-col bg-neutral-50 w-10/12 md:w-full shadow-md rounded-2xl relative">
            <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
              <h5 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
                Antrian Online
              </h5>

              <p className="text-[10px] md:text-[12px] text-neutral-800 font-light">
                Grafik Tahunan
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h5 className="text-[18px] text-primary-900 font-semibold">
                {totalCount}
              </h5>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={dataChart}
              options={chartOptions}
            />

            <div className="flex flex-row self-center w-10/12 md:w-full justify-between pb-[10.5px] px-[12px] md:px-12">
              {renderYearStats()}
            </div>
          </div>

          <div className="flex flex-col bg-neutral-50 w-10/12 md:w-full shadow-md rounded-2xl relative">
            <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
              <h5 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
                Permohonan Layanan
              </h5>

              <p className="text-[10px] md:text-[12px] text-neutral-800 font-light">
                Grafik Tahunan
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h5 className="text-[18px] text-primary-900 font-semibold">
                {totalCount}
              </h5>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={dataChart}
              options={chartOptions}
            />

            <div className="flex flex-row self-center w-10/12 md:w-full justify-between pb-[10.5px] px-3 md:px-12">
              {renderYearStats()}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-neutral-50 shadow-md rounded-2xl mt-4 mx-[35px] md:px-[75px] md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center mx-[10px] mt-4 md:px-[30px]">
            <h4 className="text-[16px] text-primary-900 font-semibold">
              Grafik Mal Pelayanan Publik
            </h4>

            <div className="flex flex-row justify-center items-center w-4/12 gap-x-4">
              <button
                onClick={handleAllClick}
                className={`text-neutral-700 ${
                  filterType === "" ? "text-neutral-900 font-semibold" : ""
                }`}>
                All
              </button>

              <button
                onClick={() => setFilterType("month")}
                className={`text-neutral-700 ${
                  filterType === "month" ? "text-neutral-900 font-semibold" : ""
                }`}>
                Bulan
              </button>

              <button
                onClick={() => setFilterType("year")}
                className={`text-neutral-700 ${
                  filterType === "year" ? "text-neutral-900 font-semibold" : ""
                }`}>
                Tahun
              </button>

              <div className="flex items-center w-10/12 md:w-full h-[40px] justify-between border border-neutral-700 rounded-[50px] pl-[10px] py-[10px] my-8">
                {filterType === "month" ? (
                  <Select onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-full rounded-2xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none">
                      <SelectValue
                        placeholder="Bulan"
                        className="text-neutral-800"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month: string, i: number) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select onValueChange={handleYearChange}>
                    <SelectTrigger className="w-full rounded-2xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none">
                      <SelectValue
                        placeholder="Tahun"
                        className="text-neutral-800"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {statistik &&
                        Object.keys(statistik.yearList).map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-[10px] px-4 md:px-[30px] pb-6 md:pb-[50px] gap-[22px]">
            {!isWideScreen ? (
              <>
                {currentDataGrafik.map((data: DataStatistik, i: number) => {
                  return <CardGrafikBulananComponent key={i} data={data} />;
                })}

                <PaginationComponent
                  totalItems={statistik?.formattedCountByInstansi.length || 0}
                  itemsPerPage={itemsPerPage}
                  currentPage={statistiData}
                  onPageChange={setStatistiData}
                />
              </>
            ) : (
              <>
                <Table className="flex flex-col w-full">
                  <TableHeader className="flex w-full">
                    <TableRow className="flex flex-row w-full">
                      <TableHead className="w-full bg-neutral-300">
                        Instansi
                      </TableHead>
                      <TableHead className="w-1/5">Total</TableHead>
                      <TableHead className="w-1/5">Antrian</TableHead>
                      <TableHead className="w-1/5">Permohonan</TableHead>
                      <TableHead className="w-1/5">SKM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDataGrafik.map((data: DataStatistik, i: number) => {
                      return (
                        <TableRow key={i} className="flex flex-row w-full">
                          <TableCell className="w-full">{data.name}</TableCell>
                          <TableCell className="w-1/5">300</TableCell>
                          <TableCell className="w-1/5">300</TableCell>
                          <TableCell className="w-1/5">
                            {data.permohonan_count}
                          </TableCell>
                          <TableCell className="w-1/5">
                            {data.skm_count}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <div className="md:flex md:justify-end">
                  <PaginationComponent
                    totalItems={statistik?.formattedCountByInstansi.length || 0}
                    itemsPerPage={itemsPerPage}
                    currentPage={statistiData}
                    onPageChange={setStatistiData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
