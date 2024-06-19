import fetchNews from "@/components/fetching/berita/berita";
import NewsScreen from "@/components/news/newsScreen/newsScreen";

export default async function BeritaPage() {
  const berita = await fetchNews(1, 8);
  return <NewsScreen berita={berita.data} />;
}
