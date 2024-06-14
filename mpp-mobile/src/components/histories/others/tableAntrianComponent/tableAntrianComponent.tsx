import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PopAntrianComponent from "../popAntrianComponent/popAntrianComponent";

export default function TableAntrianComponent() {
  return (
    <div className="mx-[10px]">
      <Table className="flex flex-col w-[290px] overflow-x-scroll">
        <TableHeader className="flex w-full">
          <TableRow className="flex flex-row">
            <TableHead className="bg-primary-400 w-[260px]">
              Nomor Antrian
            </TableHead>
            <TableHead className="bg-primary-400 w-[260px]">Instansi</TableHead>
            <TableHead className="bg-primary-400 w-[260px]">Waktu</TableHead>
            <TableHead className="bg-primary-400 w-[260px]">Tanggal</TableHead>
            <TableHead className="bg-primary-400"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="flex flex-wrap w-full">
          <TableRow>
            <TableCell className="w-[260px]">INV001</TableCell>
            <TableCell className="w-[260px]">Paid</TableCell>
            <TableCell className="w-[260px]">Credit Card</TableCell>
            <TableCell className="w-[260px]">$250.00</TableCell>
            <TableCell className="">
              <PopAntrianComponent />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
