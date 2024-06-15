import formatDate from "@/helpers/logout/formatted";
import Image from "next/image";

import Link from "next/link";

type Berita = {
  news: {
    title: string;
    slug: string;
    desc: string;
    image: string;
    url: string;
    createdAt: string;
  };
};

export default function CardNewsComponent({ news }: Berita) {
  const date = formatDate(news?.createdAt);

  return (
    <div className="flex flex-col items-center justify-center w-[270px] h-full rounded-xl gap-[16px]">
      <Link href={`/berita/${news.slug}`} className="flex flex-col rounded-xl">
        <Image
          src={news.image}
          className="w-[270px] h-[167px] rounded-xl"
          width={270}
          height={167}
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
