import { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import { truncateTitle } from "@/utils/formatTitle";
import { ArrowUpRight } from "lucide-react";
import Image from "next/legacy/image";
import parse from "html-react-parser";

import Link from "next/link";

export default function CardNewsComponent({ news }: { news: Berita }) {
  const date = formatLongDate(news?.createdAt);

  const truncate = truncateTitle(news.title);
  const descTruncate = truncateTitle(news.desc, 150);

  return (
    <div className="flex flex-col items-center p-5 bg-neutral-50 max-w-[350px] justify-center md:max-w-full md:h-[380px] rounded-xl gap-[16px]">
      <Link
        href={`/berita/${news.slug}`}
        className="flex relative flex-col w-full h-[200px] md:h-[300px] rounded-xl">
        <Image
          src={news.image}
          className="w-full h-full object-fit rounded-xl"
          width={1000}
          height={1000}
          layout="fill"
          alt="Lampung Timur"
        />
      </Link>

      <div className="flex flex-row self-start gap-x-8">
        {news?.Instansi?.name && (
          <p className="text-[12px] text-neutral-800 font-normal">
            {news.Instansi.name}
          </p>
        )}
        <ul>
          <li className="list-disc text-[12px] text-neutral-800 font-normal ml-4">
            {date}
          </li>
        </ul>
      </div>

      <div className="w-full h-full md:items-start">
        <Link
          href={`/berita/${news.slug}`}
          className="flex flex-row md:self-start">
          <p className="text-[14px] w-full flex flex-row text-neutral-900 font-semibold">
            {truncate}
          </p>

          <ArrowUpRight className="w-6 h-6 text-neutral-900" />
        </Link>
        <div className="text-[12px] text-neutral-800 font-normal mt-4">
          {parse(descTruncate)}
        </div>
      </div>
    </div>
  );
}
