"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
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
import { DesaType, KecamatanType, UpdateUserType } from "@/types/type";
import fetchProfile from "@/components/fetching/profile/profile";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  agamas,
  genders,
  golonganDarahs,
  pendidikans,
  statusKawins,
} from "@/data/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import { ChevronDown, ChevronLeft, Loader, Trash } from "lucide-react";
import LoadingComponent from "@/components/loading/LoadingComponent";

export default function ProfileEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const searchParams = useSearchParams();
  const dropRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<UpdateUserType | null>(null);
  const [kecamatans, setKecamatans] = useState<KecamatanType[]>();
  const [desas, setDesas] = useState<DesaType[]>();
  const [kecamatanId, setKecamatanId] = useState<number>();
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
  const [isLoading, setIsLoading] = useState(false);
  const [isTabs, setIsTabs] = useState<string | undefined>(undefined);

  const search = searchParams.get("tabs");

  useEffect(() => {
    if (search == "data-diri") {
      setIsTabs("Data Diri");
    } else if (search == "dokumen-pendukung") {
      setIsTabs("Dokumen Pendukung");
    }
  }, [search]);

  const fetchUser = async () => {
    try {
      const user = await fetchProfile();
      setFormData(user.data);
      setKecamatanId(user.data.kecamatan_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }

    fetchUser();
  }, []);

  const fetchKecamatan = async (search: string, limit: number) => {
    try {
      const kecamatanDatas = await kecamatanFetch(search, limit);
      setKecamatans(kecamatanDatas.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDesa = async (
    search: string,
    limit: number,
    kecamatan_id: number
  ) => {
    try {
      const desaDatas = await desaFetch(search, limit, kecamatan_id);
      setDesas(desaDatas.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKecamatan("", 1000000);
  }, []);

  useEffect(() => {
    if (kecamatanId) {
      fetchDesa("", 1000000, kecamatanId);
    }
  }, [kecamatanId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const handleKecamatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKecamatanId = Number(e.target.value);
    setKecamatanId(selectedKecamatanId);
    setFormData((prevFormData: any) => ({
      ...prevFormData!,
      kecamatan_id: selectedKecamatanId,
      desa_id: undefined,
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
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${params.slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            kecamatan_id: String(kecamatanId),
            desa_id: String(formData?.desa_id),
          }),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate profile!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
        router.push(`/profile?tabs=${"data-diri"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: `${result?.message}`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/updatedocs/${params.slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: fileData,
          cache: "no-store",
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate dokumen!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.push(`/profile?tabs=${"dokumen-pendukung"}`);
    }
  };

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

  if (isTabs === undefined) {
    return (
      <div className="flex justify-center items-center mt-32">
        <div className="flex flex-row justify-center items-center self-center w-4/12">
          <LoadingComponent />
        </div>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center pb-32 bg-primary-100 mt-6 md:mt-0 md:pt-6 md:mb-0 md:pb-[120px]">
      <div className="flex flex-col items-center w-full mx-[35px] md:mx-[200px]">
        <div className="flex flex-row items-center self-start mb-8">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-[40px] h-[40px] text-neutral-800 mr-4" />
          </button>

          <h4 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
            Edit Profile
          </h4>
        </div>

        <div className="flex flex-col w-full bg-neutral-50 rounded-xl shadow-md px-[15px] md:px-[75px] pt-4 md:pt-[8]">
          <Tabs defaultValue={isTabs} className="pt-6">
            <TabsList className="py-0 w-full grid grid-cols-2 md:flex md:flex-row justify-between md:justify-start items-center">
              <TabsTrigger
                className="font-semibold rounded-l-lg w-full py-4 bg-neutral-200 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 border border-neutral-400 px-0 text-primary-700 md:text-[20px]"
                value="Data Diri">
                <div>Data Diri</div>
              </TabsTrigger>
              <TabsTrigger
                className="font-semibold rounded-r-lg w-full py-4 bg-neutral-200 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 border border-neutral-400 px-3 text-primary-700 md:text-[20px]"
                value="Dokumen Pendukung">
                <div>Dokumen Pendukung</div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Data Diri">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full mt-2 md:mt-4">
                <div className="grid grid-rows-2 mt-4 md:mt-4 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
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
                  </div>

                  <div className="flex flex-col w-full mt-2 md:mt-0 md:mb-4">
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
                  </div>
                </div>

                <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                  <div className="flex flex-col w-full mt-2 md:mt-0 mb-4">
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
                  </div>
                </div>

                <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                  <div className="flex flex-col w-full mb-4">
                    <Label
                      htmlFor="kecamatan"
                      className="text-[12px] text-neutral-900 font-semibold">
                      Kecamatan
                    </Label>

                    <div className="flex flex-row items-center justify-between border border-neutral-700 rounded-[50px] appearance-none mt-1 bg-neutral-50 md:h-[40px] w-full mx-0 pr-2">
                      <select
                        name="kecamatan_id"
                        id="kecamatan"
                        value={kecamatanId || ""}
                        onChange={handleKecamatanChange}
                        className="appearance-none w-full bg-transparent rounded-full pl-4 p-2 outline-none border-none">
                        <option value="" disabled>
                          Pilih Kecamatan
                        </option>
                        {kecamatans &&
                          kecamatans.map(
                            (kecamatan: KecamatanType, i: number) => (
                              <option key={i} value={kecamatan.id}>
                                {kecamatan.name}
                              </option>
                            )
                          )}
                      </select>

                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col w-full mb-4w-full">
                    <Label
                      htmlFor="desa"
                      className="text-[12px] text-neutral-900 font-semibold">
                      Desa
                    </Label>

                    <div className="flex flex-row items-center justify-between border border-neutral-700 rounded-[50px] appearance-none mt-1 bg-neutral-50 md:h-[40px] w-full mx-0 pr-2">
                      <select
                        name="desa_id"
                        id="desa"
                        value={formData?.desa_id || ""}
                        onChange={(e) =>
                          handleSelectChange("desa_id", e.target.value)
                        }
                        className="appearance-none w-full bg-transparent rounded-full pl-4 p-2 outline-none border-none">
                        <option value="" disabled>
                          Pilih Desa
                        </option>
                        {desas &&
                          desas.map((desa: DesaType, i: number) => (
                            <option key={i} value={desa.id}>
                              {desa.name}
                            </option>
                          ))}
                      </select>

                      <ChevronDown className="w-6 h-6" />
                    </div>
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
                    className="w-full rounded-3xl border border-neutral-700 md:w-full h-[74px] md:h-[150px] text-[12px] md:text-[14px] placeholder:opacity-[70%]"
                  />
                </div>

                <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-12">
                  <Button
                    className="w-full h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                    type="submit"
                    variant="success"
                    disabled={isLoading ? true : false}>
                    {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="Dokumen Pendukung">
              <form
                onSubmit={handleSubmitFile}
                className="flex flex-col w-full mt-2 md:mt-4">
                <div className="flex flex-col w-full mt-4">
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
                              src={
                                previewIjazahImage || formData?.fileijazahlain
                              }
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
                          formData?.foto || previewFotos
                            ? "md:w-8/12"
                            : "w-full"
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

                  <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-12">
                    <Button
                      className="w-full h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                      type="submit"
                      variant="success"
                      disabled={isLoading ? true : false}>
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Simpan"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
