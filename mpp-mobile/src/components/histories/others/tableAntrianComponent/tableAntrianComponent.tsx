"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import PopAntrianComponent from "../popAntrianComponent/popAntrianComponent";
import { AntrianDataType } from "@/types/type";
import { formatTime } from "@/utils/formatTime";
import { formattedDate } from "@/helpers/logout/formatted";

export default function TableAntrianComponent({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  const time = formatTime(antrian.waktu);
  const date = formattedDate(antrian.tanggal);

  return (
    <TableRow>
      <TableCell className="w-1/2">{antrian.id}</TableCell>
      <TableCell className="w-full">{antrian.Instansi.name}</TableCell>
      <TableCell className="w-1/2">{time} WIB</TableCell>
      <TableCell className="w-1/2">{date}</TableCell>
      <TableCell className="w-3/12">
        <PopAntrianComponent antrian={antrian} />
      </TableCell>
    </TableRow>
  );
}
