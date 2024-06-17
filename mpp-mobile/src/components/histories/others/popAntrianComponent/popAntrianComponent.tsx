import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import PopUpAntrianComponent from "../popUpAntrianComponent/popUpAntrianComponent";

interface AntrianType {
  antrian: {
    noAntrian: string;
    instansi: string;
    waktu?: string;
    tanggal: string;
  };
}

export default function PopAntrianComponent({ antrian }: AntrianType) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Download className="text-[#656565] w-[15px] h-[15px]" />
        </DialogTrigger>
        <DialogContent className="flex flex-col w-[290px] h-[290px]">
          <div>
            <PopUpAntrianComponent antrian={antrian} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
