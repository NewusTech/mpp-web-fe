import { Download } from "lucide-react";
import PopPermohonanComponent from "../others/popPermohonanComponent/popPermohonanComponent";
import PopAntrianComponent from "../others/popAntrianComponent/popAntrianComponent";

interface AntrianType {
  antrian: {
    noAntrian: string;
    instansi: string;
    waktu?: string;
    tanggal: string;
  };
}

export default function CardHistoryAntrian({ antrian }: AntrianType) {
  return (
    <div className="flex flex-col h-[300px] justify-center items-center bg-neutral-50 rounded-2xl shadow-xl w-full mb-4">
      <div className="flex flex-col justify-center m-4 gap-2 h-full">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Nomor Antrian
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.noAntrian}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Instansi
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.instansi}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">Waktu</h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.waktu}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Tanggal
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            {antrian.tanggal}
          </p>
        </div>
      </div>

      <div className="flex self-end justify-end items-end mx-4 px-2 pb-4">
        <PopAntrianComponent antrian={antrian} />
      </div>
    </div>
  );
}
