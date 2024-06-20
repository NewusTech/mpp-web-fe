import CardNewsComponent from "../others/cardNewsComponent";

type Berita = {
  title: string;
  slug: string;
  desc: string;
  image: string;
  url: string;
  createdAt: string;
};

type MyBerita = {
  berita: Berita[];
};

export default function NewsScreen({ berita }: MyBerita) {
  return (
    <div className="flex flex-col items-center mt-[24px] bg-primary-100 mb-[60px] md:mb-0 md:pb-[155px] md:px-[70px] md:mt-[24px]">
      <h3 className="text-primary-800 font-semibold text-[16px] md:text-[32px] mb-[32px]">
        Berita
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-4 md:w-full md:items-start justify-center gap-[20px] md:gap-x-4 md:gap-y-8">
        {berita.map((news: Berita, i: number) => {
          return <CardNewsComponent key={i} news={news} />;
        })}
      </div>
    </div>
  );
}
