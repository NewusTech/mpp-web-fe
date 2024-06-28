import { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function CardNewsComponent({ news }: { news: Berita }) {
  const date = formatLongDate(news?.createdAt);

  return (
    <div className="flex flex-col items-center p-5 bg-neutral-50 max-w-[350px] justify-center md:max-w-[500px] md:h-[450px] rounded-xl gap-[16px]">
      <Link
        href={`/berita/${news.slug}`}
        className="flex flex-col w-full h-[200px] md:w-full md:h-full rounded-xl">
        <Image
          src={news.image}
          className="w-full h-full object-contain rounded-xl"
          width={100}
          height={167}
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
