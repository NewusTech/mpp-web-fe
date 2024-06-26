"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setDinasId,
  setLayananId,
  setTanggal,
} from "@/store/action/actionSurvei";
import { redirect } from "next/navigation";
import ByInstansi from "@/components/fetching/layanan/layananByInstansi/byInstansi";

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
  const [instances, setInstances] = useState<DataDinasType[]>();
  const [instanceId, setInstanceId] = useState<number>(1);
  const [service, setService] = useState<DataLayananType[]>();
  const [selected, setSelected] = useState(null);
  const [selectedDinas, setSelectedDinas] = useState<number | null>(null);
  const [selectedLayanan, setSelectedLayanan] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [date, setDate] = useState("");
  const [changeOpacity, setChangeOpacity] = useState(false);
  const token = Cookies.get("Authorization");

  const fetchDinas = async (search: string, page: number, limit: number) => {
    try {
      const instansis = await fetchInstansi(search, page, limit);
      setInstances(instansis.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  const fetchLayanan = async (id: number) => {
    try {
      const layanan = await ByInstansi(id);
      setService(layanan.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchDinas(debounceSearch, 1, 1000000);

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
  }, [debounceSearch]);

  useEffect(() => {
    if (instanceId) {
      fetchLayanan(instanceId);
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

  const isButtonDisabled = () => {
    return !selectedDinas || !selectedLayanan || !date;
  };

  return (
    <div className="flex items-center justify-center bg-primary-100 w-full pt-12 md:pt-6 pb-[380px] md:pb-[150px]">
      <div className="flex flex-col items-center">
        <div className="md:flex md:justify-start md:self-start">
          <h3 className="text-[16px] md:text-start md:text-[32px] font-semibold text-primary-800">
            Survey Kepuasan Masyarakat (SKM)
          </h3>
        </div>

        <div className="flex flex-col w-full md:w-[950px] border border-neutral-700 items-center mt-[32px] bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col w-full px-[16px] md:px-[105px]">
            <div className="flex flex-col w-full items-center mb-[10px] md:mb-[40px] mx-[1px] mt-[62px]">
              <Select
                name="layanan_id"
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
                <SelectContent className="w-[266px] md:w-full">
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

            <div className="flex flex-col items-center mx-[1px] mt-[8px]">
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
                <SelectContent className="w-[266px] md:w-full">
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

            <div className="flex flex-col items-center my-[10px] md:my-[40px] mx-[1px]">
              <input
                type="date"
                name="tanggal"
                value={date}
                onChange={handleChangeDate}
                className={`w-full pl-4 h-[40px] rounded-none border-b bg-none border-neutral-800 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-neutral-900 opacity-50"
                  }`}
                placeholder="Tanggal"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              />
            </div>

            <div className="flex self-end justify-end items-end mb-[32px] mt-[16px]">
              <Button
                className="text-[12px] text-neutral-50 w-[90px] md:w-[235px] h-[30px] md:h-[40px]"
                type="submit"
                variant="warning"
                disabled={isButtonDisabled()}>
                <Link href="/survey/skm">Isi SKM</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
