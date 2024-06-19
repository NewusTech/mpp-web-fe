"use client";

import CardPengaduanComponent from "@/components/pengaduan/cardPengaduanComponent/cardPengaduanComponent";
import PopUpPengaduanComponent from "@/components/pengaduan/popUpPengaduanComponent/popUpPengaduanComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dataPengaduan = [
  {
    id: 1,
    dinas: "Dinas Pendidikan",
    layanan: "Pembuatan KTP",
    title: "Terkendala Jarak",
    description: "Lebih dipercepat untuk proses pembuatan",
    status: "Sudah di proses",
  },
  {
    id: 2,
    dinas: "Dinas Sosial",
    layanan: "Pembuatan Surat Pindah",
    title: "Terkendala Jarak",
    description: "Lebih dipercepat untuk proses pembuatan",
    status: "Selesai",
  },
  {
    id: 3,
    dinas: "Dinas Kesehatan",
    layanan: "Pembuatan Kartu Sehat",
    title: "Terkendala Jarak",
    description: "Lebih dipercepat untuk proses pembuatan",
    status: "Gagal",
  },
];

export default function PengaduanScreen() {
  const [isWideScreen, setIsWideScreen] = useState(false);

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
    <div className="flex flex-col bg-primary-100 mt-[48px] mx-[35px] md:mx-[170px] md:mb-0 pb-[124px] md:pb-[130px]">
      <div>
        <h1 className="text-[20px] md:text-[26px] text-primary-800 font-bold">
          Pengaduan Layanan
        </h1>

        <div className="w-full mt-8">
          <PopUpPengaduanComponent />

          <div className="flex flex-col">
            {!isWideScreen ? (
              <CardPengaduanComponent />
            ) : (
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
                    <TableHead className="w-1/2 bg-primary-400">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataPengaduan.map(
                    (
                      data: {
                        id: number;
                        title: string;
                        description: string;
                        status: string;
                        dinas: string;
                        layanan: string;
                      },
                      i: number
                    ) => {
                      return (
                        <TableRow key={i}>
                          <TableCell className="w-1/2">{data.id}</TableCell>
                          <TableCell className="w-full">{data.dinas}</TableCell>
                          <TableCell className="w-full">
                            {data.layanan}
                          </TableCell>
                          <TableCell className="w-full">{data.title}</TableCell>
                          <TableCell className="w-2/3">{data.status}</TableCell>
                          <TableCell className="w-1/2">
                            <Button
                              className="w-[48px] h-[18px] text-[8px] bg-secondary-700 hover:bg-secondary-600"
                              type="submit"
                              variant="success">
                              <Link href="/pengaduan">Lihat</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
