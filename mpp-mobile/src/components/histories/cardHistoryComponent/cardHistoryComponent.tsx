import { Download } from "lucide-react";
import PopPermohonanComponent from "../others/popPermohonanComponent/popPermohonanComponent";
import PopAntrianComponent from "../others/popAntrianComponent/popAntrianComponent";

interface PermissionType {
  id: number;
  userinfo_id: number;
  name: string;
  status: number;
  layanan_id: number;
  layanan_name: string;
  layanan_image: string;
  instansi_id: number;
  instansi_name: string;
  instansi_image: string;
}

type PropType = {
  name: string;
  date: string;
  time: string;
  status: string;
  value: string;
  permohonan: PermissionType;
};

export default function CardHistoryComponent({
  name,
  date,
  time,
  status,
  value,
  permohonan,
}: PropType) {
  console.log(permohonan, ">>");

  return (
    <div className="flex flex-col h-[300px] justify-center items-center bg-neutral-50 rounded-2xl shadow-xl w-full">
      <div className="flex flex-col justify-center m-4 gap-2 h-full">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">{name}</h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">: A70</p>
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
            {value === "antrian" ? `${time}` : `${date}`}
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : 11/06/2024
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            {value === "antrian" ? `${date}` : `${status}`}
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : Selesai
          </p>
        </div>
      </div>

      <div className="flex self-end justify-end items-end mx-4 px-2 pb-4">
        {/* <Download className="text-neutral-800 w-6 h-6" /> */}
        {value === "antrian" ? (
          <PopAntrianComponent />
        ) : (
          <PopPermohonanComponent />
        )}
      </div>
    </div>
  );
}
