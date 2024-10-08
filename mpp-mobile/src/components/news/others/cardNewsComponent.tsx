import { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import { truncateTitle } from "@/utils/formatTitle";
import { ArrowUpRight } from "lucide-react";
import Image from "next/legacy/image";
import parse from "html-react-parser";

import Link from "next/link";

export default function CardNewsComponent({ berita }: { berita: Berita }) {
  const date = formatLongDate(berita?.createdAt);

  const truncate = truncateTitle(berita.title, 55);
  const descTruncate = truncateTitle(berita.desc, 180);

  return (
    <div className="flex flex-col px-5 pt-4 bg-neutral-50 max-w-[350px] md:max-w-full md:min-h-[500px] shadow-md rounded-md gap-[16px] slide-up-animation">
      <Link
        href={`/berita/${berita.slug}`}
        className="flex relative flex-col w-full h-[200px] md:min-h-[240px] rounded-md">
        {berita?.image && (
          <Image
            src={berita?.image}
            className="w-full h-full object-center object-cover rounded-md"
            width={1000}
            height={1000}
            layout="fill"
            alt="Lampung Timur"
          />
        )}
      </Link>

      <div className="flex flex-row self-start gap-x-8">
        {berita?.Instansi?.name && (
          <p className="text-[12px] text-neutral-800 font-normal">
            {berita.Instansi.name}
          </p>
        )}
        <ul>
          <li className="list-disc text-[12px] text-neutral-800 font-normal ml-4">
            {date}
          </li>
        </ul>
      </div>

      <div className="w-full h-full md:items-start pb-4 md:pb-0">
        <Link
          href={`/berita/${berita.slug}`}
          className="flex flex-row md:self-start hover:underline hover:text-primary-700">
          <p className="text-[14px] w-full flex flex-row text-neutral-900 font-semibold hover:text-primary-700">
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
