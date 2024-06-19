"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

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
import CardGrafikBulananComponent from "./cardGrafikBulananComponent/cardGrafikBulananComponent";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const grafikBulanans = [
  {
    id: 1,
    instansi: "Dinas Pariwisata",
    total: 1600,
    antrian: 300,
    permohonan: 800,
    skm: 500,
  },
  {
    id: 2,
    instansi: "Dinas Kesehatan",
    total: 1600,
    antrian: 300,
    permohonan: 800,
    skm: 500,
  },
  {
    id: 3,
    instansi: "Dinas Pariwisata",
    total: 1600,
    antrian: 300,
    permohonan: 800,
    skm: 500,
  },
];

export default function StatisticsScreen() {
  const data = 700 + 300 + 1394;
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

  const [aspectRatio, setAspectRatio] = useState(2.5);
  const [isWideScreen, setIsWideScreen] = useState(false);

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

  const dataChart = {
    labels: [2024, 2022, 2023],
    datasets: [
      {
        label: "Statistics",
        data: [700, 300, 1394],
        backgroundColor: ["#7BBA78", "#F8E29E", "#F3CB53"],
      },
    ],
  };

  return (
    <div className="flex items-center md:w-full justify-center pt-[24px] bg-primary-100 pb-[70px] md:mb-0 md:mt-0 md:pt-[56px] md:mx-0">
      <div className="flex flex-col md:w-full gap-[10px] md:mx-[70px]">
        <div className="flex flex-col items-center md:flex-none md:grid md:grid-cols-2 md:w-full gap-[16px]">
          <div className="flex flex-col bg-white w-[290px] md:w-full shadow-xl rounded-2xl relative">
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
                {data}
              </h5>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={dataChart}
              options={chartOptions}
            />

            <div className="flex flex-row self-center w-[242px] md:w-full justify-between pb-[10.5px] px-[12px] md:px-[48px]">
              <ul className="flex flex-col list-disc text-[#7BBA78]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    700
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2024</p>
                </li>
              </ul>

              <ul className="flex flex-col list-disc text-[#F3CB53]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    1394
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2023</p>
                </li>
              </ul>

              <ul className="flex flex-col list-disc text-[#F6D77C]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    300
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2022</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col bg-white w-[290px] md:w-full shadow-xl rounded-2xl relative">
            <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
              <h5 className="text-[16px] md:text-[20px] text-[#3A6C38] font-semibold">
                Permohonan Layanan
              </h5>

              <p className="text-[10px] md:text-[12px] text-[#656565] font-light">
                Grafik Tahunan
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h5 className="text-[18px] text-primary-900 font-semibold">
                {data}
              </h5>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={dataChart}
              options={chartOptions}
            />

            <div className="flex flex-row self-center w-[242px] md:w-full justify-between pb-[10.5px] px-[12px] md:px-[48px]">
              <ul className="flex flex-col list-disc text-[#7BBA78]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    700
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2024</p>
                </li>
              </ul>

              <ul className="flex flex-col list-disc text-[#F3CB53]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    1394
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2023</p>
                </li>
              </ul>

              <ul className="flex flex-col list-disc text-[#F6D77C]">
                <li>
                  <h6 className="text-[#2C2C2C] text-[14px] font-semibold">
                    300
                  </h6>

                  <p className="text-[#2C2C2C] text-[12px] font-light">2022</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-md rounded-2xl mt-[16px] mx-[35px] md:px-[75px] md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center mx-[10px] mt-[16px] md:px-[30px]">
            <h4 className="text-[16px] text-primary-900 font-semibold">
              Grafik Bulanan Tahun 2024
            </h4>

            <div className="flex items-center w-[258px] h-[40px] justify-between border border-[#C4C4C4] rounded-[50px] pl-[10px] py-[10px] my-[16px]">
              <Select>
                <SelectTrigger className="w-[258px] rounded-2xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none">
                  <SelectValue
                    placeholder="Bulan"
                    className="text-neutral-800"
                  />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month: string, i: number) => {
                    return (
                      <SelectItem key={i} value={month}>
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col w-full mt-[10px] px-[16px] md:px-[30px] pb-[16px] md:pb-[50px] gap-[22px]">
            {!isWideScreen ? (
              <>
                <CardGrafikBulananComponent />
                <CardGrafikBulananComponent />
              </>
            ) : (
              <Table className="flex flex-col w-full">
                <TableHeader className="flex w-full">
                  <TableRow className="flex flex-row w-full">
                    <TableHead className="w-full bg-[#F0F0F0]">
                      Instansi
                    </TableHead>
                    <TableHead className="w-1/5">Total</TableHead>
                    <TableHead className="w-1/5">Antrian</TableHead>
                    <TableHead className="w-1/5">Permohonan</TableHead>
                    <TableHead className="w-1/5">SKM</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grafikBulanans.map(
                    (
                      data: {
                        instansi: string;
                        total: number;
                        antrian: number;
                        permohonan: number;
                        skm: number;
                      },
                      i: number
                    ) => {
                      return (
                        <TableRow key={i} className="flex flex-row w-full">
                          <TableCell className="w-full">
                            {data.instansi}
                          </TableCell>
                          <TableCell className="w-1/5">{data.total}</TableCell>
                          <TableCell className="w-1/5">
                            {data.antrian}
                          </TableCell>
                          <TableCell className="w-1/5">
                            {data.permohonan}
                          </TableCell>
                          <TableCell className="w-1/5">{data.skm}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
