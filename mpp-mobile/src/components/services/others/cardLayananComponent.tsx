import Link from "next/link";

export default function CardLayananComponent({ layanan }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-[270px] outline outline-2 outline-[#C4C4C4] bg-[#F7F7F7] shadow-xl rounded-2xl">
      <div className="flex flex-col items-center justify-center w-[270px] h-[238px]">
        <Link href={`/layanan/${layanan.slug}`}>
          <img
            src={layanan.image}
            className="w-[80px] h-[106.12px] mb-[8px]"
            alt="Lampung Timur"
          />
        </Link>

        <div className="grid grid-rows-2 place-items-center">
          <Link href={`/layanan/${layanan.slug}`}>
            <h6 className="text-[16px] text-center text-primary-800 font-semibold">
              {layanan.name}
            </h6>
          </Link>

          <p className="text-[12px] text-neutral-700 font-normal">
            Jumlah Layanan
          </p>
        </div>
      </div>

      <div className="flex flex-row text-center items-center justify-center w-[270px] h-[50px] gap-[1px]">
        <Link
          href="/layanan/booking-antrian"
          className="flex items-center justify-center font-semibold text-[12px] w-dvw h-full bg-secondary-700 hover:bg-secondary-600 rounded-none rounded-bl-xl shadow-lg text-neutral-50">
          Booking Antrian
        </Link>

        <Link
          href={`/layanan/permohonan-layanan/${layanan.id}`}
          className="flex items-center justify-center font-semibold text-wrap text-[12px] w-dvw h-full bg-primary-700 hover:bg-primary-600 rounded-none rounded-br-xl shadow-lg text-neutral-50">
          Permohonan Layanan
        </Link>
      </div>
    </div>
  );
}
