"use client";

import ByLayanan from "@/components/fetching/layanan/formInputByLayanan/ByLayanan";
import LayoutInput from "@/components/layoutForms/layoutForm";
import Steps from "@/components/steps/steps";
import { Button } from "@/components/ui/button";
import {
  setDataInput,
  updateCheckboxData,
} from "@/store/action/actionPermohonanLayanan";
import React, { useEffect, useState } from "react";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import { useDispatch } from "react-redux";
import Image from "next/legacy/image";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { FormType, LayananFormType, LayananType } from "@/types/type";
import { z, ZodObject, ZodSchema } from "zod";
import Cookies from "js-cookie";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 3;

const buildSchema = (layananForms: LayananFormType[]): ZodObject<any> => {
  const schemaShape: Record<string, ZodSchema> = {};

  layananForms.forEach((formField) => {
    let fieldSchema: ZodSchema;

    switch (formField.tipedata) {
      case "checkbox":
        fieldSchema = z
          .array(z.number({ message: "Data wajib diisi!" }))
          .optional();
        break;
      case "radio":
        fieldSchema = z.number({ message: "Data wajib diisi!" }).optional();
        break;
      case "number":
        fieldSchema = z.string({ message: "Data wajib diisi!" }).optional();
        break;
      default:
        fieldSchema = z.string({ message: "Data wajib diisi!" }).optional();
        break;
    }

    if (
      formField.isrequired &&
      formField.tipedata !== "checkbox" &&
      formField.tipedata !== "radio"
    ) {
      fieldSchema = fieldSchema.refine(
        (val) => val !== undefined && val !== null && val !== "",
        {
          message: `${formField.field} is required`,
        }
      );
    }

    schemaShape[formField.field] = fieldSchema;
  });

  return z.object(schemaShape);
};

export default function FormulirPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [form, setForm] = useState<LayananType>();
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [instansiId, setInstansiId] = useState<number | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateForm = (values: { [key: string]: any }) => {
    if (!form) return;

    const schema = buildSchema(form.Layananforms);

    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        e.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const fetchInputForm = async (id: number) => {
    const result: FormType = await ByLayanan(id);

    setForm(result.data);
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }

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

  useEffect(() => {
    if (form) {
      checkRequiredFields();
    }
  }, [form, formValues, checkboxValues]);

  const checkRequiredFields = () => {
    if (!form) return;

    let allRequiredFilled = true;

    form.Layananforms.forEach((formField) => {
      if (formField.isrequired) {
        if (formField.tipedata === "checkbox") {
          if (
            !checkboxValues[formField.id] ||
            checkboxValues[formField.id].length === 0
          ) {
            allRequiredFilled = false;
          }
        } else if (formField.tipedata === "radio") {
          if (!formValues[formField.field]) {
            allRequiredFilled = false;
          }
        }
      }
    });

    setIsButtonDisabled(!allRequiredFilled);
  };

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
    setChangeOpacity(true);
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
    const requiredFields = form?.Layananforms.reduce((acc, field) => {
      if (field.isrequired && field.tipedata !== "radio") {
        acc[field.field] = formValues[field.field];
      }
      return acc;
    }, {} as { [key: string]: any });

    if (requiredFields && !validateForm(requiredFields)) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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

    setIsLoading(true);
    dispatch(setDataInput(wadah));
    checkboxWadah.forEach((item) => {
      dispatch(updateCheckboxData(item));
    });
    setTimeout(() => {
      setIsLoading(false);
      router.push("/instansi/upload-file");
    }, 2000);
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

          <div className="flex flex-col w-full bg-neutral-50 rounded-xl shadow-md mt-[20px]">
            <div className="flex flex-col md:w-full mt-[22px] px-[21px] md:px-[75px] md:py-[32px]">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Formulir
              </h5>

              {form?.Layananforms ? (
                <div className="flex flex-col w-full mt-[32px]">
                  <div className="flex flex-col w-full mb-[8px] gap-y-5">
                    {form?.Layananforms?.map(
                      (el: LayananFormType, i: number) => {
                        if (el.tipedata === "checkbox") {
                          return (
                            <div key={i} className="space-y-2 w-full">
                              <label className="text-neutral-900 text-[16px] font-normal">
                                {el.field}{" "}
                                {el.isrequired && (
                                  <span className="text-error-500">*</span>
                                )}
                              </label>
                              <div className="md:grid md:grid-cols-2">
                                {el.datajson.map((data) => (
                                  <div
                                    key={data.id}
                                    className="flex items-center">
                                    <input
                                      type="checkbox"
                                      name={el.field}
                                      value={data.id}
                                      className="h-8"
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

                              {el.isrequired && (
                                <div className="text-error-500">
                                  Data Wajib Diisi!
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <LayoutInput
                              key={i}
                              title={el.field}
                              value={formValues[el.field]}
                              placeholder="Kirim Jawaban"
                              type={el.tipedata}
                              required={el.isrequired}
                              name={el.field}
                              onChange={change}
                              error={errors[el.field]}
                              options={el.datajson}
                              opacity={changeOpacity}
                            />
                          );
                        }
                      }
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full justify-center items-center py-[32px]">
                  <Image
                    src={backHome}
                    alt="Back Home"
                    width={300}
                    height={300}
                    priority
                  />
                  <h5 className="text-[16px] md:text-[20px] font-semibold text-primary-800 mt-4">
                    Tidak ada form tersedia
                  </h5>
                </div>
              )}
              <div className="flex self-center md:justify-center mt-6 h-[40px] w-[120px] md:w-full mb-[19px]">
                <Button
                  variant="success"
                  onClick={handleClick}
                  // disabled={isLoading ? true : false}>
                  disabled={isButtonDisabled || isLoading}>
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Lanjutkan"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
