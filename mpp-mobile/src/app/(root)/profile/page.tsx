"use client";

import fetchProfile from "@/components/fetching/profile/profile";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileNewType } from "@/types/type";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const token = Cookies.get("Authorization");
  const [profile, setProfile] = useState<ProfileNewType>();
  const [modalImage, setModalImage] = useState<string>();

  const handleImageClick = (image: string) => {
    setModalImage(image);
  };

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
    <section className="flex items-center justify-center w-full mb-32 pt-6 md:pb-16 bg-primary-100">
      <div className="flex flex-col items-center w-full mx-8 md:mx-[200px]">
        <div className="flex self-start mb-6">
          <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
            Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-neutral-50 rounded-2xl shadow-md md:px-[75px] md:pt-8">
          <div className="flex flex-col px-4 pt-4">
            <div className="md:grid md:grid-rows-7 gap-2">
              <h3 className="text-primary-800 font-semibold text-[20px]">
                Data Diri
              </h3>

              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col w-full mb-2 pt-4 md:pt-0">
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

              <div className="flex flex-col w-full mt-6 md:mt-0 mb-6 md:mb-0">
                <h3 className="text-primary-800 font-semibold text-[20px] md:mt-6">
                  Dokumen Pendukung
                </h3>

                <div className="md:grid md:grid-cols-2">
                  <div className="flex flex-col mt-6">
                    <Label className="text-[14px] md:text-[16px] text-neutral-900 font-semibold text-start mb-2">
                      Kartu Tanda Penduduk (KTP)
                    </Label>

                    {profile?.filektp && (
                      <div className="w-full h-full cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              onClick={() =>
                                handleImageClick(profile?.filektp || "")
                              }>
                              <Image
                                src={profile.filektp}
                                className="w-6/12 h-full object-cover rounded-xl"
                                alt="KTP"
                                width={100}
                                height={100}
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <div className="min-w-[400px] md:min-w-[800px]">
                              <Image
                                src={modalImage || ""}
                                className="w-full h-full object-cover rounded-xl"
                                alt="Preview"
                                width={500}
                                height={500}
                              />
                            </div>

                            <DialogClose />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mt-6">
                    <Label className="text-[14px] md:text-[16px] text-neutral-900 font-semibold text-start mb-2">
                      Kartu Keluarga(KK)
                    </Label>

                    {profile?.filekk && (
                      <div className="w-full h-full cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              onClick={() =>
                                handleImageClick(profile?.filekk || "")
                              }>
                              <Image
                                src={profile.filekk}
                                className="w-6/12 h-full object-cover rounded-xl"
                                alt="KK"
                                width={100}
                                height={100}
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <div className="min-w-[400px] md:min-w-[800px]">
                              <Image
                                src={modalImage || ""}
                                className="w-full h-full object-cover rounded-xl"
                                alt="Preview"
                                width={500}
                                height={500}
                              />
                            </div>

                            <DialogClose />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mt-6">
                    <Label className="text-[14px] md:text-[16px] text-neutral-900 font-semibold text-start mb-2">
                      Ijazah Terakhir
                    </Label>

                    {profile?.fileijazahsd && (
                      <div className="w-full h-full cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              onClick={() =>
                                handleImageClick(profile?.fileijazahsd || "")
                              }>
                              <Image
                                src={profile.fileijazahsd}
                                className="w-6/12 h-full object-cover rounded-xl"
                                alt="Ijazah Terakhir"
                                width={100}
                                height={100}
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <div className="min-w-[400px] md:min-w-[800px]">
                              <Image
                                src={modalImage || ""}
                                className="w-full h-full object-cover rounded-xl"
                                alt="Preview"
                                width={500}
                                height={500}
                              />
                            </div>

                            <DialogClose />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/profile/detail/${profile?.slug}`}
              className="h-[40px] w-4/12 flex justify-center rounded-[50px] items-end md:items-center self-end md:self-center mb-8 md:mt-8">
              <Button
                className="w-full md:w-full border border-primary-700 h-full md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50"
                type="submit"
                variant="secondary">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
