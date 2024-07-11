"use client";

import ByInstansi from "@/components/fetching/layanan/layananByInstansi/byInstansi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AntrianFormType } from "@/types/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { schemaBooking } from "@/lib/zodSchema";
import { z } from "zod";
import { Loader } from "lucide-react";

export default function BookingAntrianPage({
  params,
}: {
  params: { id: number };
}) {
  const [selected, setSelected] = useState<string | null>();
  const [services, setServices] = useState<any>([]);
  const [tanggal, setTanggal] = useState<string | null>(null);
  const [jam, setJam] = useState<string | null>(null);
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [antrian, setAntrian] = useState<AntrianFormType>({
    instansi_id: Number(params.id),
    layanan_id: 0,
    tanggal: "",
    waktu: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const validateForm = async () => {
    try {
      await schemaBooking.parseAsync({
        ...antrian,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [antrian, hasSubmitted]);

  const fetchLayanan = async (id: number) => {
    try {
      const layananByInstansi = await ByInstansi(id);

      setServices(layananByInstansi.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchLayanan(params.id);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/antrian/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
            },
            body: JSON.stringify(antrian),
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success("Berhasil membooking antrian!");
          setAntrian({
            instansi_id: 0,
            layanan_id: 0,
            tanggal: "",
            waktu: "",
          });
          setChangeOpacity(false);
          router.push(
            `/instansi/booking-antrian/booking-result/${result.data.id}`
          );
        } else {
          toast("Gagal booking antrian!");
        }
      } catch (error) {
        toast("Gagal booking antrian!");
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleSelectChangeDinas = (value: string) => {
    setSelected(value);
    setAntrian((prevAntrian) => ({
      ...prevAntrian,
      layanan_id: Number(value),
    }));
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTanggal(e.target.value);
    setChangeOpacity(true);
    setAntrian((prevAntrian) => ({
      ...prevAntrian,
      waktu: e.target.value,
    }));
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJam(e.target.value);
    setChangeOpacity(true);
    setAntrian((prevAntrian) => ({
      ...prevAntrian,
      tanggal: e.target.value,
    }));
  };

  return (
    <div className="w-full bg-primary-100 md:mb-0">
      <div className="flex w-full justify-center bg-primary-100 px-8 md:px-[150px] mt-[24px] mb-[170px] md:mb-0 md:pb-[130px]">
        <div className="flex w-full h-full flex-col items-center">
          <div className="md:w-full">
            <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
              Booking Antrian
            </h5>
          </div>

          <div className="flex flex-col w-full border border-neutral-700 items-center px-[25px] mt-[32px] bg-neutral-50 rounded-xl shadow-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full md:px-[105px]">
              <div className="flex flex-col w-full items-center mt-8 mb-[10px] md:mb-[20px] mx-[1px] md:mt-[62px]">
                <Select
                  name="layanan_id"
                  onValueChange={handleSelectChangeDinas}>
                  <SelectTrigger
                    className={`${
                      !selected ? "opacity-50" : ""
                    } border-b border-neutral-800 rounded-none text-start pl-4 w-full mx-0 pr-0`}>
                    <SelectValue
                      placeholder="Pilih Layanan"
                      className={selected ? "" : "placeholder:opacity-50"}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-[97%] md:w-full">
                    <div className="w-full">
                      {services.map((service: any, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className="pr-none text-neutral-900"
                            value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        );
                      })}
                    </div>
                  </SelectContent>
                </Select>

                {hasSubmitted && errors?.layanan_id?._errors && (
                  <div className="text-error-700 text-[12px] md:text-[14px]">
                    {errors.layanan_id._errors[0]}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center my-[10px] md:mt-[14px] mx-[1px]">
                <input
                  type="date"
                  name="tanggal"
                  className={`w-full pl-4 h-[40px] rounded-none bg-transparent border-b border-neutral-800 placeholder:text-[12px] focus:outline-none
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                  placeholder="Tanggal"
                  onChange={handleChangeDate}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    // appearance: "none",
                  }}
                />

                {hasSubmitted && errors?.tanggal?._errors && (
                  <div className="text-error-700 text-[12px] md:text-[14px]">
                    {errors.tanggal._errors[0]}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center my-[10px] md:my-[20px] mx-[1px]">
                <input
                  type="time"
                  name="waktu"
                  className={`w-full pl-4 h-[40px] bg-transparent rounded-none border-b border-neutral-800 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                  placeholder="time"
                  onChange={handleChangeTime}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                />

                {hasSubmitted && errors?.waktu?._errors && (
                  <div className="text-error-700 text-[12px] md:text-[14px]">
                    {errors.waktu._errors[0]}
                  </div>
                )}
              </div>

              <div className="flex md:self-center md:justify-center md:items-center w-full mb-8 gap-3 md:pb-8 mt-4">
                <Dialog>
                  <DialogTrigger asChild className="w-full md:w-4/12">
                    <div className="text-[12px] flex items-center justify-center border-none text-center text-neutral-50 w-full h-[30px] md:h-[40px] bg-secondary-700 hover:bg-secondary-600 rounded-[50px] font-normal md:py-[11px] md:px-[50px]">
                      Cek Antrian
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col justify-center items-center bg-neutral-200 rounded-xl w-10/12 md:w-6/12 p-4 md:p-8">
                    <div className="flex flex-col w-full">
                      <h2 className="text-[26px] font-semibold text-primary-800">
                        Nama Instansi
                      </h2>

                      <div className="grid grid-cols-3 w-full items-center justify-center gap-2 mt-6">
                        <div className="grid grid-rows-2 min-h-[120px] place-items-center bg-primary-700 rounded-xl p-2">
                          <h4 className="text-neutral-50 text-center text-[16px] md:text-[20px] font-semibold">
                            Total Antrian
                          </h4>

                          <p className="text-neutral-50 font-normal text-[24px]">
                            20
                          </p>
                        </div>

                        <div className="grid grid-rows-2 min-h-[120px] place-items-center bg-primary-700 rounded-xl p-2">
                          <h4 className="text-neutral-50 text-center text-[16px] md:text-[20px] font-semibold">
                            Antrian Ke-
                          </h4>

                          <p className="text-neutral-50 font-normal text-[24px]">
                            20
                          </p>
                        </div>

                        <div className="grid grid-rows-2 min-h-[120px] place-items-center bg-primary-700 rounded-xl p-2">
                          <h4 className="text-neutral-50 text-center text-[16px] md:text-[20px] font-semibold">
                            Selesai
                          </h4>

                          <p className="text-neutral-50 font-normal text-[24px]">
                            20
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  type="submit"
                  disabled={!formValid || isLoading}
                  className="text-[12px] flex items-center justify-center border-none text-center text-neutral-50 w-full md:w-4/12 h-[30px] md:h-[40px] bg-primary-700 hover:bg-primary-600 rounded-[50px] font-normal md:py-[11px] md:px-[99.5px]">
                  {isLoading ? <Loader className="animate-spin" /> : "Pilih"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
