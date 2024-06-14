"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setDataSurvei } from "@/store/action/actionSurvei";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      date: survei.tanggal,
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
    router.push("/survey");
  };

  return (
    <div className="flex items-center justify-center mt-[24px] mx-[20px] mb-[27px]">
      <div className="flex flex-col items-center">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg px-[16px]">
          <div className="flex justify-center my-[22px] mb-[16px]">
            <h6 className="text-[16px] text-primary-800 font-semibold">
              Survey Kepuasan Masyarakat
            </h6>
          </div>

          <div className="flex flex-col my-[16px] rounded-2xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col place-items-center">
              <div className="flex flex-col rounded-2xl mb-[12px] gap-6">
                {surveis?.Surveyforms?.map((el: any) => {
                  return (
                    <div key={el.id}>
                      <div className="flex flex-col px-[14px]">
                        <Label className="flex text-center font-normal text-primary-800 text-[12px] mb-[16px]">
                          {el.field}
                        </Label>

                        <div className="flex flex-row gap-5">
                          {["1", "2", "3", "4"].map((value, index) => (
                            <div
                              key={value}
                              className="grid grid-rows-2 place-items-center">
                              <Label className="flex justify-center items-center text-[10px] font-normal text-center mb-[10px]">
                                {index === 0
                                  ? "Tidak Sesuai"
                                  : index === 1
                                  ? "Kurang Sesuai"
                                  : index === 2
                                  ? "Sesuai"
                                  : "Sangat Sesuai"}
                              </Label>
                              <Input
                                className="w-[50px] h-[50px] self-center"
                                value={value}
                                type="radio"
                                name={`surveyform_${el.id}`}
                                onChange={(e) =>
                                  handleRadioChange(el.id, e.target.value)
                                }
                              />
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
          </div>
        </div>
      </div>
    </div>
  );
}
