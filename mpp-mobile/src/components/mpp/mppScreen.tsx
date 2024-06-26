import { VisiMisiType } from "@/types/type";
import ArrowLine from "../arrowLine/arrowLine";
import AlurMpp from "../alurMpp/alurMpp";

const alurAntrians = [
  { id: 1, title: "1", desc: "Booking antrian melalui website atau aplikasi" },
  { id: 2, title: "2", desc: "Pilih waktu booking antrian" },
  {
    id: 3,
    title: "3",
    desc: "Simpan atau cetak QR code yang diberikan dan membawa persyaratan yang tertera",
  },
  {
    id: 4,
    title: "4",
    desc: "Datang ke Mall Pelayanan Publik dengan tepat waktu",
  },
  {
    id: 5,
    title: "5",
    desc: "Datang ke Mall Pelayanan Publik dengan tepat waktu",
  },
  {
    id: 6,
    title: "6",
    desc: "Datang ke Mall Pelayanan Publik dengan tepat waktu",
  },
];
const currentAlur = 1;
const statusAntrian = true;
const statusPermohonan = false;

const alurPermohonan = [
  {
    id: 1,
    title: "1",
    desc: " Buat permohonanan layanan melalui website atau aplikasi.",
  },
  { id: 2, title: "2", desc: "Isi form dan upload dokumen yang diperlukan." },
  {
    id: 3,
    title: "3",
    desc: " Cek secara berkala sampai berstatus selesai.",
  },
  {
    id: 4,
    title: "4",
    desc: "Cek secara berkala sampai berstatus selesai.",
  },
  {
    id: 5,
    title: "5",
    desc: "Cek secara berkala sampai berstatus selesai.",
  },
  {
    id: 6,
    title: "6",
    desc: "Cek secara berkala sampai berstatus selesai.",
  },
];

export default function MppScreen({ visimisi }: { visimisi: VisiMisiType }) {
  return (
    <div className="flex flex-col w-full items-center justify-center pt-[24px] px-[35px] md:px-0 bg-primary-100 md:mx-0 mb-[24px] md:mb-0 md:pb-[150px]">
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none place-items-center md:place-items-start md:mx-[35px] gap-[16px] md:mb-[62px]">
        <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
          <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold">
            VISI
          </h4>

          <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
            {visimisi.visi}
          </p>
        </div>

        <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
          <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold">
            MISI
          </h4>

          <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
            {visimisi.misi}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[32px]">
        <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold md:mb-[40px]">
          ALUR PELAYANAN MPP
        </h4>

        <div className="flex flex-col w-full mt-[16px] md:px-12 gap-y-6">
          <div className="flex flex-col w-full h-full bg-white shadow-xl rounded-2xl gap-[32px] md:pb-5">
            <div className="flex justify-center pt-[16px]">
              <h4 className="text-[16px] md:text-[26px] text-secondary-700 font-semibold">
                Booking Antrian
              </h4>
            </div>

            <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-between space-y-2 md:space-y-0 px-[16px] md:px-5">
              {alurAntrians.map((alur, index) => (
                <AlurMpp
                  key={index}
                  title={alur.title}
                  desc={alur.desc}
                  isLastStep={index === alurAntrians.length - 1}
                  isActive={alur.id === currentAlur}
                  status={statusAntrian}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full h-full bg-white shadow-xl rounded-2xl gap-[32px] mt-[16px] md:mt-0">
            <div className="flex justify-center pt-[16px]">
              <h4 className="text-[16px] md:text-[26px] text-primary-700 font-semibold">
                Permohonan Layanan
              </h4>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-5 justify-between space-y-2 md:space-y-0 px-[16px]">
              {alurPermohonan.map((alur, index) => (
                <AlurMpp
                  key={index}
                  title={alur.title}
                  desc={alur.desc}
                  isLastStep={index === alurPermohonan.length - 1}
                  isActive={alur.id === currentAlur}
                  status={statusPermohonan}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
