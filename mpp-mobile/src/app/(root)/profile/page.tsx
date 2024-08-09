"use client";

import picture from "@/../../public/assets/profile-picture.png";
import fetchProfile from "@/components/fetching/profile/profile";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DocumentResultType,
  ProfileNewType,
  UpdateUserType,
} from "@/types/type";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardDocumentInstansi from "@/components/profiles/cardDocumentInstansi/cardocumentInstansi";
import fetchHistoryDoc from "@/components/fetching/historyDoc/historyDoc";
import { StaticImageData } from "next/legacy/image";
import { Loader, X } from "lucide-react";
import { formatLongDate } from "@/helpers/logout/formatted";
import CardDocumentPendukung from "@/components/profiles/cardDocumentPendukung/cardDocumentPendukung";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import DataNotFound from "@/components/loading/dataNotFound";

export default function ProfilePage() {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const searchParams = useSearchParams();
  const dropRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<ProfileNewType>();
  const [newProfile, setNewProfile] = useState<UpdateUserType>();
  const [documents, setDocuments] = useState<DocumentResultType[]>();
  const [isTabs, setIsTabs] = useState<string>("Data Diri");
  const [fotoProfile, setFotoProfile] = useState<File | null>(null);
  const [previewPPImage, setPreviewPPImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [keys, setKeys] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const search = searchParams.get("tabs");

  useEffect(() => {
    if (search == "data-diri") {
      setIsTabs("Data Diri");
    } else if (search == "dokumen-pendukung") {
      setIsTabs("Dokumen Pendukung");
    }
  }, [search]);

  const fetchProfiles = async () => {
    try {
      const result = await fetchProfile();
      const docs = await fetchHistoryDoc();

      setProfile(result.data);
      setNewProfile(result.data);
      setDocuments(docs.data);
    } catch (error) {
      console.log(error);
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

  let statusKawin = "";

  switch (profile?.status_kawin) {
    case 1:
      statusKawin = "Belum Kawin";
      break;
    case 2:
      statusKawin = "Kawin";
      break;
    case 3:
      statusKawin = "Cerai Hidup";
      break;
    case 4:
      statusKawin = "Cerai Mati";
      break;
  }

  let golonganDarah = "";

  switch (profile?.goldar) {
    case 1:
      golonganDarah = "A";
      break;
    case 2:
      golonganDarah = "B";
      break;
    case 3:
      golonganDarah = "AB";
      break;
    case 4:
      golonganDarah = "O";
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

  let profileDate = "";

  if (profile?.tgl_lahir) {
    profileDate = formatLongDate(profile?.tgl_lahir);
  }

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    if (fotoProfile) {
      formData.append("fotoprofil", fotoProfile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/updatefoto/${profile?.slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: formData,
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate foto profile!",
          text: "Berhasil mengupdate foto profile!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsOpen(false);
        setIsLoading(false);
        fetchProfiles();
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.push("/profile");
    }
  };

  const handleFilePPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoProfile(file);
      setNewProfile({
        ...newProfile,
        fotoprofil: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFotoProfile(file);
      setNewProfile({
        ...newProfile,
        fotoprofil: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const documentPictures = [
    {
      name: "Pas Foto",
      value: profile?.foto,
    },
    {
      name: "Kartu Tanda Penduduk",
      value: profile?.filektp,
    },
    {
      name: "Akta Kelahiran",
      value: profile?.aktalahir,
    },
    {
      name: "Kartu Keluarga",
      value: profile?.filekk,
    },
    {
      name: "Ijazah Terakhir",
      value: profile?.fileijazahlain,
    },
  ];

  const SubmitNewKeys = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/changepassword/${profile?.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(keys),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Kata Sandi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
        setIsSeen(false);
        router.push("/profile");
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

  const handleChangeKeys = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKeys({
      ...keys,
      [name]: value,
    });
  };

  return (
    <section className="flex items-center justify-center w-full px-4 md:px-0 mb-32 pt-6 md:pb-16 bg-primary-100">
      <div className="flex flex-col items-center w-full md:mx-[200px]">
        <div className="flex self-start mb-6">
          <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
            Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-neutral-50 rounded-xl shadow-md md:px-[75px] md:pt-8">
          <div className="flex flex-col pt-4">
            <Tabs
              value={isTabs ? isTabs : "Data Diri"}
              onValueChange={(value) => setIsTabs(value)}
              className="flex flex-col md:gap-y-6 px-1">
              <TabsList className="py-0 w-full md:flex md:flex-row justify-between md:justify-start items-center">
                <TabsTrigger
                  className="font-semibold w-5/12 py-4 rounded-l-lg bg-neutral-200 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 border border-neutral-400 md:w-full px-0 text-primary-700 md:text-[20px]"
                  value="Data Diri">
                  <div className="text-[12px] md:text-[14px]">Data Diri</div>
                </TabsTrigger>

                <TabsTrigger
                  className="font-semibold w-5/12 py-1.5 rounded-none bg-neutral-200 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 border border-neutral-400 md:w-full px-3 text-primary-700 md:text-[20px]"
                  value="Dokumen Pendukung">
                  <div className="text-[12px] md:text-[14px] text-center">
                    Dokumen
                    <br />
                    Pendukung
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  className="font-semibold w-5/12 py-1.5 rounded-r-lg bg-neutral-200 data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 border border-neutral-400 md:w-full px-2 text-primary-700 md:text-[20px]"
                  value="Dokumen Terbit">
                  <div className="text-[12px] md:text-[14px] text-center">
                    Dokumen
                    <br />
                    Terbit
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col">
                <TabsContent value="Data Diri">
                  <div className="relative flex flex-col justify-center items-center w-full mt-6">
                    <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] border-2 border-dashed border-neutral-700 rounded-full shadow-md">
                      <Image
                        src={
                          profile?.fotoprofil
                            ? profile?.fotoprofil ||
                              (picture as StaticImageData).src
                            : (picture as StaticImageData).src
                        }
                        alt="Profile"
                        width={200}
                        height={200}
                        className="w-full h-full rounded-full object-cover object-center"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                          <DialogTrigger asChild>
                            <div
                              onClick={() => setIsOpen(true)}
                              className="w-6/12 md:w-4/12 flex items-center cursor-pointer justify-center bg-neutral-900 hover:bg-neutral-900 opacity-50 hover:opacity-80 rounded-md h-[30px] text-neutral-50 outline-none">
                              <h2 className="text-[14px] text-center w-full font-normal">
                                Edit
                              </h2>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col justify-between w-10/12 md:w-6/12 bg-neutral-50 rounded-xl">
                            <form
                              onSubmit={updateProfile}
                              className="flex flex-col w-full mt-2 md:mt-4">
                              <div className="flex flex-col w-full h-full mt-2 px-4">
                                <div className="flex flex-row w-full justify-between">
                                  <Label className="text-[20px] md:text-[32px] text-neutral-900 font-semibold text-start mb-2">
                                    Foto Profil
                                  </Label>

                                  <X
                                    onClick={() => setIsOpen(false)}
                                    className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
                                  />
                                </div>
                                <div className="flex flex-col w-full gap-y-5">
                                  {(previewPPImage ||
                                    newProfile?.fotoprofil ||
                                    picture) && (
                                    <div className="relative flex items-center self-center w-[150px] md:w-[200px] h-[150px] md:h-[200px] border-2 border-dashed border-neutral-800 rounded-full">
                                      <img
                                        src={
                                          previewPPImage ||
                                          newProfile?.fotoprofil ||
                                          (picture as StaticImageData)?.src
                                        }
                                        alt="Preview"
                                        className="h-full rounded-full w-full object-cover object-center"
                                      />
                                    </div>
                                  )}

                                  <div
                                    ref={dropRef}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDropPP}
                                    className={`w-full h-[100px] border-2 border-dashed border-neutral-800 rounded-xl mt-1 flex flex-col items-center justify-center `}>
                                    <>
                                      <input
                                        type="file"
                                        id="file-input-pp"
                                        name="fotoprofil"
                                        accept="image/*"
                                        onChange={handleFilePPChange}
                                        className="hidden"
                                      />
                                      <label
                                        htmlFor="file-input-pp"
                                        className="text-[16px] md:text-[20px] text-center text-neutral-800 p-2 md:p-4 font-light cursor-pointer">
                                        Drag and drop file here or click to
                                        select file
                                      </label>
                                    </>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-4 pr-2 md:pr-0">
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
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="flex flex-row justify-center items-center mt-4">
                      <Label className="font-semibold text-neutral-900 text-[20px]">
                        Foto Profil
                      </Label>
                    </div>
                  </div>

                  <div className="md:grid md:grid-rows-7 gap-2 md:mt-6 px-4 md:px-0">
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
                          Tempat Lahir
                        </label>

                        <label className="text-[12px] md:text-[14px] text-neutral-900">
                          {profile?.tempat_lahir ||
                            "Harap Perbarui Data Diri Anda!"}
                        </label>
                      </div>

                      <div className="flex flex-col w-full mb-2">
                        <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                          Golongan Darah
                        </label>

                        <label className="text-[12px] md:text-[14px] text-neutral-900">
                          {golonganDarah || "Harap Perbarui Data Diri Anda!"}
                        </label>
                      </div>
                    </div>

                    <div className="md:grid md:grid-cols-2">
                      <div className="flex flex-col w-full mb-2">
                        <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                          Tanggal Lahir
                        </label>

                        <label className="text-[12px] md:text-[14px] text-neutral-900">
                          {profileDate || "Harap Perbarui Data Diri Anda!"}
                        </label>
                      </div>

                      <div className="flex flex-col w-full mb-2">
                        <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                          Status Perkawinan
                        </label>

                        <label className="text-[12px] md:text-[14px] text-neutral-900">
                          {statusKawin || "Harap Perbarui Data Diri Anda!"}
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
                          {profile?.pekerjaan ||
                            "Harap Perbarui Data Diri Anda!"}
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

                  <div className="flex flex-row justify-center my-8 md:my-0 md:mt-4 md:mb-8 md:gap-x-4">
                    <Link
                      href={`/profile/detail/${
                        profile?.slug
                      }?tabs=${"data-diri"}`}
                      className="h-[40px] w-4/12 flex justify-center px-4 md:px-0 rounded-[50px] items-end md:items-center self-end md:self-center">
                      <Button
                        className="w-full border border-primary-700 h-full md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50"
                        type="submit"
                        variant="secondary">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => setIsSeen((prevState) => !prevState)}
                      className="w-4/12 font-normal border border-primary-700 h-full md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50">
                      Ganti Kata Sandi
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="Dokumen Pendukung">
                  <div className="flex flex-col w-full mt-6 mb-4 md:mb-0 px-4 md:px-0">
                    {profile &&
                      documentPictures?.map(
                        (
                          document: {
                            name: string;
                            value: string | undefined;
                          },
                          i: number
                        ) => {
                          return (
                            <div
                              key={i}
                              className="flex flex-col w-full gap-y-8">
                              <CardDocumentPendukung
                                document={{
                                  ...document,
                                  value: document.value!,
                                }}
                              />
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="flex flex-row justify-center mt-8 md:mt-4">
                    <Link
                      href={`/profile/detail/${
                        profile?.slug
                      }?tabs=${"dokumen-pendukung"}`}
                      className="h-[40px] w-4/12 flex justify-center px-4 md:px-0 rounded-[50px] items-end md:items-center self-end md:self-center mb-8 md:mt-8">
                      <Button
                        className="w-full md:w-full border border-primary-700 h-full md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50"
                        type="submit"
                        variant="secondary">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </div>

              <TabsContent value="Dokumen Terbit">
                <div className="flex flex-col w-full mt-6 md:mt-0 mb-6 px-4 md:px-0 gap-y-2">
                  {documents && documents.length > 0 ? (
                    <>
                      {documents &&
                        documents.length > 0 &&
                        documents?.map(
                          (document: DocumentResultType, i: number) => {
                            return (
                              <CardDocumentInstansi
                                key={i}
                                document={document}
                              />
                            );
                          }
                        )}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-[211px]">
                      <DataNotFound />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {isSeen && (
          <div className="flex flex-col w-full bg-neutral-50 rounded-xl shadow-md md:px-[75px] mt-4 p-4 md:pt-8 md:mt-6">
            <div className="flex self-start mb-6">
              <h5 className="text-[16px] md:text-[22px] font-semibold text-primary-800">
                Ganti Kata Sandi
              </h5>
            </div>

            <div className="flex flex-col w-full gap-y-4">
              <form
                onSubmit={SubmitNewKeys}
                className="flex flex-col w-full gap-y-4">
                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Kata Sandi Lama
                  </label>

                  <Input
                    type="password"
                    name="oldPassword"
                    value={keys.oldPassword}
                    onChange={handleChangeKeys}
                    placeholder="Kata Sandi Lama"
                    autoComplete="off"
                    className="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%] focus:outline-none active:outline-none"
                  />
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Kata Sandi Baru
                  </label>

                  <Input
                    type="password"
                    name="newPassword"
                    value={keys.newPassword}
                    onChange={handleChangeKeys}
                    placeholder="Kata Sandi Baru"
                    autoComplete="off"
                    className="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%] focus:outline-none active:outline-none"
                  />
                </div>

                <div className="flex flex-col w-full mb-2">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Konfirmasi Kata Sandi Baru
                  </label>

                  <Input
                    type="password"
                    name="confirmNewPassword"
                    value={keys.confirmNewPassword}
                    onChange={handleChangeKeys}
                    placeholder="Konfirmasi Kata Sandi Baru"
                    autoComplete="off"
                    className="w-full pl-4 mt-1 h-[40px] border border-neutral-700 placeholder:opacity-[70%] focus:outline-none active:outline-none"
                  />
                </div>

                <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-4">
                  <Button
                    className="w-full h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                    type="submit"
                    variant="success"
                    disabled={isLoading ? true : false}>
                    {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
