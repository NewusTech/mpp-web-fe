"use client";

import fetchProfile from "@/components/fetching/profile/profile";
import { Button } from "@/components/ui/button";
import { updateProfileUser } from "@/store/action/actionUpdateProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Steps from "@/components/steps/steps";
import { DesaType, KecamatanType, UpdateUserType } from "@/types/type";
import { ChevronLeft, Loader } from "lucide-react";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";
import { Label } from "@radix-ui/react-label";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { schemaDataDiri } from "@/lib/zodSchema";
import {
  agamas,
  genders,
  golonganDarahs,
  pendidikans,
  statusKawins,
} from "@/data/data";

const schema = z.object({
  name: z.string().refine((val) => val !== "", "Nama Lengkap harus diisi"),
  email: z.string().email("Email tidak valid"),
  telepon: z
    .string()
    .min(12, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(13, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 karakter"),
  gender: z.string({ message: "Pilih Jenis Kelamin" }),
  agama: z.string({ message: "Pilih Agama" }),
  pendidikan: z.string({ message: "Pilih Pendidikan" }),
  pekerjaan: z.string({ message: "Harap isi pekerjaanmu saat ini!" }),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
});

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 2;

export default function DataDiriPage() {
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [selectedAgama, setSelectedAgama] = useState<number | null>(null);
  const [selectedPendidikan, setSelectedPendidikan] = useState<number | null>(
    null
  );
  const [selectedDarah, setSelectedDarah] = useState<number | null>(null);
  const [selectedKawin, setSelectedKawin] = useState<number | null>(null);
  const [kecamatan, setKecamatan] = useState<KecamatanType[]>();
  const [desa, setDesa] = useState<DesaType[]>([]);
  const [gender, setGender] = useState<{ id: number; value: string }[]>();
  const [agama, setAgama] = useState<{ id: number; value: string }[]>();
  const [pendidikan, setPendidikan] =
    useState<{ id: number; value: string }[]>();
  const [darah, setDarah] = useState<{ id: number; value: string }[]>();
  const [kawin, setKawin] = useState<{ id: number; value: string }[]>();
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [detail, setDetail] = useState<UpdateUserType | undefined>({
    name: "",
    email: "",
    telepon: "",
    nik: "",
    gender: "",
    goldar: "",
    status_kawin: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const router = useRouter();

  const validateForm = async () => {
    try {
      await schemaDataDiri.parseAsync({
        ...detail,
        kecamatan_id: String(selectedKecamatan),
        desa_id: String(selectedDesa),
        gender: String(selectedGender),
        agama: String(selectedAgama),
        pendidikan: String(selectedPendidikan),
        goldar: String(selectedDarah),
        status_kawin: String(selectedKawin),
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
  }, [
    detail,
    selectedKecamatan,
    selectedDesa,
    selectedAgama,
    selectedGender,
    selectedPendidikan,
    hasSubmitted,
  ]);

  const fetchDatakecamatan = async (search: string, limit: number) => {
    try {
      const kecamatans = await kecamatanFetch(search, limit);

      setKecamatan(kecamatans.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  const fetchDataDesa = async (search: string, limit: number, id: number) => {
    try {
      const desa = await desaFetch(search, limit, id);
      setDesa(desa.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    fetchDatakecamatan(debounceSearchKecamatan, 1000000);
  }, [debounceSearchKecamatan]);

  useEffect(() => {
    if (selectedKecamatan) {
      fetchDataDesa(debounceSearchDesa, 1000000, selectedKecamatan);
    }
  }, [selectedKecamatan, debounceSearchDesa]);

  const fetchUser = async () => {
    try {
      const result = await fetchProfile();

      setDetail(result.data);

      if (result.data.kecamatan_id) {
        setSelectedKecamatan(result.data.kecamatan_id);
        fetchDataDesa("", 1000000, result.data.kecamatan_id);
      }

      if (result.data.desa_id) {
        setSelectedDesa(result.data.desa_id);
      }

      if (result.data.gender) {
        setSelectedGender(result.data.gender);
      }

      if (result.data.agama) {
        setSelectedAgama(result.data.agama);
      }

      if (result.data.pendidikan) {
        setSelectedPendidikan(result.data.pendidikan);
      }

      if (result.data.goldar) {
        setSelectedDarah(result.data.goldar);
      }

      if (result.data.status_kawin) {
        setSelectedKawin(result.data.status_kawin);
      }

      setIsDataFetched(true);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setGender(genders);
    setAgama(agamas);
    setPendidikan(pendidikans);
    setKawin(statusKawins);
    setDarah(golonganDarahs);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        if (detail) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${detail?.slug}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("Authorization")}`,
              },
              body: JSON.stringify({
                ...detail,
                kecamatan_id: String(selectedKecamatan),
              }),
              cache: "no-store",
            }
          );

          const responseData = await response.json();

          if (response.ok) {
            toast.success("Berhasil memperbarui informasi data diri!");
            await fetchUser();
            setFormErrors({});
            router.push(`/instansi/formulir`);
          } else {
            if (responseData.status === 400 && responseData.data) {
              const errors: { [key: string]: string } = {};
              responseData.data.forEach(
                (error: { message: string; field: string }) => {
                  errors[error.field] = error.message;
                }
              );
              setFormErrors(errors);
            } else {
              toast.error("Gagal mengupdate profile!");
            }
          }
        }
      } catch (error) {
        toast("Tidak bisa mengupdate profile!");
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const changeUser = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (selectedKecamatan !== null) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        kecamatan_id: String(selectedKecamatan),
      }));
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    if (selectedDesa !== null) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        desa_id: String(selectedDesa),
      }));
    }
  }, [selectedDesa]);

  useEffect(() => {
    if (
      selectedGender !== null ||
      selectedAgama !== null ||
      selectedPendidikan !== null ||
      selectedDarah !== null ||
      selectedKawin !== null
    ) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        gender: String(selectedGender),
        agama: String(selectedAgama),
        pendidikan: String(selectedPendidikan),
        goldar: String(selectedDarah),
        status_kawin: String(selectedKawin),
      }));
    }
  }, [
    selectedGender,
    selectedAgama,
    selectedPendidikan,
    selectedDarah,
    selectedKawin,
  ]);

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
                <form onSubmit={onSubmit} className="flex flex-col w-full">
                  <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
                    <div className="flex flex-col w-full md:mb-4">
                      <ProfileEditInput
                        names="name"
                        types="text"
                        value={detail?.name || ""}
                        change={changeUser}
                        labelName="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                      />

                      {formErrors["name"] && (
                        <p className="text-error-700 text-[12px] mt-1 text-center">
                          {formErrors["name"]}
                        </p>
                      )}

                      {hasSubmitted && errors?.name?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.name._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Golongan Darah
                      </Label>

                      <Select
                        name="goldar"
                        value={
                          selectedDarah ? String(selectedDarah) : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedDarah(Number(value));
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedDarah ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Golongan Darah"
                            className={
                              selectedDarah ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {golonganDarahs?.map(
                            (
                              darah: { id: number; value: string },
                              i: number
                            ) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(darah.id)}>
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
                      <ProfileEditInput
                        names="nik"
                        types="number"
                        value={detail?.nik || ""}
                        change={changeUser}
                        labelName="NIK"
                        placeholder="NIK"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                        value={
                          selectedAgama ? String(selectedAgama) : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedAgama(Number(value));
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedAgama ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Agama"
                            className={
                              selectedAgama ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {agamas?.map(
                            (
                              agama: { id: number; value: string },
                              i: number
                            ) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(agama.id)}>
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
                        names="telepon"
                        types="number"
                        value={detail?.telepon || ""}
                        change={changeUser}
                        labelName="Nomor Telepon"
                        placeholder="Nomor Telepon"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                        Status Perkawinan
                      </Label>

                      <Select
                        name="status_kawin"
                        value={
                          selectedKawin ? String(selectedKawin) : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedKawin(Number(value));
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedKawin ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Status Perkawinan"
                            className={
                              selectedKawin ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {statusKawins?.map(
                            (
                              kawin: { id: number; value: string },
                              i: number
                            ) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(kawin.id)}>
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
                    <div className="flex flex-col w-full md:mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Jenis Kelamin
                      </Label>

                      <Select
                        name="gender"
                        value={
                          selectedGender ? String(selectedGender) : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedGender(Number(value));
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedGender ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Jenis Kelamin"
                            className={
                              selectedGender ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {genders?.map(
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

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Pendidikan Terakhir
                      </Label>

                      <Select
                        name="pendidikan"
                        value={
                          selectedPendidikan
                            ? String(selectedPendidikan)
                            : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedPendidikan(Number(value));
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedPendidikan ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Pendidikan Terakhir"
                            className={
                              selectedPendidikan ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {pendidikans?.map(
                            (
                              pendidikan: { id: number; value: string },
                              i: number
                            ) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(pendidikan.id)}>
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
                        value={detail?.email || ""}
                        change={changeUser}
                        labelName="Email"
                        placeholder="Email"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                        value={detail?.pekerjaan || ""}
                        change={changeUser}
                        labelName="Pekerjaan"
                        placeholder="Pekerjaan"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                        value={
                          selectedKecamatan
                            ? String(selectedKecamatan)
                            : undefined
                        }
                        onValueChange={(value) => {
                          setSelectedKecamatan(Number(value));
                          // setSelectedDesa(null);
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedKecamatan ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Kecamatan"
                            className={
                              selectedKecamatan ? "" : "placeholder:opacity-50"
                            }
                          />
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

                            {kecamatan?.map((el: KecamatanType, i: number) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(el.id)}>
                                {el.name}
                              </SelectItem>
                            ))}
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
                        value={selectedDesa ? String(selectedDesa) : undefined}
                        onValueChange={(value) =>
                          setSelectedDesa(Number(value))
                        }>
                        <SelectTrigger
                          className={`${
                            !selectedDesa ? "opacity-70" : ""
                          } border border-neutral-700 mt-1 rounded-[50px] bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Desa"
                            className={
                              selectedDesa ? "" : "placeholder:opacity-50"
                            }
                          />
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

                            {desa?.map((el: DesaType, i: number) => (
                              <SelectItem
                                className="pr-none mt-2"
                                key={i}
                                value={String(el.id)}>
                                {el.name}
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
                        value={detail?.rt || ""}
                        change={changeUser}
                        labelName="RT"
                        placeholder="RT"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                        value={detail?.rw || ""}
                        change={changeUser}
                        labelName="RW"
                        placeholder="RW"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
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
                      placeholder="Alamat"
                      value={detail?.alamat}
                      onChange={changeUser}
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
