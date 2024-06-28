import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/legacy/image";

interface AntrianType {
  antrian: {
    noAntrian: string;
    instansi: string;
    waktu?: string;
    tanggal: string;
  };
}

export default function PopUpAntrianComponent({ antrian }: AntrianType) {
  return (
    <div className="flex flex-col w-[290px] h-[290px] bg-[#FFFFFF] shadow-lg rounded-xl mt-[8px] gap-[16px]">
      <div className="flex flex-col w-[135px] h-[198px] mx-[77.5px] mt-[18px] gap-[8px]">
        <div className="flex justify-between w-[135px] h-[14px]">
          <p className="text-[10px] font-extralight">{antrian.tanggal}</p>

          <p className="text-[10px] font-extralight">{antrian.waktu}</p>
        </div>

        <div className="flex flex-col justify-center items-center w-[135px] h-[176px] gap-[8px]">
          <Image src={qrcode} className="w-[135px] h-[128px]" alt="QR CODE" />

          <div className="flex flex-col w-[250px] h-[40px] justify-center items-center md:mt-3">
            <h5 className="text-[14px] font-bold">{antrian.noAntrian}</h5>

            <h5 className="text-[14px] font-normal md:text-center">
              Loket {antrian.instansi}
            </h5>
          </div>
        </div>
      </div>

      <div className="h-[40px] flex self-center justify-center items-center md:pt-4">
        <Button className="w-[160px] h-[40px]" type="submit" variant="link">
          Print
        </Button>
      </div>
    </div>
  );
}
