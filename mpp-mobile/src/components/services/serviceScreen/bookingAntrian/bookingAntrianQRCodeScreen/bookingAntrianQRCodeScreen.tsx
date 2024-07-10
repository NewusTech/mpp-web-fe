import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/legacy/image";

export default function BookingAntrianQRCodeScreen({ id }: { id: number }) {
  return (
    <div className="flex items-center w-full justify-center bg-primary-100 md:mt-8 mt-[24px] md:pb-8">
      <div className="flex flex-col w-full mx-[35px] md:mx-[70px] gap-[12px]">
        <div className="flex flex-col md:justify-center md:items-center md:self-center mb-8 md:mb-10 md:w-6/12">
          <div className="flex flex-col items-center w-full bg-neutral-50 shadow-md rounded-xl py-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <h4 className="text-[16px] md:text-[20px] font-semibold">
                Nama Instansi
              </h4>

              <h5 className="text-[12px] md:text-[16px] font-extralight">
                Jenis Layanan Permohonan
              </h5>
            </div>

            <div className="flex flex-col mt-3 mb-4">
              <div className="flex flex-col w-full mt-3 mb-2">
                <div className="flex justify-between mb-2">
                  <p className="text-[10px] md:text-[16px] font-extralight">
                    24/06/2024
                  </p>

                  <p className="text-[10px] md:text-[16px] font-extralight">
                    13.00
                  </p>
                </div>

                <div className="w-full h-full rounded-xl flex items-center justify-center">
                  <Image
                    src={qrcode}
                    className="w-full h-full object-contain rounded-xl"
                    alt="QR CODE"
                    width={200}
                    height={200}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[14px] md:text-[20px] font-semibold">
                  A101
                </h5>

                <h5 className="text-[14px] md:text-[20px] font-normal">
                  Dinas Kesehatan
                </h5>
              </div>
            </div>

            <div className="h-[40px] w-[160px] md:w-1/2 flex self-center justify-center items-center">
              <Button type="submit" variant="error">
                Print
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] md:mx-12 pb-8">
          <h5 className="text-[14px] md:text-[20px] font-semibold">
            Persyaratan yang harus dibawa
          </h5>

          <ul className="list-disc list-inside ml-[12px]">
            <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
              Perlu mencantumkan nama lengkap, nomor kontak yang bisa dihubungi,
              dan jika diperlukan, nomor identitas seperti KTP atau paspor.
            </li>

            <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
              Menentukan jenis layanan yang dibutuhkan untuk memastikan antrian
              yang sesuai.
            </li>

            <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
              Memilih waktu dan tanggal preferensi untuk kunjungan.
            </li>

            <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
              Proses untuk mengonfirmasi booking, baik melalui email, SMS, atau
              aplikasi khusus.
            </li>

            <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
              Setuju terhadap syarat dan ketentuan yang berlaku dalam penggunaan
              layanan booking antrian.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
