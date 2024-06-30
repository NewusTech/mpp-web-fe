"use client";

import fetchProfile from "@/components/fetching/profile/profile";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileNewType } from "@/types/type";

export default function ProfilePage() {
  const token = Cookies.get("Authorization");
  const [profile, setProfile] = useState<ProfileNewType>();

  const fetchProfiles = async () => {
    try {
      const result = await fetchProfile();

      setProfile(result.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchProfiles();
  }, []);

  let gender = "";

  if (profile?.gender === 1) {
    gender = "Laki-laki";
  } else if (profile?.gender === 2) {
    gender = "Perempuan";
  }

  let agama = "";

  switch (profile?.agama) {
    case 1:
      agama = "Islam";
      break;
    case 2:
      agama = "Kristen";
      break;
    case 3:
      agama = "Katolik";
      break;
    case 4:
      agama = "Hindu";
      break;
    case 5:
      agama = "Buddha";
      break;
    case 6:
      agama = "Konghucu";
      break;
  }

  let pendidikan = "";

  switch (profile?.pendidikan) {
    case 1:
      pendidikan = "Tidak Sekolah";
      break;
    case 2:
      pendidikan = "SD";
      break;
    case 3:
      pendidikan = "SMP";
      break;
    case 4:
      pendidikan = "SMA";
      break;
    case 5:
      pendidikan = "Diploma 1";
      break;
    case 6:
      pendidikan = "Diploma 2";
      break;
    case 7:
      pendidikan = "Diploma 3";
      break;
    case 8:
      pendidikan = "Strata 1 / Diploma 4";
      break;
    case 9:
      pendidikan = "Strata 2";
      break;
    case 10:
      pendidikan = "Strata 3";
      break;
  }

  return (
    <div className="flex items-center justify-center w-full mb-[24px] pt-[24px] md:pb-[70px] bg-primary-100">
      <div className="flex flex-col items-center w-full mx-[35px] md:mx-[200px]">
        <div className="flex self-start mb-[32px]">
          <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
            Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg md:px-[75px] md:pt-[32px]">
          <div className="flex flex-col px-[16px] pt-[16px]">
            <div className="grid grid-rows-7 gap-2">
              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Nama Lengkap
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.name}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Jenis Kelamin
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {gender || "Harap Perbarui Data Diri Anda!"}
                  </label>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    NIK
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.nik}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Agama
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {agama || "Harap Perbarui Data Diri Anda!"}
                  </label>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Nomor Telepon
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.telepon}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Pendidikan
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {pendidikan || "Harap Perbarui Data Diri Anda!"}
                  </label>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Email
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.email}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Pekerjaan
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.pekerjaan || "Harap Perbarui Data Diri Anda!"}
                  </label>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Kecamatan
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.kecamatan_name}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Desa
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.desa_name}
                  </label>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    RT
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.rt}
                  </label>
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    RW
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile?.rw}
                  </label>
                </div>
              </div>

              <div className="flex flex-col w-full mb-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  Alamat
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile?.alamat}
                </label>
              </div>
            </div>

            <Link
              href={`/profile/detail/${profile?.slug}`}
              className="h-[40px] flex justify-center rounded-[50px] items-end md:items-center self-end md:self-center mb-[32px] md:mt-[32px]">
              <Button
                className="w-[90px] md:w-[290px] border border-primary-700 h-full md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50"
                type="submit"
                variant="secondary">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
