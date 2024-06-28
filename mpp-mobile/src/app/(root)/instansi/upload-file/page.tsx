"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import Steps from "@/components/steps/steps";
import Image from "next/image";
import { toast } from "sonner";
import { LayananType } from "@/types/type";
import { Loader } from "lucide-react";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 4;

type DataInputItem = {
  layananform_id: string;
  data: string;
};

export default function UploadFilePage() {
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const [dataFile, setDataFile] = useState<LayananType | null>(null);
  const [docValues, setDocValues] = useState<Record<string, File | null>>({});
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [instansiId, setInstansiId] = useState<number | null>(null);
  const [dataInput, setDataInput] = useState<any[]>([]);
  const [fileName, setFileName] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedInstanceId = localStorage.getItem("instanceId");
    const storedDataInput = localStorage.getItem("dataInput");

    if (storedInstanceId) {
      setInstansiId(Number(storedInstanceId));
    }

    if (storedDataInput) {
      setDataInput(JSON.parse(storedDataInput));
    }
  }, []);

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

    const result = await response.json();

    setDataFile(result.data);
  };

  useEffect(() => {
    if (instansiId !== null) {
      fetchFile(instansiId);
    }
  }, [instansiId]);

  const handleDocChange = (id: string, file: File | null) => {
    setDocValues((prevValues) => ({
      ...prevValues,
      [id]: file,
    }));
    setFileName((prevNames) => ({
      ...prevNames,
      [id]: file ? file.name : "Upload",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataArray: {
      datainput: DataInputItem[];
      datafile: any[];
    }[] = [
      {
        datainput: dataInput,
        datafile: [],
      },
    ];

    Object.entries(docValues).forEach(([key, value]) => {
      if (value) {
        formDataArray[0].datafile.push({
          layananform_id: key,
          data: value,
        });
      }
    });

    const formData = new FormData();
    formDataArray[0].datainput.forEach((input, index) => {
      formData.append(
        `datainput[${index}][layananform_id]`,
        input.layananform_id
      );
      formData.append(`datainput[${index}][data]`, input.data);
    });

    formDataArray[0].datafile.forEach((file, index) => {
      formData.append(
        `datafile[${index}][layananform_id]`,
        file.layananform_id
      );
      formData.append(`datafile[${index}][data]`, file.data);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputform/create/${instansiId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast(data.message);
        localStorage.clear();
        router.push("/riwayat");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
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
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center md:w-full">
                {dataFile.Layananforms.map((el) => (
                  <div
                    key={el.id}
                    className="flex flex-row justify-between w-[290px] md:w-full h-[80px] rounded-2xl mb-[8px] bg-white border border-primary-700 px-[16px]">
                    <div className="flex flex-col w-[152px] md:w-full justify-center gap-[9px]">
                      <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                        {el.field}
                      </h6>
                      <p className="text-[10px] md:text-[12px] text-neutral-900 font-normal">
                        {dataFile.desc}
                      </p>
                    </div>
                    <div className="flex self-center">
                      <input
                        id={`fileInput-${el.id}`}
                        type="file"
                        className="md:appearance-none hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleDocChange(
                            el.id.toString(),
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                      <label
                        htmlFor={`fileInput-${el.id}`}
                        className="flex items-center w-[80px] md:w-[230px] h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px] cursor-pointer">
                        {fileName[el.id.toString()] || "Upload"}
                      </label>
                    </div>
                  </div>
                ))}

                <div className="h-[40px] w-[150px] md:w-full flex self-center justify-center items-end mb-[22px] mt-[16px] md:mt-[24px]">
                  <Button type="submit" variant="success">
                    {isLoading ? <Loader className="animate-spin" /> : "Ajukan"}
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
