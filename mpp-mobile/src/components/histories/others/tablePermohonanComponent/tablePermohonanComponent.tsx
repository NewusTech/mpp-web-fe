import { TableCell, TableRow } from "@/components/ui/table";
import PopPermohonanComponent from "../popPermohonanComponent/popPermohonanComponent";
import formatDate from "@/helpers/logout/formatted";
import { PermohonanDataType } from "@/types/type";
import Link from "next/link";

export default function TablePermohonanComponent({
  permohonan,
}: {
  permohonan: PermohonanDataType;
}) {
  let permohonanDate = "";
  if (permohonan.createdAt) {
    permohonanDate = formatDate(`${permohonan.createdAt}`);
  }

  let permohonanStatus;

  if (permohonan.status === 1 || permohonan.status === 2) {
    permohonanStatus = "Sedang diproses";
  } else if (permohonan.status === 0) {
    permohonanStatus = "Belum diproses";
  } else if (permohonan.status === 3) {
    permohonanStatus = "Selesai";
  } else {
    permohonanStatus = "Ditolak";
  }

  return (
    <TableRow>
      <TableCell className="w-1/2">{permohonan.id}</TableCell>
      <TableCell className="w-full">{permohonan.instansi_name}</TableCell>
      <TableCell className="w-1/2">{permohonanDate}</TableCell>
      <TableCell className="w-1/2">{permohonanStatus}</TableCell>
      <TableCell className="w-3/12">
        {permohonan.status !== 3 ? (
          <Link
            href={`riwayat/${permohonan.id}`}
            className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1 px-5 text-neutral-50">
            Lihat
          </Link>
        ) : (
          <button
            disabled
            className="bg-gray-400 rounded-full px-5 text-neutral-50 text-[12px] cursor-not-allowed">
            Lihat
          </button>
        )}
      </TableCell>
    </TableRow>
  );
}
