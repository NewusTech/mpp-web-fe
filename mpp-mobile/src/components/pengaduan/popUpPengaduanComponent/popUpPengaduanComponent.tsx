"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const instances = [
  {
    id: 1,
    name: "Dinas Pendidikan",
  },
  {
    id: 2,
    name: "Dinas Kependudukan",
  },
  {
    id: 3,
    name: "Dinas Kesehatan",
  },
];

const services = [
  {
    id: 1,
    name: "Pembuatan KTP",
  },
  {
    id: 2,
    name: "Pembuatan Kartu Keluarga",
  },
  {
    id: 3,
    name: "Pembuatan Surat Pindah",
  },
];

export default function PopUpPengaduanComponent() {
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [changeOpacity, setChangeOpacity] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectChangeDinas = (value: any) => {
    setSelected(value);
  };

  const handleSelectChangeLayanan = (value: any) => {
    setSelected(value);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setChangeOpacity(true);
  };

  const handleSubmit = () => {
    setIsOpen(false);
    toast("Berhasil membuat pengaduan!", { duration: 1000 });
  };

  return (
    <div className="md:flex md:justify-end md:mb-[24px]">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className="w-[170px] flex items-center justify-center bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] h-[40px] text-[#FEFEFE] outline outline-1 outline-[#DEDEDE]">
            <h2 className="text-[14px] text-center w-full font-normal">
              Ajukan Pegaduan
            </h2>
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-between w-[300px] md:w-[620px] bg-white rounded-2xl px-[16px]">
          <DialogHeader>
            <DialogTitle className="flex w-full">
              <form className="flex flex-col w-full">
                <div className="flex flex-col w-full px-[16px] md:px-[105px]">
                  <div className="flex flex-col w-full mb-[10px] md:mb-[40px] mx-[1px] mt-[62px]">
                    <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                      Pilih Instansi
                    </Label>

                    <Select
                      name="layanan_id"
                      onValueChange={handleSelectChangeDinas}>
                      <SelectTrigger
                        className={`${
                          !selected ? "opacity-50" : ""
                        } border border-neutral-800 rounded-[50px] w-full mx-0 pr-2`}>
                        <SelectValue
                          placeholder="Pilih Dinas"
                          className={selected ? "" : "placeholder:opacity-50"}
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full md:w-full">
                        <div>
                          {instances.map(
                            (item: { id: number; name: string }, i: number) => (
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

                  <div className="flex flex-col mx-[1px] mt-[8px]">
                    <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                      Pilih Layanan
                    </Label>

                    <Select
                      name="layanan_id"
                      onValueChange={handleSelectChangeLayanan}>
                      <SelectTrigger
                        className={`${
                          !selected ? "opacity-50" : ""
                        } border border-neutral-800 rounded-[50px] w-full mx-0 pr-2`}>
                        <SelectValue
                          placeholder="Pilih Jenis Layanan"
                          className={selected ? "" : "placeholder:opacity-50"}
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full md:w-full">
                        <div>
                          {services.map(
                            (item: { id: number; name: string }, i: number) => (
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

                  <div className="flex flex-col my-[10px] md:my-[40px] mx-[1px]">
                    <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                      Judul Pengajuan
                    </Label>

                    <input
                      type="text"
                      name="judul"
                      value={title}
                      onChange={handleChangeTitle}
                      className={`w-full pl-4 h-[40px] border border-neutral-800 rounded-[50px] pr-2 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                      placeholder="Judul Pengajuan"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                      }}
                    />
                  </div>

                  <div className="flex flex-col mx-[1px]">
                    <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                      Aduan
                    </Label>

                    <Textarea
                      className="w-full text-[14px] placeholder:opacity-[40%]"
                      placeholder="Aduan"
                    />
                  </div>

                  <div className="flex flex-col my-[10px] md:mt-[40px] mx-[1px]">
                    <Label className="text-[12px] text-neutral-900 font-semibold text-start mb-2">
                      Dokumen
                    </Label>

                    <input
                      type="file"
                      name="image"
                      value={title}
                      onChange={handleChangeTitle}
                      className={`w-full h-[40px] border-none pr-2 placeholder:text-[12px] focus:outline-none appearance-none 
                  ${
                    changeOpacity
                      ? "text-neutral-900"
                      : "text-gray-500 opacity-50"
                  }`}
                      placeholder="Judul Pengajuan"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                      }}
                    />
                  </div>

                  <div className="flex justify-center mb-[32px] mt-[16px]">
                    <Button
                      className="text-[14px] text-neutral-50 w-[120px] md:w-[235px] h-[40px] md:h-[40px]"
                      type="submit"
                      onClick={handleSubmit}
                      variant="warning">
                      Ajukan
                    </Button>
                  </div>
                </div>
              </form>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
