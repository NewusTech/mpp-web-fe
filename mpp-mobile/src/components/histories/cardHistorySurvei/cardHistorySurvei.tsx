import { SurveiDataType } from "@/types/type";
import { formattedDate } from "@/helpers/logout/formatted";
import { formatCreateTime } from "@/utils/formatTime";
import Link from "next/link";

export default function CardHistorySurvei({
  survei,
}: {
  survei: SurveiDataType;
}) {
  const time = formatCreateTime(survei.createdAt);
  const date = formattedDate(survei.date);

  return (
    <div className="flex flex-col h-full justify-center items-center bg-neutral-50 rounded-xl shadow-lg w-full mb-4">
      <div className="grid grid-rows-6 gap-2 w-full h-full p-4 gap-y-4">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Nomor Survei
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {survei.no_skm}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Instansi
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {survei.instansi_name}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Layanan
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {survei.layanan_name}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Tanggal
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {date}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">Waktu</h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {time} WIB
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Kritik dan Saran
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {survei.kritiksaran}
          </p>
        </div>
      </div>

      <div className="flex flex-row mb-4 w-full justify-end pr-4">
        <Link
          href={`riwayat/hasil-survei/${survei.id}`}
          className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1 px-5 text-neutral-50">
          Lihat
        </Link>
      </div>
    </div>
  );
}
