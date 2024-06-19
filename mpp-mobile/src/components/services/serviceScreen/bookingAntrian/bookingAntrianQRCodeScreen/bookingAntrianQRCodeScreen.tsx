import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/image";

export default function BookingAntrianQRCodeScreen() {
  return (
    <div className="flex items-center w-full justify-center bg-primary-100 md:mt-8 mt-[24px] md:pb-8">
      <div className="flex flex-col w-full mx-[35px] md:mx-[70px] gap-[12px]">
        <div className="flex flex-col mb-8 md:mb-10 md:mx-[470px]">
          <div className="flex flex-col gap-2">
            <h4 className="text-[12px] md:text-[26px] font-bold md:font-semibold">
              Nama Instansi
            </h4>

            <h5 className="text-[16px] md:text-[20px] font-extralight">
              Jenis Layanan Permohonan
            </h5>
          </div>

          <div className="flex flex-col items-center bg-neutral-50 shadow-lg rounded-xl mt-[32px] pb-6">
            <div className="flex flex-col mt-[11px] mb-[16px]">
              <div className="flex flex-col mt-[11px] mb-2">
                <div className="flex justify-between mb-[8px]">
                  <p className="text-[10px] md:text-[16px] font-extralight">
                    24/06/2024
                  </p>

                  <p className="text-[10px] md:text-[16px] font-extralight">
                    13.00
                  </p>
                </div>

                <Image
                  src={qrcode}
                  className="w-[150px] md:w-[175px] h-[135px] md:h-[165px]"
                  alt="QR CODE"
                  width={135}
                  height={128}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[14px] md:text-[20px] font-bold">A101</h5>

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

        <div className="flex flex-col gap-[16px] pb-8">
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
