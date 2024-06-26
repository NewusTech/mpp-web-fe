import { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function CardNewsComponent({ news }: { news: Berita }) {
  const date = formatLongDate(news?.createdAt);

  return (
    <div className="flex flex-col items-center p-5 bg-neutral-50 justify-center w-full md:w-full rounded-xl gap-[16px]">
      <Link
        href={`/berita/${news.slug}`}
        className="flex flex-col w-full md:w-full md:h-full rounded-xl">
        <Image
          src={news.image}
          className="w-full md:w-full h-[230px] rounded-xl"
          width={100}
          height={167}
          alt="Lampung Timur"
        />
      </Link>

      <div className="flex flex-row self-start gap-x-8">
        <p className="text-[12px] text-neutral-800 font-normal">{date}</p>
        <ul>
          <li className="list-disc text-[12px] text-neutral-800 font-normal">
            {date}
          </li>
        </ul>
      </div>

      <div className="w-full h-full md:items-start">
        <Link
          href={`/berita/${news.slug}`}
          className="flex flex-row md:self-start">
          <p className="text-[14px] w-full flex flex-row text-neutral-900 font-semibold">
            {news.title}
          </p>

          <ArrowUpRight className="w-6 h-6 text-neutral-900" />
        </Link>
        <p className="text-[12px] truncate text-neutral-800 font-normal mt-4">
          {news.desc}
        </p>
      </div>
    </div>
  );
}
