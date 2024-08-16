"use client";

import fetchVisiMisi from "@/components/fetching/visimisi/visimisi";
import { useEffect, useState } from "react";
import {
  AlurType,
  ManualBookType,
  VideoType,
  VisiMisiType,
} from "@/types/type";
// import parse from "html-react-parser";
import Image from "next/legacy/image";
import fetchAlurMpp from "@/components/fetching/alurMpp/alurMpp";
import fetchVideo from "@/components/fetching/video/video";
import ManualBooks from "@/components/fetching/manualBook/manualBook";
// import { RichTextDisplay } from "@/components/richTextDisplay/richTextDisplay";

export default function MppPage() {
  const [visimisi, setVisimisi] = useState<VisiMisiType>({
    visi: "",
    misi: "",
  });
  const [videos, setVideos] = useState<VideoType>();
  const [alurs, setAlurs] = useState<AlurType[]>();
  const [book, setBook] = useState<ManualBookType[]>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const fetchVisiMisiMpp = async () => {
    const visimisi = await fetchVisiMisi();
    const alur = await fetchAlurMpp();
    const videos = await fetchVideo();
    const book = await ManualBooks();

    setVisimisi(visimisi.data);
    setAlurs(alur.data);
    setVideos(videos.data);
    setBook(book.data);
  };

  useEffect(() => {
    fetchVisiMisiMpp();
  }, []);

  return (
    <div className="bg-primary-100 md:mx-12 md:h-full">
      <div className="flex flex-col w-full items-center justify-center pb-32 pt-4 px-[35px] md:px-0 bg-primary-100 md:mx-0 mb-4 md:mb-0 md:pb-[150px]">
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none place-items-center md:place-items-start md:mx-[35px] gap-[16px] md:mb-[62px]">
          <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
            <h4 className="text-secondary-700 text-[18px] md:text-[26px] font-semibold">
              VISI
            </h4>

            <div className="text-[14px] md:text-[16px] md:px-[25px] text-primary-700 text-center">
              {/* {visimisi && <RichTextDisplay content={visimisi.visi} />} */}
            </div>
          </div>

          <div className="flex flex-col text-center gap-4 md:gap-[40px]">
            <h4 className="text-secondary-700 text-[18px] md:text-[26px] font-semibold">
              MISI
            </h4>

            <div className="text-[14px] md:text-[16px] md:px-[25px] text-primary-700 text-center">
              {/* {visimisi && <RichTextDisplay content={visimisi.misi} />} */}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center mt-8">
          <h4 className="text-secondary-700 text-[18px] md:text-[26px] font-semibold md:mb-[40px]">
            ALUR PELAYANAN MPP
          </h4>

          <div className="flex flex-col md:flex-row w-full mt-4 md:px-12 md:gap-x-6 gap-y-4 md:gap-y-0">
            {alurs &&
              alurs?.map((alur: AlurType, i: number) => {
                return (
                  <div
                    key={i}
                    onClick={() => openModal(alur?.image)}
                    className="flex flex-col w-full h-full bg-neutral-50 shadow-md rounded-xl">
                    <Image
                      src={alur?.image}
                      alt="alur mpp"
                      className="w-full h-ful object-fit rounded-xl"
                      width={1920}
                      height={1080}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col w-full items-center mt-16">
          <h4 className="text-secondary-700 text-[18px] md:text-[26px] font-semibold md:mb-[40px]">
            Tutorial Penggunaan MPP
          </h4>

          <div className="flex flex-col md:flex-row w-full mt-4 md:px-12 gap-y-8 md:gap-x-4">
            <div className="flex flex-col w-full h-full bg-neutral-50 shadow-md rounded-xl">
              <div className="bg-secondary-700 w-full rounded-t-xl h-12 flex justify-center items-center">
                <h4 className="text-neutral-50 font-semibold text-[18px] text-center">
                  Video
                </h4>
              </div>
              <div className="flex flex-col w-full h-full bg-neutral-50 shadow-md rounded-xl">
                {book &&
                  book?.map((item: ManualBookType, i: number) => {
                    return (
                      <video
                        key={i}
                        className="md:w-full md:h-full object-cover rounded-xl"
                        width={650}
                        height={310}
                        autoPlay
                        src={item.video}
                        muted
                        controls>
                        <source src={item.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    );
                  })}
              </div>
            </div>

            <div className="flex flex-col w-full bg-neutral-50 shadow-md rounded-xl">
              <div className="bg-secondary-700 w-full rounded-t-xl h-12 md:h-14 flex justify-center items-center">
                <h4 className="text-neutral-50 font-semibold text-[18px] text-center">
                  Manual Book
                </h4>
              </div>
              <div className="flex flex-col w-full h-full bg-neutral-50 shadow-md rounded-xl">
                {book &&
                  book?.map((item: ManualBookType, i: number) => {
                    return (
                      <iframe
                        key={i}
                        allowFullScreen
                        src={item.dokumen}
                        title="Manual Book"
                        className="rounded-b-xl w-full h-full">
                        {item.id}
                      </iframe>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}>
          <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:max-w-3xl mx-auto">
            <Image
              src={selectedImage || ""}
              alt="Selected alur mpp"
              className="w-full h-full object-cover rounded-xl"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      )}
    </div>
  );
}
