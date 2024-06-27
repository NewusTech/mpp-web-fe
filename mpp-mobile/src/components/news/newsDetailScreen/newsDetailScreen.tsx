import formatDate, { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import Image from "next/image";
import CardNewsComponent from "../others/cardNewsComponent";

export default function NewsDetailScreen({
  berita,
  latestNews,
}: {
  berita: Berita;
  latestNews: Berita[];
}) {
  const date = formatLongDate(berita.createdAt);

  return (
    <div className="flex flex-col items-center justify-center md:justify-start md:items-start mt-[24px] md:mt-8 mx-[35px] md:mx-0 pt-3 pb-8 md:mb-0 md:pb-[150px] bg-primary-100">
      <div className="flex flex-col md:px-[150px] items-center gap-6">
        <div className="flex w-full h-full md:h-[550px] self-center">
          <Image
            src={berita.image}
            className="flex w-full h-full object-cover md:rounded-xl"
            alt="Berita"
            width={290}
            height={210}
          />
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h6 className="text-[16px] md:text-[26px] text-neutral-900 font-semibold">
              {berita.title}
            </h6>

            <div className="flex flex-row">
              <p className="text-[12px] pr-4 md:text-[14px] text-neutral-900 font-normal">
                {berita.Instansi?.name}
              </p>

              <ul>
                <li className="text-[12px] list-disc md:text-[14px] text-neutral-900 font-normal">
                  {date}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <p className="text-[10px] md:text-[16px] text-justify leading-8 font-normal text-neutral-900">
              {berita.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center md:px-[70px] mt-[35px]">
        <h6 className="text-[16px] md:text-[28px] text-neutral-900">
          Berita Lainnya
        </h6>

        <div className="flex-1 w-full h-full border border-neutral-700 ml-4"></div>
      </div>

      <div className="flex flex-col md:px-[70px] mt-3 md:mt-5 md:flex-row md:flex-wrap md:w-full md:justify-center md:gap-x-6">
        {latestNews.map((berita: Berita, i: number) => (
          <CardNewsComponent key={i} news={berita} />
        ))}
      </div>
    </div>
  );
}
