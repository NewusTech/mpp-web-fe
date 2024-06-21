"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import Steps from "@/components/steps/steps";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

type LayananFormType = {
  id: number;
  field: string;
  tipedata: string;
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

interface FormData {
  id: string;
  field: string;
  tipedata: string;
  datajson?: { id: string; key: string }[];
}

interface DocData {
  id: string;
  field: string;
}

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 4;

export default function UploadFilePage() {
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const [dataFile, setDataFile] = useState<LayananType | null>(null);
  const [docValues, setDocValues] = useState<Record<string, File | null>>({});
  const router = useRouter();
  const token = Cookies.get("Authorization");

  const [fileName, setFileName] = useState("Upload");

  console.log(permohonan, "ini apa dong");

  const fetchFile = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layanan/docs/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result: FormType = await response.json();

    setDataFile(result.data);
  };

  useEffect(() => {
    fetchFile(permohonan.id);
  }, [permohonan.id]);

  console.log(dataFile, "ini data file");

  const handleDocChange = (id: string, file: File | null) => {
    setDocValues((prevValues) => ({
      ...prevValues,
      [id]: file,
    }));
  };

  const resultDocs = dataFile?.Layananforms || [];

  const handleSubmit = async () => {
    const formData = new FormData();

    permohonan.datainput.map(
      (input: { layananform_id: number; data: string | [] }, i: number) => {
        Object.entries(input).forEach(([key, value], index) => {
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            // Mengonversi objek menjadi array
            const selectedValues = Object.keys(value).filter((k) => value[k]);
            formData.append(`datainput[${index}][layananform_id]`, key);
            formData.append(
              `datainput[${index}][data]`,
              JSON.stringify(selectedValues)
            );
          } else {
            // Jika value adalah data primitif
            formData.append(`datainput[${index}][layananform_id]`, key);
            formData.append(`datainput[${index}][data]`, value.toString());
          }
        });
      }
    );

    Object.entries(docValues).forEach(([key, value], index) => {
      if (value) {
        formData.append(`datafile[${index}][layananform_id]`, key);
        formData.append(`datafile[${index}][data]`, value); // Menambahkan file ke FormData
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/inputform/create/${permohonan.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data, "???");
      // if (response.ok) {
      //   toast(data.message);
      //   router.push("/riwayat");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center bg-primary-100 mt-[24px] md:mx-[250px] md:mb-0 md:pb-[362px]">
      <div className="flex flex-col md:w-full items-center gap-[12px]">
        <div className="flex flex-col md:w-full md:justify-between md:flex-row mb-[16px]">
          <div className="flex flex-col justify-center">
            <h4 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
              Permohonan Layanan
            </h4>
          </div>

          <div className="flex flex-row self-center mt-[24px]">
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

        <div className="flex flex-col md:w-full">
          <div className="flex flex-col md:w-full">
            {dataFile?.Layananforms ? (
              <form className="flex flex-col items-center md:w-full">
                {dataFile?.Layananforms?.map((el: LayananFormType) => (
                  <div
                    key={el.id}
                    className="flex flex-row justify-between w-[290px] md:w-full h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                    <div className="flex flex-col w-[152px] md:w-full justify-center gap-[9px]">
                      <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                        {el.field}
                      </h6>
                      <p className="text-[10px] md:text-[12px] text-neutral-900 font-normal">
                        {dataFile.desc}
                      </p>
                    </div>
                    <div className="flex self-center">
                      {resultDocs.map((v, i) => {
                        return (
                          <input
                            key={i}
                            id="fileInput"
                            type="file"
                            placeholder="Upload"
                            className="md:appearance-none hidden"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleDocChange(
                                v.id.toString(),
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                        );
                      })}

                      <label
                        htmlFor="fileInput"
                        className="flex items-center w-[80px] md:w-[230px] h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px] cursor-pointer">
                        {fileName}
                      </label>
                    </div>
                  </div>
                ))}

                <div className="h-[40px] w-[150px] md:w-full flex self-center justify-center items-end mb-[22px] mt-[16px] md:mt-[24px]">
                  <Button
                    type="submit"
                    onSubmit={handleSubmit}
                    variant="success">
                    <Link href="/riwayat"> Ajukan</Link>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="container mx-auto mt-7 flex flex-col md:w-full justify-center items-center w-full h-full pb-16">
                <Image src={backHome} width={300} height={300} alt="sad" />
                <p className="text-center text-neutral-900 text-[20px] md:text-[32px] font-thin mt-8 mb-10">
                  Data tidak ditemukan!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
