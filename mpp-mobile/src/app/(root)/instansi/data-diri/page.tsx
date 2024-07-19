"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { DesaType, KecamatanType, UpdateUserType } from "@/types/type";
import fetchProfile from "@/components/fetching/profile/profile";
import { toast } from "sonner";
import Cookies from "js-cookie";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import { ChevronDown, ChevronLeft, Loader } from "lucide-react";
import Steps from "@/components/steps/steps";
import { Textarea } from "@/components/ui/textarea";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";
import {
  agamas,
  genders,
  golonganDarahs,
  pendidikans,
  statusKawins,
} from "@/data/data";
import { schema } from "@/lib/zodSchema";
import { z } from "zod";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 2;

export default function DataDiriPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateUserType | null>(null);
  const [kecamatans, setKecamatans] = useState<KecamatanType[]>();
  const [desas, setDesas] = useState<DesaType[]>();
  const [kecamatanId, setKecamatanId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const fetchUser = async () => {
    try {
      const user = await fetchProfile();
      setFormData(user.data);
      setKecamatanId(user.data.kecamatan_id);
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

  const fetchDesa = async (
    search: string,
    limit: number,
    kecamatan_id: number
  ) => {
    try {
      const desaDatas = await desaFetch(search, limit, kecamatan_id);
      setDesas(desaDatas.data);
    } catch (error) {
      console.log(error, "error");
      toast("Gagal mendapatkan data desa!");
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
    setOpacity(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      schema.parse(formData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${formData?.slug}`,
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

      if (response.ok) {
        toast.success("Berhasil mengupdate profile!");
        setIsLoading(false);
        router.push("/instansi/formulir");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        console.log(error, "error");
        toast("Failed to update profile!");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

          <div className="flex flex-col w-full border border-neutral-700 bg-neutral-50 pb-6 md:pb-0 rounded-xl shadow-md">
            <div className="flex flex-col mt-5 px-5 md:px-20">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Data Diri
              </h5>

              <div className="flex flex-col w-full px-4 md:px-16 pt-4 md:pt-8 md:mt-4 md:mb-8">
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
                          className={`border border-neutral-700 text-[13px] ${
                            !opacity ? "opacity-70" : ""
                          } rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
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

                      {errors.gender && (
                        <span className="text-error-700 text-sm">
                          {errors.gender}
                        </span>
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
                          className={` border border-neutral-700 text-[13px] ${
                            !opacity ? "opacity-70" : ""
                          } rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue placeholder="Pilih Agama" />
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

                      {errors.agama && (
                        <span className="text-error-700 text-sm">
                          {errors.agama}
                        </span>
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

                      {errors.tempat_lahir && (
                        <span className="text-error-700 text-sm">
                          {errors.tempat_lahir}
                        </span>
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
                          className={` border border-neutral-700 text-[13px] ${
                            !opacity ? "opacity-70" : ""
                          } rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue placeholder="Pilih Golongan Darah" />
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

                      {errors.goldar && (
                        <span className="text-error-700 text-sm">
                          {errors.goldar}
                        </span>
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

                      {errors.tgl_lahir && (
                        <span className="text-error-700 text-sm">
                          {errors.tgl_lahir}
                        </span>
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
                          className={`border border-neutral-700 text-[13px] ${
                            !opacity ? "opacity-70" : ""
                          } rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue placeholder="Pilih Status Perkawinan" />
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

                      {errors.status_kawin && (
                        <span className="text-error-700 text-sm">
                          {errors.status_kawin}
                        </span>
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
                          className={`border border-neutral-700 text-[13px] ${
                            !opacity ? "opacity-70" : ""
                          } rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                          <SelectValue placeholder="Pilih Pendidikan Terakhir" />
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

                      {errors.pendidikan && (
                        <span className="text-error-700 text-sm">
                          {errors.pendidikan}
                        </span>
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

                      {errors.pekerjaan && (
                        <span className="text-error-700 text-sm">
                          {errors.pekerjaan}
                        </span>
                      )}
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
