"use client";

import loginDong from "@/../../public/assets/undraw_login_re_4vu2.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import { DataSKMGrafikType, LayananType } from "@/types/type";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import SKMPerDinasFetch from "@/components/fetching/skmPerDinas/skmPerDinas";
import CardDinasStatistikSurvei from "@/components/fetching/skmPerDinas/cardDinasSKM/cardDinasSkm";
import CardDinasStatistikSurveiEducation from "@/components/fetching/skmPerDinas/cardDinasSkmEdu/cardDinasSkmEdu";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressBar = ({ name, value }: { name: string; value: number }) => {
  const fixValue = Math.round(value);
  const description = getDescription(fixValue);
  const backgroundClass = getBackgroundClass(description);

  return (
    <div className="flex space-x-3 space-y-3 items-center">
      <div className="w-full space-y-1">
        <div className="flex justify-between text-sm text-neutral-800">
          <div className="hover:text-primary-700 hover:underline transition-colors duration-300">
            <h4 className="text-[12px] md:text-[14px]">{name}</h4>
          </div>
          <div className="hover:text-primary-700 hover:underline transition-colors duration-300">
            <p className="text-[12px] md:text-[14px]">{fixValue}</p>
          </div>
        </div>
        <div className="border border-neutral-50 bg-neutral-300 rounded-full">
          <Progress value={fixValue} />
        </div>
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
  const [data, setData] = useState<DataSKMGrafikType>();
  const [instansis, setInstansis] = useState<LayananType[]>();
  const [selectedInstansi, setSelectedInstansi] = useState<number | undefined>(
    undefined
  );
  const now = new Date();
  const thisYear = now.getFullYear();

  const fetchDinas = async () => {
    try {
      const res = await fetchInstansi("", 1, 100000);

      setInstansis(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDinas();
  }, []);

  const fetchDataSKMDinas = async (id?: number) => {
    try {
      const res = await SKMPerDinasFetch(id);

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataSKMDinas(selectedInstansi);
  }, [selectedInstansi]);

  useEffect(() => {
    setToken(Cookies.get("Authorization"));
  }, []);

  const chartDataEdu = [
    {
      status: "Tidak Sekolah",
      data: data?.jmlSKMbyEdu?.jmlSKMTdkSklh,
      fill: "#c4c4c4",
    },
    {
      status: "SD",
      data: data?.jmlSKMbyEdu?.jmlSKMbySD,
      fill: "#3568c0",
    },
    {
      status: "SMP",
      data: data?.jmlSKMbyEdu?.jmlSKMbySMP,
      fill: "#ff9742",
    },
    {
      status: "SMA",
      data: data?.jmlSKMbyEdu?.jmlSKMbySMA,
      fill: "#28c382",
    },
    {
      status: "Diploma 1",
      data: data?.jmlSKMbyEdu?.jmlSKMbyD1,
      fill: "#f29b4a",
    },
    {
      status: "Diploma 2",
      data: data?.jmlSKMbyEdu?.jmlSKMbyD2,
      fill: "#ee3f62",
    },
    {
      status: "Diploma 3",
      data: data?.jmlSKMbyEdu?.jmlSKMbyD3,
      fill: "#608AD3",
    },
    {
      status: "Diploma 4 / Strata 1",
      data: data?.jmlSKMbyEdu?.jmlSKMbyS1,
      fill: "#FFB06F",
    },
    {
      status: "Strata 2",
      data: data?.jmlSKMbyEdu?.jmlSKMbyS2,
      fill: "#50DBA1",
    },
    {
      status: "Strata 3",
      data: data?.jmlSKMbyEdu?.jmlSKMbyS3,
      fill: "#F5B374",
    },
  ];

  const chartConfigEdu = {
    data: {
      label: "Data",
    },
    tidak_sekolah: {
      label: "Tidak Sekolah",
      color: "#c4c4c4",
    },
    sd: {
      label: "SD",
      color: "#3568c0",
    },
    smp: {
      label: "SMP",
      color: "#ff9742",
    },
    sma: {
      label: "SMA",
      color: "#28c382",
    },
    diploma1: {
      label: "Diploma 1",
      color: "#f29b4a",
    },
    diploma2: {
      label: "Diploma 2",
      color: "#ee3f62",
    },
    diploma3: {
      label: "Diploma 3",
      color: "#608AD3",
    },
    diploma4_Strata1: {
      label: "Diploma 1 / Strata 1",
      color: "#FFB06F",
    },
    strata2: {
      label: "Strata 2",
      color: "#50DBA1",
    },
    strata3: {
      label: "Strata 3",
      color: "#F5B374",
    },
  } satisfies ChartConfig;

  const chartDataGender = [
    {
      status: "Laki-laki",
      data: data?.jmlSKMbyGender?.jmlSKMbyPria,
      fill: "#3568C0",
    },
    {
      status: "Wanita",
      data: data?.jmlSKMbyGender?.jmlSKMbyWanita,
      fill: "#FF9742",
    },
  ];

  const chartConfigGender = {
    data: {
      label: "Data",
    },
    laki_laki: {
      label: "Laki-laki",
      color: "#3568C0",
    },
    wanita: {
      label: "Wanita",
      color: "#FF9742",
    },
  } satisfies ChartConfig;

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
                {data && Math.round(data?.rataRataNilaiSKM)}
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
          <div className="w-full flex flex-col bg-neutral-50 md:w-full shadow-md rounded-xl relative">
            <div className="w-full flex flex-col p-6 gap-y-5">
              <h5 className="font-semibold text-primary-800 md:text-[22px]">
                Grafik Survey Kepuasan Masyarakat berdasarkan Instansi
              </h5>

              <div className="w-full">
                <Select
                  onValueChange={(value) => setSelectedInstansi(Number(value))}>
                  <SelectTrigger className="w-full md:w-5/12 border border-neutral-700 rounded-full">
                    <SelectValue placeholder="Pilih Instansi" />
                  </SelectTrigger>
                  <SelectContent>
                    {instansis &&
                      instansis?.map((item: LayananType, i: number) => {
                        return (
                          <SelectItem key={i} value={String(item?.id)}>
                            {item?.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                {data &&
                  data.nilaiSKM_perlayanan?.map((item: any, i: number) => {
                    return (
                      <ProgressBar
                        key={i}
                        name={item?.layanan_name}
                        value={item?.totalNilaiPerLayanan}
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="w-full md:w-8/12 flex flex-col items-center gap-y-5">
            <div className="flex flex-col bg-neutral-50 w-full shadow-md rounded-xl relative">
              <Card className="flex flex-col gap-y-5">
                <CardHeader className="items-center pb-0">
                  <CardTitle>
                    <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
                      <h5 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
                        Pendidikan
                      </h5>

                      <p className="text-[10px] md:text-[12px] text-neutral-800 font-light">
                        Grafik Koresponden
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfigEdu}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartDataEdu}
                        dataKey="data"
                        label
                        nameKey="status"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    <p className="text-neutral-900 font-semibold text-[18px]">
                      Total Survei Pendidikan:
                    </p>
                    <p className="text-neutral-900 font-semibold text-[18px]">
                      {data && data?.jmlSKMbyEdu?.countSKM}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="flex flex-col bg-neutral-50 w-full shadow-md rounded-xl relative">
              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>
                    <div className="flex flex-row items-center justify-center gap-[5px] mt-[15px] mx-[10px]">
                      <h5 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
                        Jenis Kelamin
                      </h5>

                      <p className="text-[10px] md:text-[12px] text-neutral-800 font-light">
                        Grafik Koresponden
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfigGender}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartDataGender}
                        dataKey="data"
                        label
                        nameKey="status"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    <p className="text-neutral-900 font-semibold text-[18px]">
                      Total Survei Jenis Kelamin:
                    </p>
                    <p className="text-neutral-900 font-semibold text-[18px]">
                      {data && data?.jmlSKMbyGender?.countSKM}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
