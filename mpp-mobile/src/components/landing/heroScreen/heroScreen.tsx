import Image from "next/image";
import gedung from "@/../public/assets/kab-lamtim.jpg";

export default function HeroScreen() {
  return (
    <div className="grid grid-rows-1 w-dvw bg-gradient-to-tr from-[#FAEBBC] from-[-20%] to-[#7bba78] to-35%">
      <div className="flex flex-col px-[35px]">
        <h6 className="text-secondary-700 font-semibold">Selamat Datang</h6>

        <p className="text-neutral-50 text-[12px] font-normal">
          di Mal Pelayanan Publik Lampung Timur
        </p>
      </div>

      <div className="pt-[20px]">
        <Image
          className="object-cover object-center w-screen"
          src={gedung}
          alt="Gedung Kabupaten Lampung Timur"
        />
      </div>
    </div>
  );
}
