import formatDate from "@/helpers/logout/formatted";

import Link from "next/link";

export default function CardNewsComponent({ news }: any) {
  const date = formatDate(news?.createdAt);

  return (
    <div className="flex flex-col items-center justify-center w-[270px] h-full rounded-xl gap-[16px]">
      {/* ini nanti di berita slug untuk hrefnya */}
      <Link href={`/berita/${news.slug}`} className="flex flex-col rounded-xl">
        <img
          src={news.image}
          // width={270}
          // height={167}
          className="w-[270px] h-[167px] rounded-xl"
          alt="Lampung Timur"
        />
      </Link>

      <Link href={`/berita/${news.slug}`} className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-black font-semibold">{news.title}</p>

        <p className="text-[12px] text-black font-normal">{date}</p>
      </Link>
    </div>
  );
}
