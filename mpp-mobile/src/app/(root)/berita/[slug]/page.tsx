import fetchNews from "@/components/fetching/berita/berita";
import CardNewsComponent from "@/components/news/others/cardNewsComponent";
import { formatLongDate } from "@/helpers/logout/formatted";
import { Berita } from "@/types/type";
import Image from "next/image";
import parse from "html-react-parser";

async function fetchDetailNews(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  return response.json();
}

export default async function DetailBeritaPage({
  params,
}: {
  params: { slug: string };
}) {
  const detail = await fetchDetailNews(params.slug);
  const news = await fetchNews(1, 1000000, "", "", "", detail.data.id);

  const sortedNews = news.data.sort((a: any, b: any) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  const latestNews = sortedNews.slice(0, 3);
  let date = "";

  if (detail.data.createdAt) {
    date = formatLongDate(detail.data.createdAt);
  }

  return (
    <section className="flex flex-col items-center justify-center mt-6 md:mt-8 md:mx-0 pt-3 pb-32 md:mb-0 md:pb-[150px] bg-primary-100">
      <div className="flex flex-col w-10/12 items-center justify-center gap-6">
        <div className="w-full md:w-10/12 flex flex-col self-center">
          <Image
            src={detail.data?.image}
            className="w-full h-full object-cover rounded-xl"
            alt="Berita"
            width={80}
            height={80}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h6 className="text-[16px] md:text-[26px] text-neutral-900 font-semibold">
              {detail.data?.title}
            </h6>

            <div className="flex flex-row">
              <p className="text-[12px] pr-4 md:text-[14px] text-neutral-900 font-normal">
                {detail.data?.Instansi?.name}
              </p>

              <ul>
                <li className="text-[12px] list-disc md:text-[14px] text-neutral-900 font-normal">
                  {date}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="text-[10px] md:text-[16px] text-justify leading-8 font-normal text-neutral-900">
              {parse(detail.data?.desc)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-10/12 md:w-full md:px-10 items-center mt-8">
        <h6 className="text-[16px] md:text-[26px] text-neutral-900">
          Berita Lainnya
        </h6>

        <div className="flex-1 w-full h-full border border-neutral-700 ml-4"></div>
      </div>

      <div className="flex flex-col md:px-[70px] mt-3 md:mt-5 md:grid md:grid-cols-3 md:flex-row md:flex-wrap md:w-full md:justify-start gap-y-3 md:gap-x-6">
        {latestNews.map((berita: Berita, i: number) => (
          <CardNewsComponent key={i} news={berita} />
        ))}
      </div>
    </section>
  );
}
