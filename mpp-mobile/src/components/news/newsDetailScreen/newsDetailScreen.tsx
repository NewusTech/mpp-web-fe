import formatDate, { formatLongDate } from "@/helpers/logout/formatted";
import Image from "next/image";

type Berita = {
  berita: {
    title: string;
    slug: string;
    desc: string;
    image: string;
    url: string;
    createdAt: string;
  };
};
export default function NewsDetailScreen({ berita }: Berita) {
  const date = formatLongDate(berita.createdAt);

  return (
    <div className="flex items-center justify-center md:justify-start md:items-start mt-[24px] md:mt-[56px] mx-[35px] md:mx-0 md:px-[70px] mb-[107px] md:mb-0 md:pb-[107px] bg-primary-100">
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-[16px]">
        <div className="flex w-full self-center md:self-start">
          <Image
            src={berita.image}
            className="flex w-[290px] md:w-[726px] h-[210px] md:h-[512px] md:rounded-xl"
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

            <p className="text-[12px] md:text-[14px] text-neutral-900 font-normal">
              {date}
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            <p className="text-[10px] md:text-[16px] text-justify leading-8 font-normal text-neutral-900">
              {berita.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
