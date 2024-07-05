import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/legacy/image";
import { AntrianDataType } from "@/types/type";

export default function PopUpAntrianComponent({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-4 w-full h-4/6 bg-neutral-50 shadow-lg rounded-xl mt-2 gap-4">
      <div className="flex flex-col justify-center items-center mt-[18px] gap-2">
        <div className="flex justify-between w-full h-full">
          <p className="text-[14px] font-extralight">{antrian.tanggal}</p>

          <p className="text-[14px] font-extralight">{antrian.waktu}</p>
        </div>

        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
          <div className="w-full h-full rounded-xl">
            <Image
              src={antrian.qrcode}
              className="w-full h-full object-contain rounded-xl"
              width={200}
              height={200}
              alt="QR CODE"
            />
          </div>

          <div className="flex flex-col w-full h-[40px] justify-center items-center md:mt-3">
            <h5 className="text-[14px] font-bold">{antrian.id}</h5>

            <h5 className="text-[14px] font-normal md:text-center">
              {antrian.Instansi.name}
            </h5>
          </div>
        </div>
      </div>

      <div className="w-8/12 h-[40px] flex self-center justify-center items-center md:pt-4">
        <Button className="w-full h-[40px]" type="submit" variant="link">
          Print
        </Button>
      </div>

      <div className="flex flex-col w-full mt-6 gap-y-3">
        <h3 className="text-neutral-900 font-semibold text-[14px]">
          Persyaratan yang harus dibawa
        </h3>

        <ul className="gap-y-2">
          <li className="list-disc pl-4">Kartu Tanda Pengenal</li>
        </ul>
      </div>
    </div>
  );
}
