"use client";

import ByLayanan from "@/components/fetching/layanan/formInputByLayanan/ByLayanan";
import LayoutInput from "@/components/layoutForms/layoutForm";
import Steps from "@/components/steps/steps";
import { Button } from "@/components/ui/button";
import {
  setDataInput,
  updateCheckboxData,
} from "@/store/action/actionPermohonanLayanan";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import { useDispatch } from "react-redux";
import Image from "next/legacy/image";
import { ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

type LayananFormType = {
  id: number;
  field: string;
  tipedata: string;
  datajson: [{ id: number; key: string }];
};

type LayananType = {
  Layananforms: [LayananFormType];
  desc: string;
  image: string;
  name: string;
  slug: string;
};

type FormType = {
  status: string;
  data: LayananType;
};

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 3;

export default function FormulirPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<LayananType>();
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [instansiId, setInstansiId] = useState<number | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const router = useRouter();

  const fetchInputForm = async (id: number) => {
    const result: FormType = await ByLayanan(id);

    setForm(result.data);
  };

  useEffect(() => {
    const instanceid = localStorage.getItem("instanceId");
    if (instanceid) {
      setInstansiId(Number(instanceid));
    }
  }, []);

  useEffect(() => {
    if (instansiId !== null) {
      fetchInputForm(instansiId);
    }
  }, [instansiId]);

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    layananform_id: number
  ) => {
    const { value, checked } = e.target;
    setCheckboxValues((prevValues) => {
      const currentValues = prevValues[layananform_id] || [];
      if (checked) {
        return {
          ...prevValues,
          [layananform_id]: [...currentValues, Number(value)],
        };
      } else {
        return {
          ...prevValues,
          [layananform_id]: currentValues.filter(
            (val) => val !== Number(value)
          ),
        };
      }
    });
  };

  const handleClick = () => {
    setIsLoading(true);
    let wadah: { layananform_id: number; data: string }[] = [];
    let checkboxWadah: { layananform_id: number; data: number[] }[] = [];

    form?.Layananforms.map((el: any) => {
      if (el.tipedata === "checkbox") {
        checkboxWadah.push({
          layananform_id: el.id,
          data: checkboxValues[el.id] || [],
        });
      } else {
        wadah.push({
          layananform_id: el.id,
          data: formValues[el.field] || "",
        });
      }
      setChangeOpacity(true);
    });

    dispatch(setDataInput(wadah));
    checkboxWadah.forEach((item) => {
      dispatch(updateCheckboxData(item));
    });
  };

  return (
    <div className="bg-primary-100 pt-2 md:mt-[48px] md:mb-0 pb-32 md:pb-[150px]">
      <div className="flex items-center justify-center bg-primary-100 mt-[14px] md:mt-[48px] mx-[35px] md:mx-[250px] mb-[35px] md:mb-0 md:pb-[80px]">
        <div className="flex flex-col w-full gap-[16px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-[24px] md:gap-0">
            <div className="flex flex-row justify-between md:justify-center items-center">
              <button onClick={() => router.back()}>
                <ChevronLeft className="w-[40px] h-[40px] text-neutral-800 mr-4" />
              </button>

              <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
                Permohonan Layanan
              </h5>
            </div>

            <div className="flex flex-row self-center md:self-end">
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
          </div>

          <div className="flex flex-col w-full bg-neutral-50 rounded-2xl shadow-md mt-[20px]">
            <div className="flex flex-col md:w-full mt-[22px] px-[21px] md:px-[75px] md:py-[32px]">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Formulir
              </h5>

              {form?.Layananforms ? (
                <div className="flex flex-col w-full md:w-full mt-[32px]">
                  <div className="flex flex-col w-full md:w-full mb-[8px] gap-y-5">
                    {form?.Layananforms?.map(
                      (el: LayananFormType, i: number) => {
                        if (el.tipedata === "checkbox") {
                          return (
                            <div key={i} className="space-y-2 w-full">
                              <label className="text-neutral-900 text-[16px] font-normal">
                                {el.field}
                              </label>
                              <div className="grid grid-cols-2">
                                {el.datajson.map((data) => (
                                  <div
                                    key={data.id}
                                    className="flex items-center">
                                    <input
                                      type="checkbox"
                                      name={el.field}
                                      value={data.id}
                                      checked={
                                        checkboxValues[el.id]?.includes(
                                          data.id
                                        ) || false
                                      }
                                      onChange={(e) =>
                                        handleCheckboxChange(e, el.id)
                                      }
                                    />
                                    <label className="ml-2">{data.key}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={i} className="space-y-2 w-full">
                              <LayoutInput
                                typeForm={el.tipedata}
                                labelName={el.field}
                                change={change}
                                nameForm={el.field}
                                valueForm={formValues[el.field] || ""}
                                placeholder="Kirim Jawaban!"
                                opacity={changeOpacity}
                                dataRadio={el.datajson}
                              />
                            </div>
                          );
                        }
                      }
                    )}
                  </div>

                  <div className="flex self-center md:justify-center h-[40px] w-[120px] md:w-full mb-[19px] mt-[16px]">
                    <Button
                      type="submit"
                      variant="success"
                      onClick={handleClick}>
                      <Link href="/instansi/upload-file">
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Lanjut"
                        )}
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="container mx-auto mt-7 flex flex-col md:w-full justify-center items-center w-full h-full pb-16">
                  <Image src={backHome} width={300} height={300} alt="sad" />
                  <p className="text-center text-neutral-900 text-[20px] md:text-[32px] font-thin mt-8 mb-8">
                    Data tidak ditemukan!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
