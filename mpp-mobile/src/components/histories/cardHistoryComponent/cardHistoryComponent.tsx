import Link from "next/link";
import { formatLongDate } from "@/helpers/logout/formatted";

interface PermohonanType {
  permohonan: {
    id: number;
    no_request: string;
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
    permohonanDate = formatLongDate(`${permohonan.createdAt}`);
  }

  let statusColor = "";

  switch (permohonan.status) {
    case 1:
      statusColor = "text-secondary-700";
      break;
    case 2:
      statusColor = "text-secondary-700";
      break;
    case 0:
      statusColor = "text-primary-700";
      break;
    case 3:
      statusColor = "text-success-700";
      break;
    case 4:
      statusColor = "text-error-700";
      break;
    case 5:
      statusColor = "text-warning-700";
      break;
    default:
      statusColor = "text-success-600";
      break;
  }

  return (
    <div className="flex flex-col h-[300px] justify-center items-start bg-neutral-50 rounded-xl shadow-md w-full">
      <div className="flex flex-col justify-center px-4 gap-2 h-full w-full gap-y-4">
        <div className="grid grid-cols-2">
          <h6 className="text-[14px] font-semibold text-primary-800">
            No Permohonan
          </h6>

          <p className="text-[14px] pl-2 font-normal text-primary-800">
            : {permohonan.no_request}
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

          <p className={`text-[14px] pl-2 font-normal ${statusColor}`}>
            :{" "}
            {permohonan.status === 0
              ? "Belum diproses"
              : permohonan.status === 1
              ? "Sedang diproses"
              : permohonan.status === 2
              ? "Sudah diproses"
              : permohonan.status === 3
              ? "Selesai"
              : permohonan.status === 4
              ? "Ditolak"
              : permohonan.status === 5
              ? "Butuh Perbaikan"
              : "Menunggu Validasi"}
          </p>
        </div>
      </div>

      <div className="flex self-end justify-end items-end mx-4 px-2 pb-4">
        {permohonan.status === 3 ||
        permohonan.status === 4 ||
        permohonan.status === 5 ||
        permohonan.status === 6 ? (
          <div>
            <Link
              href={`riwayat/${permohonan.id}`}
              className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1 px-5 text-neutral-50">
              Lihat
            </Link>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-gray-400 rounded-full py-1 px-5 text-neutral-50 text-[12px] cursor-not-allowed">
              Lihat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
