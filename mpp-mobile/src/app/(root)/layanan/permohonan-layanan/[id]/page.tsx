"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ByInstansi from "@/components/fetching/layanan/layananByInstansi/byInstansi";
import { useDispatch } from "react-redux";
import { setId } from "@/store/action/actionPermohonanLayanan";
import { toast } from "sonner";

export default function PermohonanLayananFirstScreen({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useDispatch();
  const [service, setService] = useState<any>([]);
  const [selected, setSelected] = useState(null);

  const fetchLayanan = async (id: number) => {
    try {
      const layananByInstansi = await ByInstansi(id);

      setService(layananByInstansi.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchLayanan(params.id);
  }, [params.id]);

  const handleSelectChange = (value: any) => {
    dispatch(setId(value));
    setSelected(value);
  };

  return (
    <div className="flex items-center justify-center mt-[24px] mb-[132px]">
      <div className="flex flex-col items-center mx-[35px] gap-[16px]">
        <div className="flex flex-col">
          <div className="flex flex-col w-[300px] h-[50px] gap-[24px]">
            <h5 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h5>

            <div className="flex flex-row items-center justify-center">
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  1
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  2
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  3
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  4
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-[64px]">
            <div>
              <div className="flex self-center h-[40px]">
                <div className="flex w-full border border-neutral-700 h-[40px] rounded-[50px]">
                  <Select name="layanan_id" onValueChange={handleSelectChange}>
                    <SelectTrigger className={!selected ? "opacity-50" : ""}>
                      <SelectValue placeholder="Pilih Layanan Permohonan" />
                    </SelectTrigger>
                    <SelectContent>
                      {service?.map((el: any) => {
                        return (
                          <div key={el.id}>
                            <SelectItem value={el.id}>{el.name}</SelectItem>
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col self-start w-[300px] h-[137px] gap-[16px] pt-[16px]">
          <h5 className="text-[14px] font-semibold">Informasi Layanan</h5>

          <ul className="list-disc list-inside ml-[8px]">
            {service?.map((el: any, i: number) => {
              return (
                <div key={i}>
                  <li className="text-[12px] text-neutral-800 font-normal">
                    {el.desc}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="mt-[56px]">
          {/* Untuk process next menggunakan button nanti */}
          <Button
            className="w-[120px] text-[14px] text-neutral-50 font-normal"
            type="submit"
            variant="success">
            <Link href="/layanan/data-diri">Lanjut</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
