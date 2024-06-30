import formatDate from "@/helpers/logout/formatted";
import { PermohonanDataType } from "@/types/type";

export default function PopUpPermohonanComponent({
  permohonan,
}: {
  permohonan: PermohonanDataType;
}) {
  let permohonanDate = "";
  if (permohonan.createdAt) {
    permohonanDate = formatDate(`${permohonan.createdAt}`);
  }
  return (
    <div className="flex flex-col mx-[32px] mt-[32px]">
      <div className="flex flex-col gap-[10px]">
        <h6 className="text-[16px] text-secondary-700 font-semibold">
          Detail: {permohonan.layanan_name}
        </h6>

        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">
              Tanggal dibuat permohonanan
            </p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonanDate}
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">
              Tanggal Permohonan Selesai
            </p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonan.tanggalSelesai && permohonan.tanggalSelesai}
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">Pesan</p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonan.layanan_name}
            </p>
          </div>
        </div>

        <p className="text-[12px] text-warning-700 font-normal mt-[12px]">
          Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu agar
          dapat mengunduh hasil permohonan.
        </p>
      </div>
    </div>
  );
}
