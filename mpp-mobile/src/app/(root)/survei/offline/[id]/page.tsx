"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setDataSurvei } from "@/store/action/actionSurvei";
import { Label } from "@radix-ui/react-label";
import { redirect, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { schemaSkm } from "@/lib/zodSchema";
import z from "zod";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";
import DataNotFound from "@/components/loading/dataNotFound";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";

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

type InputFormType = {
  name: string;
  alamat: string;
  pekerjaan: string;
  telepon: string;
  email: string;
};

export default function SurveyOfflineSKMPage({
  params,
}: {
  params: { id: number };
}) {
  const survei = useSelector((state: RootState) => state.survey);
  const dispatch = useDispatch();
  const router = useRouter();
  const [surveis, setSurveis] = useState<SurveiType>();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  const [form, setForm] = useState<InputFormType>();
  const [kritissaran, setKritissaran] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const token = Cookies.get("Authorization");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const validateForm = async () => {
    try {
      await schemaSkm.parseAsync({
        kritiksaran: kritissaran,
        name: form?.name,
        email: form?.email,
        telepon: form?.telepon,
        alamat: form?.alamat,
        pekerjaan: form?.pekerjaan,
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
  }, [kritissaran, hasSubmitted]);

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
    fetchSurvei(params.id);
  }, [params.id]);

  const handleRadioChange = (id: number, value: string) => {
    setInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevFormData) => ({
      ...prevFormData!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    const datainput = Object.keys(input).map((key) => ({
      surveyform_id: Number(key),
      nilai: input[key],
    }));

    dispatch(setDataSurvei(datainput));

    const formData = {
      datainput,
      kritiksaran: kritissaran,
      name: form?.name,
      email: form?.email,
      telepon: Number(form?.telepon),
      alamat: form?.alamat,
      pekerjaan: form?.pekerjaan,
    };

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputsurvey/create/off/${params.id}`,
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

        const result = await response.json();

        Swal.fire({
          icon: "success",
          title: "Terimakasih telah mengisi survei!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengisi survei!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
        router.push(`/`);
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  return (
    <section className="flex items-center justify-center md:w-full bg-primary-100 mt-6 md:mt-0 md:pt-6 mb-6 pb-32 md:mb-0 md:pb-[150px]">
      <div className="flex flex-col md:w-full items-center md:mx-[230px]">
        <div className="flex flex-col w-10/12 md:w-full bg-neutral-50 rounded-xl shadow-lg px-4">
          <div className="flex justify-center my-[22px] mb-4">
            <h6 className="text-[16px] md:text-[20px] text-primary-800 font-semibold">
              Survey Kepuasan Masyarakat
            </h6>
          </div>

          <div className="flex flex-col md:w-full my-4 rounded-xl">
            {surveis &&
            surveis.Surveyforms &&
            surveis?.Surveyforms?.length > 0 ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:w-full place-items-center">
                <div className="w-full flex flex-col">
                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mt-2 md:mt-0 mb-4">
                      <ProfileEditInput
                        names="name"
                        types="text"
                        value={form?.name || ""}
                        change={handleChange}
                        labelName="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        classStyle="w-full pl-4 mt-1 rounded-lg h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-normal"
                      />

                      {hasSubmitted && errors?.name?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.name._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mt-2 md:mt-0 mb-4">
                      <ProfileEditInput
                        names="telepon"
                        types="number"
                        value={form?.telepon || ""}
                        change={handleChange}
                        labelName="Nomor Telepon"
                        placeholder="Nomor Telepon"
                        classStyle="w-full rounded-lg pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-normal"
                      />

                      {hasSubmitted && errors?.telepon?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.telepon._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mt-2 md:mt-0 mb-4">
                      <ProfileEditInput
                        names="email"
                        types="text"
                        value={form?.email || ""}
                        change={handleChange}
                        labelName="Email"
                        placeholder="Email"
                        classStyle="w-full rounded-lg pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-normal"
                      />

                      {hasSubmitted && errors?.email?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.email._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mt-2 md:mt-0 mb-4">
                      <ProfileEditInput
                        names="pekerjaan"
                        types="text"
                        value={form?.pekerjaan || ""}
                        change={handleChange}
                        labelName="Pekerjaan"
                        placeholder="Pekerjaan"
                        classStyle="w-full rounded-lg pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-normal"
                      />

                      {hasSubmitted && errors?.pekerjaan?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.pekerjaan._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full mb-3">
                    <Label className="text-[12px] font-normal text-primary-800">
                      Alamat
                    </Label>

                    <Textarea
                      name="alamat"
                      value={form?.alamat || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setForm((prevFormData) => ({
                          ...prevFormData!,
                          alamat: e.target.value,
                        }))
                      }
                      placeholder="Masukkan Alamat"
                      className="w-full mt-1 text-[12px] md:text-[14px] h-[150px] border border-neutral-700 placeholder:opacity-35"
                    />

                    {hasSubmitted && errors?.alamat?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.alamat._errors[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:w-full rounded-xl mb-3 gap-6">
                  {surveis?.Surveyforms?.map((el: any, i: number) => {
                    return (
                      <div key={i}>
                        <div className="flex flex-col justify-center md:mt-4">
                          <Label className="flex text-center md:self-center font-normal text-primary-800 text-[12px] md:text-[14px] mb-4 md:mb-8">
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

                <div className="w-full mt-5">
                  <Label className="text-[12px] font-normal text-primary-800">
                    Kritik dan Saran
                  </Label>

                  <Textarea
                    name="kritiksaran"
                    value={kritissaran}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setKritissaran(e.target.value)
                    }
                    placeholder="Masukkan Kritik dan Saran"
                    className="mt-5 w-full text-[12px] md:text-[14px] h-[150px] border border-neutral-700 placeholder:opacity-35"
                  />

                  {hasSubmitted && errors?.kritiksaran?._errors && (
                    <div className="text-error-700 text-[12px] md:text-[14px]">
                      {errors.kritiksaran._errors[0]}
                    </div>
                  )}
                </div>

                <div className="flex w-4/12 md:w-3/12 self-center justify-center items-end mb-[22px] mt-8">
                  <Button
                    className="w-full h-[30px] text-[12px] text-neutral-50 font-light"
                    type="submit"
                    variant="link"
                    disabled={isLoading || !formValid}>
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Selesai"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
