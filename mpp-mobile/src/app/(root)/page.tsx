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
  image: string;
  slug: string;
  jmlLayanan: number;
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

function Home() {
  const [berita, setBerita] = useState<MyBerita>();
  const [beritaSlug, SetBeritaSlug] = useState<Berita>();
  const [layanan, setLayanan] = useState<MyInstansi>();
  const [facilities, setFacilities] = useState<MyFacilities>();
  const [search, setSearch] = useState("");

  const fetchAll = async (search: string) => {
    try {
      const news = await fetchNews();

      const layanan = await fetchInstansi(search);

      const fasilitas = await facilitiesFetch();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get/mall-pelayanan-publik-lampung-timur-dibuka-tahun-2024`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      SetBeritaSlug(result.data);
      setBerita(news);
      setLayanan(layanan);
      setFacilities(fasilitas);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchAll(search);
  }, [search]);

  const date = formatDate("2024-06-15T08:36:14.883Z");

  const image = berita?.data[0].image;
  const slug = berita?.data[0].slug;

  return (
    <div className="bg-[#F7FBF7] min-w-[360px] h-full pb-[96px]">
      <div className="bg-[#F7FBF7]">
        <HeroScreen />

        <AboutScreen />

        <div className="flex flex-col mt-[56px] justify-center items-center">
          <h4 className="text-primary-800 md:text-[32px] text-center text-[16px] font-bold md:mb-[32px]">
            Instansi Layanan MPP
          </h4>

          <div className="flex flex-col flex-wrap justify-center md:flex-row md:flex-wrap md:mx-[70px] items-center gap-[18px] md:gap-5 my-[16px]">
            {layanan?.data?.map((el: Instansi, i: number) => {
              return <CardLayananComponent key={i} layanan={el} />;
            })}
          </div>

          <Link
            href="/layanan"
            className="flex justify-center items-center rounded-[50px] w-[153px] h-[40px] bg-neutral-50 hover:bg-primary-700 shadow-lg border border-neutral-500 mt-[16px]">
            <p className="text-center text-[12px] text-primary-700 hover:text-neutral-50 font-light">
              Lihat Semua Instansi
            </p>
          </Link>
        </div>

        <div className="flex flex-col items-center mt-[56px]">
          <h3 className="text-primary-800 text-[16px] md:text-[32px] mb-[16px] font-semibold">
            Fasilitas
          </h3>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-[16px]">
            {facilities?.data?.map((el: Facility, i: number) => {
              return (
                <Image
                  key={i}
                  className="w-[290px] md:w-[370px] md:h-[295px] h-[180px] rounded-xl"
                  src={el.image}
                  alt="Facilities"
                  width={290}
                  height={180}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center mt-[56px]">
          <h3 className="text-primary-800 md:text-[32px] font-semibold text-[16px] mb-[16px] md:mb-[36px]">
            Berita
          </h3>

          <div className="hidden md:block md:w-full md:flex-col md:mx-[70px]">
            <div className="md:flex md:flex-rows md:mx-[70px] md:gap-[32px]">
              {slug && (
                <Link href={`/berita/${slug}`} className="md:w-full">
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
                  className="md:flex md:flex-col md:items-center md:gap-[16px]">
                  <div className="md:flex md:flex-col md:gap-[8px]">
                    <h3 className="md:text-[#000000] md:text-[30px] md:font-semibold">
                      {beritaSlug?.title}
                    </h3>

                    <p className="md:text-[#000000] md:text-[16px] md:font-light">
                      {date}
                    </p>
                  </div>

                  <h5 className="md:text-[20px] md:text-black md:font-light">
                    {beritaSlug?.desc}
                  </h5>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center md:self-start md:mx-[70px] md:mt-6">
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-[16px]">
              {berita?.data?.map((news: Berita, i: number) => {
                return <CardNewsComponent key={i} news={news} />;
              })}
            </div>

            <Link
              href="/berita"
              className="flex md:mt-[40px] justify-center items-center rounded-[50px] w-[153px] h-[40px] bg-neutral-50 hover:bg-primary-700 shadow-lg border border-neutral-500 mt-[16px]">
              <p className="text-center text-[12px] text-primary-700 hover:text-neutral-50 font-light">
                Lihat Semua Berita
              </p>
            </Link>
          </div>
        </div>

        <FAQScreen />
      </div>
    </div>
  );
}

export default Home;
