"use client";

import ByLayanan from "@/components/fetching/layanan/formInputByLayanan/ByLayanan";
import LayoutInput from "@/components/layoutForms/layoutForm";
import { Button } from "@/components/ui/button";
import { setDataInput } from "@/store/action/actionPermohonanLayanan";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function FormulirPage() {
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const dispatch = useDispatch();

  const [form, setForm] = useState<LayananType>();
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  const fetchInputForm = async (id: number) => {
    const result: FormType = await ByLayanan(id);

    setForm(result.data);
  };

  useEffect(() => {
    fetchInputForm(permohonan.id);
  }, [permohonan.id]);

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
    <div className="flex items-center justify-center mt-[14px] mx-[35px] mb-[15px]">
      <div className="flex flex-col items-centergap-[16px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col justify-center">
            <h5 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h5>
          </div>

          <div className="flex flex-row self-center">
            <div className="flex flex-row items-center justify-center">
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  1
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  2
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-[#F3CB53]"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  3
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-[#F3CB53]"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  4
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg mt-[20px]">
          <div className="flex flex-col mt-[22px] px-[21px]">
            <h5 className="text-[14px] font-semibold text-primary-800">
              Formulir
            </h5>

            <div className="flex flex-col mt-[32px]">
              <div className="flex flex-col mb-[8px]">
                {form?.Layananforms?.map((el: LayananFormType, i: number) => {
                  return (
                    <div key={i} className="space-y-2">
                      <LayoutInput
                        typeForm={el.tipedata}
                        labelName={el.field}
                        change={change}
                        nameForm={el.field}
                        valueForm={formValues[el.field] || ""}
                        placeholder="Input di sini!"
                        opacity={changeOpacity}
                        dataRadio={el.datajson}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex self-center h-[40px] w-[120px] mb-[19px] mt-[16px]">
              <Button type="submit" variant="success" onClick={handleClick}>
                <Link href="/layanan/upload-file">Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
