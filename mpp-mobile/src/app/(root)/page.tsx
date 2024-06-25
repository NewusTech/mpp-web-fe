"use client";

import HeroScreen from "@/components/landing/heroScreen/heroScreen";
import AboutScreen from "@/components/landing/aboutScreen/aboutScreen";
import CardLayananComponent from "@/components/services/others/cardLayananComponent";
import Link from "next/link";
import CardNewsComponent from "@/components/news/others/cardNewsComponent";
import FAQScreen from "@/components/landing/faqScreen/faqScreen";
import fetchNews from "@/components/fetching/berita/berita";
import { useEffect, useState } from "react";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import facilitiesFetch from "@/components/fetching/facilities/facilities";
import { toast } from "sonner";
import Image from "next/image";
import formatDate from "@/helpers/logout/formatted";
import fetchInformasi from "@/components/fetching/infromasi/informasi";
import fetchCarousel from "@/components/fetching/carousel/carousel";

type Berita = {
  title: string;
  slug: string;
  desc: string;
  image: string;
  url: string;
  createdAt: string;
};

type MyBerita = {
  status: string;
  message: string;
  data: [Berita];
};

type Instansi = {
  id: number;
  name: string;
  image?: string;
  slug: string;
  jmlLayanan: number;
  active_offline: boolean;
};

type MyInstansi = {
  status: string;
  message: string;
  data: [Instansi];
};

type Facility = {
  id: number;
  image: string;
};

type MyFacilities = {
  status: string;
  message: string;
  data: [Facility];
};

interface InfoLandingType {
  instansiCount: string;
  layananCount: string;
  permohonanCountToday: string;
}

interface CarouselType {
  image: string;
}

function Home() {
  const [berita, setBerita] = useState<MyBerita>();
  const [beritaSlug, SetBeritaSlug] = useState<Berita>();
  const [layanan, setLayanan] = useState<MyInstansi>();
  const [facilities, setFacilities] = useState<MyFacilities>();
  const [infoLanding, setInfoLanding] = useState<InfoLandingType | undefined>();
  const [carousel, setCarousel] = useState<CarouselType[] | undefined>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchAll = async (search: string) => {
    try {
      const news = await fetchNews(page, 3);

      const layanan = await fetchInstansi(search, page, 8);

      const fasilitas = await facilitiesFetch();

      const dashboard = await fetchInformasi();

      const carousel = await fetchCarousel();

      setBerita(news);
      setLayanan(layanan);
      setFacilities(fasilitas);
      setInfoLanding(dashboard.data);
      setCarousel(carousel.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchAll(search);
  }, [search]);

  let date = "";

  if (berita?.data[0].createdAt) {
    date = formatDate(`${berita?.data[berita.data.length - 1].createdAt}`);
  }

  const image = berita?.data[berita.data.length - 1].image;
  const slug = berita?.data[berita.data.length - 1].slug;
  const desc = berita?.data[berita.data.length - 1].desc;
  const title = berita?.data[berita.data.length - 1].title;

  const photos = layanan?.data.map((service: Instansi) => {
    return service.image;
  });

  return (
    <div className="bg-primary-50 w-full h-full mb-[24px] md:pb-[75px]">
      <div className="bg-primary-50">
        {carousel && <HeroScreen carousel={carousel} />}

        <AboutScreen
          infoLanding={
            infoLanding ?? {
              instansiCount: "",
              layananCount: "",
              permohonanCountToday: "",
            }
          }
        />

        <div className="mx-5 md:mx-8 bg-primary-200 rounded-xl p-5 md:p-8 mt-5">
          <div className="flex w-full flex-col justify-center items-center">
            <h4 className="text-primary-800 text-[20px] md:text-[32px] text-center font-bold md:mb-[32px]">
              Instansi Layanan MPP
            </h4>

            <div className="flex flex-col w-full flex-wrap justify-center md:flex-row items-center gap-5 my-[16px]">
              {photos && (
                <>
                  {layanan?.data?.map((el: Instansi, i: number) => {
                    return <CardLayananComponent key={i} layanan={el} />;
                  })}
                </>
              )}
            </div>

            <Link
              href="/layanan"
              className="flex justify-center items-center rounded-[50px] w-[153px] h-[40px] bg-neutral-50 hover:bg-primary-700 shadow-lg border border-neutral-500 mt-[16px]">
              <p className="text-center text-[12px] text-primary-700 hover:text-neutral-50 font-light">
                Lihat Semua Instansi
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col bg-primary-200 items-center mt-5 mx-5 md:mx-8 py-5 rounded-xl md:p-8">
          <h3 className="text-primary-800 text-[26px] md:text-[32px] font-semibold mb-[16px] md:mb-[36px]">
            Berita
          </h3>

          <div className="hidden md:block md:w-full md:flex-col">
            <div className="md:flex md:flex-rows md:w-full md:gap-[32px]">
              {slug && (
                <Link href={`/berita/${slug}`} className="md:w-6/12">
                  {image && (
                    <Image
                      className="md:w-full md:h-[410px] md:rounded-2xl"
                      src={image}
                      alt="Berita"
                      width={960}
                      height={410}
                    />
                  )}
                </Link>
              )}

              {slug && (
                <Link
                  href={`/berita/${slug}`}
                  className="md:flex md:flex-col md:items-center md:w-6/12 md:gap-[16px]">
                  <div className="md:flex md:flex-col md:gap-[8px]">
                    <h3 className="md:text-[#000000] md:text-[30px] md:font-semibold">
                      {title}
                    </h3>

                    <p className="md:text-[#000000] md:text-[16px] md:font-light">
                      {date}
                    </p>
                  </div>

                  <h5 className="md:text-[20px] md:text-black md:font-light">
                    {desc}
                  </h5>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col px-5 md:px-0 w-full items-center md:mt-6">
            <div className="flex flex-col w-full md:flex-row md:grid md:grid-cols-3 flex-wrap md:justify-between gap-[16px] md:gap-5">
              {berita?.data?.map((news: Berita, i: number) => {
                return <CardNewsComponent key={i} news={news} />;
              })}
            </div>

            <div className="md:flex md:justify-center">
              <Link
                href="/berita"
                className="flex md:mt-[40px] justify-center items-center rounded-[50px] w-[153px] h-[40px] bg-neutral-50 hover:bg-primary-700 shadow-lg border border-neutral-500 mt-[16px]">
                <p className="text-center text-[12px] text-primary-700 hover:text-neutral-50 font-light">
                  Lihat Semua Berita
                </p>
              </Link>
            </div>
          </div>
        </div>

        <FAQScreen />
      </div>
    </div>
  );
}

export default Home;
