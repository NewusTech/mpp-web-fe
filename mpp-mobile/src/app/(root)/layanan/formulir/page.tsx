"use client";

import ByLayanan from "@/components/fetching/layanan/formInputByLayanan/ByLayanan";
import LayoutInput from "@/components/layoutForms/layoutForm";
import Steps from "@/components/steps/steps";
import { Button } from "@/components/ui/button";
import { setDataInput } from "@/store/action/actionPermohonanLayanan";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

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
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const dispatch = useDispatch();
  const [form, setForm] = useState<LayananType>();
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  console.log(permohonan, "ini dari persist");

  const fetchInputForm = async (id: number) => {
    const result: FormType = await ByLayanan(id);

    setForm(result.data);
  };

  useEffect(() => {
    fetchInputForm(permohonan.id);
  }, [permohonan.id]);

  console.log(form, ">>>");

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

  const handleClick = () => {
    let wadah: { layananform_id: number; data: string }[] = [];

    form?.Layananforms.map((el: any) => {
      wadah.push({
        layananform_id: el.id,
        data: formValues[el.field] || "",
      });
      setChangeOpacity(true);
    });

    dispatch(setDataInput(wadah));
  };

  return (
    <div className="bg-primary-100 pt-2 md:mt-[48px] md:mb-0 md:pb-[150px]">
      <div className="flex items-center justify-center bg-primary-100 mt-[14px] md:mt-[48px] mx-[35px] md:mx-[250px] mb-[35px] md:mb-0 md:pb-[80px]">
        <div className="flex flex-col md:w-full gap-[16px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-[24px] md:gap-0">
            <div className="flex flex-col justify-center">
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

          <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg mt-[20px]">
            <div className="flex flex-col md:w-full mt-[22px] px-[21px] md:px-[75px] md:py-[32px]">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Formulir
              </h5>

              {form?.Layananforms ? (
                <div className="flex flex-col w-full md:w-full mt-[32px]">
                  <div className="flex flex-col w-full md:w-full mb-[8px] gap-3">
                    {form?.Layananforms?.map(
                      (el: LayananFormType, i: number) => {
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
                    )}
                  </div>

                  <div className="flex self-center md:justify-center h-[40px] w-[120px] md:w-full mb-[19px] mt-[16px]">
                    <Button
                      type="submit"
                      variant="success"
                      onClick={handleClick}>
                      <Link href="/layanan/upload-file">Lanjut</Link>
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
