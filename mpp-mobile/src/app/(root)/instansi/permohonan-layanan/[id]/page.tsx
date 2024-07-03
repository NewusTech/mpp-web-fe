"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setId } from "@/store/action/actionPermohonanLayanan";
import { toast } from "sonner";
import Steps from "@/components/steps/steps";
import ByInstansi from "@/components/fetching/layanan/layananByInstansi/byInstansi";
import { JenisLayananType } from "@/types/type";
import { Loader } from "lucide-react";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 1;

function splitByNumberedItems(text: string) {
  let splitText = [""];
  if (text) {
    splitText = text.split(/(?=\d+\.\s)/).map((item: string) => item.trim());
    return splitText;
  }
}

export default function PermohonanLayananFirstScreen({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useDispatch();
  const [service, setService] = useState<JenisLayananType[]>([]);
  const [selectedService, setSelectedService] = useState<JenisLayananType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLayanan = async (id: number) => {
    try {
      const layananByInstansi = await ByInstansi(id);

      setService(layananByInstansi.data);

      const instanceId = localStorage.getItem("instanceId");
      if (instanceId) {
        const selected = layananByInstansi.data.find(
          (el: JenisLayananType) => el.id.toString() === instanceId
        );
        setSelectedService(selected);
      }
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchLayanan(params.id);
  }, [params.id]);

  const handleSelectChange = (value: any) => {
    dispatch(setId(Number(value)));
    const selected = service.find(
      (el: JenisLayananType) => el.id.toString() === value
    );
    setSelectedService(selected);
  };

  let syarat = [];

  if (selectedService) {
    const text = selectedService.syarat;
    const result = splitByNumberedItems(text);
    syarat.push(result);
  }

  let hukum = [];

  if (selectedService) {
    const text = selectedService.dasarhukum;
    const result = splitByNumberedItems(text);
    hukum.push(result);
  }

  let pelayanan = [];

  if (selectedService) {
    const text = selectedService.desc;
    const result = splitByNumberedItems(text);
    pelayanan.push(result);
  }

  const isButtonDisabled = () => {
    return !selectedService;
  };

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[24px] md:mt-[48px] md:mx-[70px] mb-[132px] md:mb-0 bg-primary-100 md:pb-[210px]">
      <div className="flex flex-col w-full items-center bg-neutral-50 rounded-xl shadow-lg mx-[35px] md:p-[60px] gap-[16px]">
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
                  <Select
                    name="layanan_id"
                    onValueChange={handleSelectChange}
                    defaultValue={localStorage.getItem("instanceId") || ""}>
                    <SelectTrigger
                      className={
                        !selectedService && !localStorage.getItem("instanceId")
                          ? "opacity-50"
                          : ""
                      }>
                      <SelectValue placeholder="Pilih Layanan Permohonan" />
                    </SelectTrigger>
                    <SelectContent>
                      {service?.map((el: JenisLayananType) => {
                        return (
                          <div key={el.id}>
                            <SelectItem value={String(el.id)}>
                              {el.name}
                            </SelectItem>
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

        <div className="mt-[56px] md:w-full md:flex md:justify-center">
          <Button
            className="w-[120px] md:w-1/4 text-[14px] text-neutral-50 font-normal"
            type="submit"
            variant="success"
            disabled={isButtonDisabled()}
            onClick={handleButtonClick}>
            <Link href="/instansi/data-diri">
              {isLoading ? <Loader className="animate-spin" /> : "Lanjut"}
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-neutral-50 rounded-xl self-start w-full h-full gap-[16px] mt-5 p-[64px]">
        <h5 className="text-[14px] md:text-[20px] text-primary-800 font-semibold mb-8">
          Informasi Layanan
        </h5>

        <Accordion type="single" collapsible>
          <AccordionItem className="w-full h-full mb-2" value={`item-1`}>
            <AccordionTrigger>Persyaratan</AccordionTrigger>
            <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
              {selectedService && (
                <div className="list-disc list-inside">
                  {syarat[0]?.map((item: string, i: number) => {
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="w-full h-full mb-2" value={`item-2`}>
            <AccordionTrigger>Dasar Hukum</AccordionTrigger>
            <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
              {selectedService && (
                <div className="list-disc list-inside">
                  {hukum[0]?.map((item: string, i: number) => {
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="w-full h-full mb-2" value={`item-3`}>
            <AccordionTrigger>Pelayanan</AccordionTrigger>
            <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
              {selectedService && (
                <div className="list-disc list-inside">
                  {pelayanan[0]?.map((item: string, i: number) => {
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
