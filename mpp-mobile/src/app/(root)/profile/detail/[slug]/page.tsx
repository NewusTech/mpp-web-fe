"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import fetchProfile from "@/components/fetching/profile/profile";
import { toast } from "sonner";
import ProfileEditInput from "@/components/others/profileEditIput/profileEditInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import { DesaType, KecamatanType, UpdateUserType } from "@/types/type";
import { Trash } from "lucide-react";
import Cookies from "js-cookie";

const genders = [
  {
    id: 1,
    value: "Laki-laki",
  },
  {
    id: 2,
    value: "Perempuan",
  },
];

const agamas = [
  {
    id: 1,
    value: "Islam",
  },
  {
    id: 2,
    value: "Kristen",
  },
  {
    id: 3,
    value: "Katolik",
  },
  {
    id: 4,
    value: "Hindu",
  },
  {
    id: 5,
    value: "Buddha",
  },
  {
    id: 6,
    value: "Konghucu",
  },
];

const pendidikans = [
  {
    id: 1,
    value: "Tidak Sekolah",
  },
  {
    id: 2,
    value: "SD",
  },
  {
    id: 3,
    value: "SMP",
  },
  {
    id: 4,
    value: "SMA",
  },
  {
    id: 5,
    value: "Diploma 1",
  },
  {
    id: 6,
    value: "Diploma 2",
  },
  {
    id: 7,
    value: "Diploma 3",
  },
  {
    id: 8,
    value: "Strata 1 / Diploma 4",
  },
  {
    id: 9,
    value: "Strata 2",
  },
  {
    id: 10,
    value: "Strata 3",
  },
];

export default function ProfileEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [selectedAgama, setSelectedAgama] = useState<number | null>(null);
  const [selectedPendidikan, setSelectedPendidikan] = useState<number | null>(
    null
  );
  const [kecamatan, setKecamatan] = useState<KecamatanType[]>();
  const [desa, setDesa] = useState<DesaType[]>([]);
  const [gender, setGender] = useState<{ id: number; value: string }[]>();
  const [agama, setAgama] = useState<{ id: number; value: string }[]>();
  const [pendidikan, setPendidikan] =
    useState<{ id: number; value: string }[]>();
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [detail, setDetail] = useState<UpdateUserType>({
    name: "",
    email: "",
    telepon: "",
    nik: "",
    gender: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
    filektp: "",
    filekk: "",
    fileijazahsd: "",
  });
  const [fileKtpImage, setFileKtpImage] = useState<File | null>(null);
  const [fileKkImage, setFileKkImage] = useState<File | null>(null);
  const [fileIjazahImage, setFileIjazahImage] = useState<File | null>(null);
  const [previewKTPImage, setPreviewKTPImage] = useState<string>("");
  const [previewKKImage, setPreviewKKImage] = useState<string>("");
  const [previewIjazahImage, setPreviewIjazahImage] = useState<string>("");
  const [changeOpacity, setChangeOpacity] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
  }, []);

  const router = useRouter();

  const changeUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleFileKTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileKtpImage(file);
      setDetail({
        ...detail,
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
      setDetail({
        ...detail,
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
      setDetail({
        ...detail,
        fileijazahsd: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewIjazahImage(fileUrl);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (fileKtpImage) {
      formData.append("filektp", fileKtpImage);
    }
    if (fileKkImage) {
      formData.append("filekk", fileKkImage);
    }
    if (fileIjazahImage) {
      formData.append("fileijazahsd", fileIjazahImage);
    }

    const detailData = {
      name: detail.name || "",
      email: detail.email || "",
      telepon: detail.telepon || "",
      nik: detail.nik || "",
      gender: String(detail.gender) || "",
      agama: String(detail.agama) || "",
      pendidikan: String(detail.pendidikan) || "",
      pekerjaan: detail.pekerjaan || "",
      kecamatan_id: String(detail.kecamatan_id) || "",
      desa_id: String(detail.desa_id) || "",
      rt: detail.rt || "",
      rw: detail.rw || "",
      alamat: detail.alamat || "",
    };

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
            body: JSON.stringify(detailData),
            cache: "no-store",
          }
        ),
        // Second API call for file uploads
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/updatedocs/${params.slug}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
            },
            body: formData,
            cache: "no-store",
          }
        ),
      ]);

      if (response1.ok && response2.ok) {
        toast.success("Berhasil mengupdate profile!");
        await fetchUser();
        setFormErrors({});
        router.push("/profile");
      } else {
        const responseData1 = await response1.json();

        const responseData2 = await response2.json();

        if (!response1.ok) {
          if (responseData1.status === 400 && responseData1.data) {
            const errors: { [key: string]: string } = {};
            responseData1.data.forEach(
              (error: { message: string; field: string }) => {
                errors[error.field] = error.message;
              }
            );
            setFormErrors(errors);
          } else {
            toast.error("Gagal mengupdate profile 1!");
          }
        }

        if (!response2.ok) {
          if (responseData2.status === 400 && responseData2.data) {
            const errors: { [key: string]: string } = {};
            responseData2.data.forEach(
              (error: { message: string; field: string }) => {
                errors[error.field] = error.message;
              }
            );
            setFormErrors(errors);
          } else {
            toast.error("Gagal mengupdate profile 2!");
          }
        }
      }
    } catch (error) {
      toast("Tidak bisa mengupdate profile!");
    }
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
    if (selectedGender !== null) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        gender: String(selectedGender),
      }));
    }
  }, [selectedGender]);

  useEffect(() => {
    if (selectedAgama !== null) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        agama: String(selectedAgama),
      }));
    }
  }, [selectedAgama]);

  useEffect(() => {
    if (selectedPendidikan !== null) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        pendidikan: String(selectedPendidikan),
      }));
    }
  }, [selectedPendidikan]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
  };

  const handleDropKTP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileKtpImage(file);
      setDetail({
        ...detail,
        filektp: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKTPImage(fileUrl);
    }
  };

  const handleDropKK = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileKkImage(file);
      setDetail({
        ...detail,
        filekk: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewKKImage(fileUrl);
    }
  };

  const handleDropIjazah = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileIjazahImage(file);
      setDetail({
        ...detail,
        fileijazahsd: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewIjazahImage(fileUrl);
    }
  };

  const handleRemoveKTP = () => {
    setFileKtpImage(null);
    setPreviewKTPImage("");
    setDetail({ ...detail, filektp: "" });
  };

  const handleRemoveKK = () => {
    setFileKkImage(null);
    setPreviewKKImage("");
    setDetail({ ...detail, filekk: "" });
  };

  const handleRemoveIjazah = () => {
    setFileIjazahImage(null);
    setPreviewIjazahImage("");
    setDetail({ ...detail, fileijazahsd: "" });
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
            onSubmit={handleUpdateUser}
            className="flex flex-col w-full mt-2 md:mt-4">
            <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-full md:gap-4">
              <div className="flex flex-col w-full md:mb-4">
                <ProfileEditInput
                  names="name"
                  types="text"
                  value={detail?.name || ""}
                  change={changeUser}
                  labelName="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["name"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["name"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full mb-4">
                <Label className="text-[12px] text-neutral-900 font-semibold">
                  Jenis Kelamin
                </Label>

                <Select
                  name="gender"
                  value={selectedGender ? String(selectedGender) : undefined}
                  onValueChange={(value) => {
                    setSelectedGender(Number(value));
                  }}>
                  <SelectTrigger
                    className={`${
                      !selectedGender ? "opacity-70" : ""
                    } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue
                      placeholder="Pilih Jenis Kelamin"
                      className={selectedGender ? "" : "placeholder:opacity-50"}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {genders?.map(
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

                {formErrors["gender"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["gender"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["nik"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["nik"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full mb-4">
                <Label className="text-[12px] text-neutral-900 font-semibold">
                  Agama
                </Label>

                <Select
                  name="agama"
                  value={selectedAgama ? String(selectedAgama) : undefined}
                  onValueChange={(value) => {
                    setSelectedAgama(Number(value));
                  }}>
                  <SelectTrigger
                    className={`${
                      !selectedAgama ? "opacity-70" : ""
                    } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue
                      placeholder="Pilih Jenis Kelamin"
                      className={selectedAgama ? "" : "placeholder:opacity-50"}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {agamas?.map(
                      (agama: { id: number; value: string }, i: number) => (
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

                {formErrors["agama"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["agama"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["telepon"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["telepon"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full mb-4">
                <Label className="text-[12px] text-neutral-900 font-semibold">
                  Pendidikan
                </Label>

                <Select
                  name="pendidikan"
                  value={
                    selectedPendidikan ? String(selectedPendidikan) : undefined
                  }
                  onValueChange={(value) => {
                    setSelectedPendidikan(Number(value));
                  }}>
                  <SelectTrigger
                    className={`${
                      !selectedPendidikan ? "opacity-70" : ""
                    } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue
                      placeholder="Pilih Jenis Kelamin"
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

                {formErrors["pendidikan"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["pendidikan"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["email"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["email"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["pekerjaan"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["pekerjaan"]}
                  </p>
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
                    selectedKecamatan ? String(selectedKecamatan) : undefined
                  }
                  onValueChange={(value) => {
                    setSelectedKecamatan(Number(value));
                    setSelectedDesa(null);
                  }}>
                  <SelectTrigger
                    className={`${
                      !selectedKecamatan ? "opacity-70" : ""
                    } border border-neutral-700 rounded-[50px] mt-1 bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
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
                          change={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchKecamatan(e.target.value)
                          }
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

                {formErrors["kecamatan_id"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["kecamatan_id"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full mb-4w-full">
                <Label className="text-[12px] text-neutral-900 font-semibold">
                  Desa
                </Label>

                <Select
                  name="desa_id"
                  value={selectedDesa ? String(selectedDesa) : undefined}
                  onValueChange={(value) => setSelectedDesa(Number(value))}>
                  <SelectTrigger
                    className={`${
                      !selectedDesa ? "opacity-70" : ""
                    } border border-neutral-700 mt-1 rounded-[50px] bg-neutral-50 md:h-[40px] pl-4 w-full mx-0 pr-4`}>
                    <SelectValue
                      placeholder="Pilih Desa"
                      className={selectedDesa ? "" : "placeholder:opacity-50"}
                    />
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

                {formErrors["desa_id"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["desa_id"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["rt"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["rt"]}
                  </p>
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
                  classStyle="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />

                {formErrors["rw"] && (
                  <p className="text-error-700 text-[12px] mt-1 text-center">
                    {formErrors["rw"]}
                  </p>
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

              {formErrors["alamat"] && (
                <p className="text-error-700 text-[12px] mt-1 text-center">
                  {formErrors["alamat"]}
                </p>
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
                      detail.filektp || previewKTPImage ? "md:w-8/12" : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center ${
                      changeOpacity ? "opacity-50" : "opacity-100"
                    }`}>
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

                    {formErrors["filektp"] && (
                      <p className="text-error-700 text-[12px] mt-1 text-center">
                        {formErrors["filektp"]}
                      </p>
                    )}
                  </div>

                  {(previewKTPImage || detail.filektp) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewKTPImage || detail.filektp}
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
                      detail.filekk || previewKKImage ? "md:w-8/12" : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center ${
                      changeOpacity ? "opacity-50" : "opacity-100"
                    }`}>
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

                    {formErrors["filekk"] && (
                      <p className="text-error-700 text-[12px] mt-1 text-center">
                        {formErrors["filekk"]}
                      </p>
                    )}
                  </div>

                  {(previewKKImage || detail.filekk) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewKKImage || detail.filekk}
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
                      detail.fileijazahsd || previewIjazahImage
                        ? "md:w-8/12"
                        : "w-full"
                    }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center ${
                      changeOpacity ? "opacity-50" : "opacity-100"
                    }`}>
                    <>
                      <input
                        type="file"
                        id="file-input-ijazah"
                        name="fileijazahsd"
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

                    {formErrors["fileijazahsd"] && (
                      <p className="text-error-700 text-[12px] mt-1 text-center">
                        {formErrors["fileijazahsd"]}
                      </p>
                    )}
                  </div>

                  {(previewIjazahImage || detail.fileijazahsd) && (
                    <div className="relative md:ml-4 w-full mt-1">
                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                        <img
                          src={previewIjazahImage || detail.fileijazahsd}
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
            </div>

            <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-12">
              <Button
                className="w-full h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                type="submit"
                variant="success">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
