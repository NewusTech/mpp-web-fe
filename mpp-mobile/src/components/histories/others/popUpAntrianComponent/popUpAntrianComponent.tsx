import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/image";

export default function PopUpAntrianComponent() {
  return (
    <div className="flex flex-col w-[290px] h-[290px] bg-[#FFFFFF] shadow-lg rounded-xl mt-[8px] gap-[16px]">
      <div className="flex flex-col w-[135px] h-[198px] mx-[77.5px] mt-[18px] gap-[8px]">
        <div className="flex justify-between w-[135px] h-[14px]">
          <p className="text-[10px] font-extralight">HH/BB/TTTT</p>

          <p className="text-[10px] font-extralight">00:00</p>
        </div>

        <div className="flex flex-col justify-center items-center w-[135px] h-[176px] gap-[8px]">
          <Image src={qrcode} className="w-[135px] h-[128px]" alt="QR CODE" />

          <div className="flex flex-col w-[107px] h-[40px] justify-center items-center">
            <h5 className="text-[14px] font-bold">Nomor Antrian</h5>

            <h5 className="text-[14px] font-normal">Loket</h5>
          </div>
        </div>
      </div>

      <div className="h-[40px] flex self-center justify-center items-center">
        <Button className="w-[160px] h-[40px]" type="submit" variant="link">
          Print
        </Button>
      </div>
    </div>
  );
}
