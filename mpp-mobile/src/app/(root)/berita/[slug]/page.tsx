import fetchNews from "@/components/fetching/berita/berita";
import NewsDetailScreen from "@/components/news/newsDetailScreen/newsDetailScreen";

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
  const news = await fetchNews(1, 1000000, detail.data.id);

  const sortedNews = news.data.sort((a: any, b: any) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  const latestNews = sortedNews.slice(0, 3);

  return <NewsDetailScreen berita={detail.data} latestNews={latestNews} />;
}
