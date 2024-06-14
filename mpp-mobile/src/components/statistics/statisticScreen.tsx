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

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticsScreen() {
  const data = 700 + 300 + 1394;

  return (
    <div className="flex items-center justify-center mt-[24px] mb-[70px] mx-[5px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col bg-white w-[290px] shadow-xl rounded-2xl">
            <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
              <h5 className="text-[16px] text-primary-800 font-semibold">
                Antrian Online
              </h5>

              <p className="text-[10px] text-neutral-800 font-light">
                Grafik Tahunan
              </p>
            </div>

            <div className="flex absolute top-[208px] left-[159px]">
              <h5 className="text-[18px] text-primary-900 font-semibold">
                {data}
              </h5>
            </div>

            <div className="flex absolute top-[515px] left-[159px]">
              <h5 className="text-[18px] text-primary-900 font-semibold">
                {data}
              </h5>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={{
                labels: [2024, 2022, 2023],
                datasets: [
                  {
                    label: "Statistics",
                    data: [700, 300, 1394],
                    backgroundColor: ["#7BBA78", "#F8E29E", "#F3CB53"],
                  },
                ],
              }}
              options={{
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
                aspectRatio: 2.5,
              }}
            />

            <div className="flex flex-row self-center w-[242px] justify-between pb-[10.5px] px-[12px]">
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

          <div className="flex flex-col bg-white w-[290px] shadow-xl rounded-2xl">
            <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
              <h5 className="text-[16px] text-[#3A6C38] font-semibold">
                Permohonan Layanan
              </h5>

              <p className="text-[10px] text-[#656565] font-light">
                Grafik Tahunan
              </p>
            </div>

            <Doughnut
              className="flex items-center justify-center self-center my-[42px]"
              data={{
                labels: [2024, 2022, 2023],
                datasets: [
                  {
                    label: "Statistics",
                    data: [700, 300, 1394],
                    backgroundColor: ["#7BBA78", "#F8E29E", "#F3CB53"],
                  },
                ],
              }}
              options={{
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
                aspectRatio: 2.5,
              }}
            />

            <div className="flex flex-row self-center w-[242px] justify-between pb-[10.5px] px-[12px]">
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

        <div className="flex flex-col bg-white shadow-md rounded-2xl mt-[16px]">
          <div className="flex flex-col justify-between items-center mx-[10px] mt-[16px]">
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
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mx-[10px] w-[220px] flex mt-[10px]">
            <Table className="flex flex-col w-[270px] overflow-scroll">
              <TableHeader className="flex w-full">
                <TableRow className="">
                  <TableHead className="bg-[#F0F0F0] w-[260px]">
                    Instansi
                  </TableHead>
                  <TableHead className="w-[260px]">Total</TableHead>
                  <TableHead className="w-[260px]">Antrian</TableHead>
                  <TableHead className="w-[260px]">Permohonan</TableHead>
                  <TableHead className="w-[260px]">SKM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="flex flex-wrap w-full">
                <TableRow className="">
                  <TableCell className="w-[260px]">adhkadadka</TableCell>
                  <TableCell className="w-[260px]">Text</TableCell>
                  <TableCell className="w-[260px]">Text</TableCell>
                  <TableCell className="w-[260px]">Text</TableCell>
                  <TableCell className="w-[260px]">Text</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
