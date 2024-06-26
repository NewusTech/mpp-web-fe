"use client";

import SearchComponent from "@/components/others/searchComponent/searchComponent";
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
} from "@/types/type";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import ByInstansi from "@/components/fetching/layanan/layananByInstansi/byInstansi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import fetchPengaduanLists from "@/components/fetching/pengaduan/pengaduan";
import PaginationComponent from "@/components/pagination/paginationComponent";
import Image from "next/image";

export default function PengaduanScreen() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [pengaduanlists, setPengaduanLists] = useState<PengaduanType[]>();
  const [pengaduan, setPengaduan] = useState<PengaduanFormType>({
    instansi_id: 0,
    layanan_id: 0,
    status: 0,
    aduan: "",
    judul: "",
    image: "",
  });
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

  const fetchPengaduanList = async (page: number, limit: number) => {
    try {
      const pengaduans = await fetchPengaduanLists(page, limit);

      setPengaduanLists(pengaduans.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchPengaduanList(1, limitData);
  }, []);

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

  const fetchInstance = async (search: string) => {
    try {
      const res = await fetchInstansi(search, 1, limitData);

      setInstansi(res.data || []);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchInstance(debounceSearch);
  }, [debounceSearch]);

  const fetchLayanan = async (id: number) => {
    try {
      const layananByInstansi = await ByInstansi(id);

      setService(layananByInstansi.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  const handleInstansiChange = (selectedInstansiId: string): void => {
    const instansiId = parseInt(selectedInstansiId);

    setPengaduan((prevState) => ({
      ...prevState,
      instansi_id: instansiId,
      layanan_id: 0,
    }));

    if (instansiId) {
      fetchLayanan(instansiId);
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

  const handlePengaduan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("instansi_id", String(pengaduan.instansi_id));
    formData.append("layanan_id", String(pengaduan.layanan_id));
    formData.append("status", String(0));
    formData.append("aduan", pengaduan.aduan);
    formData.append("judul", pengaduan.judul);
    if (pengaduanImage) {
      formData.append("image", pengaduanImage);
    }

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
        toast.success("Berhasil mengajukan pengaduan!");
        setPengaduan({
          instansi_id: 0,
          layanan_id: 0,
          status: 0,
          aduan: "",
          judul: "",
          image: "",
        });
        setPreviewImage("");
        setIsOpen(false);
        setFormErrors({});
        router.push("/pengaduan");
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
          toast.error("Gagal mengajukan pengaduan!");
        }
      }
    } catch (error) {
      toast("Gagal mengajukan pengaduan!");
    } finally {
      setIsLoading(false);
    }
  };

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

  const isFormValid = () => {
    return (
      pengaduan.instansi_id !== 0 &&
      pengaduan.layanan_id !== 0 &&
      pengaduan.judul.trim() !== "" &&
      pengaduan.aduan.trim() !== "" &&
      pengaduan.image.trim() !== ""
    );
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
    <div className="flex flex-col bg-primary-100 mt-3 mx-[35px] md:mx-[170px] md:mb-5 pb-[124px]">
      <div>
        <h1 className="text-[20px] md:text-[26px] text-primary-800 font-bold">
          Pengaduan Layanan
        </h1>

        <div className="w-full mt-4">
          <div className="md:flex md:justify-end md:mb-[24px]">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div
                  onClick={() => setIsOpen(true)}
                  className="w-[170px] flex items-center justify-center bg-primary-700 hover:bg-primary-800 rounded-[50px] h-[40px] text-neutral-50 outline outline-1 outline-neutral-500">
                  <h2 className="text-[14px] text-center w-full font-normal">
                    Ajukan Pegaduan
                  </h2>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col justify-between w-[300px] md:w-[620px] bg-white rounded-2xl px-[16px]">
                <form
                  onSubmit={handlePengaduan}
                  className="flex flex-col w-full">
                  <div className="flex flex-col w-full px-[16px] md:px-[105px]">
                    <div className="flex flex-col w-full mb-[10px] md:mb-1 mx-[1px] mt-[62px]">
                      <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
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
                            <div className="w-full px-2 mt-2">
                              <SearchComponent
                                change={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearch(e.target.value)}
                                search={search}
                              />
                            </div>

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
                    </div>

                    <div className="flex flex-col mx-[1px] mt-4">
                      <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
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
                    </div>

                    <div className="flex flex-col my-[10px] md:my-4 mx-[1px]">
                      <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                        Judul Pengajuan
                      </Label>

                      <input
                        type="text"
                        name="judul"
                        value={pengaduan.judul}
                        onChange={handleChange}
                        placeholder="Judul Pengajuan"
                        className={`w-full pl-4 h-[40px] border border-neutral-500 rounded-[50px] pr-2 placeholder:text-[12px] focus:outline-none appearance-none`}
                      />
                    </div>

                    <div className="flex flex-col mx-[1px]">
                      <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                        Aduan
                      </Label>

                      <Textarea
                        name="aduan"
                        value={pengaduan.aduan}
                        onChange={handleChange}
                        className="w-full text-[14px] border border-neutral-500 placeholder:opacity-[40%]"
                        placeholder="Aduan"
                      />

                      {formErrors["aduan"] && (
                        <p className="text-error-700 text-[12px] mt-1 text-center">
                          {formErrors["aduan"]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col my-[10px] md:mt-3 mx-[1px]">
                      <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                        Dokumen
                      </Label>

                      <div
                        ref={dropRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`w-full h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center ${
                          changeOpacity ? "opacity-50" : "opacity-100"
                        }`}>
                        {previewImage ? (
                          <div className="relative max-w-full max-h-full">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="max-h-full rounded-xl p-2 max-w-full object-contain"
                            />

                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="absolute bg-none -top-1 -right-28 text-neutral-800 p-1">
                              <CircleX />
                            </button>
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="file-input"
                              name="image"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="file-input"
                              className="text-[16px] text-neutral-600 font-light cursor-pointer">
                              {pengaduan.image
                                ? pengaduan.image
                                : "Drag and drop file here or click to select file"}
                            </label>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center mb-[32px] mt-[16px]">
                      <Button
                        className="text-[14px] text-neutral-50 w-[120px] md:w-[235px] h-[40px] md:h-[40px]"
                        type="submit"
                        disabled={isLoading || !isFormValid()}
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
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col">
            {!isWideScreen ? (
              <>
                {pengaduanlists &&
                  pengaduanlists.map((pengaduan: PengaduanType, i: number) => {
                    return (
                      <CardPengaduanComponent key={i} pengaduan={pengaduan} />
                    );
                  })}
              </>
            ) : (
              <>
                <Table className="flex flex-col w-full">
                  <TableHeader className="flex w-full">
                    <TableRow className="flex flex-row w-full">
                      <TableHead className="w-1/2 bg-primary-400">No</TableHead>
                      <TableHead className="w-full bg-primary-400">
                        Instansi
                      </TableHead>
                      <TableHead className="w-full bg-primary-400">
                        Layanan
                      </TableHead>
                      <TableHead className="w-full bg-primary-400">
                        Judul Pengaduan
                      </TableHead>
                      <TableHead className="w-2/3 bg-primary-400">
                        Status
                      </TableHead>
                      <TableHead className="w-1/2 bg-primary-400">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pengaduanlists &&
                      pengaduanPaginate?.map(
                        (pengaduan: PengaduanType, i: number) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className="w-1/2">{i + 1}</TableCell>
                              <TableCell className="w-full">
                                {pengaduan.instansi_id}
                              </TableCell>
                              <TableCell className="w-full">
                                {pengaduan.layanan_id}
                              </TableCell>
                              <TableCell className="w-full">
                                {pengaduan.judul}
                              </TableCell>
                              <TableCell className="w-2/3">
                                {pengaduan.status === 0
                                  ? "Belum diproses"
                                  : pengaduan.status === 1
                                  ? "Sedang ditindak lanjuti"
                                  : pengaduan.status === 2
                                  ? "Sudah ditindak lanjuti"
                                  : "Selesai"}
                              </TableCell>
                              <TableCell className="w-1/2">
                                <Dialog>
                                  <DialogTrigger>
                                    <div className="w-[48px] h-[18px] rounded-xl text-[8px] bg-secondary-700 hover:bg-secondary-600">
                                      Lihat
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="flex flex-col justify-between w-[325px] md:w-[620px] bg-white rounded-2xl">
                                    <div className="flex flex-col mx-[32px] my-[32px]">
                                      <div className="flex flex-col gap-[14px]">
                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Instansi
                                          </p>

                                          <p className="text-[16px] text-neutral-900 font-normal">
                                            {pengaduan.instansi_id}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Layanan
                                          </p>

                                          <p className="text-[16px] text-neutral-900 font-normal">
                                            {pengaduan.layanan_id}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Judul Pengaduan
                                          </p>

                                          <p className="text-[16px] text-neutral-900 font-normal">
                                            {pengaduan.judul}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Aduan
                                          </p>

                                          <p className="text-[16px] text-neutral-900 font-normal">
                                            {pengaduan.aduan}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Dokumen
                                          </p>

                                          <div className="md:w-1/2 md:h-1/2">
                                            {pengaduan.image && (
                                              <Image
                                                className="md:w-full md:h-full rounded-xl"
                                                width={100}
                                                height={100}
                                                src={pengaduan.image}
                                                alt={pengaduan.judul}
                                              />
                                            )}
                                          </div>
                                        </div>

                                        <div className="flex flex-col gap-[8px]">
                                          <p className="text-[16px] text-primary-900 font-semibold">
                                            Balasan
                                          </p>

                                          <p className="text-[16px] text-neutral-900 font-normal">
                                            {pengaduan.jawaban ||
                                              "Belum ada balasan!"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
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
        </div>
      </div>
    </div>
  );
}
