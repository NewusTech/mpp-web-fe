import { Download } from "lucide-react";
import PopPermohonanComponent from "../others/popPermohonanComponent/popPermohonanComponent";
import PopAntrianComponent from "../others/popAntrianComponent/popAntrianComponent";
import formatDate from "@/helpers/logout/formatted";

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

export default function CardHistoryComponent({ permohonan }: PermohonanType) {
  let permohonanDate = "";
  if (permohonan.createdAt) {
    permohonanDate = formatDate(`${permohonan.createdAt}`);
  }

  return (
    <div className="flex flex-col h-[300px] justify-center items-center bg-neutral-50 rounded-2xl shadow-xl w-full">
      <div className="flex flex-col justify-center m-4 gap-2 h-full">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            No Permohonan
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {permohonan.id}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Instansi
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {permohonan.instansi_name}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Tanggal
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {permohonanDate}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">Status</h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {permohonan.status}
          </p>
        </div>
      </div>

      <div className="flex self-end justify-end items-end mx-4 px-2 pb-4">
        <PopPermohonanComponent permohonan={permohonan} />
      </div>
    </div>
  );
}
