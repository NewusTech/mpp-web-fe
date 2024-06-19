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
import Steps from "@/components/steps/steps";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 1;

function splitByNumberedItems(text: string) {
  const splitText = text
    .split(/(?=\d+\.\s)/)
    .map((item: string) => item.trim());
  return splitText;
}

export default function PermohonanLayananFirstScreen({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useDispatch();
  const [service, setService] = useState<any>([]);
  const [selected, setSelected] = useState(null);
  const [selectedService, setSelectedService] = useState<any>(null);

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
    const selected = service.find((el: any) => el.id === value);
    setSelectedService(selected);
  };

  let content = [];

  if (selectedService) {
    const text = selectedService.desc;
    const result = splitByNumberedItems(text);
    content.push(result);
  }

  console.log(content, "???");

  return (
    <div className="flex items-center justify-center mt-[24px] md:mt-[48px] md:mx-[167px] mb-[132px] md:mb-0 bg-primary-100 md:pb-[135px]">
      <div className="flex flex-col md:w-full items-center mx-[35px] gap-[16px]">
        <div className="flex flex-col md:w-full">
          <div className="flex flex-col md:flex-row md:justify-between w-[300px] md:w-full h-[50px] md:h-6 gap-[24px]">
            <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
              Permohonan Layanan
            </h5>

            <div className="flex flex-row items-center justify-center">
              {steps.map((step, index) => (
                <Steps
                  key={step.id}
                  title={step.title}
                  isLastStep={index === steps.length - 1}
                  isActive={step.id === currentStep}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:w-full pt-[64px]">
            <div>
              <div className="flex self-center h-[40px]">
                <div className="flex w-full md:w-1/2 border border-neutral-700 h-[40px] rounded-[50px]">
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
          <h5 className="text-[14px] md:text-[20px] font-semibold">
            Informasi Layanan
          </h5>

          {selectedService && (
            <div className="list-disc list-inside ml-[8px]">
              {content[0].map((item: string, i: number) => {
                return (
                  <div
                    key={i}
                    className="text-[12px] md:text-[16px] text-neutral-800 font-normal">
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-[56px] md:w-full md:flex md:justify-center">
          <Button
            className="w-[120px] md:w-1/4 text-[14px] text-neutral-50 font-normal"
            type="submit"
            variant="success">
            <Link href="/layanan/data-diri">Lanjut</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
