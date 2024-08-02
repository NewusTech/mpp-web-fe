import { AntrianDataType } from "@/types/type";
import PopAntrianComponent from "../others/popAntrianComponent/popAntrianComponent";
import { formattedDate } from "@/helpers/logout/formatted";
import { formatTime } from "@/utils/formatTime";

export default function CardHistoryAntrian({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  const time = formatTime(antrian.waktu);
  const date = formattedDate(antrian.tanggal);

  return (
    <div className="flex flex-col h-full justify-center items-center bg-neutral-50 rounded-xl shadow-lg w-full mb-4 slide-up-animation">
      <div className="grid grid-rows-5 justify-center p-4 gap-2 w-full h-full gap-y-4">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Nomor Antrian
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.Layanan.code}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Instansi
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.Instansi.name}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            Layanan
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {antrian.Layanan.name}
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
            Tanggal
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {date}
          </p>
        </div>
      </div>

      <div className="flex self-end justify-end items-end mx-4 px-2 pb-4">
        <PopAntrianComponent antrian={antrian} />
      </div>
    </div>
  );
}
