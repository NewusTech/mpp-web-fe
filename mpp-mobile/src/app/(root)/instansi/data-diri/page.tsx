"use client";

import fetchProfile from "@/components/fetching/profile/profile";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Steps from "@/components/steps/steps";
import {
  DesaType,
  KecamatanType,
  ProfileNewType,
  UpdateUserType,
} from "@/types/type";
import { ChevronLeft, Loader } from "lucide-react";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";
import { Label } from "@radix-ui/react-label";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { schemaDataDiri, schemaUpdateDiri } from "@/lib/zodSchema";
import {
  agamas,
  genders,
  golonganDarahs,
  pendidikans,
  statusKawins,
} from "@/data/data";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 2;

export default function DataDiriPage() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<ProfileNewType>();
  const [formData, setFormData] = useState<UpdateUserType | null>(null);
  const [kecamatans, setKecamatans] = useState<KecamatanType[]>();
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [debounceSearchKecamatan, setDebounceSearchKecamatan] =
    useState(searchKecamatan);
  const [desas, setDesas] = useState<DesaType[]>();
  const [searchDesa, setSearchDesa] = useState<string>("");
  const [debounceSearchDesa, setDebounceSearchDesa] = useState(searchDesa);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = async () => {
    try {
      await schemaUpdateDiri.parseAsync({
        ...formData,
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
  }, [formData, hasSubmitted]);

  const fetchUser = async () => {
    try {
      const user = await fetchProfile();

      setUser(user.data);
      setFormData(user.data);
    } catch (error) {
      console.log(error, "error");

      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [formData, user]);

  useEffect(() => {
    const fetchKecamatan = async (search: string, limit: number) => {
      try {
        const kecamatanDatas = await kecamatanFetch(search, limit);

        setKecamatans(kecamatanDatas.data);
      } catch (error) {
        console.log(error, "error");
        toast("Gagal mendapatkan data kecamatan!");
      }
    };
    fetchKecamatan(debounceSearchKecamatan, 1000000);
  }, [debounceSearchKecamatan, formData]);

  useEffect(() => {
    const fetchDesa = async (
      search: string,
      limit: number,
      kecamatan_id: number
    ) => {
      try {
        const desaDatas = await desaFetch(search, limit, kecamatan_id);
        setDesas(desaDatas.data);

        if (formData && formData.desa_id) {
          const selectedDesa = desaDatas.data.find(
            (desa: DesaType) => desa.id === Number(formData.desa_id)
          );
          if (selectedDesa) {
            setFormData((prevFormData) => ({
              ...prevFormData!,
              desa_id: selectedDesa.id,
            }));
          }
        }
      } catch (error) {
        console.log(error, "error");
        toast("Gagal mendapatkan data desa!");
      }
    };
    if (formData?.kecamatan_id && formData?.kecamatan_id) {
      fetchDesa(debounceSearchDesa, 1000000, Number(formData.kecamatan_id));
    }
  }, [debounceSearchDesa, formData, formData?.kecamatan_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${user?.slug}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            cache: "no-store",
          }
        );

        if (response.ok) {
          toast.success("Berhasil mengupdate profile!");
          await fetchUser();
        }
      } catch (error) {
        console.log(error, "error");
        toast("Failed to update profile!");
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
        router.push(`/instansi/formulir`);
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  return (
    <div className="bg-primary-100 md:mt-6 md:mb-0 pb-32 md:pb-12">
      <div className="flex items-center justify-center bg-primary-100 mx-7 md:mx-[150px] mt-6 mb-7 md:mb-0 md:pb-7">
        <div className="flex flex-col w-full items-center gap-4 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start w-full gap-6 md:mb-6">
            <div className="flex flex-row justify-between md:justify-center items-center">
              <button onClick={() => router.back()}>
                <ChevronLeft className="w-[40px] h-[40px] text-neutral-800 mr-4" />
              </button>

              <h4 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
                Permohonan Layanan
              </h4>
            </div>

            <div className="flex flex-row">
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

          <div className="flex flex-col w-full border border-neutral-700 bg-neutral-50 pb-6 md:pb-0 rounded-2xl shadow-md">
            <div className="flex flex-col mt-5 px-5 md:px-20">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Data Diri
              </h5>

              <div className="flex flex-col w-full px-4 md:px-16 pt-4 md:pt-8 md:mt-4 md:mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full md:mb-4">
                      <ProfileEditInput
                        names="name"
                        types="text"
                        value={formData?.name || ""}
                        change={handleChange}
                        labelName="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.name?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.name._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full md:mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Jenis Kelamin
                      </Label>

                      <Select
                        name="gender"
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                        value={formData?.gender || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {genders &&
                            genders.map(
                              (
                                gender: { id: number; value: string },
                                i: number
                              ) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  key={i}
                                  value={String(gender.id)}>
                                  {gender.value}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.gender?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.gender._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="nik"
                        types="number"
                        value={formData?.nik || ""}
                        change={handleChange}
                        labelName="NIK"
                        placeholder="NIK"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.nik?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.nik._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Agama
                      </Label>

                      <Select
                        name="agama"
                        onValueChange={(value) =>
                          handleSelectChange("agama", value)
                        }
                        value={formData?.agama || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {agamas &&
                            agamas.map(
                              (
                                agama: { id: number; value: string },
                                i: number
                              ) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={String(agama.id)}
                                  key={i}>
                                  {agama.value}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.agama?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.agama._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="tempat_lahir"
                        types="text"
                        value={formData?.tempat_lahir || ""}
                        change={handleChange}
                        labelName="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.tempat_lahir?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.tempat_lahir._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Golongan Darah
                      </Label>

                      <Select
                        name="goldar"
                        onValueChange={(value) =>
                          handleSelectChange("goldar", value)
                        }
                        value={formData?.goldar || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {golonganDarahs &&
                            golonganDarahs.map(
                              (
                                darah: { id: number; value: string },
                                i: number
                              ) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={String(darah.id)}
                                  key={i}>
                                  {darah.value}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.goldar?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.goldar._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <label className="text-[12px] text-neutral-900 font-semibold">
                        Tanggal Lahir
                      </label>

                      <input
                        type="date"
                        name="tgl_lahir"
                        value={formData?.tgl_lahir || ""}
                        onChange={handleChange}
                        className={`w-full px-4 mt-1 h-[40px] rounded-full border bg-transparent border-neutral-700 placeholder:text-[12px] focus:outline-none appearance-none text-neutral-900`}
                        placeholder="Tanggal Lahir"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                      />

                      {hasSubmitted && errors?.tgl_lahir?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.tgl_lahir._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Status Perkawinan
                      </Label>

                      <Select
                        name="status_kawin"
                        onValueChange={(value) =>
                          handleSelectChange("status_kawin", value)
                        }
                        value={formData?.status_kawin || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {statusKawins &&
                            statusKawins.map(
                              (
                                kawin: { id: number; value: string },
                                i: number
                              ) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={String(kawin.id)}
                                  key={i}>
                                  {kawin.value}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.status_kawin?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.status_kawin._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="telepon"
                        types="number"
                        value={formData?.telepon || ""}
                        change={handleChange}
                        labelName="Nomor Telepon"
                        placeholder="Nomor Telepon"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.telepon?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.telepon._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Pendidikan
                      </Label>

                      <Select
                        name="pendidikan"
                        onValueChange={(value) =>
                          handleSelectChange("pendidikan", value)
                        }
                        value={formData?.pendidikan || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {pendidikans &&
                            pendidikans.map(
                              (
                                pendidikan: { id: number; value: string },
                                i: number
                              ) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={String(pendidikan.id)}
                                  key={i}>
                                  {pendidikan.value}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.pendidikan?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.pendidikan._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="email"
                        types="text"
                        value={formData?.email || ""}
                        change={handleChange}
                        labelName="Email"
                        placeholder="Email"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.email?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.email._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="pekerjaan"
                        types="text"
                        value={formData?.pekerjaan || ""}
                        change={handleChange}
                        labelName="Pekerjaan"
                        placeholder="Pekerjaan"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.pekerjaan?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.pekerjaan._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Kecamatan
                      </Label>

                      <Select
                        name="kecamatan_id"
                        onValueChange={(value) =>
                          handleSelectChange("kecamatan_id", value)
                        }
                        defaultValue={formData?.kecamatan_id}
                        value={formData?.kecamatan_id || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <div>
                            <div className="w-full px-2 mt-2">
                              <SearchComponent
                                change={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearchKecamatan(e.target.value)}
                                search={searchKecamatan}
                              />
                            </div>

                            {kecamatans &&
                              kecamatans.map(
                                (kecamatan: KecamatanType, i: number) => (
                                  <SelectItem
                                    className="pr-none mt-2"
                                    key={i}
                                    value={String(kecamatan.id)}>
                                    {kecamatan.name}
                                  </SelectItem>
                                )
                              )}
                          </div>
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.kecamatan_id?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.kecamatan_id._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4w-full">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Desa
                      </Label>

                      <Select
                        name="desa_id"
                        onValueChange={(value) =>
                          handleSelectChange("desa_id", value)
                        }
                        defaultValue={formData?.desa_id}
                        value={formData?.desa_id || ""}>
                        <SelectTrigger
                          className={` border border-neutral-700 mt-1 rounded-[50px] bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <div>
                            <div className="w-full px-2 mt-2">
                              <SearchComponent
                                change={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearchDesa(e.target.value)}
                                search={searchDesa}
                              />
                            </div>

                            {desas &&
                              desas.map((desa: DesaType, i: number) => (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={String(desa.id)}
                                  key={i}>
                                  {desa.name}
                                </SelectItem>
                              ))}
                          </div>
                        </SelectContent>
                      </Select>

                      {hasSubmitted && errors?.desa_id?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.desa_id._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="rt"
                        types="number"
                        value={formData?.rt || ""}
                        change={handleChange}
                        labelName="RT"
                        placeholder="RT"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.rt?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.rt._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <ProfileEditInput
                        names="rw"
                        types="number"
                        value={formData?.rw || ""}
                        change={handleChange}
                        labelName="RW"
                        placeholder="RW"
                        classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {hasSubmitted && errors?.rw?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.rw._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <Label className="text-[12px] text-neutral-900 font-semibold mb-2">
                      ALamat
                    </Label>

                    <Textarea
                      name="alamat"
                      value={formData?.alamat || ""}
                      onChange={handleChange}
                      placeholder="Alamat"
                      className="w-full rounded-3xl border border-neutral-700 md:w-full h-[74px] md:h-[150px] text-[12px] placeholder:opacity-[70%]"
                    />

                    {hasSubmitted && errors?.alamat?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.alamat._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center items-end self-end md:w-full md:self-center my-[16px] md:pb-[30px]">
                    <Button
                      className="w-[90px] md:w-[290px] h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                      type="submit"
                      variant="success"
                      disabled={!formValid || isLoading}>
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Simpan"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
