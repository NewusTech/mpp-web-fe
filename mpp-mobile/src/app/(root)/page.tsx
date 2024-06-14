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

type Berita = {
  title: string;
  description: string;
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
  name: string;
  url: string;
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
  const [layanan, setLayanan] = useState<MyInstansi>();
  const [facilities, setFacilities] = useState<MyFacilities>();
  const [search, setSearch] = useState("");

  const fetchAll = async (search: string) => {
    try {
      const news = await fetchNews();

      const layanan = await fetchInstansi(search);

      const fasilitas = await facilitiesFetch();

      setBerita(news);
      setLayanan(layanan);
      setFacilities(fasilitas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll(search);
  }, [search]);

  return (
    <div className="bg-[#F7FBF7] min-w-[360px] h-full">
      <div className="bg-[#F7FBF7]">
        <HeroScreen />

        <AboutScreen />

        <div className="flex flex-col mt-[56px] justify-center items-center">
          <h4 className="text-primary-800 text-center text-[16px] font-bold">
            Instansi Layanan MPP
          </h4>

          <div className="flex flex-col flex-wrap justify-center items-center gap-[18px] my-[16px]">
            {layanan?.data?.map((el: any) => {
              return <CardLayananComponent key={el.id} layanan={el} />;
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
          <h3 className="text-primary-800 text-[16px] mb-[16px] font-semibold">
            Fasilitas
          </h3>

          <div className="flex flex-col flex-wrap justify-center gap-[16px]">
            {facilities?.data?.map((el: any) => {
              return (
                <img
                  key={el.id}
                  className="w-[290px] h-[180px] rounded-xl"
                  src={el.image}
                  alt="Facilities"
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center mt-[56px]">
          <h3 className="text-primary-800 font-semibold text-[16px] mb-[16px]">
            Berita
          </h3>

          <div className="flex flex-col items-center">
            <div className="flex flex-col flex-wrap justify-center gap-[16px]">
              {berita?.data?.map((el: any) => {
                return <CardNewsComponent key={el.slug} news={el} />;
              })}
            </div>

            <Link
              href="/berita"
              className="flex justify-center items-center rounded-[50px] w-[153px] h-[40px] bg-neutral-50 hover:bg-primary-700 shadow-lg border border-neutral-500 mt-[16px]">
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
