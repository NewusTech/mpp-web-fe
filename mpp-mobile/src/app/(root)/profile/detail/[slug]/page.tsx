"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import {
  DesaType,
  KecamatanType,
  ProfileNewType,
  UpdateUserType,
} from "@/types/type";
import fetchProfile from "@/components/fetching/profile/profile";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  agamas,
  genders,
  golonganDarahs,
  pendidikans,
  statusKawins,
} from "@/data/data";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { z } from "zod";
import { schemaUpdateDiri } from "@/lib/zodSchema";
import { Loader, Trash } from "lucide-react";

export default function ProfileEditPage({
  params,
}: {
  params: { slug: string };
}) {
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
  const [fileKtpImage, setFileKtpImage] = useState<File | null>(null);
  const [fileKkImage, setFileKkImage] = useState<File | null>(null);
  const [fileIjazahImage, setFileIjazahImage] = useState<File | null>(null);
  const [fotos, setFotos] = useState<File | null>(null);
  const [aktalahirImage, setAktalahirImage] = useState<File | null>(null);
  const [previewKTPImage, setPreviewKTPImage] = useState<string>("");
  const [previewKKImage, setPreviewKKImage] = useState<string>("");
  const [previewIjazahImage, setPreviewIjazahImage] = useState<string>("");
  const [previewFotos, setPreviewFotos] = useState<string>("");
  const [previewAktalahir, setPreviewAktalahir] = useState<string>("");
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
  }, []);

  const fetchKecamatan = async (search: string, limit: number) => {
    try {
      const kecamatanDatas = await kecamatanFetch(search, limit);

      setKecamatans(kecamatanDatas.data);
    } catch (error) {
      console.log(error, "error");
      toast("Gagal mendapatkan data kecamatan!");
    }
  };

  useEffect(() => {
    fetchKecamatan(debounceSearchKecamatan, 1000000);
  }, [debounceSearchKecamatan]);

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

  useEffect(() => {
    if (formData?.kecamatan_id && formData?.kecamatan_id) {
      fetchDesa(debounceSearchDesa, 1000000, Number(formData.kecamatan_id));
    }
  }, [debounceSearchDesa, formData?.kecamatan_id]);

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

  const handleFileKTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileKtpImage(file);
      setFormData({
        ...formData,
        filektp: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKTPImage(fileUrl);
    }
  };

  const handleFileKKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileKkImage(file);
      setFormData({
        ...formData,
        filekk: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKKImage(fileUrl);
    }
  };

  const handleFileIjazahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileIjazahImage(file);
      setFormData({
        ...formData,
        fileijazahlain: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewIjazahImage(fileUrl);
    }
  };

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotos(file);
      setFormData({
        ...formData,
        foto: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewFotos(fileUrl);
    }
  };

  const handleAktaLahirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAktalahirImage(file);
      setFormData({
        ...formData,
        aktalahir: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewAktalahir(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileData = new FormData();

    if (fileKtpImage) {
      fileData.append("filektp", fileKtpImage);
    }
    if (fileKkImage) {
      fileData.append("filekk", fileKkImage);
    }
    if (fileIjazahImage) {
      fileData.append("fileijazahlain", fileIjazahImage);
    }
    if (fotos) {
      fileData.append("foto", fotos);
    }
    if (aktalahirImage) {
      fileData.append("aktalahir", aktalahirImage);
    }

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const [response1, response2] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${params.slug}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${Cookies.get("Authorization")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
              cache: "no-store",
            }
          ),

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/updatedocs/${params.slug}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${Cookies.get("Authorization")}`,
              },
              body: fileData,
              cache: "no-store",
            }
          ),
        ]);

        if (response1.ok && response2.ok) {
          toast.success("Berhasil mengupdate profile!");
          await fetchUser();
        }
      } catch (error) {
        console.log(error, "error");
        toast("Failed to update profile!");
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
        router.push("/profile");
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropKTP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileKtpImage(file);
      setFormData({
        ...formData,
        filektp: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKTPImage(fileUrl);
    }
  };

  const handleDropKK = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileKkImage(file);
      setFormData({
        ...formData,
        filekk: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKKImage(fileUrl);
    }
  };

  const handleDropIjazah = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileIjazahImage(file);
      setFormData({
        ...formData,
        fileijazahlain: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewIjazahImage(fileUrl);
    }
  };

  const handleDropFoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFotos(file);
      setFormData({
        ...formData,
        foto: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewFotos(fileUrl);
    }
  };

  const handleDropAktaLahir = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setAktalahirImage(file);
      setFormData({
        ...formData,
        aktalahir: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewAktalahir(fileUrl);
    }
  };

  const handleRemoveKTP = () => {
    setFileKtpImage(null);
    setPreviewKTPImage("");
    setFormData({ ...formData, filektp: "" });
  };

  const handleRemoveKK = () => {
    setFileKkImage(null);
    setPreviewKKImage("");
    setFormData({ ...formData, filekk: "" });
  };

  const handleRemoveIjazah = () => {
    setFileIjazahImage(null);
    setPreviewIjazahImage("");
    setFormData({ ...formData, fileijazahlain: "" });
  };

  const handleRemoveFoto = () => {
    setFotos(null);
    setPreviewFotos("");
    setFormData({ ...formData, foto: "" });
  };

  const handleRemoveAktaLahir = () => {
    setAktalahirImage(null);
    setPreviewAktalahir("");
    setFormData({ ...formData, aktalahir: "" });
  };

  return (
    <section className="flex items-center justify-center pb-32 bg-primary-100 mt-6 md:mt-0 md:pt-6 md:mb-0 md:pb-[120px]">
      <div className="flex flex-col items-center w-full mx-[35px] md:mx-[200px]">
        <div className="flex self-start mb-8">
          <h5 className="text-[20px] md:text-[26px] font-bold text-primary-800">
            Edit Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-neutral-50 rounded-2xl shadow-md px-[15px] md:px-[75px] pt-4 md:pt-[8]">
          <h3 className="text-primary-800 font-semibold text-[20px]">
            Data Diri
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full mt-2 md:mt-4">
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
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  value={formData?.gender || ""}>
                  <SelectTrigger
                    className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {genders &&
                      genders.map(
                        (gender: { id: number; value: string }, i: number) => (
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
                  onValueChange={(value) => handleSelectChange("agama", value)}
                  value={formData?.agama || ""}>
                  <SelectTrigger
                    className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {agamas &&
                      agamas.map(
                        (agama: { id: number; value: string }, i: number) => (
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
                  onValueChange={(value) => handleSelectChange("goldar", value)}
                  value={formData?.goldar || ""}>
                  <SelectTrigger
                    className={` border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {golonganDarahs &&
                      golonganDarahs.map(
                        (darah: { id: number; value: string }, i: number) => (
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
                        (kawin: { id: number; value: string }, i: number) => (
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
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <div>
                      <div className="w-full px-2 mt-2">
                        <SearchComponent
                          change={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchKecamatan(e.target.value)
                          }
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
                    <SelectValue placeholder="Pilih Desa" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <div>
                      <div className="w-full px-2 mt-2">
                        <SearchComponent
                          change={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchDesa(e.target.value)
                          }
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

            <div className="flex flex-col w-full">
              <h3 className="text-primary-800 font-semibold text-[20px] mt-6 mb-3">
                Dokumen Pendukung
              </h3>

              <div className="flex flex-col w-full">
                <Label className="text-[12px] text-neutral-900 font-semibold mb-2">
                  Kartu Tanda Penduduk (KTP)
                </Label>

                <div className="flex flex-col md:flex-row w-full">
                  <div
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropKTP}
                    className={`w-full ${
                      formData?.filektp || previewKTPImage
                        ? "md:w-8/12"
                        : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                    <>
                      <input
                        type="file"
                        id="file-input-ktp"
                        name="filektp"
                        accept="image/*"
                        onChange={handleFileKTPChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input-ktp"
                        className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                        Drag and drop file here or click to select file
                      </label>
                    </>
                  </div>

                  {(previewKTPImage || formData?.filektp) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewKTPImage || formData?.filektp}
                          alt="Preview"
                          className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveKTP}
                          className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full h-full mt-6">
                <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                  Kartu Keluarga (KK)
                </Label>
                <div className="flex flex-col md:flex-row w-full">
                  <div
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropKK}
                    className={`w-full ${
                      formData?.filekk || previewKKImage
                        ? "md:w-8/12"
                        : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center `}>
                    <>
                      <input
                        type="file"
                        id="file-input-kk"
                        name="filekk"
                        accept="image/*"
                        onChange={handleFileKKChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input-kk"
                        className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                        Drag and drop file here or click to select file
                      </label>
                    </>
                  </div>

                  {(previewKKImage || formData?.filekk) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewKKImage || formData?.filekk}
                          alt="Preview"
                          className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveKK}
                          className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full h-full mt-6">
                <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                  Ijazah Terakhir
                </Label>

                <div className="flex flex-col md:flex-row w-full">
                  <div
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropIjazah}
                    className={`w-full ${
                      formData?.fileijazahlain || previewIjazahImage
                        ? "md:w-8/12"
                        : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center`}>
                    <>
                      <input
                        type="file"
                        id="file-input-ijazah"
                        name="fileijazahlain"
                        accept="image/*"
                        onChange={handleFileIjazahChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input-ijazah"
                        className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                        Drag and drop file here or click to select file
                      </label>
                    </>
                  </div>

                  {(previewIjazahImage || formData?.fileijazahlain) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewIjazahImage || formData?.fileijazahlain}
                          alt="Preview"
                          className="max-h-full rounded-xl p-4 md:p-4 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveIjazah}
                          className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full h-full mt-6">
                <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                  Pas Foto
                </Label>

                <div className="flex flex-col md:flex-row w-full">
                  <div
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropFoto}
                    className={`w-full ${
                      formData?.foto || previewFotos ? "md:w-8/12" : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center`}>
                    <>
                      <input
                        type="file"
                        id="file-input-foto"
                        name="foto"
                        accept="image/*"
                        onChange={handleFotosChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input-foto"
                        className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                        Drag and drop file here or click to select file
                      </label>
                    </>
                  </div>

                  {(previewFotos || formData?.foto) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewFotos || formData?.foto}
                          alt="Preview"
                          className="max-h-full rounded-xl p-4 md:p-4 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFoto}
                          className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full h-full mt-6">
                <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                  Akte Lahir
                </Label>

                <div className="flex flex-col md:flex-row w-full">
                  <div
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropAktaLahir}
                    className={`w-full ${
                      formData?.aktalahir || previewAktalahir
                        ? "md:w-8/12"
                        : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center`}>
                    <>
                      <input
                        type="file"
                        id="file-input-akta"
                        name="aktalahir"
                        accept="image/*"
                        onChange={handleAktaLahirChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input-akta"
                        className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                        Drag and drop file here or click to select file
                      </label>
                    </>
                  </div>

                  {(previewAktalahir || formData?.aktalahir) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewAktalahir || formData?.aktalahir}
                          alt="Preview"
                          className="max-h-full rounded-xl p-4 md:p-4 max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveAktaLahir}
                          className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-12">
              <Button
                className="w-full h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                type="submit"
                variant="success"
                disabled={!formValid || isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
