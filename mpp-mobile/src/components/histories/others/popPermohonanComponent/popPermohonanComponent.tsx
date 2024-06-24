import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PopUpPermohonanComponent from "../popUpPermohonanComponent/popUpPermohonanComponent";

interface PermohonanType {
  permohonan: {
    id: number;
    instansi_name: string;
    layanan_name: string;
    noPermohonan: string;
    instansi: string;
    tanggal: string;
    status: number;
    pesan: string;
    tanggalSelesai: string;
    createdAt: string;
  };
}

export default function PopPermohonanComponent({ permohonan }: PermohonanType) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Download className="text-[#656565] w-[15px] h-[15px]" />
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-between w-[325px] md:w-[620px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex w-full">
              <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between md:w-full mx-[32px] my-[10px] md:pt-5">
                <h5 className="text-[20px] text-start text-primary-800 font-semibold">
                  {permohonan.id}
                </h5>

                <h5 className="text-[20px] text-end text-success-700 font-semibold">
                  {permohonan.status}
                </h5>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div>
            <PopUpPermohonanComponent permohonan={permohonan} />
          </div>

          <div className="flex justify-center items-end mx-[10px] mb-[10px] mt-[24px] md:pb-5">
            <Button type="submit" variant="link">
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
