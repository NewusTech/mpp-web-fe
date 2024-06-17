import { TableCell, TableRow } from "@/components/ui/table";
import PopPermohonanComponent from "../popPermohonanComponent/popPermohonanComponent";

interface PermohonanType {
  permohonan: {
    layanan: string;
    noPermohonan: string;
    instansi: string;
    tanggal: string;
    status: string;
    pesan: string;
    tanggalSelesai: string;
  };
}

export default function TablePermohonanComponent({
  permohonan,
}: PermohonanType) {
  return (
    <div className="w-full">
      <TableRow>
        <TableCell className="w-1/2">{permohonan.noPermohonan}</TableCell>
        <TableCell className="w-full">{permohonan.instansi}</TableCell>
        <TableCell className="w-1/2">{permohonan.tanggal}</TableCell>
        <TableCell className="w-1/2">{permohonan.status}</TableCell>
        <TableCell className="w-1">
          <PopPermohonanComponent permohonan={permohonan} />
        </TableCell>
      </TableRow>
    </div>
  );
}
