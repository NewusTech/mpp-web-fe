"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setDinasId,
  setLayananId,
  setTanggal,
} from "@/store/action/actionSurvei";
import { redirect, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import { getTodayDate } from "@/helpers/logout/formatted";
import fetchInstansiSurvei from "@/components/fetching/instansi/surveiInstansi";
import LayananSurvei from "@/components/fetching/layanan/layananSurvei/layananSurvei";
import Swal from "sweetalert2";

type DataDinasType = {
  id: number;
  jmlLayanan: number;
  name: string;
  slug: string;
  telp: string;
};

type DataLayananType = {
  name: string;
  slug: string;
  instansi_id: number;
  id: number;
};

export default function SurveySkmPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [instances, setInstances] = useState<DataDinasType[]>();
  const [instanceId, setInstanceId] = useState<number>(1);
  const [service, setService] = useState<DataLayananType[]>();
  const [selected, setSelected] = useState(null);
  const [selectedDinas, setSelectedDinas] = useState<number | null>(null);
  const [selectedLayanan, setSelectedLayanan] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [changeOpacity, setChangeOpacity] = useState(false);
  const token = Cookies.get("Authorization");
  const [survei, setSurvei] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const fetchDinas = async (page: number, limit: number, skm: boolean) => {
    try {
      const instansis = await fetchInstansiSurvei(page, limit, skm);
      setInstances(instansis.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLayanan = async (id: number, skm: boolean) => {
    try {
      const layanan = await LayananSurvei(id, skm);
      setService(layanan.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchDinas(1, 1000000, survei);

    const storedDinasId = localStorage.getItem("dinasId");
    const storedLayananId = localStorage.getItem("layananId");
    const storedDate = localStorage.getItem("dataTanggal");

    if (storedDinasId) {
      setSelectedDinas(Number(storedDinasId));
      setInstanceId(Number(storedDinasId));
    }

    if (storedLayananId) {
      setSelectedLayanan(Number(storedLayananId));
    }

    if (storedDate) {
      setDate(storedDate);
      setChangeOpacity(true);
    }
  }, []);

  useEffect(() => {
    if (instanceId) {
      fetchLayanan(instanceId, survei);
    }
  }, [instanceId]);

  const handleSelectChangeDinas = (value: any) => {
    dispatch(setDinasId(value));
    setInstanceId(value);
    setSelectedDinas(value);
    setSelected(value);
  };

  const handleSelectChangeLayanan = (value: any) => {
    dispatch(setLayananId(value));
    setSelectedLayanan(value);
    setSelected(value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setChangeOpacity(true);
    dispatch(setTanggal(e.target.value));
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/getCheckUserSKM/${selectedLayanan}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Pengecekan survei berhasil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
        router.push("/survey/skm");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Anda telah mengisi survei!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Anda telah mengisi survei!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <section className="flex items-center justify-center bg-primary-100 w-full pt-6 pb-[380px] md:pb-[150px]">
      <div className="flex w-full mx-6 md:mx-32 flex-col items-center">
        <div className="md:flex md:justify-start md:self-start">
          <h3 className="text-[16px] md:text-start md:text-[26px] font-semibold text-primary-800">
            Survey Kepuasan Masyarakat (SKM)
          </h3>
        </div>

        <div className="flex flex-col w-full md:w-full border border-neutral-700 items-center mt-8 bg-neutral-50 rounded-xl shadow-md">
          <div className="flex flex-col w-full px-6 md:px-[105px]">
            <div className="flex flex-col w-full items-center mb-[10px] md:mb-10 mx-[1px] mt-[62px]">
              <Select
                name="dinas_id"
                onValueChange={handleSelectChangeDinas}
                value={selectedDinas ? String(selectedDinas) : undefined}>
                <SelectTrigger
                  className={`${
                    !selectedDinas ? "opacity-50" : ""
                  } border-b border-neutral-800 rounded-none pl-4 w-full mx-0 pr-0`}>
                  <SelectValue
                    placeholder="Pilih Dinas"
                    className={selectedDinas ? "" : "placeholder:opacity-50"}
                  />
                </SelectTrigger>
                <SelectContent className="w-[97%] md:w-full">
                  <div>
                    {instances?.map((el: DataDinasType, i: number) => {
                      return (
                        <SelectItem
                          className="pr-none"
                          key={i}
                          value={String(el.id)}>
                          {el.name}
                        </SelectItem>
                      );
                    })}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center mx-[1px] mt-2">
              <Select
                name="layanan_id"
                onValueChange={handleSelectChangeLayanan}
                value={selectedLayanan ? String(selectedLayanan) : undefined}>
                <SelectTrigger
                  className={`${
                    !selectedLayanan ? "opacity-50" : ""
                  } border-b border-neutral-800 rounded-none pl-4 w-full mx-0 pr-0`}>
                  <SelectValue
                    placeholder="Pilih Jenis Layanan"
                    className={selectedLayanan ? "" : "placeholder:opacity-50"}
                  />
                </SelectTrigger>
                <SelectContent className="w-[97%] md:w-full">
                  <div>
                    {service?.map((el: any, i: number) => {
                      return (
                        <SelectItem
                          className="pr-none"
                          key={i}
                          value={String(el.id)}>
                          {el.name}
                        </SelectItem>
                      );
                    })}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full flex-col items-center bg-none my-[10px] md:my-10 mx-[1px]">
              {isMobile ? (
                <div className="relative w-full">
                  <Input
                    id="tanggal"
                    type="date"
                    name="tanggal"
                    value={date ? date : "Pilih Tanggal"}
                    min={getTodayDate()}
                    onChange={handleChangeDate}
                    className={`w-full pl-4 pr-1 h-10 bg-neutral-50 appearance-none block rounded-none border-b border-neutral-800 placeholder:text-[12px] focus:outline-none
                  ${
                    changeOpacity
                      ? "text-neutral-900 text-[14px]"
                      : "text-neutral-900 opacity-50"
                  }`}
                    placeholder="Pilih Tanggal"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                    }}
                  />

                  {!date && (
                    <label
                      htmlFor="tanggal"
                      style={{ pointerEvents: "auto" }}
                      className="absolute top-2 left-4 text-[14px] opacity-60 text-neutral-900">
                      Pilih Tanggal
                    </label>
                  )}
                </div>
              ) : (
                <Input
                  type="date"
                  name="tanggal"
                  value={date ? date : "Pilih Tanggal"}
                  min={getTodayDate()}
                  onChange={handleChangeDate}
                  className={`w-full pl-4 pr-1 h-10 bg-neutral-50 appearance-none block rounded-none border-b border-neutral-800 placeholder:text-[12px] focus:outline-none
                  ${
                    changeOpacity
                      ? "text-neutral-900 text-[14px]"
                      : "text-neutral-900 opacity-50"
                  }`}
                  placeholder="Pilih Tanggal"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                />
              )}
            </div>

            <div className="flex self-end justify-end items-end mb-8 mt-4">
              <Button
                className="text-[12px] text-neutral-50 w-[90px] md:w-[235px] h-[30px] md:h-[40px]"
                type="submit"
                variant="warning"
                disabled={
                  isLoading || !selectedDinas || !selectedLayanan || !date
                }
                onClick={handleButtonClick}>
                {isLoading ? <Loader className="animate-spin" /> : "Isi SKM"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
