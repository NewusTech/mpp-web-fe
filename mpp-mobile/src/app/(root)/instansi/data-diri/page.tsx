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
  const [detail, setDetail] = useState<UpdateUserType | undefined>({
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
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            body: JSON.stringify(detail),
            cache: "no-store",
          }
        );

        if (response.ok) {
          toast.success("Berhasil memperbarui informasi data diri!");
          await fetchUser();
          setFormErrors({});
          router.push(`/instansi/formulir`);
        } else {
          const responseData = await response.json();
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
    }
  };

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

  const isButtonDisabled = () => {
    return (
      !detail?.name ||
      !detail?.nik ||
      !detail?.telepon ||
      !detail?.email ||
      !detail?.alamat ||
      selectedGender === null ||
      selectedAgama === null ||
      selectedPendidikan === null ||
      selectedKecamatan === null ||
      selectedDesa === null
    );
  };

  return (
    <div className="bg-primary-100 md:mt-6 md:mb-0 md:pb-12">
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

          <div className="flex flex-col w-full border border-neutral-700 bg-white pb-6 md:pb-0 rounded-2xl shadow-lg">
            <div className="flex flex-col mt-5 px-5 md:px-20">
              <h5 className="text-[14px] md:text-[20px] font-semibold text-primary-800">
                Data Diri
              </h5>

              <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg px-4 md:px-16 pt-4 md:pt-8 md:mt-4 md:mb-8">
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
                    </div>

                    <div className="flex flex-col w-full mb-4">
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
                          } border border-neutral-700 rounded-[50px] mt-1 bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
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
                          } border border-neutral-700 rounded-[50px] mt-1 bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
                          <SelectValue
                            placeholder="Pilih Jenis Kelamin"
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
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold">
                        Pendidikan
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
                          } border border-neutral-700 rounded-[50px] mt-1 bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
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
                          setSelectedDesa(null);
                        }}>
                        <SelectTrigger
                          className={`${
                            !selectedKecamatan ? "opacity-70" : ""
                          } border border-neutral-700 rounded-[50px] mt-1 bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
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
                          } border border-neutral-700 mt-1 rounded-[50px] bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
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
                  </div>

                  <div className="flex justify-center items-end self-end md:w-full md:self-center my-[16px] md:pb-[30px]">
                    <Button
                      className="w-[90px] md:w-[290px] h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                      type="submit"
                      variant="success"
                      disabled={isButtonDisabled()}>
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
