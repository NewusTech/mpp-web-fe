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
    <div className="flex flex-col items-center justify-center w-full md:w-full rounded-xl gap-[16px]">
      <Link
        href={`/berita/${news.slug}`}
        className="flex flex-col w-full md:w-full md:h-full rounded-xl">
        <Image
          src={news.image}
          className="w-full md:w-full h-[167px] rounded-xl"
          width={100}
          height={167}
          alt="Lampung Timur"
        />
      </Link>

      <div className="md:w-full md:h-full md:items-start">
        <Link
          href={`/berita/${news.slug}`}
          className="flex flex-col md:self-start gap-[8px]">
          <p className="text-[14px] text-black font-semibold">{news.title}</p>

          <p className="text-[12px] text-black font-normal">{date}</p>
        </Link>
      </div>
    </div>
  );
}
