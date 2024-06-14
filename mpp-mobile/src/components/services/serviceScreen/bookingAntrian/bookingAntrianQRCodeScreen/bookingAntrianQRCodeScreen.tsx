import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/image";

export default function BookingAntrianQRCodeScreen() {
  return (
    <div className="flex items-center justify-center mt-[24px] mx-[71px]">
      <div className="flex flex-col w-[1139px] h-[624px] gap-[32px]">
        <div className="flex flex-col w-[358px] h-[460px] mx-[390.5px] mb-[8px]">
          <div className="flex flex-col w-[280px] h-[64px]">
            <h4 className="text-[26px] font-normal">Nama Instansi</h4>

            <h5 className="text-[20px] font-extralight">
              Jenis Layanan Permohonan
            </h5>
          </div>

          <div className="flex flex-col w-[358px] h-[388px] bg-[#FFFFFF] shadow-lg rounded-xl mt-[8px]">
            <div className="flex flex-col w-[326px] h-[310px] mx-[16px] mt-[11px] mb-[12px]">
              <div className="flex flex-col w-[200px] h-[242px] mx-[63px] mt-[11px]">
                <div className="flex justify-between w-[200px] h-[44px] mb-[8px]">
                  <p className="text-[16px] font-extralight">HH/BB/TTTT</p>

                  <p className="text-[16px] font-extralight">00:00</p>
                </div>

                <Image
                  src={qrcode}
                  className="w-[200px] h-[190px]"
                  alt="QR CODE"
                />
              </div>

              <div className="flex flex-col justify-center items-center w-[326px] h-[60px]">
                <h5 className="text-[20px] font-bold">Nomor Antrian</h5>

                <h5 className="text-[20px] font-normal">Loket</h5>
              </div>
            </div>

            <div className="h-[72px] flex self-center justify-center items-center">
              <Button type="submit" variant="error">
                Print
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[1139px] h-[132px] gap-[16px]">
          <h5 className="text-[20px] font-semibold">
            Persyaratan yang harus dibawa
          </h5>

          <ul className="list-disc list-inside ml-[20px]">
            <li className="text-[16px] text-[#656565] font-normal">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>

            <li className="text-[16px] text-[#656565] font-normal">
              Pariatur aperiam ullam consequatur impedit et est facilis
            </li>

            <li className="text-[16px] text-[#656565] font-normal">
              tempora quaerat reiciendis a officiis, quibusdam error ratione
            </li>

            <li className="text-[16px] text-[#656565] font-normal">
              corporis cum molestiae porro fuga dicta!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
