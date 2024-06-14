import formatDate, { formatLongDate } from "@/helpers/logout/formatted";

export default function NewsDetailScreen({ berita }: any) {
  const date = formatLongDate(berita.createdAt);

  return (
    <div className="flex items-center justify-center mt-[24px] mx-[35px] mb-[107px]">
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex w-full self-center">
          <img
            src={berita.image}
            className="flex w-[290px] h-[210px]"
            alt="Berita"
          />
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h6 className="text-[16px] text-neutral-900 font-semibold">
              {berita.title}
            </h6>

            <p className="text-[12px] text-neutral-900 font-normal">{date}</p>
          </div>

          <div className="flex justify-center items-center w-full">
            <p className="text-[10px] text-justify leading-8 font-normal text-neutral-900">
              {berita.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
