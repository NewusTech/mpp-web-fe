import { TableCell, TableRow } from "@/components/ui/table";
import PopAntrianComponent from "../popAntrianComponent/popAntrianComponent";

interface AntrianType {
  antrian: {
    noAntrian: string;
    instansi: string;
    waktu?: string;
    tanggal: string;
  };
}

export default function TableAntrianComponent({ antrian }: AntrianType) {
  return (
    <TableRow>
      <TableCell className="w-1/2">{antrian.noAntrian}</TableCell>
      <TableCell className="w-full">{antrian.instansi}</TableCell>
      <TableCell className="w-1/2">{antrian.waktu}</TableCell>
      <TableCell className="w-1/2">{antrian.tanggal}</TableCell>
      <TableCell className="w-1">
        <PopAntrianComponent antrian={antrian} />
      </TableCell>
    </TableRow>
  );
}
