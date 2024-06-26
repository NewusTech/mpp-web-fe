"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchProfile from "@/components/fetching/profile/profile";
import { useDispatch } from "react-redux";
import { updateProfileUser } from "@/store/action/actionUpdateProfile";
import { Dispatch } from "redux";
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
import Cookies from "js-cookie";
import { DesaType, KecamatanType, UpdateUserType } from "@/types/type";

export default function ProfileEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [kecamatan, setKecamatan] = useState<KecamatanType[]>();
  const [desa, setDesa] = useState<DesaType[]>([]);
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [detail, setDetail] = useState<UpdateUserType | undefined>({
    name: "",
    email: "",
    telepon: "",
    nik: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);

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
      setIsDataFetched(true);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (detail) {
        dispatch(updateProfileUser(detail, params.slug));
        await fetchUser();
        toast.success("Berhasil memperbarui informasi data diri!");
        router.push(`/profile/${detail.id}`);
      }
    } catch (error) {
      toast("Gagal mengupdate data!");
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

  return (
    <div className="flex items-center justify-center pb-[36px] bg-primary-100 mt-[24px] md:mt-[32px] md:mb-0 md:pb-[56px]">
      <div className="flex flex-col items-center w-full mx-[35px] md:mx-[200px]">
        <div className="flex self-start mb-[32px]">
          <h5 className="text-[20px] md:text-[26px] font-bold text-primary-800">
            Edit Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg px-[15px] md:px-[75px] pt-[16px] md:pt-[32px]">
          <form onSubmit={onSubmit} className="flex flex-col w-full">
            <div className="flex flex-col w-full mb-[4px] md:mb-4">
              <ProfileEditInput
                name="name"
                types="text"
                value={detail?.name || ""}
                change={changeUser}
                labelName="Nama Lengkap"
                placeholder="Nama Lengkap"
                classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                labelStyle="text-[12px] text-neutral-900 font-semibold"
              />
            </div>

            <div className="flex flex-col w-full mb-[4px] md:mb-4">
              <ProfileEditInput
                name="nik"
                types="number"
                value={detail?.nik || ""}
                change={changeUser}
                labelName="Nama Lengkap"
                placeholder="Nama Lengkap"
                classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                labelStyle="text-[12px] text-neutral-900 font-semibold"
              />
            </div>

            <div className="flex flex-col w-full mb-[4px] md:mb-4">
              <ProfileEditInput
                name="telepon"
                types="number"
                value={detail?.telepon || ""}
                change={changeUser}
                labelName="Nama Lengkap"
                placeholder="Nama Lengkap"
                classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                labelStyle="text-[12px] text-neutral-900 font-semibold"
              />
            </div>

            <div className="flex flex-col w-full mb-[4px] md:mb-4">
              <ProfileEditInput
                name="email"
                types="text"
                value={detail?.email || ""}
                change={changeUser}
                labelName="Nama Lengkap"
                placeholder="Nama Lengkap"
                classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                labelStyle="text-[12px] text-neutral-900 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 w-full my-[4px] md:gap-4">
              <div className="flex flex-col w-[120px] md:w-full">
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
              </div>

              <div className="flex flex-col w-[120px] md:w-full md:self-end">
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
                    } border border-neutral-700 mt-1 rounded-[50px] bg-white md:h-[40px] pl-4 w-full mx-0 pr-0`}>
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
              </div>
            </div>

            <div className="grid grid-cols-2 w-full my-[4px] md:gap-4">
              <div className="flex flex-col w-[120px] md:w-full">
                <ProfileEditInput
                  name="rt"
                  types="number"
                  value={detail?.rt || ""}
                  change={changeUser}
                  labelName="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />
              </div>

              <div className="flex flex-col w-[120px] md:w-full">
                <ProfileEditInput
                  name="rw"
                  types="number"
                  value={detail?.rw || ""}
                  change={changeUser}
                  labelName="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  classStyle="w-full pl-[16px] mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-none w-full my-[4px] md:my-4">
              <Label className="text-[12px] text-neutral-900 font-semibold">
                ALamat
              </Label>

              <Textarea
                name="alamat"
                placeholder="Alamat"
                value={detail?.alamat}
                onChange={changeUser}
                className="w-full rounded-3xl md:w-full h-[74px] md:h-[150px] text-[12px] placeholder:opacity-[70%]"
              />
            </div>

            <div className="flex justify-center items-end self-end md:w-full md:self-center my-[16px] md:pb-[30px]">
              <Button
                className="w-[90px] md:w-[290px] h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                type="submit"
                variant="success">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
