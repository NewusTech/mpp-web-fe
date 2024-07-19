"use client";

import fetchInputForm from "@/components/fetching/updatePermohonan/updatePermohonan";
import LayoutInput from "@/components/layoutForms/layoutForm";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DataInputItem,
  DataRiwayatPermohonan,
  LayananFormPermohonanType,
  LayananFormType,
  LayananType,
} from "@/types/type";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/legacy/image";
import { truncateTitle } from "@/utils/formatTitle";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function PermohonanUpdateHistory({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [formData, setFormData] = useState<DataRiwayatPermohonan>();
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const [docValues, setDocValues] = useState<Record<string, File | null>>({});
  const [fileName, setFileName] = useState<Record<string, string>>({});
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataPermohonanHistory = async (id: number) => {
    try {
      const data = await fetchInputForm(id);
      setFormData(data.data);

      const initialFormValues: { [key: string]: any } = {};
      const initialCheckboxValues: { [key: number]: number[] } = {};
      const initialFileNames: { [key: string]: string } = {};

      data?.data?.Layananforminputs?.forEach(
        (input: LayananFormPermohonanType) => {
          if (input.layananform_tipedata === "checkbox") {
            initialCheckboxValues[input.id] = [];
          } else {
            initialFormValues[input.id] = input.data || "";
          }

          if (input.layananform_tipedata === "file" && input.data) {
            initialFileNames[input.id.toString()] = input.data;
          }
        }
      );

      setFormValues(initialFormValues);
      setCheckboxValues(initialCheckboxValues);
      setFileName(initialFileNames);
    } catch (error) {
      console.log(error);
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchDataPermohonanHistory(params.id);
  }, [params.id]);

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

  const handleViewFile = (file: File | null) => {
    if (file) {
      setPreviewFile(file);
      setIsModalOpen(true);
    }
  };

  let fileURL = "";

  if (previewFile) {
    fileURL = URL.createObjectURL(previewFile);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSubmit = {
      datainput: formData?.Layananforminputs.filter(
        (input) => input.layananform_tipedata !== "file"
      ).map((input) => ({
        id: input.id,
        layananform_id: input.layananform_id,
        data:
          input.layananform_tipedata === "checkbox"
            ? checkboxValues[input.id]
            : formValues[input.id] || "",
      })),
      datafile: formData?.Layananforminputs.filter(
        (input) => input.layananform_tipedata === "file"
      ).map((input) => ({
        id: input.id,
        layananform_id: input.layananform_id,
        data: docValues[input.id.toString()] || "",
      })),
    };

    const data = new FormData();

    dataToSubmit?.datainput?.forEach((input, index) => {
      data.append(`datainput[${index}][id]`, String(input.id));
      data.append(
        `datainput[${index}][layananform_id]`,
        String(input.layananform_id)
      );
      if (Array.isArray(input.data)) {
        input.data.forEach((val, idx) => {
          data.append(`datainput[${index}][data][${idx}]`, String(val));
        });
      } else {
        data.append(`datainput[${index}][data]`, String(input.data));
      }
    });

    dataToSubmit?.datafile?.forEach((fileInput, index) => {
      data.append(`datafile[${index}][id]`, String(fileInput.id));
      data.append(
        `datafile[${index}][layananform_id]`,
        String(fileInput.layananform_id)
      );
      if (fileInput.data instanceof File) {
        data.append(`datafile[${index}][data]`, fileInput.data);
      }
    });

    data.append("status", "6");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputform/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: data,
          cache: "no-store",
        }
      );

      const dataInput = await response.json();

      if (response.ok) {
        toast(dataInput.message);
        localStorage.clear();
      } else {
        toast.error(dataInput.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
      router.push("/riwayat");
    }
  };

  return (
    <div className="flex flex-col mx-8 px-4 md:mx-20 md:px-32 mt-6 bg-neutral-50 shadow-md rounded-xl border border-neutral-700 gap-y-6 py-6 mb-32">
      <div className="flex flex-row w-full items-center gap-x-4">
        <ChevronLeft
          onClick={() => router.back()}
          className="w-8 h-8 text-secondary-900"
        />

        <h3 className="text-neutral-900 font-semibold text-[20px]">
          Permohonan Layanan
        </h3>
      </div>

      <div className="flex flex-col w-full gap-y-6">
        <h3 className="text-neutral-900 font-semibold text-[18px]">Formulir</h3>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full md:w-full mb-[8px] gap-y-5">
            {formData?.Layananforminputs?.map(
              (permohonan: LayananFormPermohonanType, i: number) => {
                if (permohonan.layananform_tipedata === "checkbox") {
                  return (
                    <div key={i} className="space-y-2 w-full">
                      <label className="text-neutral-900 text-[16px] font-normal">
                        {permohonan?.layananform_name}
                      </label>
                      <div className="md:grid md:grid-cols-2">
                        {permohonan?.layananform_datajson?.map((data) => (
                          <div key={data.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name={permohonan?.layananform_name}
                              value={data.id}
                              className="h-8"
                              checked={
                                checkboxValues[permohonan.id]?.includes(
                                  data.id
                                ) || false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(e, permohonan.id)
                              }
                            />
                            <Label
                              className="text-neutral-900 text-[12px] md:text-[14px] font-normal ml-2"
                              htmlFor={data.key}>
                              {data.key}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else if (permohonan.layananform_tipedata === "file") {
                  return (
                    <div key={i} className="flex flex-col gap-y-4">
                      <h3 className="text-neutral-900 font-semibold text-[16px]">
                        Dokumen
                      </h3>

                      <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-neutral-50 border border-primary-700 px-4">
                        <div className="flex flex-col w-full justify-center gap-[9px]">
                          <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                            {permohonan.layananform_name}
                          </h6>
                        </div>
                        <div className="flex self-center items-center w-full md:justify-end">
                          <input
                            id={`fileInput-${permohonan.id}`}
                            type="file"
                            className="md:appearance-none hidden"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleDocChange(
                                permohonan.id.toString(),
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                          <label
                            htmlFor={`fileInput-${permohonan.id}`}
                            className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] md:text-[14px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px] cursor-pointer">
                            {(fileName[permohonan.id.toString()] &&
                              truncateTitle(
                                String(fileName[permohonan.id.toString()]),
                                10
                              )) ||
                              "Upload"}
                          </label>

                          <Dialog>
                            <DialogTrigger>
                              <div
                                onClick={() =>
                                  handleViewFile(
                                    docValues[permohonan.id.toString()] || null
                                  )
                                }
                                className="flex items-center justify-center w-full text-primary-700 hover:border-b hover:border-neutral-300 ml-4 mr-2">
                                Lihat File
                              </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col justify-between w-full bg-neutral-50">
                              <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                                <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                                  {previewFile?.type.startsWith("image/") ? (
                                    <div className="w-full h-full p-4 rounded-xl">
                                      <Image
                                        src={
                                          fileURL ? fileURL : permohonan.data
                                        }
                                        alt="File preview"
                                        className="w-full h-full object-cover rounded-xl"
                                        width={500}
                                        height={500}
                                      />
                                    </div>
                                  ) : (
                                    <iframe
                                      src={fileURL}
                                      className="w-full h-64"
                                    />
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="space-y-2 w-full">
                      <LayoutInput
                        title={permohonan.layananform_name}
                        type={permohonan.layananform_tipedata}
                        onChange={change}
                        required={false}
                        name={permohonan.id.toString()}
                        value={formValues[permohonan.id] || ""}
                        placeholder="Kirim Jawaban!"
                        opacity={false}
                        options={permohonan.layananform_datajson}
                      />
                    </div>
                  );
                }
              }
            )}
          </div>

          <div className="h-[40px] w-[150px] md:w-full flex self-center justify-center items-end mb-[22px] mt-[16px] md:mt-[24px]">
            <Button
              type="submit"
              variant="success"
              disabled={isLoading ? true : false}>
              {isLoading ? <Loader className="animate-spin" /> : "Ajukan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
