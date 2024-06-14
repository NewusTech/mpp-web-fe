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

  return <NewsDetailScreen berita={detail.data} />;
}
