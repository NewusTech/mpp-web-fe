"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatLongDate } from "@/helpers/logout/formatted";
import { PermohonanDataType } from "@/types/type";
import { formatCreateTime } from "@/utils/formatTime";
import Link from "next/link";

export default function TablePermohonanComponent({
  permohonan,
}: {
  permohonan: PermohonanDataType;
}) {
  let permohonanDate = "";
  if (permohonan.createdAt) {
    permohonanDate = formatLongDate(`${permohonan.createdAt}`);
  }

  let permohonanTime = "";
  if (permohonan.createdAt) {
    permohonanTime = formatCreateTime(permohonan.createdAt);
  }

  let permohonanStatus;

  if (permohonan.status === 1 || permohonan.status === 2) {
    permohonanStatus = "Sedang diproses";
  } else if (permohonan.status === 0) {
    permohonanStatus = "Belum diproses";
  } else if (permohonan.status === 3) {
    permohonanStatus = "Selesai";
  } else if (permohonan.status === 4) {
    permohonanStatus = "Ditolak";
  } else if (permohonan.status === 5) {
    permohonanStatus = "Butuh Perbaikan";
  } else {
    permohonanStatus = "Menunggu Validasi";
  }

  let statusColor = "";

  switch (permohonan.status) {
    case 1:
      statusColor = "text-secondary-700";
      break;
    case 2:
      statusColor = "text-secondary-700";
      break;
    case 0:
      statusColor = "text-primary-700";
      break;
    case 3:
      statusColor = "text-success-700";
      break;
    case 4:
      statusColor = "text-error-700";
      break;
    case 5:
      statusColor = "text-warning-700";
      break;
    default:
      statusColor = "text-secondary-700";
      break;
  }

  return (
    <TableRow>
      <TableCell className="w-1/2 pr-5">{permohonan.no_request}</TableCell>
      <TableCell className="w-full">{permohonan.instansi_name}</TableCell>
      <TableCell className="w-full">{permohonan.layanan_name}</TableCell>
      <TableCell className="w-1/2 pr-5">{permohonanDate}</TableCell>
      <TableCell className="w-1/2">{permohonanTime} WIB</TableCell>
      <TableCell className={`w-1/2 pr-5 ${statusColor}`}>
        {permohonanStatus}
      </TableCell>
      <TableCell className="w-3/12">
        {permohonan.status === 3 ||
        permohonan.status === 4 ||
        permohonan.status === 5 ? (
          <div>
            <Link
              href={`riwayat/${permohonan.id}`}
              className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1.5 px-5 text-neutral-50">
              Lihat
            </Link>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-gray-400 rounded-full py-1 px-5 text-neutral-50 text-[12px] cursor-not-allowed">
              Lihat
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
