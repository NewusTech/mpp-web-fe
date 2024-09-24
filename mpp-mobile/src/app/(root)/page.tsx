"use client";

import pengumuman from "@/../../public/assets/fotoalur.png";
import HeroScreen from "@/components/landing/heroScreen/heroScreen";
import AboutScreen from "@/components/landing/aboutScreen/aboutScreen";
import CardLayananComponent from "@/components/services/others/cardLayananComponent";
import Link from "next/link";
import parse from "html-react-parser";
import CardNewsComponent from "@/components/news/others/cardNewsComponent";
import FAQScreen from "@/components/landing/faqScreen/faqScreen";
import fetchNews from "@/components/fetching/berita/berita";
import { useEffect, useState } from "react";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import facilitiesFetch from "@/components/fetching/facilities/facilities";
import Image from "next/legacy/image";
import { formatLongDate } from "@/helpers/logout/formatted";
import fetchInformasi from "@/components/fetching/infromasi/informasi";
import fetchCarousel from "@/components/fetching/carousel/carousel";
import fetchVideo from "@/components/fetching/video/video";
import fetchAlurMpp from "@/components/fetching/alurMpp/alurMpp";
import MppNext from "@/components/mppNext/mppNext";
import {
  AlurType,
  AnnouncementType,
  AppType,
  Berita,
  CarouselType,
  FacilityType,
  InfoLandingType,
  Instansi,
  MyBerita,
  MyInstansi,
  TermType,
  VideoType,
} from "@/types/type";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import fetchAppSupport from "@/components/fetching/appSupport/appSupport";
import { truncateTitle } from "@/utils/formatTitle";
import TermCondition from "@/components/fetching/termCond/termCond";
import { X } from "lucide-react";
import AnnouncementFetch from "@/components/fetching/announcement";
import LoadingComponent from "@/components/loading/LoadingComponent";

function Home() {
  const [berita, setBerita] = useState<MyBerita>();
  const [layanan, setLayanan] = useState<MyInstansi>();
  const [facilities, setFacilities] = useState<FacilityType[]>();
  const [infoLanding, setInfoLanding] = useState<InfoLandingType | undefined>();
  const [carousel, setCarousel] = useState<CarouselType[] | undefined>();
  const [video, setVideo] = useState<VideoType>();
  const [alur, setAlur] = useState<AlurType[]>();
  const [apps, setApps] = useState<AppType[] | undefined>();
  const [term, setTerm] = useState<TermType>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnnouncement = async () => {
    setIsLoading(true);
    try {
      const res = await AnnouncementFetch();
      setAnnouncement(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchCarousels = async () => {
    try {
      const carousel = await fetchCarousel();
      setCarousel(carousel.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchFirst = async (search: string) => {
    try {
      const dashboard = await fetchInformasi();
      const layanan = await fetchInstansi(search, page, 10);

      setInfoLanding(dashboard.data);
      setLayanan(layanan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFirst(search);
  }, [search]);

  const fetchSecond = async () => {
    try {
      const videos = await fetchVideo();

      const alurMpp = await fetchAlurMpp();

      const fasilitas = await facilitiesFetch(1, 8);

      if (videos.data) {
        setVideo(videos.data);
      }

      if (alurMpp.data) {
        setAlur(alurMpp.data);
      }

      setFacilities(fasilitas.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSecond();
  }, []);

  const fetchAll = async () => {
    try {
      const news = await fetchNews(page, 3, "", "", "");

      const app = await fetchAppSupport(1, 100000);

      const terms = await TermCondition();

      setBerita(news);

      if (app) {
        setApps(app.data);
      }

      setTerm(terms.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  let date = "";

  if (berita?.data[0]?.createdAt) {
    date = formatLongDate(`${berita?.data[berita.data.length - 1].createdAt}`);
  }

  const image = berita?.data[berita.data.length - 1]?.image;
  const slug = berita?.data[berita.data.length - 1]?.slug;
  const desc = berita?.data[berita.data.length - 1]?.desc;
  const title = berita?.data[berita.data.length - 1]?.title;
  const instansi = berita?.data[berita.data.length - 1]?.Instansi?.name;

  const truncateDesc = truncateTitle(desc ?? "", 750);

  const photos = layanan?.data.map((service: Instansi) => {
    return service.image;
  });

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setIsAnnouncement(true);
  }, []);

  const closeAnnouncement = () => {
    setIsAnnouncement(false);
  };

  return (
    <div className="bg-primary-50 w-full h-full mb-[24px] md:pb-[75px] pb-20 relative">
      {isAnnouncement && (
        <div className="fixed inset-0 top-20 md:top-28 flex pt-5 md:pt-0 md:items-center bg-black bg-opacity-80 z-40">
          <div className="fixed left-1/2 transform -translate-x-1/2 bg-neutral-50 bg-opacity-50 w-11/12 md:w-8/12 md:h-4/6 rounded-xl border border-neutral-600 text-black p-4 shadow-xl z-50">
            <div className="flex justify-between flex-row w-full p-2">
              <h2 className="font-semibold text-neutral-50 text-[20px] md:text-[26px]">
                Pengumuman
              </h2>
              <X
                onClick={closeAnnouncement}
                className="w-6 h-6 cursor-pointer text-neutral-50 hover:text-secondary-700"
              />
            </div>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <div className="w-full h-full flex flex-col p-1 md:p-2">
                {announcement && (
                  <Image
                    src={announcement?.file}
                    alt="Pengumuman MPP"
                    width={1000}
                    height={400}
                    className="w-10/12 h-full rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-primary-50">
        {carousel && <HeroScreen carousel={carousel} />}

        <AboutScreen
          infoLanding={
            infoLanding ?? {
              instansiCount: "",
              layananCount: "",
              permohonanCountToday: "",
              antrianCountToday: "",
            }
          }
        />

        <div className="mx-5 md:mx-8 bg-primary-200 rounded-xl p-5 md:p-8 mt-5">
          <div className="flex w-full flex-col justify-center items-center">
            <h4 className="text-primary-800 text-[20px] md:text-[26px] text-center font-bold md:mb-[32px]">
              Instansi Layanan MPP
            </h4>

            <div className="flex flex-col w-full flex-wrap justify-center md:flex-none md:grid md:grid-cols-5 items-center gap-2 md:gap-y-4 my-4">
              {photos && (
                <>
                  {layanan?.data?.map((el: Instansi, i: number) => {
                    return <CardLayananComponent key={i} layanan={el} />;
                  })}
                </>
              )}
            </div>

            <Link
              href="/instansi"
              className="flex justify-center items-center rounded-[50px] w-6/12 md:w-3/12 h-[40px] bg-neutral-50 group hover:bg-primary-700 shadow-md border border-neutral-500 mt-[16px]">
              <p className="text-center text-[12px] md:text-[16px] text-primary-700 group-hover:text-neutral-50 font-light">
                Lihat Semua Instansi
              </p>
            </Link>
          </div>
        </div>

        <MppNext
          facilities={facilities || []}
          video={video || { video: "" }}
          alurs={alur || []}
          apps={apps || []}
        />

        <div className="flex flex-col bg-primary-200 items-center mt-5 mx-5 md:mx-8 py-5 rounded-xl md:p-8">
          <h3 className="text-primary-800 text-[20px] md:text-[26px] font-semibold mb-4 md:mb-9">
            Berita
          </h3>

          <div className="hidden md:block md:w-full md:flex-col">
            <div className="md:flex md:flex-rows md:w-full md:gap-8">
              {slug && (
                <Link
                  href={`/berita/${slug}`}
                  className="md:w-full md:min-h-[450px]">
                  {image && (
                    <Image
                      className="md:w-full md:h-full md:object-cover md:rounded-xl"
                      src={image}
                      alt="Berita"
                      width={960}
                      height={670}
                      layout="responsive"
                    />
                  )}
                </Link>
              )}

              {slug && (
                <div className="md:flex md:flex-col w-full">
                  <div className="md:flex md:flex-col md:w-full md:gap-[16px]">
                    <div className="md:flex md:flex-col md:gap-[8px]">
                      <Link
                        href={`/berita/${slug}`}
                        className="md:text-neutral-900 md:text-start md:text-[24px] md:font-semibold hover:underline hover:text-primary-700">
                        {title}
                      </Link>

                      <div className="md:flex md:flex-row">
                        <p className="md:text-neutral-800 md:text-[16px] md:font-light">
                          {instansi}
                        </p>
                        <ul>
                          <li className="list-disc md:text-[12px] text-neutral-800 font-normal ml-6">
                            {date}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h5 className="md:text-[20px] md:text-justify md:text-black md:font-light">
                      {desc && parse(isExpanded ? desc : truncateDesc)}
                      <Link href={`/berita/${slug}`}>
                        <span className="text-primary-700 pl-1 font-normal hover:underline text-[16px]">
                          Lihat Selengkapnya
                        </span>
                      </Link>
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col px-5 md:px-0 w-full items-center md:mt-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3 gap-[16px] md:justify-center md:gap-5">
              {berita?.data?.map((news: Berita, i: number) => {
                return <CardNewsComponent key={i} berita={news} />;
              })}
            </div>

            <div className="w-6/12 md:w-3/12 flex justify-center">
              <Link
                href="/berita"
                className="flex md:mt-[40px] justify-center items-center rounded-[50px] w-full h-[40px] bg-neutral-50 group hover:bg-primary-700 shadow-md border border-neutral-500 mt-[16px]">
                <p className="text-center text-[12px] md:text-[16px] text-primary-700 group-hover:text-neutral-50 font-light">
                  Lihat Semua Berita
                </p>
              </Link>
            </div>
          </div>
        </div>

        <FAQScreen />

        <div className="flex flex-col md:hidden items-center justify-between w-full text-center mt-8 gap-y-1.5 mb-6">
          <div className="w-full text-center text-primary-700 text-[12px]">
            {term && (
              <Dialog open={isDialogOpen}>
                <DialogTrigger
                  className="text-primary-700 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Syarat dan Ketentuan
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 max-h-[700px]">
                  <div className="m-3 md:py-4 px-4 md:px-8 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>{term && parse(term?.desc_text)}</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-700 text-center cursor-pointer md:w-2/12 rounded-full text-neutral-50 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            ,{" "}
            {term && (
              <Dialog open={isDialogOpen}>
                <DialogTrigger
                  className="text-primary-700 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Kebijakan Privasi
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 max-h-[700px]">
                  <div className="m-3 md:py-4 px-4 md:px-8 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>{term && parse(term?.privasi_text)}</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-700 text-center cursor-pointer md:w-2/12 rounded-full text-neutral-50 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <p className="text-[12px] text-primary-700 font-normal">
            Copyright &copy; 2024
            <span className="text-[12px] font-bold"> MPP Lampung Timur</span>.
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
