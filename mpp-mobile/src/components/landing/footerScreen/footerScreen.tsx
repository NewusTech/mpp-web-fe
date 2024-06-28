import Link from "next/link";

export default function FooterScreen() {
  return (
    <div className="flex w-full bg-primary-700">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-[49px] my-[29px] text-center">
        <p className="text-[12px] text-white font-normal">
          Copyright &copy; 2024
          <span className="text-[12px] font-bold"> MPP Lampung Timur</span>. All
          rights reserved
        </p>

        <Link
          href="/kontak"
          className="text-[12px] mt-2 md:mt-0 border-b border-neutral-50 text-white font-normal">
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
