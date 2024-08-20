"use client";

import loginDong from "@/../../public/assets/undraw_login_re_4vu2.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Progress } from "@/components/ui/progress";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import MobileSKMPage from "@/components/mobile-survei-page";
import {
  getBackgroundClass,
  getDescription,
} from "@/helpers/logout/surveiHelp";
import Image from "next/legacy/image";
import { LogIn } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressBar = ({
  name,
  value,
  id,
}: {
  name: string;
  value: number;
  id: number;
}) => {
  const description = getDescription(value);
  const backgroundClass = getBackgroundClass(description);

  return (
    <div className="flex space-x-3 items-center">
      <div className="w-full space-y-1">
        <div className="flex justify-between text-sm text-neutral-800">
          <Link
            href={`/survey/result/${id}`}
            className="hover:text-primary-700 hover:underline transition-colors duration-300">
            <h4>{name}</h4>
          </Link>
          <Link
            href={`/survey/result/${id}`}
            className="hover:text-primary-700 hover:underline transition-colors duration-300">
            <p>{value}</p>
          </Link>
        </div>
        <Progress className="bg-primary-700 text-primary-700" value={value} />
      </div>
      <div
        className={`text-[10px] ${backgroundClass} h-10 w-20 flex items-center justify-center rounded-lg text-neutral-50 px-2 py-1`}>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default function SurveiScreenMpp() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [dataChart, setDataChart] = useState<
    ChartData<"doughnut", number[], unknown>
  >({
    labels: ["Suara", "hati", "siapa"],
    datasets: [
      {
        label: "Statistics",
        data: [300, 500, 800],
        backgroundColor: ["#3568C0", "#FF9742", "#FFC595"],
      },
    ],
  });
  const [aspectRatio, setAspectRatio] = useState(2.5);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const now = new Date();
  const thisYear = now.getFullYear();

  useEffect(() => {
    setToken(Cookies.get("Authorization"));
  }, []);

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
          data: [300, 500, 800],
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

  return (
    <div className="w-full flex flex-col gap-y-10 pb-40">
      {!isMobile ? (
        <div className="background-blend flex flex-row justify-center w-full h-[400px] md:min-h-[415px]">
          <div className="w-10/12 flex h-full flex-col md:flex-row items-center">
            <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
              <h2 className="font-semibold text-[18px] mt-8 md:mt-0 md:text-[26px] text-primary-800">
                Survey Kepuasan Masyarakat Mal Pelayanan Publik Lampung Timur
              </h2>

              <p className="font-normal text-center md:text-start text-[14px] text-primary-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                asperiores deserunt voluptate laboriosam magni, ipsa ratione et
                similique? Quam, accusantium repellat? Voluptates voluptatum
                assumenda atque. In officiis similique quisquam itaque.
              </p>

              <div className="w-full">
                {!token ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full md:w-6/12 font-normal bg-primary-700 rounded-full py-4 text-[14px] md:text-[16px]">
                        <p className="text-neutral-50 text-center">
                          Isi Survey Kepuasan Masyarakat ( SKM )
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center py-4">
                      <DialogHeader>
                        <div className="">
                          <Image
                            src={loginDong}
                            alt="Login Dong"
                            width={200}
                            height={200}
                          />

                          <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                            Maaf, Anda tidak mempunyai akses!
                          </p>
                        </div>
                      </DialogHeader>
                      <DialogFooter className="w-full">
                        <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                          <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                          <Link href={"/login"} className="text-primary-800">
                            Login
                          </Link>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="w-full md:w-7/12 font-normal py-6 text-[14px] md:text-[16px]">
                    <Link href={`/survei/survei-mpp`}>
                      Isi Survey Kepuasan Masyarakat ( SKM )
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="hidden w-10/12 md:w-5/12 my-16 p-8 rounded-xl bg-primary-800 md:flex flex-col justify-center items-center">
              <h5 className="font-semibold text-center text-neutral-50 text-[20px]">
                Indeks Kepuasan Masyarakat
              </h5>

              <p className="font-semibold text-[40px] text-neutral-50 py-10">
                89.19
              </p>

              <p className="font-normal text-[14px] text-neutral-50">
                Sangat Baik
              </p>
            </div>
          </div>
        </div>
      ) : (
        <MobileSKMPage />
      )}

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-y-0 self-center">
        <div className="w-11/12 flex flex-col items-center md:items-stretch gap-y-3 md:gap-y-0 md:flex-row gap-x-5">
          <div className="flex flex-col bg-neutral-50 w-11/12 md:w-full shadow-md rounded-xl relative">
            <div className="w-full flex flex-col p-6 gap-y-5">
              <h5>Grafik Survey Kepuasan Masyarakat berdasarkan Instansi</h5>

              <div className="w-full">
                <Select>
                  <SelectTrigger className="w-full md:w-5/12 border border-neutral-700 rounded-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <ProgressBar
                  // key={v.id}
                  id={1}
                  name={"chart"}
                  value={90}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-y-5">
            <div className="flex flex-col bg-neutral-50 w-11/12 md:w-full shadow-md rounded-xl relative">
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
                  {/* {statistik?.totalantrian3year} */}
                </h5>
              </div>

              <Doughnut
                className="flex items-center justify-center self-center my-[42px]"
                data={dataChart}
                options={chartOptions}
              />

              <div className="flex flex-row self-center w-10/12 md:w-full justify-between pb-[10.5px] px-[12px] md:px-12">
                {/* {renderAntrianYearStats()} */}
              </div>
            </div>

            {/* hhe */}

            <div className="flex flex-col bg-neutral-50 w-11/12 md:w-full shadow-md rounded-xl relative">
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
                  {/* {statistik?.totalantrian3year} */}
                </h5>
              </div>

              <Doughnut
                className="flex items-center justify-center self-center my-[42px]"
                data={dataChart}
                options={chartOptions}
              />

              <div className="flex flex-row self-center w-10/12 md:w-full justify-between pb-[10.5px] px-[12px] md:px-12">
                {/* {renderAntrianYearStats()} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
