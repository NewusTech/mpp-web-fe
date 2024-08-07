"use client";

import SearchComponent from "@/components/others/searchComponent/searchComponent";
import backHome from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Loader, CircleX } from "lucide-react";
import CardPengaduanComponent from "@/components/pengaduan/cardPengaduanComponent/cardPengaduanComponent";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Instansi,
  JenisLayananType,
  PengaduanFormType,
  PengaduanType,
  ProfileNewType,
} from "@/types/type";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import fetchPengaduanLists from "@/components/fetching/pengaduan/pengaduan";
import PaginationComponent from "@/components/pagination/paginationComponent";
import z from "zod";
import { formatDateArrange, formatLongDate } from "@/helpers/logout/formatted";
import LoadingComponent from "@/components/loading/LoadingComponent";
import Link from "next/link";
import fetchInstansiPengaduan from "@/components/fetching/instansi/pengaduanInstansi";
import LayananPengaduan from "@/components/fetching/layanan/layananPengaduan/layananPengaduan";
import { statusPengaduans } from "@/data/data";
import { formatCreateTime } from "@/utils/formatTime";
import InputDate from "@/components/others/inputDate/inputDate";
import Swal from "sweetalert2";
import DataNotFound from "@/components/loading/dataNotFound";
import FetchLayananAdminName from "@/components/fetching/layananAdminName/layananAdminName";

const schema = z.object({
  judul: z.string().refine((val) => val !== "", "Judul harus diisi"),
  aduan: z
    .string()
    .min(3, "Aduan harus terdiri dari minimal 3 karakter")
    .refine((val) => val !== "", "Aduan harus diisi"),
  layanan_id: z.string({ message: "Pilih Layanan" }),
  instansi_id: z.string({ message: "Pilih Instansi" }),
  image: z.string().refine((val) => val !== "", "Gambar harus diisi"),
});

export default function PengaduanScreen() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [pengaduanlists, setPengaduanLists] = useState<PengaduanType[]>();
  const [pengaduan, setPengaduan] = useState<PengaduanFormType>({
    instansi_id: 0,
    layanan_id: 0,
    admin_id: 0,
    status: 0,
    aduan: "",
    judul: "",
    image: "",
  });
  const [status, setStatus] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [pengaduanImage, setPengaduanImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [instansi, setInstansi] = useState<Instansi[]>([]);
  const [service, setService] = useState<JenisLayananType[]>([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [isOpen, setIsOpen] = useState(false);
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [pengaduanPage, setPengaduanPage] = useState<number>(1);
  const itemsPerPage = 5;
  const limitData = 1000000;
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const token = Cookies.get("Authorization");
  const [loadingData, setLoadingData] = useState(false);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [layanans, setLayanans] = useState<ProfileNewType[]>();

  const validateForm = async () => {
    try {
      await schema.parseAsync({
        ...pengaduan,
        layanan_id: String(pengaduan.layanan_id),
        instansi_id: String(pengaduan.instansi_id),
        image: String(pengaduanImage),
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
  }, [pengaduanImage, pengaduan, hasSubmitted]);

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, []);

  const startDateFormatted = startDate
    ? formatDateArrange(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate
    ? formatDateArrange(new Date(endDate))
    : undefined;

  const fetchPengaduanList = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string,
    status: string
  ) => {
    setLoadingData(true);
    try {
      const pengaduans = await fetchPengaduanLists(
        page,
        limit,
        search,
        startDate,
        endDate,
        status
      );

      setPengaduanLists(pengaduans.data);
      setLoadingData(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    const fetchStatus = status === "4" ? "" : status;

    if (startDateFormatted && endDateFormatted) {
      fetchPengaduanList(
        1,
        limitData,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        fetchStatus
      );
    }
  }, [debounceSearch, startDateFormatted, endDateFormatted, status]);

  const fetchLayananName = async (id: number) => {
    try {
      const layanans = await FetchLayananAdminName(id);

      setLayanans(layanans.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pengaduan.layanan_id) {
      fetchLayananName(pengaduan.layanan_id);
    }
  }, [pengaduan.layanan_id]);

  const paginate = (
    items: PengaduanType[],
    pageNumber: number,
    itemsPerPage: number
  ) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const pengaduanPaginate = paginate(
    pengaduanlists || [],
    pengaduanPage,
    itemsPerPage
  );

  const fetchInstance = async (
    page: number,
    limit: number,
    pengaduan: boolean
  ) => {
    try {
      const res = await fetchInstansiPengaduan(page, limit, pengaduan);

      setInstansi(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstance(1, limitData, true);
  }, []);

  const fetchLayanan = async (id: number, pengaduan: boolean) => {
    try {
      const layananByInstansi = await LayananPengaduan(id, pengaduan);

      setService(layananByInstansi.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectStatusChange = (statusPengaduan: string) => {
    setStatus(statusPengaduan);
  };

  const handleInstansiChange = (selectedInstansiId: string): void => {
    const instansiId = parseInt(selectedInstansiId);

    setPengaduan((prevState) => ({
      ...prevState,
      instansi_id: instansiId,
      layanan_id: 0,
    }));

    if (instansiId) {
      fetchLayanan(instansiId, true);
    } else {
      setService([]);
    }
  };

  const handleLayananChange = (selectedLayananId: string) => {
    setPengaduan((prevState) => ({
      ...prevState,
      layanan_id: parseInt(selectedLayananId),
    }));
  };

  const handleAdminChange = (selectedLayananId: string) => {
    setPengaduan((prevState) => ({
      ...prevState,
      admin_id: parseInt(selectedLayananId),
    }));
  };

  const handlePengaduan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    const formData = new FormData();
    formData.append("instansi_id", String(pengaduan.instansi_id));
    formData.append("layanan_id", String(pengaduan.layanan_id));
    formData.append("admin_id", String(pengaduan.admin_id));
    formData.append("status", String(0));
    formData.append("aduan", pengaduan.aduan);
    formData.append("judul", pengaduan.judul);
    if (pengaduanImage) {
      formData.append("image", pengaduanImage);
    }

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/pengaduan/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
            },
            body: formData,
            cache: "no-store",
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Berhasil mengajukan pengaduan!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          setPengaduan({
            instansi_id: 0,
            layanan_id: 0,
            admin_id: 0,
            status: 0,
            aduan: "",
            judul: "",
            image: "",
          });
          setPreviewImage("");
          setIsOpen(false);
          fetchPengaduanList(1, limitData, "", "", "", status);
          setFormErrors({});
        } else {
          setIsOpen(true);
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
            Swal.fire({
              icon: "error",
              title: "Gagal mengajukan pengaduan!",
              timer: 2000,
              showConfirmButton: false,
              position: "center",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengajukan pengaduan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
        router.push("/pengaduan");
      }
    }
  };

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPengaduan({ ...pengaduan, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPengaduanImage(file);
      setPengaduan({
        ...pengaduan,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setChangeOpacity(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPengaduanImage(file);
      setPengaduan({
        ...pengaduan,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveFile = () => {
    setPengaduanImage(null);
    setPreviewImage("");
    setPengaduan({ ...pengaduan, image: "" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsWideScreen(true);
      } else {
        setIsWideScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col bg-primary-100 mt-3 mx-[35px] md:mx-[70px] md:mb-5 pb-[124px]">
      <div>
        <h1 className="text-[20px] md:text-[26px] text-primary-800 font-semibold">
          Pengaduan Layanan
        </h1>

        <div className="w-full mt-4">
          <div className="md:flex md:flex-row md:justify-end md:mb-6 gap-x-3">
            <div className="flex flex-row w-full gap-x-4">
              <div className="flex items-center w-full md:w-6/12 h-[40px] justify-between bg-neutral-50 border border-neutral-700 rounded-[50px] mb-2 md:mb-0">
                <Select onValueChange={handleSelectStatusChange}>
                  <SelectTrigger
                    className={`w-full px-2 md:px-4 text-[14px] rounded-xl border-none items-center active:border-none active:outline-none focus:border-none focus:outline-none`}>
                    <SelectValue
                      placeholder="Pilih By Status"
                      className="text-neutral-800 w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="pt-2">
                      {statusPengaduans &&
                        statusPengaduans.map(
                          (
                            status: { id: number; value: string },
                            i: number
                          ) => {
                            return (
                              <SelectItem
                                key={i}
                                className={`w-full px-4`}
                                value={status.id.toString()}>
                                {status.value}
                              </SelectItem>
                            );
                          }
                        )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <SearchComponent change={handleSearch} search={search} />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center w-full md:w-5/12 gap-x-1 md:gap-x-3">
              <InputDate
                date={startDate ?? null}
                setDate={(e) => setStartDate(e ?? undefined)}
              />
              <p className="text-center">to</p>
              <InputDate
                date={endDate ?? null}
                setDate={(e) => setEndDate(e ?? undefined)}
              />
            </div>

            <div className="w-full md:w-4/12 flex flex-row justify-end mt-6 md:mt-0">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <div
                    onClick={() => setIsOpen(true)}
                    className="w-6/12 md:w-full flex items-center cursor-pointer justify-center bg-primary-700 hover:bg-primary-800 rounded-[50px] h-[40px] text-neutral-50 outline outline-1 outline-neutral-500">
                    <h2 className="text-[14px] text-center w-full font-normal">
                      Ajukan Pegaduan
                    </h2>
                  </div>
                </DialogTrigger>
                <DialogContent className="flex flex-col justify-between max-h-[600px] md:max-h-[700px] w-10/12 md:w-5/12 bg-neutral-50 rounded-xl">
                  <div className="flex flex-col w-full verticalScroll">
                    <form
                      onSubmit={handlePengaduan}
                      className="flex flex-col w-full">
                      <div className="flex flex-col w-full px-4 md:px-[80px]">
                        <div className="flex flex-col w-full mb-[10px] md:mb-1 mx-[1px] mt-6">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Pilih Instansi
                          </Label>

                          <Select
                            name="instansi_id"
                            onValueChange={handleInstansiChange}>
                            <SelectTrigger
                              className={`${
                                !pengaduan.instansi_id ? "opacity-50" : ""
                              } border border-neutral-800 rounded-[50px] w-full mx-0 pr-2`}>
                              <SelectValue
                                placeholder="Pilih Dinas"
                                className={
                                  pengaduan.instansi_id
                                    ? ""
                                    : "placeholder:opacity-50"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full md:w-full">
                              <div>
                                {instansi.map((item: Instansi, i: number) => (
                                  <SelectItem
                                    key={i}
                                    value={item.id.toString()}
                                    className="pr-none">
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>

                          {hasSubmitted && errors?.instansi_id?._errors && (
                            <div className="text-error-700 text-[12px] md:text-[14px]">
                              {errors.instansi_id._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col mx-[1px] md:mt-4">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Pilih Layanan
                          </Label>

                          <Select
                            name="layanan_id"
                            onValueChange={handleLayananChange}>
                            <SelectTrigger
                              className={`${
                                !pengaduan.layanan_id ? "opacity-50" : ""
                              } border border-neutral-800 rounded-[50px] w-full mx-0 pr-2`}>
                              <SelectValue
                                placeholder="Pilih Jenis Layanan"
                                className={
                                  pengaduan.layanan_id
                                    ? ""
                                    : "placeholder:opacity-50"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full md:w-full">
                              <div>
                                {service.map(
                                  (item: JenisLayananType, i: number) => (
                                    <SelectItem
                                      key={i}
                                      value={item.id.toString()}
                                      className="pr-none">
                                      {item.name}
                                    </SelectItem>
                                  )
                                )}
                              </div>
                            </SelectContent>
                          </Select>

                          {hasSubmitted && errors?.layanan_id?._errors && (
                            <div className="text-error-700 text-[12px] md:text-[14px]">
                              {errors.layanan_id._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col mx-[1px] md:mt-4">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Loket Admin
                          </Label>

                          <Select
                            name="admin_id"
                            onValueChange={handleAdminChange}>
                            <SelectTrigger
                              className={`${
                                !pengaduan.admin_id ? "opacity-50" : ""
                              } border border-neutral-800 rounded-[50px] w-full mx-0 pr-2`}>
                              <SelectValue
                                placeholder="Pilih Loket Admin"
                                className={
                                  pengaduan.admin_id
                                    ? ""
                                    : "placeholder:opacity-50"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full md:w-full">
                              <div>
                                {layanans?.map(
                                  (item: ProfileNewType, i: number) => (
                                    <SelectItem
                                      key={i}
                                      value={item.id.toString()}
                                      className="pr-none">
                                      {item.name}
                                    </SelectItem>
                                  )
                                )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col my-[10px] md:my-4 mx-[1px]">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Judul Pengaduan
                          </Label>

                          <input
                            type="text"
                            name="judul"
                            value={pengaduan.judul}
                            onChange={handleChange}
                            placeholder="Judul Pengaduan"
                            className={`w-full pl-4 h-[40px] border border-neutral-700 rounded-[50px] pr-2 placeholder:text-[14px] focus:outline-none appearance-none`}
                          />

                          {hasSubmitted && errors?.judul?._errors && (
                            <div className="text-error-700 text-[12px] md:text-[14px]">
                              {errors.judul._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col mx-[1px]">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Aduan
                          </Label>

                          <Textarea
                            name="aduan"
                            value={pengaduan.aduan}
                            onChange={handleChange}
                            className="w-full text-[14px] placeholder:text-[14px] border border-neutral-700 placeholder:opacity-[40%]"
                            placeholder="Aduan"
                          />

                          {formErrors["aduan"] && (
                            <p className="text-error-700 text-[12px] mt-1 text-center">
                              {formErrors["aduan"]}
                            </p>
                          )}

                          {hasSubmitted && errors?.aduan?._errors && (
                            <div className="text-error-700 text-[12px] md:text-[14px]">
                              {errors.aduan._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col my-[10px] md:mt-3 mx-[1px]">
                          <Label className="text-[12px] md:text-[14px] text-neutral-900 font-semibold text-start mb-2">
                            Dokumen
                          </Label>

                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`w-full h-[100px] border-2 border-dashed border-neutral-700 rounded-xl mt-1 flex flex-col items-center justify-center ${
                              changeOpacity ? "opacity-50" : "opacity-100"
                            }`}>
                            <>
                              <input
                                type="file"
                                id="file-input"
                                name="image"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input"
                                className="text-[16px] text-center text-neutral-600 font-light cursor-pointer">
                                {pengaduan.image
                                  ? pengaduan.image
                                  : "Drag and drop file here or click to select file"}
                              </label>
                            </>
                          </div>

                          {hasSubmitted && errors?.image?._errors && (
                            <div className="text-error-700 text-[12px] md:text-[14px]">
                              {errors.image._errors[0]}
                            </div>
                          )}
                        </div>

                        {previewImage && (
                          <div className="relative flex flex-row justify-center max-w-full max-h-full">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="max-h-full rounded-xl p-2 max-w-full object-contain"
                            />

                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="absolute bg-none -top-1 -right-5 text-neutral-800 p-1">
                              <CircleX />
                            </button>
                          </div>
                        )}

                        <div className="flex justify-center mb-[32px] mt-[16px]">
                          <Button
                            className="text-[14px] text-neutral-50 w-[120px] md:w-[235px] h-[40px] md:h-[40px]"
                            type="submit"
                            disabled={!formValid || isLoading}
                            variant="warning">
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Ajukan"
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {pengaduanlists && pengaduanlists?.length > 0 ? (
            <div className="flex flex-col">
              {!isWideScreen ? (
                <>
                  {pengaduanlists &&
                    pengaduanPaginate?.map(
                      (pengaduan: PengaduanType, i: number) => {
                        return (
                          <CardPengaduanComponent
                            key={i}
                            pengaduan={pengaduan}
                          />
                        );
                      }
                    )}

                  <div className="md:flex md:justify-end">
                    <PaginationComponent
                      totalItems={pengaduanlists?.length || 0}
                      itemsPerPage={itemsPerPage}
                      currentPage={pengaduanPage}
                      onPageChange={setPengaduanPage}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Table className="flex flex-col w-full">
                    <TableHeader className="flex w-full">
                      <TableRow className="flex flex-row w-full">
                        <TableHead className="w-2/12 bg-primary-400 flex justify-center">
                          No
                        </TableHead>
                        <TableHead className="w-1/2 bg-primary-400">
                          Hari / Tanggal
                        </TableHead>
                        <TableHead className="w-1/3 bg-primary-400">
                          Waktu
                        </TableHead>
                        <TableHead className="w-10/12 bg-primary-400">
                          Instansi
                        </TableHead>
                        <TableHead className="w-10/12 bg-primary-400">
                          Layanan
                        </TableHead>
                        <TableHead className="w-full bg-primary-400">
                          Judul Pengaduan
                        </TableHead>
                        <TableHead className="w-1/2 bg-primary-400 pr-4">
                          Status
                        </TableHead>
                        <TableHead className="w-3/12 bg-primary-400">
                          Aksi
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <>
                        {pengaduanlists &&
                          pengaduanPaginate?.map(
                            (pengaduan: PengaduanType, i: number) => {
                              const datePengaduan = pengaduan.createdAt;
                              const date = new Date(datePengaduan);
                              const daysInIndonesian = [
                                "Minggu",
                                "Senin",
                                "Selasa",
                                "Rabu",
                                "Kamis",
                                "Jumat",
                                "Sabtu",
                              ];
                              const dayName = daysInIndonesian[date.getDay()];

                              let datePengaduanFormatted = "";
                              if (datePengaduan) {
                                datePengaduanFormatted = formatLongDate(
                                  `${datePengaduan}`
                                );
                              }

                              let pengaduanTime = "";
                              if (pengaduan.createdAt) {
                                pengaduanTime = formatCreateTime(
                                  pengaduan.createdAt
                                );
                              }

                              let statusColor = "";

                              switch (pengaduan?.status) {
                                case 1:
                                  statusColor = "text-secondary-700";
                                  break;
                                case 2:
                                  statusColor = "text-warning-700";
                                  break;
                                case 0:
                                  statusColor = "text-primary-700";
                                  break;
                                case 3:
                                  statusColor = "text-success-700";
                                  break;
                                default:
                                  statusColor = "text-success-700";
                                  break;
                              }

                              return (
                                <TableRow key={i}>
                                  <TableCell className="w-2/12 flex justify-center">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell className="w-1/2">
                                    {dayName}, {datePengaduanFormatted}
                                  </TableCell>
                                  <TableCell className="w-1/3">
                                    {pengaduanTime} WIB
                                  </TableCell>
                                  <TableCell className="w-10/12">
                                    {pengaduan.Instansi.name}
                                  </TableCell>
                                  <TableCell className="w-10/12">
                                    {pengaduan.Layanan.name}
                                  </TableCell>
                                  <TableCell className="w-full">
                                    {pengaduan.judul}
                                  </TableCell>
                                  <TableCell className={`w-1/2 ${statusColor}`}>
                                    {pengaduan.status === 0
                                      ? "Belum diproses"
                                      : pengaduan.status === 1
                                      ? "Sedang ditindak lanjuti"
                                      : pengaduan.status === 2
                                      ? "Sudah ditindak lanjuti"
                                      : "Selesai"}
                                  </TableCell>
                                  <TableCell className="w-3/12">
                                    {pengaduan.status === 0 ||
                                    pengaduan.status === 1 ||
                                    pengaduan.status === 2 ? (
                                      <div className="w-full flex items-center justify-center text-[14px] px-6 py-4 h-[20px] cursor-not-allowed text-center rounded-full bg-neutral-700 hover:bg-neutral-600">
                                        Lihat
                                      </div>
                                    ) : (
                                      <Link
                                        href={`/pengaduan/${pengaduan.id}/pengaduan-hasil`}
                                        className="w-full flex items-center justify-center text-neutral-900 text-[14px] px-6 py-4 h-[20px] cursor-pointer text-center rounded-full bg-secondary-700 hover:bg-secondary-600">
                                        Lihat
                                      </Link>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                      </>
                    </TableBody>
                  </Table>

                  <div className="md:flex md:justify-end">
                    <PaginationComponent
                      totalItems={pengaduanlists?.length || 0}
                      itemsPerPage={itemsPerPage}
                      currentPage={pengaduanPage}
                      onPageChange={setPengaduanPage}
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {loadingData ? (
                <div className="container mx-auto flex mt-6 flex-col md:w-full justify-center items-center w-full h-full">
                  <LoadingComponent />
                </div>
              ) : (
                <DataNotFound />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
