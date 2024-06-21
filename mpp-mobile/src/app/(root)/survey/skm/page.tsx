"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setDataSurvei } from "@/store/action/actionSurvei";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import Image from "next/image";

type SurveiFormType = {
  id: number;
  field: string;
};

type SurveiType = {
  Surveyforms: [SurveiFormType];
  desc: string;
  image: string;
  name: string;
  slug: string;
};

export default function SurveySKMPage() {
  const survei = useSelector((state: RootState) => state.survey);
  const dispatch = useDispatch();
  const router = useRouter();
  const [surveis, setSurveis] = useState<SurveiType>();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const token = Cookies.get("Authorization");

  const fetchSurvei = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/survey/form/${id}`,
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

    setSurveis(result.data);
  };

  useEffect(() => {
    fetchSurvei(survei.layananId);
  }, [survei.layananId]);

  const handleRadioChange = (id: number, value: string) => {
    setInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datainput = Object.keys(input).map((key) => ({
      surveyform_id: Number(key),
      nilai: input[key],
    }));

    dispatch(setDataSurvei(datainput));

    const formData = {
      datainput,
      date: localStorage.getItem("dataTanggal"),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputsurvey/create/${survei.layananId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    await response.json();

    toast("Terimakasih telah mengisi survei!");
    localStorage.clear();
    router.push("/survey");
  };

  return (
    <div className="flex items-center justify-center md:w-full bg-primary-100 mt-[50px] mx-[20px] mb-[27px] md:mb-0 md:pb-[150px]">
      <div className="flex flex-col md:w-full items-center md:mx-[230px]">
        <div className="flex flex-col md:w-full bg-white rounded-2xl shadow-lg px-[16px]">
          <div className="flex justify-center my-[22px] mb-[16px]">
            <h6 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
              Survey Kepuasan Masyarakat
            </h6>
          </div>

          <div className="flex flex-col md:w-full my-[16px] rounded-2xl">
            {surveis &&
            surveis.Surveyforms &&
            surveis?.Surveyforms?.length > 0 ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:w-full place-items-center">
                <div className="flex flex-col md:w-full rounded-2xl mb-[12px] gap-6">
                  {surveis?.Surveyforms?.map((el: any, i: number) => {
                    return (
                      <div key={i}>
                        <div className="flex flex-col px-[14px] md:mt-4">
                          <Label className="flex text-center md:self-center font-normal text-primary-800 text-[12px] md:text-[14px] mb-[16px] md:mb-8">
                            {el.field}
                          </Label>

                          <div className="flex flex-row gap-5 md:grid md:grid-cols-4">
                            {["1", "2", "3", "4"].map((value, index) => (
                              <div
                                key={index}
                                className="grid grid-rows-2 place-items-center relative">
                                <Label className="flex justify-center items-center text-[10px] font-normal text-center mb-[10px]">
                                  {index === 0
                                    ? "Tidak Sesuai"
                                    : index === 1
                                    ? "Kurang Sesuai"
                                    : index === 2
                                    ? "Sesuai"
                                    : "Sangat Sesuai"}
                                </Label>

                                <div className="relative">
                                  <input
                                    className="peer absolute w-[50px] h-[50px] rounded-full border border-primary-700 cursor-pointer opacity-0"
                                    value={value}
                                    type="radio"
                                    name={`surveyform_${el.id}`}
                                    onChange={(e) => {
                                      handleRadioChange(el.id, e.target.value);
                                      setSelectedOption(el.id);
                                    }}
                                  />
                                  <div className="w-[50px] h-[50px] rounded-full border border-primary-700 flex items-center justify-center text-primary-700 peer-checked:bg-primary-700 peer-checked:text-primary-50">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex self-center justify-center items-end mb-[22px] mt-[32px]">
                  <Button
                    className="w-[90px] h-[30px] text-[12px] text-neutral-50 font-light"
                    type="submit"
                    variant="link">
                    Selesai
                  </Button>
                </div>
              </form>
            ) : (
              <div className="container mx-auto flex flex-col md:w-full justify-center items-center w-full h-full">
                <Image src={backHome} width={400} height={400} alt="sad" />
                <p className="text-center text-neutral-900 text-[12px] md:text-[32px] font-thin mt-4">
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
