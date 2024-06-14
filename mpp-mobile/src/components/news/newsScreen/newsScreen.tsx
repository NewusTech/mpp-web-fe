import CardNewsComponent from "../others/cardNewsComponent";

export default function NewsScreen({ berita }: any) {
  return (
    <div className="flex flex-col items-center mt-[24px] mb-[60px]">
      <h3 className="text-primary-800 font-semibold text-[16px] mb-[32px]">
        Berita
      </h3>

      <div className="flex flex-col justify-center gap-[20px]">
        {berita.map((el: any) => {
          return <CardNewsComponent key={el.slug} news={el} />;
        })}
      </div>
    </div>
  );
}
