"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatLongDate } from "@/helpers/logout/formatted";
import { SurveiDataType } from "@/types/type";
import { formatCreateTime } from "@/utils/formatTime";
import Link from "next/link";

export default function TableSurveiComponent({
  survei,
}: {
  survei: SurveiDataType;
}) {
  const date = formatLongDate(survei.date);
  const time = formatCreateTime(survei.createdAt);
  return (
    <TableRow>
      <TableCell className="w-3/12">{survei.no_skm}</TableCell>
      <TableCell className="w-6/12">{survei.instansi_name}</TableCell>
      <TableCell className="w-6/12">{survei.layanan_name}</TableCell>
      <TableCell className="w-4/12">{date}</TableCell>
      <TableCell className="w-4/12">{time} WIB</TableCell>
      <TableCell className="w-8/12">{survei.kritiksaran}</TableCell>
      <TableCell className="w-3/12">
        <div>
          <Link
            href={`riwayat/hasil-survei/${survei.id}`}
            className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1 px-5 text-neutral-50">
            Lihat
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
