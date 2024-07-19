"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye, EyeOff, Loader } from "lucide-react";
import kecamatanFetch from "@/components/fetching/kecamatan/kecamatan";
import desaFetch from "@/components/fetching/desa/desa";
import SearchComponent from "@/components/others/searchComponent/searchComponent";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import { Label } from "@radix-ui/react-label";
import RegisterInput from "@/components/others/registerInput/registerInput";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DesaType, KecamatanType, TermType } from "@/types/type";
import { z } from "zod";
import { schemaRegister } from "@/lib/zodSchema";
import TermCondition from "@/components/fetching/termCond/termCond";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700", "700", "800", "900"],
});

export default function RegisterScreen() {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    nik: "",
    telepon: "",
    email: "",
    password: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [seen, setSeen] = useState(true);
  const [kecamatan, setKecamatan] = useState<KecamatanType[]>();
  const [desa, setDesa] = useState<DesaType[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState<TermType>();
  const [isChecked, setIsChecked] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = async () => {
    try {
      await schemaRegister.parseAsync({
        ...newUser,
        kecamatan_id: String(selectedKecamatan),
        desa_id: String(selectedDesa),
        term: isChecked,
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
  }, [newUser, selectedKecamatan, selectedDesa, isChecked, hasSubmitted]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      window.open(term?.privasi, "_blank");
    }
  };

  const fetchTerm = async () => {
    try {
      const terms = await TermCondition();

      setTerm(terms.data);
    } catch (error) {
      toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    fetchTerm();
  }, []);

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

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/");
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...newUser, role_id: 5 }),
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success("Berhasil membuat akun, silahkan login", {
            duration: 1000,
          });
          return router.push("/login");
        } else {
          toast.error(result.message || "Gagal membuat akun!");
        }
      } catch (error: any) {
        console.log(error);

        toast(error.message);
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0 && isChecked);
  }, [errors, isChecked]);

  const changeUser = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (selectedKecamatan !== null) {
      setNewUser((prevUser) => ({
        ...prevUser,
        kecamatan_id: String(selectedKecamatan),
      }));
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    if (selectedDesa !== null) {
      setNewUser((prevUser) => ({
        ...prevUser,
        desa_id: String(selectedDesa),
      }));
    }
  }, [selectedDesa]);

  return (
    <section className="flex justify-center md:px-36 items-center bg-gradient-to-bl from-neutral-50 from-[-40%] via-primary-700 via-99% to-neutral-700 to-[120%] w-screen h-full md:h-screen">
      <div className="flex flex-col gap-[4px] w-full rounded-xl bg-primary-200 px-[32px] mx-[32px] md:mx-0 my-[45px] md:my-0 md:px-[60px]">
        <div className="flex flex-col pt-[32px]">
          <h6 className="text-primary-800 text-[16px] md:text-[24px] font-semibold mb-[4px]">
            DAFTAR
          </h6>

          <div className="flex flex-row items-start justify-start gap-1">
            <p className="flex flex-row gap-1 font-normal text-[12px] md:text-[14px] text-neutral-800">
              Sudah Punya akun? Silahkan
            </p>
            <Link
              href="/login"
              className="text-[12px] md:text-[14px] font-bold text-primary-800 border-b border-b-primary-800">
              Masuk
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:w-full h-full mt-[20px]">
          <form onSubmit={onSubmit} className="flex flex-col md:w-full">
            <div className="flex flex-col md:w-full md:flex-none md:grid md:grid-cols-2">
              <div className="flex flex-col">
                <h5 className="text-[12px] md:text-[16px] text-primary-800 font-semibold mb-[16px] md:mb-[12px]">
                  Data Diri
                </h5>

                <div className="grid grid-rows-4 md:w-full gap-4 place-items-center md:place-items-start">
                  <div className="w-full">
                    <RegisterInput
                      name="name"
                      types="text"
                      value={newUser.name}
                      change={changeUser}
                      labelName="Nama Lengkap"
                      placeholder="Nama Lengkap"
                      classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                      labelStyle="text-[12px] text-primary-800 font-semibold"
                    />

                    {hasSubmitted && errors?.name?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.name._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <RegisterInput
                      name="nik"
                      types="number"
                      value={newUser.nik}
                      change={changeUser}
                      labelName="NIK"
                      placeholder="NIK"
                      classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                      labelStyle="text-[12px] text-primary-800 font-semibold"
                    />

                    {hasSubmitted && errors?.nik?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.nik._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <RegisterInput
                      name="telepon"
                      types="number"
                      value={newUser.telepon}
                      change={changeUser}
                      labelName="Nomor Telepon"
                      placeholder="Nomor Telepon"
                      classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                      labelStyle="text-[12px] text-primary-800 font-semibold"
                    />

                    {hasSubmitted && errors?.telepon?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.telepon._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <RegisterInput
                      name="email"
                      types="email"
                      value={newUser.email}
                      change={changeUser}
                      labelName="Email"
                      placeholder="Email@gmail.com"
                      classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                      labelStyle="text-[12px] text-primary-800 font-semibold"
                    />

                    {hasSubmitted && errors?.email?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.email._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <Label className="text-[12px] text-primary-800 font-semibold">
                      Kata Sandi
                    </Label>
                    <div className="flex items-center mt-1 justify-between rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-neutral-700 placeholder:text-[14px] placeholder:text-neutral-700">
                      <Input
                        name="password"
                        type={!seen ? "text" : "password"}
                        value={newUser.password}
                        onChange={changeUser}
                        placeholder="Kata Sandi"
                        className="w-full pl-[16px] h-[38px] placeholder:opacity-[70%]"
                        autoComplete="true"
                      />

                      <div
                        onClick={() => setSeen(!seen)}
                        className="p-2 cursor-pointer">
                        {seen ? (
                          <EyeOff className="text-neutral-700 w-[20px] h-[20px]" />
                        ) : (
                          <Eye className="text-neutral-700 w-[20px] h-[20px]" />
                        )}
                      </div>
                    </div>

                    {hasSubmitted && errors?.password?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.password._errors[0]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-[16px] md:mt-0 md:pl-4">
                <h3 className="text-[12px] md:text-[16px] text-primary-800 font-semibold mb-[16px] md:mb-[12px]">
                  Alamat
                </h3>

                <div className="grid md:grid-rows-3 md:w-full gap-4 place-items-center md:place-items-start">
                  <div className="w-full">
                    <Label className="text-[12px] text-primary-800 font-semibold">
                      Kecamatan
                    </Label>

                    <Select
                      name="kecamatan_id"
                      value={
                        selectedKecamatan
                          ? String(selectedKecamatan)
                          : undefined
                      }
                      onValueChange={(value) =>
                        setSelectedKecamatan(Number(value))
                      }>
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

                    {hasSubmitted && errors.kecamatan_id?._errors[0] && (
                      <p className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.kecamatan_id?._errors[0]}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <Label className="text-[12px] text-primary-800 font-semibold">
                      Desa
                    </Label>

                    <Select
                      name="desa_id"
                      value={selectedDesa ? String(selectedDesa) : undefined}
                      onValueChange={(value) => setSelectedDesa(Number(value))}>
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

                    {hasSubmitted && errors.desa_id?._errors[0] && (
                      <p className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.desa_id?._errors[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex md:flex-row flex-col w-full md:justify-between gap-4">
                    <div className="w-full md:w-1/2">
                      <RegisterInput
                        name="rt"
                        types="number"
                        value={newUser.rt}
                        change={changeUser}
                        labelName="RT"
                        placeholder="RT"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-semibold"
                      />

                      {hasSubmitted && errors?.rt?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.rt._errors[0]}
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-1/2">
                      <RegisterInput
                        name="rw"
                        types="number"
                        value={newUser.rw}
                        change={changeUser}
                        labelName="RW"
                        placeholder="RW"
                        classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-primary-800 font-semibold"
                      />

                      {hasSubmitted && errors?.rw?._errors && (
                        <div className="text-error-700 text-[12px] md:text-[14px]">
                          {errors.rw._errors[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <Label className="text-[12px] text-primary-800 font-semibold">
                      Alamat
                    </Label>

                    <Textarea
                      name="alamat"
                      placeholder="Alamat"
                      value={newUser.alamat}
                      onChange={changeUser}
                      className="w-full rounded-3xl h-[74px] border border-neutral-700 md:h-[122px] text-[12px] placeholder:opacity-[70%]"
                    />

                    {hasSubmitted && errors?.alamat?._errors && (
                      <div className="text-error-700 text-[12px] md:text-[14px]">
                        {errors.alamat._errors[0]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-row gap-x-2">
              <input
                type="checkbox"
                name="term"
                className="w-4 h-4"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />

              <div className="text-neutral-900 overflow-y-auto font-normal text-[12px]">
                Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami dan
                Anda telah membaca Kebijakan Privasi kami.
              </div>
            </div>

            <div className="flex justify-center items-end my-[32px]">
              <Button
                type="submit"
                className="md:w-[120px] md:h-[40px] md:text-[14px] md:font-semibold"
                variant="neutral"
                disabled={!formValid || isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Daftar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
