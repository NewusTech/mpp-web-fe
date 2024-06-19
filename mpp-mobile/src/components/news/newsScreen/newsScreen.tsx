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
    <div className="flex flex-col items-center mt-[24px]bg-primary-100 mb-[60px] md:mb-0 md:pb-[155px] md:mt-[56px]">
      <h3 className="text-primary-800 font-semibold text-[16px] md:text-[32px] mb-[32px]">
        Berita
      </h3>

      <div className="flex flex-col md:flex-row md:flex-wrap md:items-start justify-center gap-[20px] md:gap-2 md:mx-[70px]">
        {berita.map((news: Berita, i: number) => {
          return (
            <div
              key={i}
              className="md:flex md:flex-row md:flex-wrap md:gap-[8px]">
              <CardNewsComponent news={news} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
