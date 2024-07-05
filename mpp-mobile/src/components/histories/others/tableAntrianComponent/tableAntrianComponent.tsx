"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import PopAntrianComponent from "../popAntrianComponent/popAntrianComponent";
import { AntrianDataType } from "@/types/type";

export default function TableAntrianComponent({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  return (
    <TableRow>
      <TableCell className="w-1/2">{antrian.id}</TableCell>
      <TableCell className="w-full">{antrian.Instansi.name}</TableCell>
      <TableCell className="w-1/2">{antrian.waktu}</TableCell>
      <TableCell className="w-1/2">{antrian.tanggal}</TableCell>
      <TableCell className="w-3/12">
        <PopAntrianComponent antrian={antrian} />
      </TableCell>
    </TableRow>
  );
}
